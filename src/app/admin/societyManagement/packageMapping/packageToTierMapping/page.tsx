"use client";

import {
  Group,
  Text,
  Badge,
  Button,
  Select,
  Stack,
  Modal,
} from "@mantine/core";
import { DataTable, Column } from "@/components/DataTable";
import { AppBreadcrumbs } from "@/components";
import { getRequest, postRequest } from "@/service";
import { useMantineTheme } from "@mantine/core";
import { API_PATH } from "@/utils/apiPath";
import { RouteConfig } from "@/utils/routeConfig";
import { notifications } from "@mantine/notifications";
import { IconX, IconPlus } from "@tabler/icons-react";
import { useCallback, useEffect, useState } from "react";

// ---- Types ----
interface TierDetail {
  id: string;
  tierCode: string;
  tierName: string | null;
  status: number;
}

interface PackageTierMapping {
  packageCode: string;
  packageName: string | null;
  billingCycle: string;
  price: string;
  allowsTrial: boolean;
  trialDays: number | null;
  tierDetails: TierDetail[];
}

interface PackageTierMappingResponse {
  data: PackageTierMapping[];
}

interface FormState {
  packageId: string | null;
  tierCode: string | null;
  status: string | null;
}

interface GenCodeItem {
  genCode: string;
  genName: string;
  status: number;
}

interface PackageItem {
  id: string;
  packageCode: string;
  packageName: string;
  billingCycle: string;
  durationDays: number;
  price: string;
  allowsTrial: boolean;
  trialDays: number | null;
  status: number;
}

interface PackageApiResponse {
  data: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    data: PackageItem[];
  };
}

interface GenApiResponse<T> {
  data: {
    data: T[];
    message: string;
  };
}
// ---------------

const STATUS_OPTIONS = [
  { value: "1", label: "Active" },
  { value: "2", label: "Inactive" },
];

const INITIAL_FORM: FormState = {
  packageId: null,
  tierCode: null,
  status: null,
};

const PackageToTierMapping = () => {
  const [mappings, setMappings] = useState<PackageTierMapping[]>([]);
  const [loading, setLoading] = useState(false);

  const [opened, setOpened] = useState(false);
  const [formData, setFormData] = useState<FormState>(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [packageOptions, setPackageOptions] = useState<
    { value: string; label: string }[]
  >([]);

  const [tierOptions, setTierOptions] = useState<
    { value: string; label: string }[]
  >([]);

  const theme = useMantineTheme();

  const notifyError = (msg: string) =>
    notifications.show({
      title: "Error",
      message: msg,
      color: "red",
      icon: <IconX size={16} />,
    });

  const notifySuccess = (msg: string) =>
    notifications.show({
      title: "Success",
      message: msg,
      color: "green",
    });

  // ---- Fetch Mappings ----
  const fetchPackageTierMappings = useCallback(async () => {
    setLoading(true);
    try {
      const res = (await getRequest(
        API_PATH.PACKAGE_TIER_MAPPING,
      )) as PackageTierMappingResponse;
      setMappings(res?.data ?? []);
    } catch {
      notifyError("Failed to fetch package to tier mappings.");
    } finally {
      setLoading(false);
    }
  }, []);

  // ---- Fetch Packages ----
  const fetchPackages = useCallback(async () => {
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
      const list = response?.data?.data ?? [];
      setPackageOptions(
        list
          .filter((p) => p.status === 1)
          .map((p) => ({ value: p.id, label: p.packageName })),
      );
    } catch (err) {
      console.error(err);
      notifyError("Failed to load packages.");
    }
  }, []);

  // ---- Fetch Tiers ----
  const fetchTiers = useCallback(async () => {
    try {
      const res = (await getRequest(
        `${API_PATH.GET_GEN_CODE}?groupCode=AMENITY_TIER`,
      )) as GenApiResponse<GenCodeItem>;
      const list = res?.data?.data ?? [];
      setTierOptions(
        list
          .filter((t) => t.status === 1)
          .map((t) => ({ value: t.genCode, label: t.genName })),
      );
    } catch (error) {
      console.error("Error fetching tiers:", error);
    }
  }, []);

  useEffect(() => {
    fetchPackageTierMappings();
    fetchPackages();
    fetchTiers();
  }, [fetchPackageTierMappings, fetchPackages, fetchTiers]);

  // ---- Handle Submit ----
  const handleSubmit = async () => {
    if (!formData.packageId || !formData.tierCode || !formData.status) {
      notifyError("Please fill all fields.");
      return;
    }

    setSubmitting(true);
    try {
      await postRequest(API_PATH.PACKAGE_TIER_MAPPING, {
        packageId: formData.packageId,
        tierCode: formData.tierCode,
        tierPrice: "1999.00",
        isIncluded: true,
        status: Number(formData.status),
      });
      notifySuccess("Mapping added successfully.");
      setOpened(false);
      setFormData(INITIAL_FORM);
      fetchPackageTierMappings();
    } catch {
      notifyError("Failed to add mapping.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    setOpened(false);
    setFormData(INITIAL_FORM);
  };

  // ---- Columns ----
  const columns: Column<PackageTierMapping>[] = [
    {
      header: "S.No",
      width: "8%",
      align: "center",
      render: (_value, _row, index) => index + 1,
    },
    {
      header: "Package",
      width: "30%",
      render: (_value, row) => (
        <div>
          <Text size="sm" fw={600}>
            {row.packageName ?? "—"}
          </Text>
          <Text size="xs" c="dimmed">
            {row.packageCode}
          </Text>
          <Text size="xs" c="dimmed">
            {row.billingCycle} · ₹{row.price}
          </Text>
        </div>
      ),
    },
    {
      header: "Tier Details",
      width: "50%",
      render: (_value, row) => (
        <Group gap="xs" wrap="wrap">
          {row.tierDetails?.length > 0 ? (
            row.tierDetails
              .filter((tier) => tier.status !== 2)
              .map((tier) => (
                <Badge
                  key={tier.id}
                  size="sm"
                  radius="xs"
                  variant="light"
                  styles={{
                    root: {
                      backgroundColor:
                        tier.status === 1
                          ? theme.colors.success[1]
                          : theme.colors.primary[1],
                      color:
                        tier.status === 1
                          ? theme.colors.success[5]
                          : theme.colors.primary[5],
                    },
                  }}
                >
                  {tier.tierName ?? tier.tierCode}
                </Badge>
              ))
          ) : (
            <Text size="sm" c="dimmed">
              No Tiers
            </Text>
          )}
        </Group>
      ),
    },
  ];

  const filteredMappings = mappings.filter((row) =>
    row.tierDetails.some((tier) => tier.status !== 2),
  );

  return (
    <>
      <AppBreadcrumbs
        items={[
          { label: "Society Management", path: RouteConfig.SOCIETY_MGT },
          {
            label: "Package Mapping",
            path: () => window.history.back(),
          },
          { label: "Package to Tier Mapping" },
        ]}
      />

      <Group justify="space-between" mt="md" mb="sm">
        <Text fw={600} size="lg">
          Package to Tier Mapping
        </Text>
      </Group>

      <DataTable
        data={filteredMappings}
        columns={columns}
        loading={loading}
        pageSize={10}
        totalRecords={filteredMappings.length}
      />

      {/* Floating Add Button */}
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
        onClick={() => setOpened(true)}
      >
        Add Mapping
      </Button>

      {/* Add Modal */}
      <Modal
        opened={opened}
        onClose={handleClose}
        title={
          <Text fw={600} size="md">
            Add Package to Tier Mapping
          </Text>
        }
        centered
        size="md"
      >
        <Stack gap="md">
          <Select
            label="Package"
            placeholder="Select Package"
            data={packageOptions}
            value={formData.packageId}
            onChange={(val) =>
              setFormData((prev) => ({ ...prev, packageId: val }))
            }
            searchable
            clearable
            required
          />

          <Select
            label="Tier"
            placeholder="Select Tier"
            data={tierOptions}
            value={formData.tierCode}
            onChange={(val) =>
              setFormData((prev) => ({ ...prev, tierCode: val }))
            }
            searchable
            clearable
            required
          />

          <Select
            label="Status"
            placeholder="Select Status"
            data={STATUS_OPTIONS}
            value={formData.status}
            onChange={(val) =>
              setFormData((prev) => ({ ...prev, status: val }))
            }
            required
          />

          <Group justify="flex-end" mt="sm">
            <Button variant="default" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              color="primary.5"
              onClick={handleSubmit}
              loading={submitting}
            >
              Submit
            </Button>
          </Group>
        </Stack>
      </Modal>
    </>
  );
};

export default PackageToTierMapping;
