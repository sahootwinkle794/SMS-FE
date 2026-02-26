"use client";

import {
  ActionIcon,
  Affix,
  Badge,
  Box,
  Button,
  Group,
  Stack,
  Text,
  Tooltip,
} from "@mantine/core";
import { DataTable } from "@/components/DataTable";
import { AppBreadcrumbs } from "@/components";
import { RouteConfig } from "@/utils/routeConfig";
import { IconEdit, IconPlus, IconTrash, IconX } from "@tabler/icons-react";
import { DrawerForm } from "@/components/DrawerForm";
import { FieldsetConfig } from "@/components/DrawerForm/DrawerForm";
import { getRequest } from "@/service";
import { PackageApiResponse } from "@/types/admin/societyManagement/packageSetup/packageSetup";
import { ServiceApiResponse } from "@/types/admin/societyManagement/services/services";
import { AmenityApiResponse } from "@/types/admin/societyManagement/amenitySetup/amenitySetup";
import { API_PATH } from "@/utils/apiPath";
import { notifications } from "@mantine/notifications";

import { useCallback, useEffect, useState } from "react";
import { COMMON_MESSAGE, STATUS_OPTIONS } from "@/utils/constants";
import { AmenityTier } from "@/types/admin/societyManagement/facandame/amenitiesMapping/amenitiesMapping";
const RECORDS_PER_PAGE = 10;

interface ApiResponse<T> {
  data: {
    data: T[];
    message: string;
  };
}

const PackageAmenityMapping = () => {
  const [packages, setPackages] = useState<any[]>([]);
  const [services, setservices] = useState<any[]>([]);
  const [amenity, setAmenity] = useState<any[]>([]);
  const [packageOptions, setPackageOptions] = useState<any[]>([]);
  const [serviceOptions, setserviceOptions] = useState<any[]>([]);
  // const [amenityOptions, setAmenityOptions] = useState<any[]>([]);
  const [tierOptions, setTierOptions] = useState<any[]>([]);
  const [tiersLoading, setTiersLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [drawerOpened, setDrawerOpened] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedMapping, setSelectedMapping] = useState<any>(null);

    const notifyError = (msg: string) =>
    notifications.show({
      title: "Error",
      message: msg,
      color: "red",
      icon: <IconX size={16} />,
    });

  const fetchPackage = useCallback(async () => {
    setLoading(true);
    try {
      const payload = {
        search: "",
        page: "1",
        limit: "100",
        sortBy: "created_at",
        sortOrder: "DESC",
        
      };

      const response = await getRequest<PackageApiResponse>(
        API_PATH.GET_PACKAGE,
        payload,
      );

      const responseData = response?.data?.data || [];

      setPackages(responseData);
      console.log("Package Response Data:", responseData);

      //  Convert API data to dropdown format
      const formattedOptions = responseData.map((pkg: any) => ({
        value: pkg.packageCode || pkg.id, // backend key
        label: pkg.packageName, // display text
      }));

      setPackageOptions(formattedOptions);
    } catch (err) {
      console.error(err);
      notifications.show({
        title: "Error!",
        message: "Failed to load packages",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchService = useCallback(async () => {
    setLoading(true);
    try {
      const payload = {
        search: "",
        page: "1",
        limit: "100",
        sortBy: "created_at",
        sortOrder: "DESC",
      };

      const response = await getRequest<ServiceApiResponse>(
        API_PATH.GET_SERVICE,
        payload,
      );

      const responseData = response?.data?.data || [];

      setservices(responseData);

      console.log("Service Response Data:", responseData);

      //  Convert API data to dropdown format
      const formattedOptions = responseData.map((service: any) => ({
        value: service.serviceCode || service.id, // backend key
        label: service.serviceName, // display text
      }));

      setserviceOptions(formattedOptions);
    } catch (err) {
      console.error(err);
      notifications.show({
        title: "Error!",
        message: "Failed to load services",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  }, []);

    const fetchTier = async () => {
      setTiersLoading(true);
      try {
        const res = (await getRequest(
          `${API_PATH.GET_GEN_CODE}?groupCode=AMENITY_TIER`,
        )) as ApiResponse<AmenityTier>;
        const tiers: AmenityTier[] = res?.data?.data ?? [];
        setTierOptions(tiers);
      } catch (error) {
        notifyError(COMMON_MESSAGE.DATA_FETCH_FAIL);
        console.error("Error fetching tier data:", error);
      } finally {
        //cleanup
      }
    };

  useEffect(() => {
    fetchPackage();
    fetchService();
    fetchTier();
  }, []);

  const mockPackages = [
    {
      id: 1,
      name: "Basic Package",
      tier: "Basic Tier",
      status: "Active",
    },
    {
      id: 2,
      name: "Silver Package",
      tier: "Silver Tier",
      status: "Active",
    },
    {
      id: 3,
      name: "Gold Package",
      tier: "Gold Tier",
      status: "Inactive",
    },
    {
      id: 4,
      name: "Platinum Package",
      tier: "Platinum Tier",
      status: "Active",
    },
    {
      id: 5,
      name: "Premium Package",
      tier: "Premium Tier",
      status: "Active",
    },
  ];

  /* ------------------ TABLE COLUMNS ------------------ */
  const columns = [
    {
      header: "Sl No",
      accessor: "id",
      align: "center",
      width: "7%",
      render: (_: any, __: any, index: number) => (
        <Text size="sm">
          {(currentPage - 1) * RECORDS_PER_PAGE + index + 1}
        </Text>
      ),
    },
    {
      header: "Actions",
      accessor: "actions",
      align: "center",
      width: "10%",
      render: (_: any, row: any) => (
        <>
          {/* EDIT */}
          <Tooltip label="Edit Mapping">
            <ActionIcon
              color="blue"
              variant="light"
              radius="md"
              onClick={() => {
                setEditMode(true);

                const formattedRow = {
                  ...row,
                  // Package mapping
                  package:
                    typeof row?.name === "string"
                      ? row.name.toLowerCase().replace(" package", "").trim()
                      : "",

                  // Amenity mapping
                  amenity:
                    typeof row?.amenity === "string"
                      ? row.amenity
                          .split(",")
                          .map((item: string) =>
                            item.trim().toLowerCase().replace(/\s+/g, "-"),
                          )
                      : [],

                  // Status mapping
                  status:
                    typeof row?.status === "string"
                      ? row.status.toLowerCase()
                      : "active",

                  // Service mapping
                  service:
                    typeof row?.service_status === "string"
                      ? row.service_status
                          .split(",")
                          .map((item: string) =>
                            item.trim().toLowerCase().replace(/\s+/g, "-"),
                          )
                      : [],

                  // Status mapping
                  service_status:
                    typeof row?.service_status === "string"
                      ? row.service_status.toLowerCase()
                      : "active",
                };

                setSelectedMapping(formattedRow);
                setDrawerOpened(true);
              }}
            >
              <IconEdit size={16} />
            </ActionIcon>
          </Tooltip>

          {/* DELETE */}
          <Tooltip label="Delete Mapping">
            <ActionIcon
              color="red"
              variant="light"
              radius="md"
              onClick={() => {
                console.log("Delete Mapping:", row);
              }}
            >
              <IconTrash size={16} />
            </ActionIcon>
          </Tooltip>
        </>
      ),
    },
    {
      header: "Package Name",
      accessor: "name",
      align: "left",
    },
    {
      header: "Tier",
      accessor: "tier",
      align: "left",
    },
    {
      header: "Status",
      width: "10%",
      align: "center",
      accessor: "status",
      render: (value: string) => {
        const isActive =
          typeof value === "string" && value.toLowerCase() === "active";

        return (
          <Badge
            size="sm"
            radius="xs"
            variant="filled"
            color={isActive ? "green" : "red"}
          >
            {isActive ? "Active" : "Inactive"}
          </Badge>
        );
      },
    },
  ];

  /* ------------------ FIELDSET CONFIGURATION ------------------ */
  const fieldsetConfigs: FieldsetConfig[] = [
    {
      id: "PackageAmenityMappingInfo",
      legend: "Package Amenity Mapping Information",
      description: "Core identification details of the package amenity mapping",
    },
    // {
    //   id: "PackageServiceMappingInfo",
    //   legend: "Package Service Mapping Information",
    //   description: "Core identification details of the package service mapping",
    // },
  ];

  /* ------------------ FORM FIELDS WITH FIELDSET ASSIGNMENT ------------------ */
  const formFields = [
    /* ================= PACKAGE AMENITY MAPPING INFORMATION ================= */
    {
      name: "package",
      label: "Package Type",
      type: "select",
      required: true,
      options: packageOptions,
      fieldset: "PackageAmenityMappingInfo",
      colSpan: 6,
    },
    {
      name: "tiers",
      label: "Tiers",
      type: "multiselect",
      required: true,
      options: tierOptions
      .filter((tier) => tier.status === 1)
      .map((tier) => ({
        value: tier.genCode.toLowerCase(),
        label: tier.genName,
      })),
      fieldset: "PackageAmenityMappingInfo",
      colSpan: 6,
    },

    {
      name: "status",
      label: "Status",
      type: "select",
      required: true,
      options: STATUS_OPTIONS.map((o) => ({ label: o.label, value: o.value })),
      fieldset: "PackageAmenityMappingInfo",
      colSpan: 6,
    },

    // {
    //   name: "service",
    //   label: "Service Type",
    //   type: "select",
    //   required: true,
    //   options: serviceOptions,
    //   fieldset: "PackageServiceMappingInfo",
    //   colSpan: 6,
    // },
    // {
    //   name: "service_status",
    //   label: "Status",
    //   type: "select",
    //   required: true,
    //   options: [
    //     { value: "active", label: "Active" },
    //     { value: "inactive", label: "Inactive" },
    //   ],
    //   fieldset: "PackageServiceMappingInfo",
    //   colSpan: 6,
    // },
  ];

  return (
    <Stack gap="md">
      <AppBreadcrumbs
        items={[
          { label: "Society Management", path: RouteConfig.SOCIETY_MGT },
          { label: "Package to Tier mapping" },
        ]}
      />

      {/* Header */}
      <Group justify="space-between">
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
            onClick={() => {
              setEditMode(false);
              setSelectedMapping(null);
              setDrawerOpened(true);
            }}
          >
            Add New Mapping
          </Button>
        </Affix>
      </Group>

      {/* Data Table */}
      <Box>
        <DataTable
          data={mockPackages}
          columns={columns as any}
          pageSize={RECORDS_PER_PAGE}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          totalRecords={0}
        />
      </Box>

      {/* Drawer Form with Fieldsets */}
      <DrawerForm
        position="right"
        opened={drawerOpened}
        onClose={() => setDrawerOpened(false)}
        title={editMode ? "Edit Mapping" : "Add Mapping"}
        fields={formFields as any}
        fieldsets={fieldsetConfigs}
        initialValues={editMode ? selectedMapping : undefined}
        onSubmit={(values) => {
          console.log(values);
          setDrawerOpened(false);
        }}
        size="xl"
      />
    </Stack>
  );
};

export default PackageAmenityMapping;
