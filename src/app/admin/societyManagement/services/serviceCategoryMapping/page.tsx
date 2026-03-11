"use client";

import { useEffect, useState } from "react";
import { AppBreadcrumbs, CommonCategory, DrawerForm } from "@/components";
import { RouteConfig } from "@/utils/routeConfig";
import { IconPlus, IconX } from "@tabler/icons-react";
import { Field } from "@/components/DrawerForm/DrawerForm";
import {
  COMMON_MESSAGE,
  GEN_CODE_SERVICE_CATEGORY,
  PAGE_TITLE,
  STATUS_OPTIONS,
} from "@/utils/constants";
import { Stack, Affix, Button } from "@mantine/core";
import {
  CategoryServiceMappingApiResponse,
  ServiceApiResponse,
  ServiceCategory,
  ServiceCategoryPagination,
  serviceDetails,
  ServiceItem,
} from "@/types/admin/societyManagement/services/serviceCategoryMapping/serviceCategoryMapping";
import { getRequest, patchRequest, postRequest } from "@/service";
import { API_PATH } from "@/utils/apiPath";
import { notifications } from "@mantine/notifications";

const notifyError = (msg: string) =>
  notifications.show({
    title: "Error",
    message: msg,
    color: "red",
    icon: <IconX size={16} />,
  });

const notifySuccess = (msg: string) =>
  notifications.show({
    title: "Successful!",
    message: msg,
    color: "green",
  });

interface CategoryServiceMapping {
  categoryCode: string;
  categoryName: string;
  serviceDetails: {
    id: string;
    serviceName: string;
    serviceDescription: string;
    serviceIconUrl: string;
    displayOrder: number;
    status: number;
  }[];
}

// In axios-server.ts
export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}
const ServiceCategoryMapping = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [serviceCategories, setServiceCategories] = useState<ServiceCategory[]>(
    [],
  );
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [categoryServiceMappingData, setCategoryServiceMappingData] = useState<
    CategoryServiceMapping[]
  >([]);
  const [drawerInitialValues, setDrawerInitialValues] = useState<
    Record<string, any> | undefined
  >(undefined);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingCategory, setEditingCategory] =
    useState<CategoryServiceMapping | null>(null);
    const [allServices, setAllServices] = useState<ServiceItem[]>([]);
  const [removedSevices, setRemovedServices] = useState<Array<{ serviceId: string; displayOrder: number; status: number }>>([]);



  //=================== Form Submit Handler ===================

  const handleEditClick = (category: CategoryServiceMapping) => {
    setIsEditMode(true);
    setEditingCategory(category);

    // Transform serviceDetails to form format
    const serviceRows = category.serviceDetails.map((service) => ({
      service: service.id,
      displayOrder: service.displayOrder,
      status: String(service.status),
      isExisting: true,
    }));

    const initialValues = {
      categoryCode: category.categoryCode,
      serviceRows: serviceRows,
    };

    setDrawerInitialValues(initialValues);
    setDrawerOpen(true);
  };

  const handleAddNewClick = () => {
    setIsEditMode(false);
    setEditingCategory(null);
    setDrawerInitialValues(undefined);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setIsEditMode(false);
    setEditingCategory(null);
    setDrawerInitialValues(undefined);
    setRemovedServices([]);
  };

  const handleFormSubmit = async (formData: Record<string, any>) => {
    try {
      const serviceRows = formData.serviceRows || [];
      const payload = {
        categoryCode: formData.categoryCode,
        serviceDetails: [
          ...serviceRows.map((row: serviceDetails) => ({
            serviceId: row.service,
            displayOrder: Number(row.displayOrder) || 0,
            status: Number(row.status),
          })),
          ...removedSevices,
        ],
      };
      if (isEditMode) {
        await patchRequest(`${API_PATH.CATEGORY_SERVICE_MAP}`, payload);
        notifySuccess(COMMON_MESSAGE.CATEGORY_SERVICE_MAPPING_UPDATED);
      } else {
        await postRequest(API_PATH.CATEGORY_SERVICE_MAP, payload);
        notifySuccess(COMMON_MESSAGE.CATEGORY_SERVICE_MAPPING_ADDED);
      }

      handleCloseDrawer();
      getServiceMaster();
      getServiceCategoryMappingDetails();
      setRemovedServices([]);
    } catch (error) {
      console.error(error);
      notifyError(
        COMMON_MESSAGE.ËRROR_MESSAGE
      );
    }
  };

  //==================Remove entry handler for multi-entry fieldset===================

  const handleRemoveEntry = (
    _fieldsetId: string,
    _index: number,
    entryValues: Record<string, any>,
  ) => {
    if (!isEditMode) return;

    const serviceId = entryValues.service;

    if (!serviceId) return;

    setRemovedServices((prev) => [
      ...prev,
      {
        serviceId,
        displayOrder: Number(entryValues.displayOrder) || 0,
        status: 2
      },
    ]);
  };


  const getCategoryFetch = async () => {
    try {
      const payload = {
        groupCode: GEN_CODE_SERVICE_CATEGORY, 
        sortBy: "displayOrder",
        sortOrder: "ASC"
      };
      const res = (await getRequest(
        `${API_PATH.GET_GEN_CODE}`, payload
      )) as ApiResponse<ServiceCategoryPagination>;

      // res.data = ServiceCategoryPagination
      // res.data.data = ServiceCategory[]
      const categories = res?.data?.data ?? [];
      setServiceCategories(categories);
    } catch (error) {
      notifyError(COMMON_MESSAGE.DATA_FETCH_FAIL);
      console.error("Error fetching service categories:", error);
    }
  };

  const getServiceMaster = async () => {
    try {
      const res = (await getRequest(API_PATH.GET_SERVICE_MASTER_DROPDOWN)) as ServiceApiResponse;
      const data: ServiceItem[] = res?.data?.data || [];
      setAllServices(data); // store full list
      const filtered = data.filter((a) => a.status === 1 && a.isMapped !== 1);
      setServices(filtered);
      return data;
    } catch (error) {
      notifyError(COMMON_MESSAGE.DATA_FETCH_FAIL);
      return [];
    }
  };

  const editingServiceIds =
    editingCategory?.serviceDetails.map((s) => s.id) ?? [];

  const availableServices = isEditMode
    ? [
        ...services, // unmapped ones
        ...allServices.filter((s) => editingServiceIds.includes(s.serviceId)),
      ]
    : services;

  const getServiceCategoryMappingDetails = async () => {
    try {
      const res = (await getRequest(
        API_PATH.CATEGORY_SERVICE_MAP,
      )) as ApiResponse<CategoryServiceMappingApiResponse>;

      const apiData: CategoryServiceMapping[] = res?.data?.data;
      setCategoryServiceMappingData(apiData);
    } catch (error) {
      notifyError(COMMON_MESSAGE.DATA_FETCH_FAIL);
      console.error(error);
    }
  };

  useEffect(() => {
    getCategoryFetch();
    getServiceMaster();
    getServiceCategoryMappingDetails();
  }, []);

  const formFields: Field[] = [
    {
      name: "categoryCode",
      label: "Service Category",
      type: "select",
      placeholder: "Select category",
      isDisabled: isEditMode,
      required: true,
      colSpan: 12,
      options: serviceCategories
        .filter((cat) => cat.status === 1)
        .map((cat) => ({
          value: cat.genCode,
          label: cat.genName,
        })),
    },
    {
      name: "service",
      label: "Service",
      type: "select",
      placeholder: "Select Service",
      required: true,
      colSpan: 3,
      fieldset: "serviceRows",
      dedupSelect: true,
      options: availableServices.map((a) => ({
        value: a.serviceId,
        label: a.serviceName,
      })),
      isDisabled: true
    },
    {
      name: "displayOrder",
      label: "Display Order",
      type: "number",
      placeholder: "e.g. 1",
      required: false,
      colSpan: 4,
      fieldset: "serviceRows",
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      placeholder: "Status",
      required: true,
      colSpan: 3,
      fieldset: "serviceRows",
      options: STATUS_OPTIONS.map((o) => ({ label: o.label, value: o.value })),
    },
  ];

  const formFieldsets = [
    {
      id: "serviceRows",
      legend: "Service Items",
      description: "Add one or more amenities to map under this tier.",
      isMultipleEntry: true,
      multipleEntryKey: "serviceRows",
    },
  ];

  return (
    <>
      <AppBreadcrumbs
        items={[
          {
            label: PAGE_TITLE.SOCIETY_MANAGEMENT,
            path: RouteConfig.SOCIETY_MGT,
          },
          {
            label: PAGE_TITLE.SERVICE_CONFIGURATION,
            path: () => window.history.back(),
          },
          { label: PAGE_TITLE.SERVICE_CATEGORY_MAPPING },
        ]}
      />

      {/* //floating add button */}
      <Affix position={{ bottom: 40, right: 20 }}>
        <Button
          leftSection={<IconPlus size={20} />}
          radius="xl"
          size="md"
          style={{
            position: "fixed",
            bottom: 32,
            right: 32,
            zIndex: 100,
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
          }}
          color="primary.5"
          onClick={handleAddNewClick}
        >
          Map Services
        </Button>
      </Affix>

      {/* <Stack gap="lg">
        {SERVICES_CATEGORIES.map((category) => (
          <CommonCategory
            key={category.title}
            title={category.title}
            description={category.description}
            amenities={category.amenities}
            fieldsets={formFieldsets}
            icon={category.icon}
            onEdit={() => { }}
          />
        ))}
      </Stack> */}

      <Stack gap="lg">
        {categoryServiceMappingData.map((category) => (
          <CommonCategory
            key={category.categoryCode}
            title={category.categoryName}
            amenities={
              category.serviceDetails
                ?.sort((a, b) => a.displayOrder - b.displayOrder)
                .map((service) => service.serviceName) || []
            }
            amenityStatuses={Object.fromEntries(
              category.serviceDetails.map((service) => [
                service.serviceName,
                service.status === 1,
              ]),
            )}
            amenityDisplayOrders={Object.fromEntries(
              category.serviceDetails.map((service) => [
                service.serviceName,
                service.displayOrder,
              ]),
            )}
            onEdit={() => handleEditClick(category)}
            editLabel="Edit services"
          />
        ))}
      </Stack>

      <DrawerForm
        opened={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title="Map Services"
        fields={formFields}
        fieldsets={formFieldsets}
        onSubmit={handleFormSubmit}
        initialValues={drawerInitialValues}
        onRemoveEntry={handleRemoveEntry}
        size="xl"
      />
    </>
  );
};

export default ServiceCategoryMapping;
