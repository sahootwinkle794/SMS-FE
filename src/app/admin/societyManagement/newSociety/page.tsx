"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActionIcon,
  Affix,
  Badge,
  Box,
  Button,
  Group,
  Select,
  Stack,
  Text,
  TextInput,
  Tooltip,
} from "@mantine/core";
import { IconEdit, IconPlus, IconSearch, IconTrash } from "@tabler/icons-react";
import { AppBreadcrumbs, CustomModal } from "@/components";
import { RouteConfig } from "@/utils/routeConfig";
import { DataTable } from "@/components/DataTable";
import { DrawerForm } from "@/components/DrawerForm";
import { FieldsetConfig, Field } from "@/components/DrawerForm/DrawerForm";
import { getRequest, postRequest, patchRequest } from "@/service";
import { API_PATH } from "@/utils/apiPath";
import { IMAGES } from "@/utils/images";
import { notifications } from "@mantine/notifications";
import {
  AddSocietyPayload,
  SocietyApiResponse,
  SocietyItem,
  SocietyMasterItem,
  StateMasterApiResponse,
  DistrictMasterApiResponse,
  DistrictMasterItem,
  SocietyDetailResponse,
  SocietyFormValues,
  BlockFormInfo,
} from "@/types/admin/societyManagement/newSociety/newSociety"; import {
  PackageApiResponse, PackageItem
} from "@/types/admin/societyManagement/packageSetup/packageSetup";
import { useSocietyLevels } from "@/hooks/useSocietyLevels";
import { COMMON_MESSAGE, REGEX, REGEX_MSG, STATUS_OPTIONS, RECORDS_PER_PAGE } from "@/utils/constants";

interface FormInstance {
  setFieldValue: (field: string, value: string | number | null) => void;
  values: Record<string, unknown>;
  errors: Record<string, string>;
  clearFieldError: (field: string) => void;
  setFieldError: (field: string, error: string) => void;
}

interface ApiError {
  message: string;
  response?: {
    data?: {
      status?: number;
      message?: string;
      data?: unknown[];
    };
  };
}
const NewSociety = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [drawerOpened, setDrawerOpened] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedSociety, setSelectedSociety] = useState<SocietyDetailResponse | null>(null);
  const [societyData, setSocietyData] = useState<SocietyItem[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [packages, setPackages] = useState<PackageItem[]>([]);
  const [stateData, setStateData] = useState<SocietyMasterItem[]>([]);
  const [districtData, setDistrictData] = useState<DistrictMasterItem[]>([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [searchName, setSearchName] = useState("");
  // --------------------Mock Data & Configurations--------------------
  const { levels } = useSocietyLevels();

  const packageOptions = packages.map((level) => ({
    value: level?.id,
    label: level?.packageName,
  }));

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
        payload
      );
      const responseData = response?.data?.data;
      setPackages(responseData);
    } catch (err) {
      console.error(err);
      notifications.show({
        title: "Error!",
        message: "Failed to Packages",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  const stateOptions = stateData.map((state) => ({
    label: state.stateName,
    value: state.stateCode.toString(),
  }));

  const districtOptions = useMemo(() => {
    return districtData.map((district) => ({
      label: district.districtName,
      value: district.districtCode.toString(),
    }));
  }, [districtData]);


  const getDistrictMaster = useCallback(async (stateCode: number) => {
    try {
      const response = await getRequest<DistrictMasterApiResponse>(
        `${API_PATH.GET_DISTRICT_MASTER}/${stateCode}`
      );
      setDistrictData(response.data);
    } catch (err) {
      console.error(err);
    }
  }, []);


  const getStateMaster = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getRequest<StateMasterApiResponse>(
        API_PATH.GET_STATE_MASTER,
      );
      setStateData(response?.data)
    } catch (err) {
      console.error(err);
      notifications.show({
        title: "Error!",
        message: "Failed to load roles",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPackage();
    getStateMaster();
  }, [fetchPackage, getStateMaster]);

  const levelOptions = levels.map((level) => ({
    value: level?.societyLevelId,
    label: level?.levelName,
  }));

  const getLevelCode = (societyLevelId: string): string => {
    const level = levels.find((l) => l.societyLevelId === societyLevelId);
    return level?.levelCode || "";
  };

  /* =================Delete user  ================= */
  const handleDeleteClick = (row: SocietyItem) => {
    // Convert SocietyItem to SocietyDetailResponse for delete modal
    const societyForDelete: SocietyDetailResponse = {
      societyId: row.societyId,
      societyName: row.societyName,
      societyCode: row.societyCode,
      registrationNumber: row.registrationNumber,
      societyType: row.societyType,
      societyLevel: row.societyLevel,
      establishmentYear: row.establishmentYear,
      totalArea: row.totalArea,
      blocks: [],
      addressLine1: row.addressLine1,
      areaLocality: row.areaLocality,
      city: row.city,
      districtCode: row.district,
      stateCode: row.state,
      pincode: row.pincode,
      landmark: row.landmark,
      adminName: row.adminName,
      adminMobile: row.adminMobile,
      adminEmail: row.adminEmail,
      packageId: row.packageId,
      status: Number(row.status),
    };
    setSelectedSociety(societyForDelete);
    setDeleteModalOpen(true);
  };


  /* =================Confirm  Delete user  ================= */
  const handleConfirmDelete = async () => {
    if (!selectedSociety?.societyId) return;

    const newStatus = selectedSociety.status === 1 ? 2 : 1;

    try {
      await patchRequest(
        `${API_PATH.GET_SOCITIES}/${selectedSociety.societyId}`,
        { status: newStatus }
      );

      fetchSocietyDetails();
    } catch (err: unknown) {
      const error = err as ApiError;
      const message =
        error.response?.data?.message ||
        error.message ||                
        "Something went wrong";
      notifications.show({
        title: "Error",
        message: message || "Failed to update status",
        color: "red",
      });
    }

    setDeleteModalOpen(false);
    setSelectedSociety(null);
  };

  const transformToPayload = (values: SocietyFormValues): AddSocietyPayload => {
    const numberOfBlocks = values.blocks?.length || 0;
    const blocks = values.blocks?.map((block: BlockFormInfo) => ({
      blockName: block.blockName || "",
      numberOfBuildings: Number(block.numberOfBuildings) || 0,
      numberOfFloors: Number(block.numberOfFloors) || 0,
      totalFlats: Number(block.totalFlats) || 0,
      parkingSlots: Number(block.parkingSlots) || 0,
    })) || [];

    // Get levelCode from societyLevelId
    const societyLevelCode = getLevelCode(values.societyLevelId);

    const payload: AddSocietyPayload = {
      societyName: values.societyName,
      societyCode: values.societyCode,
      registrationNumber: values.registrationNumber,
      societyType: values.societyType?.toUpperCase(),
      societyLevelId: values.societyLevelId,
      societyLevelCode: societyLevelCode,
      establishmentYear: Number(values.establishmentYear),
      totalArea: Number(values.totalArea) || 0,
      numberOfBlocks: numberOfBlocks,
      blocks: blocks,
      addressLine1: values.addressLine1,
      areaLocality: values.areaLocality,
      city: values.city,
      districtCode: values.districtCode,
      stateCode: values.stateCode,
      pincode: values?.pincode?.toString(),
      landmark: values.landmark,
      adminName: values.adminName,
      adminMobile: values.adminMobile,
      adminEmail: values.adminEmail,
      packageId: values.packageId,
      status: Number(values.status) || 1,
    };

    return payload;
  };

  const updateSociety = async (id: string, payload: AddSocietyPayload) => {
    try {
      const response = await patchRequest(
        `${API_PATH.GET_SOCITIES}/${id}`,
        payload
      );

      notifications.show({
        title: "Success",
        message: COMMON_MESSAGE.SOCIETY_UPDATE,
        color: "green",
      });

      return response;
    } catch (err: unknown) {
      const error = err as ApiError;
      notifications.show({
        title: "Error",
        message: error?.response?.data?.message || "Failed to update ",
        color: "red",
      });
    }
  };

  const createSociety = async (payload: AddSocietyPayload) => {
    try {
      const response = await postRequest(
        API_PATH.GET_SOCITIES,
        payload
      );
      notifications.show({
        title: "Success",
        message: COMMON_MESSAGE.SOCIETY_ADDED,
        color: "green",
      });

      return response;
    } catch (err: unknown) {
      console.log("err", err)
      const error = err as ApiError;
      notifications.show({
        title: "Error",
        message: error?.response?.data?.message || COMMON_MESSAGE.SOCIETY_CREATION_FAILED,
        color: "red",
      });
      throw err;
    }
  };

  const mapSocietyToForm = (data: SocietyDetailResponse): SocietyFormValues => {
    const defaultBlock: BlockFormInfo = {
      blockName: "",
      numberOfBuildings: "",
      numberOfFloors: "",
      totalFlats: "",
      parkingSlots: "",
    };

    const mappedBlocks: BlockFormInfo[] = data.blocks?.length
      ? data.blocks.map((block): BlockFormInfo => ({
        blockName: block.blockName ?? "",
        numberOfBuildings: block.numberOfBuildings?.toString() ?? "",
        numberOfFloors: block.numberOfFloors?.toString() ?? "",
        totalFlats: block.totalFlats?.toString() ?? "",
        parkingSlots: block.parkingSlots?.toString() ?? "",
      }))
      : [defaultBlock];

    return {
      societyName: data.societyName || "",
      societyCode: data.societyCode || "",
      registrationNumber: data.registrationNumber || "",
      totalArea: data.totalArea || "",
      establishmentYear: data.establishmentYear?.toString() || "",
      societyType: data.societyType?.toLowerCase() || "",
      societyLevelId:
        levels.find((l) => l.levelCode === data.societyLevel)
          ?.societyLevelId || "",
      addressLine1: data.addressLine1 || "",
      areaLocality: data.areaLocality || "",
      stateCode: data.stateCode?.toString() || "",
      districtCode: data.districtCode?.toString() || "",
      city: data.city || "",
      pincode: data.pincode || "",
      landmark: data.landmark || "",
      adminName: data.adminName || "",
      adminMobile: data.adminMobile || "",
      adminEmail: data.adminEmail || "",
      packageId: data.packageId || "",
      status: data.status?.toString() || "1",
      blocks: mappedBlocks

    };
  };

  const fetchSocietyById = async (id: string) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response = await getRequest<any>(
        `${API_PATH.GET_SOCITIES}/${id}`
      );

      return response?.data;
    } catch (err: unknown) {
      const error = err as ApiError;
      notifications.show({
        title: "Error",
        message: error?.response?.data?.message || COMMON_MESSAGE.SOCIETY_FETCH,
        color: "red",
      });
    }
  };


  /* ================= DATA FETCH (EFFECT) ================= */

  const fetchSocietyDetails = useCallback(async () => {
    setLoading(true);
    try {
      const payload = {
        search: searchName,
        page: currentPage,
        limit: RECORDS_PER_PAGE,
        sortBy: "createdAt",
        sortOrder: "DESC",
      };

      const response = await getRequest<SocietyApiResponse>(
        API_PATH.GET_SOCITIES,
        payload
      );
      setSocietyData(response?.data?.data);
      setTotalRecords(response?.data?.total)
    } catch (err) {
      notifications.show({
        title: "Error!",
        message: COMMON_MESSAGE.SOCIETY_FETCH,
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchName]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchSocietyDetails()
    }, 500)
    return () => clearTimeout(timer)
  }, [fetchSocietyDetails])

  /* ------------------ TABLE COLUMNS ------------------ */
  const columns = [
    {
      header: "Sl No",
      accessor: "id",
      align: "center",
      width: "7%",
      render: (_: unknown, _row: SocietyItem, index: number) => (
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
      render: (_value: unknown, row: SocietyItem) => (
        <>
          {/* EDIT */}
          <Tooltip label="Edit Society">
            <ActionIcon
              color="blue"
              variant="light"
              radius="md"
              onClick={async () => {
                setEditMode(true);
                setLoading(true);
                const data = await fetchSocietyById(row.societyId);
                if (data) {
                  if (data.stateCode) {
                    await getDistrictMaster(Number(data?.stateCode))
                  } setSelectedSociety(data);
                  setDrawerOpened(true);
                }

                setLoading(false);
              }}
            >
              <IconEdit size={16} />
            </ActionIcon>
          </Tooltip>

          {/* DELETE */}
          <Tooltip label="Delete Society">
            <ActionIcon
              color="red"
              variant="light"
              radius="md"
              onClick={() => {
                handleDeleteClick(row)
              }}
            >
              <IconTrash size={16} />
            </ActionIcon>
          </Tooltip>
        </>
      ),
    },
    {
      header: "Society Name",
      accessor: "societyName",
      align: "left",
    },
    {
      header: "Society Code",
      accessor: "societyCode",
      align: "left",
    },
    {
      header: "Level",
      accessor: "societyLevel",
      align: "left",
    },
    {
      header: "Status",
      width: "10%",
      align: "center",
      accessor: "status",
      render: (value: number) => {
        const isActive = value === 1;

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
      id: "basicInfo",
      legend: "Basic Society Information",
      description: "Core identification details of the society",
    },
    {
      id: "location",
      legend: "Location Details",
      description: "Address and geographical information",
    },
    {
      id: "building",
      legend: "Building & Unit Information",
      description: "Structural details of the society",
      isMultipleEntry: true,           //  Enable multiple entry
      multipleEntryKey: "blocks", //  Key for the array in form values
    }
    ,
    {
      id: "adminInfo",
      legend: "Society Admin (Primary Contact)",
      description: "Primary administrative contact details",
    },
    {
      id: "status",
      legend: "Status & Control",
      description: "Society lifecycle and control settings",
    },
  ];

  /* ------------------ FORM FIELDS WITH FIELDSET ASSIGNMENT ------------------ */
  const formFields: Field[] = [
    /* ================= BASIC SOCIETY INFORMATION ================= */
    {
      name: "societyName",
      label: "Society Name",
      placeholder: "Enter society name",
      type: "text",
      required: true,
      fieldset: "basicInfo",
      colSpan: 6,
      minLength: 3,
      maxLength: 100,
      regex: REGEX.NAME,
      regexMessage: REGEX_MSG.NAME,
      liveValidation: true
    },
    {
      name: "societyCode",
      label: "Society Code",
      placeholder: "Enter society code",
      type: "text",
      required: true,
      fieldset: "basicInfo",
      colSpan: 3,
      maxLength: 20,
      regex: REGEX.SOCIETY_CODE,
      regexMessage: REGEX_MSG.SOCIETY_NAME,
      liveValidation: true
    },
    {
      name: "registrationNumber",
      label: "Registration Number",
      placeholder: "Enter registration number",
      type: "text",
      required: true,
      fieldset: "basicInfo",
      colSpan: 3,
      regex: REGEX.REGISTRATION_NUM,
      regexMessage: REGEX_MSG.REGISTRATION_NUM,
      liveValidation: true
    },
    {
      name: "totalArea",
      label: "Total Area",
      placeholder: "Enter total area",
      type: "text",
      required: true,
      fieldset: "basicInfo",
      colSpan: 3,
      regex: /^\d+(\.\d{1,2})?$/,
      regexMessage: "Enter valid area (numbers with up to 2 decimals).",
      liveValidation: true
    },
    {
      name: "establishmentYear",
      label: "Establishment Year",
      placeholder: "Select year",
      type: "select",
      required: true,
      options: Array.from(
        { length: new Date().getFullYear() - 1900 + 1 },
        (_, i) => {
          const year = new Date().getFullYear() - i;
          return { value: year.toString(), label: year.toString() };
        }
      ),
      fieldset: "basicInfo",
      colSpan: 3,
    },
    {
      name: "societyType",
      label: "Society Type",
      placeholder: "Select society type",
      type: "select",
      required: true,
      options: [
        { value: "apartment", label: "Apartment" },
        { value: "villa", label: "Villa" },
        { value: "mixed", label: "Mixed" },
      ],
      fieldset: "basicInfo",
      colSpan: 3,
    },
    {
      name: "societyLevelId",
      label: "Society Level",
      placeholder: "Select society level",
      type: "select",
      required: true,
      options: levelOptions,
      fieldset: "basicInfo",
      colSpan: 3,
    },

    /* ================= LOCATION DETAILS ================= */
    {
      name: "addressLine1",
      label: "Address Line 1",
      type: "textarea",
      required: true,
      fieldset: "location",
      colSpan: 12,
      maxLength: 255
    },
    {
      name: "areaLocality",
      label: "Area / Locality",
      placeholder: "Enter area",
      type: "text",
      required: true,
      fieldset: "location",
      colSpan: 4,
      minLength: 3,
      maxLength: 100
    },
    {
      name: "stateCode",
      label: "State",
      placeholder: "Select state",
      type: "select",
      required: true,
      options: stateOptions,
      fieldset: "location",
      colSpan: 4,
      onChange: (value: string | null, form: FormInstance) => {
        if (value) {
          form.setFieldValue("districtCode", "");
          getDistrictMaster(Number(value));
        } else {
          setDistrictData([]);
          form.setFieldValue("districtCode", "");
        }
      },
    },
    {
      name: "districtCode",
      label: "District",
      placeholder: "Select District",
      type: "select",
      required: true,
      options: districtOptions,
      fieldset: "location",
      colSpan: 4,
      // disabled: districtOptions.length === 0,
    },
    {
      name: "city",
      label: "City",
      placeholder: "Enter city",
      type: "text",
      required: true,
      fieldset: "location",
      colSpan: 4,
      minLength: 2,
      maxLength: 50
    },
    {
      name: "pincode",
      label: "Pincode",
      placeholder: "e.g. 600001",
      type: "number",
      required: true,
      fieldset: "location",
      colSpan: 4,
      maxLength: 6
    },
    {
      name: "landmark",
      label: "Landmark",
      placeholder: "e.g. Near Metro Station",
      type: "text",
      required: false,
      fieldset: "location",
      colSpan: 4,
      maxLength: 100
    },

    /* ================= BUILDING & UNIT INFORMATION ================= */
    {
      name: "blockName",
      label: "Block Name",
      placeholder: "e.g. A Block",
      type: "text",
      required: true,
      fieldset: "building",
      colSpan: 3,
    },
    // {
    //   name: "numberOfBuildings",
    //   label: "Buildings",
    //   placeholder: "e.g. 2",
    //   type: "number",
    //   required: true,
    //   fieldset: "building",
    //   colSpan: 2,
    // },
    {
      name: "numberOfFloors",
      label: "No. of Floors",
      placeholder: "e.g. 10",
      type: "number",
      required: true,
      fieldset: "building",
      colSpan: 3,
      maxLength: 5
    },
    {
      name: "totalFlats",
      label: "Total Flats",
      placeholder: "e.g. 200",
      type: "number",
      required: true,
      fieldset: "building",
      colSpan: 3,
      maxLength: 5
    },
    {
      name: "parkingSlots",
      label: "Parking Slots",
      placeholder: "e.g. 80",
      type: "number",
      fieldset: "building",
      colSpan: 2,
      maxLength: 5
    },

    /* ================= SOCIETY ADMIN (PRIMARY CONTACT) ================= */
    {
      name: "adminName",
      label: "Admin Name",
      placeholder: "Enter admin name",
      type: "text",
      required: true,
      fieldset: "adminInfo",
      colSpan: 4,
      regex: REGEX.NAME,
      regexMessage: REGEX_MSG.NAME,
      liveValidation: true
    },
    {
      name: "adminMobile",
      label: "Mobile Number",
      placeholder: "e.g. 9876543210",
      type: "text",
      required: true,
      fieldset: "adminInfo",
      colSpan: 4,
      maxLength: 10,
      regex: REGEX.PHONE,
      regexMessage: REGEX_MSG.PHONE,
      liveValidation: true
    },
    {
      name: "adminEmail",
      label: "Email",
      placeholder: "e.g. admin@example.com",
      type: "email",
      required: true,
      fieldset: "adminInfo",
      colSpan: 4,
      regex: REGEX.EMAIL,
      regexMessage: REGEX_MSG.EMAIL,
      liveValidation: true
    },

    /* ================= STATUS & CONTROL ================= */
    {
      name: "packageId",
      label: "Package Name",
      placeholder: "Select package",
      type: "select",
      required: true,
      options: packageOptions,
      fieldset: "status",
      colSpan: 6,
    },
    {
      name: "status",
      label: "Society Status",
      placeholder: "Select society status",
      type: "select",
      required: true,
      options: [...STATUS_OPTIONS],
      fieldset: "status",
      colSpan: 6,
    },
  ];

  return (
    <Stack gap="md">
      {/* Breadcrumbs */}
      <AppBreadcrumbs
        items={[
          { label: "Society Management", path: RouteConfig.SOCIETY_MGT },
          { label: "New society" },
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
              setSelectedSociety(null);
              setDistrictData([])
              setDrawerOpened(true);
            }}
          >
            Create society
          </Button>
        </Affix>
      </Group>

      {/* Filters */}
      <Group gap="sm">
        <TextInput
          placeholder="Search by name or code"
          leftSection={<IconSearch size={16} />}
          value={searchName}
          onChange={(event) => {
            const value = event.currentTarget.value;
            setSearchName(value);
            setCurrentPage(1);
          }}
        />

        <Select
          placeholder="Status"
          data={STATUS_OPTIONS}
          clearable
        />

        <Select
          placeholder="Society Level"
          data={levelOptions}
          clearable
        />
      </Group>

      {/* Data Table */}
      <Box>
        <DataTable
          data={societyData}
          loading={loading}
          columns={columns as any}
          pageSize={RECORDS_PER_PAGE}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          totalRecords={totalRecords}
        />
      </Box>

      {/* Drawer Form with Fieldsets */}
      <DrawerForm
        key={selectedSociety?.societyId || "new"}
        position="right"
        opened={drawerOpened}
        onClose={() => setDrawerOpened(false)}
        title={editMode ? "Edit Society" : "Add Society"}
        fields={formFields}
        fieldsets={fieldsetConfigs}
        initialValues={
          editMode && selectedSociety
            ? mapSocietyToForm(selectedSociety)
            : {
              blocks: [
                {
                  blockName: "",
                  numberOfFloors: "",
                  totalFlats: "",
                  parkingSlots: "",
                },
              ],
            }
        }
        onSubmit={async (values) => {
          const payload = transformToPayload(values as SocietyFormValues);
          try {
            if (editMode && selectedSociety?.societyId) {
              await updateSociety(selectedSociety.societyId, payload);
            } else {
              await createSociety(payload);
            }

            setDrawerOpened(false);
            fetchSocietyDetails(); // refresh table
          } catch (err) {
            console.error(err);
          }
        }}
        size="xl"
      />
      {/* CONFIRM DELETE MODAL */}
      <CustomModal
        opened={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        icon={IMAGES.QUESTION}
        title="Confirm Deletion"
        subtext="Are you sure you want to delete this user?"
        actionText="Yes, Delete"
        onAction={handleConfirmDelete}
        showCancel
        cancelText="No"
      />
    </Stack>
  );
};

export default NewSociety;

