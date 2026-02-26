"use client";

import { AppBreadcrumbs, CommonCategory } from "@/components";
import { DrawerForm } from "@/components";
import { Field } from "@/components/DrawerForm/DrawerForm";
import {Box,Container,Button,useMantineTheme,Paper,SegmentedControl,Stack, Group,Skeleton,Text,Center,
} from "@mantine/core";
import { useState, useMemo, useEffect } from "react";
import {IconPlus,IconX,
} from "@tabler/icons-react";
import { RouteConfig } from "@/utils/routeConfig";
import { COMMON_MESSAGE, STATUS_OPTIONS } from "@/utils/constants";
import { IconLayersOff } from "@tabler/icons-react";
import { API_PATH } from "@/utils/apiPath";
import { getRequest, postRequest } from "@/service";
import {
  Amenity,AmenityApiResponse,AmenityCategory,AmenityTier,ApiResponse,CatAmenityDetail,CatAmenityMapApiResponse,TierCatApiResponse,TierCategory,
} from "@/types/admin/societyManagement/facandame/amenitiesMapping/amenitiesMapping";
import { notifications } from "@mantine/notifications";

const AmenityMapping = () => {
  const [activeTab, setActiveTab] = useState("");
  const [drawerOpened, setDrawerOpened] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [drawerInitialValues, setDrawerInitialValues] = useState<Record<string, any> | undefined>(undefined);
  const [amenityTiers, setAmenityTiers] = useState<AmenityTier[]>([]);
  const [amenityCategories, setAmenityCategories] = useState<AmenityCategory[]>([],);
  const [categoryAmenityMap, setCategoryAmenityMap] = useState<Record<string, CatAmenityDetail[]>>({});
  const [tierCategories, setTierCategories] = useState<TierCategory[]>([]);
  const [amenities, setAmenities] = useState<Amenity[]>([]);
  const [tiersLoading, setTiersLoading] = useState(true);
  const [tierCategoriesLoading, setTierCategoriesLoading] = useState(false);
  const theme = useMantineTheme();

  const notifyError = (msg: string) =>
    notifications.show({
      title: "Error",
      message: msg,
      color: "red",
      icon: <IconX size={16} />,
    });

  const tabData = useMemo(() => {
    return amenityTiers
      .filter((tier) => tier.status === 1)
      .map((tier) => ({
        value: tier.genCode.toLowerCase(),
        label: tier.genName,
      }));
  }, [amenityTiers]);

  // Derive CommonCategory from API response
  const currentCategories = useMemo(() => {
    return tierCategories.flatMap((tc) =>
      tc.categoryDetails
        .filter((cd) => cd.status === 1)
        .map((cd) => ({
          title: cd.categoryName || "Untitled Category",
          description: tc.tierName,
          amenities: (categoryAmenityMap[cd.categoryCode] ?? []).map((a) => a.amenityName),
          amenityStatuses: Object.fromEntries(
            (categoryAmenityMap[cd.categoryCode] ?? []).map((a) => [a.amenityName, a.status === 1])
          ),
          icon: undefined,
          id: cd.id,
          categoryCode: cd.categoryCode,
          tierCode: tc.tierCode,
          status: cd.status,
        })),
    );
  }, [tierCategories, categoryAmenityMap]);

  const formFields: Field[] = [
    {
      name: "categoryCode",
      label: "Category",
      type: "select",
      placeholder: "Select category",
      required: true,
      colSpan: 6,
      options: amenityCategories
        .filter((cat) => cat.status === 1)
        .map((cat) => ({
          value: cat.genCode,
          label: cat.genName,
        })),
      isDisabled: editMode,
    },
    // {
    //   name: "status",
    //   label: "Status",
    //   type: "select",
    //   placeholder: "Select status",
    //   required: true,
    //   colSpan: 6,
    //   options: STATUS_OPTIONS.map((o) => ({ label: o.label, value: o.value })),
    // },
    // --- Multi-entry fieldset fields ---
    {
      name: "amenityId",
      label: "Amenity",
      type: "select",
      placeholder: "Select amenity",
      required: true,
      colSpan: 3,
      fieldset: "amenityRows",
      dedupSelect: true,
      options: amenities.map((a) => ({
        value: a.amenityId,
        label: a.amenityName,
      })),
    },
    {
      name: "displayOrder",
      label: "Display Order",
      type: "number",
      placeholder: "e.g. 1",
      required: false,
      colSpan: 4,
      fieldset: "amenityRows",
    },
    {
      name: "amenityStatus",
      label: "Status",
      type: "select",
      placeholder: "Status",
      required: true,
      colSpan: 3,
      fieldset: "amenityRows",
      options: [
        { value: "active", label: "Active" },
        { value: "inactive", label: "Inactive" },
      ],
    },
  ];

  const formFieldsets = [
    {
      id: "amenityRows",
      legend: "Amenity Items",
      description: "Add one or more amenities to map under this tier.",
      isMultipleEntry: true,
      multipleEntryKey: "amenityRows",
    },
  ];

  //=================== Form Submit Handler ===================

  const handleFormSubmit = async (formData: Record<string, any>) => {
    try {
      const amenityRows: {
        amenityId: string;
        displayOrder: string;
        amenityStatus: string;
      }[] = formData.amenityRows || [];

      const payload = {
        categoryCode: formData.categoryCode,
        amenityDetails: amenityRows.map((row) => ({
          amenityId: row.amenityId,
          displayOrder: Number(row.displayOrder) || 0,
          status: row.amenityStatus === "active" ? 1 : 0,
        })),
      };

      await postRequest(API_PATH.CATEGORY_AMENITY_MAPPING, payload);

      notifications.show({
        title: COMMON_MESSAGE.SUCCESSFUL,
        message: editMode
          ? COMMON_MESSAGE.AMENITY_MAPPING_UPDATE
          : COMMON_MESSAGE.AMENITY_MAPPING_ADDED, 
        color: "green",
      });
      await getCategoryAmenityMap(formData.categoryCode, amenities);
    } catch (error) {
      notifyError(COMMON_MESSAGE.AMENITY_MAPPING_FAIL);
      console.error(COMMON_MESSAGE.AMENITY_MAPPING_FAIL, error);
      return;
    }

    setDrawerOpened(false);
    setEditMode(false);
    setEditingCategory(null);
    setDrawerInitialValues(undefined);
  };

  //=================== API Calls ===================

  const fetchAmenityDetailsForCategory = async (
    categoryCode: string,
    amenitiesList: Amenity[],
  ): Promise<CatAmenityDetail[]> => {
    try {
      const res = (await getRequest(
        `${API_PATH.CATEGORY_AMENITY_MAPPING}?CategoryCode=${categoryCode}`,
      )) as CatAmenityMapApiResponse;

      const items = res?.data?.data || [];

      return items.flatMap((item) =>
        item.amenityDetails
          .filter((a) => a.status === 1 || a.status === 0)
          .map((a) => {
            const matched = amenitiesList.find(
              (am) => am.amenityCode === a.amenityCode,
            );
            return {
              amenityId: matched?.amenityId ?? "",
              amenityName: a.amenityName,
              displayOrder: a.displayOrder,
              status: a.status,
            };
          }),
      );
    } catch (error) {
      console.error(COMMON_MESSAGE.AMENITY_FETCH_FAIL, error);
      return [];
    }
  };

  const getCategoryAmenityMap = async (
    categoryCode: string,
    amenitiesList: Amenity[] = amenities,
  ) => {
    try {
      const details = await fetchAmenityDetailsForCategory(
        categoryCode,
        amenitiesList,
      );
      setCategoryAmenityMap((prev) => ({ ...prev, [categoryCode]: details }));
    } catch (error) {
      notifyError(COMMON_MESSAGE.DATA_FETCH_FAIL);
      console.error(COMMON_MESSAGE.DATA_FETCH_FAIL, error);
    }
  };

  const handleEdit = async (category: any, tabValue: string) => {
    console.log('On edit I get this', category, tabValue)
    setEditingCategory({ ...category, tabValue });
    setEditMode(true);

    const details = await fetchAmenityDetailsForCategory(
      category.categoryCode,
      amenities,
    );
    setCategoryAmenityMap((prev) => ({
      ...prev,
      [category.categoryCode]: details,
    }));

    const amenityRows =
      details.length > 0
        ? details.map((a) => ({
            amenityId: a.amenityId,
            displayOrder: String(a.displayOrder),
            amenityStatus: a.status === 1 ? "active" : "inactive",
          }))
        : [{ amenityId: "", displayOrder: "", amenityStatus: "active" }];

    setDrawerInitialValues({
      categoryCode: category.categoryCode || "",
      status: category.status === 0 ? "inactive" : "active",
      amenityRows,
    });

    setDrawerOpened(true);
  };

  const handleAddNew = () => {
    setEditMode(false);
    setEditingCategory(null);
    setDrawerInitialValues(undefined);
    setDrawerOpened(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpened(false);
    setEditMode(false);
    setEditingCategory(null);
    setDrawerInitialValues(undefined);
  };

  const handleSave = () => {
    console.log("Saving amenities configuration...");
  };

  const handleReset = () => {
    console.log("Resetting to default configuration...");
  };

  //=================== Initial Data Fetch ===================

  useEffect(() => {
    handleTierFetch();
    handleCategoryFetch();
    getAmenities();
  }, []);

  useEffect(() => {
    if (!activeTab) return;
    getTierCategories(activeTab.toUpperCase());
  }, [activeTab]);


  useEffect(() => {
    if (!tierCategories.length) return;
    const uniqueCategoryCodes = [
      ...new Set(
        tierCategories.flatMap((tc) =>
          tc.categoryDetails
            .filter((cd) => cd.status === 1)
            .map((cd) => cd.categoryCode),
        ),
      ),
    ];
    uniqueCategoryCodes.forEach((code) =>
      getCategoryAmenityMap(code, amenities),
    );
  }, [tierCategories]);

//================================================================

//=================== API Calls ===================

  const getTierCategories = async (tierCode: string) => {
    setTierCategoriesLoading(true);
    try {
      const res = (await getRequest(
        `${API_PATH.GET_TIER_CAT_MAPPING}?tierCode=${tierCode}`,
      )) as TierCatApiResponse;
      const data: TierCategory[] = res?.data?.data || [];
      setTierCategories(data);
      return data;
    } catch (error) {
      notifyError(COMMON_MESSAGE.DATA_FETCH_FAIL);
      console.error("Error fetching tier categories:", error);
      setTierCategories([]);
      return [];
    } finally {
      setTierCategoriesLoading(false);
    }
  };

  const handleTierFetch = async () => {
    setTiersLoading(true);
    try {
      const res = (await getRequest(
        `${API_PATH.GET_GEN_CODE}?groupCode=AMENITY_TIER`,
      )) as ApiResponse<AmenityTier>;
      const tiers: AmenityTier[] = res?.data?.data ?? [];
      setAmenityTiers(tiers);
      const firstActive = tiers.find((t) => t.status === 1);
      if (firstActive) {
        setActiveTab(firstActive.genCode.toLowerCase());
      }
    } catch (error) {
      notifyError(COMMON_MESSAGE.DATA_FETCH_FAIL);
      console.error("Error fetching tier data:", error);
    } finally {
      setTiersLoading(false);
    }
  };

  const getAmenities = async () => {
    try {
      const res = (await getRequest(
        API_PATH.GET_AMENITY,
      )) as AmenityApiResponse;
            console.log('amenityData', res?.data?.data)
      const data: Amenity[] = (res?.data?.data || []).filter((a) => a.status === 1);
      setAmenities(data);
      return data;
    } catch (error) {
      notifyError(COMMON_MESSAGE.DATA_FETCH_FAIL);
      console.error("Error fetching amenities:", error);
      return [];
    }
  };

  const handleCategoryFetch = async () => {
    try {
      const res = (await getRequest(
        `${API_PATH.GET_GEN_CODE}?groupCode=AMENITY_CATEGORY`,
      )) as ApiResponse<AmenityCategory>;
      const categories: AmenityCategory[] = res?.data?.data ?? [];
      setAmenityCategories(categories);
    } catch (error) {
      notifyError(COMMON_MESSAGE.DATA_FETCH_FAIL);
      console.error("Error fetching amenity categories:", error);
    }
  };

//==================================================

  return (
    <>
      <AppBreadcrumbs
        items={[
          { label: "Society Management", path: RouteConfig.SOCIETY_MGT },
          {
            label: "Facilities & Amenities",
            path: () => window.history.back(),
          },
          { label: "Amenity Mapping" },
        ]}
      />
      <Container size="xl" pt="md">
        {/* Tab Navigation */}
        <Paper
          radius="lg"
          p="md"
          mb="lg"
          bg="white"
          shadow="md"
          bd={`1px solid ${theme.colors.primary[1]}`}
        >
          <SegmentedControl
            value={activeTab}
            onChange={setActiveTab}
            data={tabData}
            fullWidth
            radius="md"
            size="md"
            color="primary.5"
            bd={`1px solid ${theme.colors.primary[1]}`}
            disabled={tiersLoading}
          />
        </Paper>

        {/* Save and Reset Buttons */}
        {/* <Group justify="flex-end" mb="lg">
          <Button
            variant="outline"
            color="gray"
            leftSection={<IconRotateClockwise size={18} />}
            onClick={handleReset}
          >
            Reset
          </Button>
          <Button
            color="primary.5"
            leftSection={<IconDeviceFloppy size={18} />}
            onClick={handleSave}
          >
            Save Changes
          </Button>
        </Group> */}

        {/* Category Cards */}
        <Box>
          <Stack gap="lg">
            {tierCategoriesLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} height={120} radius="lg" />
              ))
            ) : currentCategories.length === 0 ? (
              <Paper
                radius="lg"
                p="xl"
                bg="white"
                shadow="sm"
                bd={`1px dashed ${theme.colors.gray[3]}`}
              >
                <Center py="xl">
                  <Stack align="center" gap="sm">
                    <IconLayersOff
                      size={48}
                      color={theme.colors.gray[4]}
                      strokeWidth={1.5}
                    />
                    <Text fw={600} size="lg" c="gray.6">
                      No Categories Mapped
                    </Text>
                    <Text size="sm" c="gray.4" ta="center" maw={340}>
                      There are no amenity categories mapped to this tier yet.
                      Click <strong>Map Amenities</strong> to get started.
                    </Text>
                  </Stack>
                </Center>
              </Paper>
            ) : (
              currentCategories.map((category, index) => (
                <CommonCategory
                  key={`${activeTab}-${category.categoryCode}-${index}`}
                  title={category.title}
                  description={category.description}
                  amenities={category.amenities}
                  amenityStatuses={category.amenityStatuses}
                  onEdit={() => handleEdit(category, activeTab)}
                  isChecked={category.status === 1}
                />
              ))
            )}
          </Stack>
        </Box>

        {/* Floating Action Button */}
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
          onClick={handleAddNew}
        >
          Map Amenities
        </Button>

        {/* Drawer Form */}
        <DrawerForm
          opened={drawerOpened}
          onClose={handleCloseDrawer}
          title={editMode ? "Edit Amenity Mapping" : "Map Amenities"}
          fields={formFields}
          fieldsets={formFieldsets}
          onSubmit={handleFormSubmit}
          initialValues={drawerInitialValues}
          size="xl"
        />
      </Container>
    </>
  );
};

export default AmenityMapping;
