"use client";
import React, { useCallback, useEffect, useState } from "react";
import { AppBreadcrumbs, CustomModal, PackageCard } from "@/components";
import { RouteConfig } from "@/utils/routeConfig";
import {
  Group,
  Text,
  Button,
  Modal,
  TextInput,
  Select,
  NumberInput,
  Switch,
  Stack,
  Grid,
  Affix,
  useMantineTheme,
  Pagination,
} from "@mantine/core";
import { IconCheck, IconPlus, IconRestore } from "@tabler/icons-react";
import {
  deleteRequest,
  getRequest,
  patchRequest,
  postRequest,
} from "@/service";
import { API_PATH } from "@/utils/apiPath";
import { notifications } from "@mantine/notifications";
import {
  PackageItem,
  PackageApiResponse,
  AddPackagePayload,
} from "@/types/admin/societyManagement/packageSetup/packageSetup";
import { IMAGES } from "@/utils/images";
import {
  BILLING_CYCLE,
  COMMON_MESSAGE,
  PAGE_TITLE,
  RECORDS_PER_PAGE,
  STATUS_OPTIONS,
} from "@/utils/constants";

const BILLING_DURATION_MAP: Record<string, number> = {
  MONTHLY: 30,
  QUARTERLY: 120,
  YEARLY: 365,
};

const INITIAL_FORM = {
  packageCode: "",
  packageName: "",
  billingCycle: "",
  durationDays: 0,
  price: 0,
  allowsTrial: false,
  trialDays: null as number | null,
  status: "",
};

const INITIAL_ERRORS = {
  packageCode: "",
  packageName: "",
  billingCycle: "",
  durationDays: "",
  price: "",
  trialDays: "",
  status: "",
};

const PackageSetup = () => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const [currentPage, setCurrentCPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(INITIAL_FORM);
  const [formErrors, setFormErrors] = useState(INITIAL_ERRORS);
  //   package set up
  const [packages, setPackages] = useState<PackageItem[]>([]);
  //for editing package
  const [editingPackage, setEditingPackage] = useState<PackageItem | null>(
    null,
  );
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<PackageItem | null>(null);

  //reset the form
  const resetForm = () => {
    setForm(INITIAL_FORM);
    setFormErrors(INITIAL_ERRORS);
  };

  // delete package
  const handleDeleteClick = (pkg: PackageItem) => {
    setSelectedItem(pkg);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedItem) return;

    try {
      await deleteRequest(`${API_PATH.GET_PACKAGE}/${selectedItem.id}`);

      notifications.show({
        title: "Success",
        message: COMMON_MESSAGE.PACKAGE_DELETED,
        color: "green",
      });

      setDeleteModalOpen(false);
      setSelectedItem(null);
      fetchPackage();
    } catch (error) {
      console.error(error);
      notifications.show({
        title: "Error",
        message: COMMON_MESSAGE.PACKAGE_FAIL,
        color: "red",
      });
    }
  };

  //editing package
  const handleEditPackage = async (pkg: PackageItem) => {
    try {
      // fetch single package by id
      const response = await getRequest<PackageItem>(
        `${API_PATH.GET_PACKAGE}/${pkg.id}`,
      );
      const data = response?.data; // adjust if nested

      setForm({
        packageCode: data.packageCode,
        packageName: data.packageName,
        billingCycle: data.billingCycle,
        durationDays: data.durationDays,
        price: data.price,
        allowsTrial: data.allowsTrial,
        trialDays: data.trialDays,
        status: String(data.status),
      });

      setEditingPackage(pkg);
      setFormErrors({
        packageCode: "",
        packageName: "",
        billingCycle: "",
        durationDays: "",
        price: "",
        trialDays: "",
        status: "",
      });

      setOpened(true); // open modal
    } catch (err) {
      console.error(err);
      notifications.show({
        title: "Error",
        message: COMMON_MESSAGE.PACKAGE_FAIL,
        color: "red",
      });
    }
  };

  //validation check
  const validateForm = () => {
    const errors: typeof formErrors = {
      packageCode: "",
      packageName: "",
      billingCycle: "",
      durationDays: "",
      price: "",
      trialDays: "",
      status: "",
    };

    if (!form.packageCode.trim())
      errors.packageCode = "Package Code is required";
    if (!form.packageName.trim())
      errors.packageName = "Package Name is required";
    if (!form.billingCycle) errors.billingCycle = "Billing Cycle is required";

    if (
      form.billingCycle === "CUSTOM" &&
      (!form.durationDays || form.durationDays <= 0)
    ) {
      errors.durationDays = "Duration is required for Custom cycle";
    }

    if (!form.price || form.price <= 0)
      errors.price = "Price must be greater than 0";

    if (form.allowsTrial && (!form.trialDays || form.trialDays <= 0)) {
      errors.trialDays = "Trial Days must be greater than 0";
    }

    setFormErrors(errors);

    // Return true if no errors
    return !Object.values(errors).some((e) => e);
  };

  // this is the payload for adding
  const buildPayload = (): AddPackagePayload => {
    const duration =
      form.billingCycle === "CUSTOM"
        ? form.durationDays
        : BILLING_DURATION_MAP[form.billingCycle];

    return {
      packageCode: form.packageCode,
      packageName: form.packageName,
      billingCycle: form.billingCycle,
      durationDays: duration,
      price: Number(form.price),
      allowsTrial: form.allowsTrial,
      trialDays: form.allowsTrial ? form.trialDays : null,
      status: Number(form.status),
    };
  };

  //for adding package
  const handleSavePackage = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      const payload = buildPayload();

      if (editingPackage) {
        // EDIT mode
        await patchRequest(`${API_PATH.GET_PACKAGE}`, {
          ...payload,
          id: editingPackage.id,
        });
        notifications.show({
          title: "Success",
          message: COMMON_MESSAGE.PACKAGE_UPDATED,
          color: "green",
        });
      } else {
        // ADD mode
        await postRequest(API_PATH.GET_PACKAGE, payload);
        notifications.show({
          title: "Success",
          message: COMMON_MESSAGE.PACKAGE_ADDED,
          color: "green",
        });
      }

      setOpened(false);
      setEditingPackage(null);
      fetchPackage();

      resetForm();
    } catch {
      notifications.show({
        title: "Error",
        message: editingPackage
          ? "Failed to update package"
          : "Failed to add package",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchPackage = useCallback(async () => {
    setLoading(true);
    try {
      const payload = {
        search: "",
        page: String(currentPage),
        limit: String(RECORDS_PER_PAGE),
        sortBy: "created_at",
        sortOrder: "DESC",
      };

      const response = await getRequest<PackageApiResponse>(
        API_PATH.GET_PACKAGE,
        payload,
      );
      const responseData = response?.data?.data;
      const totalRecords = response?.data?.total;
      setPackages(responseData);
      if (totalRecords) {
        setTotalPages(Math.ceil(totalRecords / RECORDS_PER_PAGE));
      }
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
  }, [currentPage]);

  useEffect(() => {
    fetchPackage();
  }, [fetchPackage]);

  return (
    <>
      <AppBreadcrumbs
        items={[
          {
            label: PAGE_TITLE.SOCIETY_MANAGEMENT,
            path: RouteConfig.SOCIETY_MGT,
          },
          { label: 'Package', path: ()=> window.history.back() },
          { label: 'Package Setup' },
        ]}
      />

      <Group justify="flex-end" mt="md" mb="sm">
        <Affix position={{ bottom: 40, right: 20 }}>
          <Button
            leftSection={<IconPlus size={30} />}
            color="primary.5"
            onClick={() => {
              setEditingPackage(null);
              resetForm();
              setOpened(true);
            }}
            radius="lg"
          >
            Add Package
          </Button>
        </Affix>
      </Group>

      {/* ---------------- Modal ---------------- */}
      <Modal
        opened={opened}
        onClose={() => {
          setOpened(false);
          resetForm();
        }}
        title={<Text fw={600}>Add Package</Text>}
        size="lg"
        centered
        styles={{
          header: {
            backgroundColor: theme.colors.primary[5],
            color: "white",
            padding: "16px 20px",
            margin: "-1px -1px 16px -1px",
          },
          title: {
            color: "white",
            fontWeight: 600,
          },
          close: {
            color: "white",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.7)",
            },
          },
        }}
      >
        <Stack gap="md">
          {/* Package Info */}
          <Grid align="end" gutter="md">
            <Grid.Col span={{ base: 12, md: 12 }}>
              <TextInput
                label="Package Code"
                placeholder="BASIC89970"
                required
                value={form.packageCode}
                disabled={editingPackage !== null}
                onChange={(e) => {
                  setForm({ ...form, packageCode: e.target.value });
                  setFormErrors((prev) => ({ ...prev, packageCode: "" }));
                }}
                error={formErrors.packageCode}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 12 }}>
              {" "}
              <TextInput
                label="Package Name"
                placeholder="Basic Monthly Package"
                required
                value={form.packageName}
                onChange={(e) => {
                  setForm({ ...form, packageName: e.target.value });
                  setFormErrors((prev) => ({ ...prev, packageName: "" }));
                }}
                error={formErrors.packageName}
              />
            </Grid.Col>
          </Grid>
          <Grid gutter="md">
            {/* Billing Cycle */}
            <Grid.Col
              span={{
                base: 12,
                md: form.billingCycle === "CUSTOM" ? 4 : 6,
              }}
            >
              <Select
                label="Billing Cycle"
                required
                placeholder="Select type of billing cycle"
                data={BILLING_CYCLE}
                value={form.billingCycle}
                clearable
                onChange={(value) => {
                  if (!value) return;
                  setForm((prev) => ({
                    ...prev,
                    billingCycle: value,
                    durationDays:
                      value === "CUSTOM"
                        ? prev.durationDays
                        : BILLING_DURATION_MAP[value],
                  }));
                  setFormErrors((prev) => ({ ...prev, billingCycle: "" }));
                }}
                error={formErrors.billingCycle}
              />
            </Grid.Col>

            {/* Duration - Only for CUSTOM */}
            {form.billingCycle === "CUSTOM" && (
              <Grid.Col
                span={{
                  base: 12,
                  md: 4,
                }}
              >
                <NumberInput
                  label="Duration (Days)"
                  required
                  min={1}
                  value={form.durationDays}
                  onChange={(value) => {
                    setForm({ ...form, durationDays: Number(value) });
                    setFormErrors((prev) => ({ ...prev, durationDays: "" }));
                  }}
                  error={formErrors.durationDays}
                />
              </Grid.Col>
            )}

            {/* Price */}
            <Grid.Col
              span={{
                base: 12,
                md: form.billingCycle === "CUSTOM" ? 4 : 6,
              }}
            >
              <NumberInput
                label="Price (₹)"
                placeholder="999.99"
                required
                min={0}
                decimalScale={2}
                value={form.price}
                onChange={(value) => {
                  setForm({ ...form, price: Number(value) });
                  setFormErrors((prev) => ({ ...prev, price: "" }));
                }}
                error={formErrors.price}
              />
            </Grid.Col>
          </Grid>
          <Grid align="end" gutter="md">
            <Grid.Col span={{ base: 12, md: 3 }} mb="xs">
              {" "}
              {/* Trial Section */}
              <Switch
                label="Allow Trial"
                checked={form.allowsTrial}
                color="primary.5"
                size="md"
                onChange={(e) => {
                  setForm({
                    ...form,
                    allowsTrial: e.currentTarget.checked,
                    trialDays: e.currentTarget.checked
                      ? form.trialDays || 1
                      : null,
                  });
                  if (e.currentTarget.checked) {
                    setFormErrors((prev) => ({ ...prev, trialDays: "" }));
                  }
                }}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 5 }}>
              <NumberInput
                label="Trial Days"
                placeholder="Enter number of days"
                min={1}
                value={form.trialDays || undefined} // bind to form
                onChange={(value) => {
                  setForm({ ...form, trialDays: Number(value) });
                  setFormErrors((prev) => ({ ...prev, trialDays: "" }));
                }}
                disabled={!form.allowsTrial} // enable/disable based on switch
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 4 }}>
              <Select
                label="Status"
                required
                placeholder="Select status"
                data={STATUS_OPTIONS}
                clearable
                value={form.status}
                onChange={(value) => {
                  if (!value) return;
                  setForm((prev) => ({
                    ...prev,
                    status: value,
                  }));
                  setFormErrors((prev) => ({
                    ...prev,
                    status: "",
                  }));
                }}
                error={formErrors.status}
              />
            </Grid.Col>
          </Grid>

          {/* Footer Buttons */}
          <Group justify="flex-end" mt="md">
            <Button
              variant="outline"
              color="primary.5"
              onClick={() => {
                // Close modal
                setOpened(false);

                // Reset form values
                resetForm();
              }}
              leftSection={<IconRestore size={16} />}
            >
              Cancel
            </Button>

            <Button
              color="primary.5"
              leftSection={<IconCheck size={16} />}
              loading={loading}
              onClick={handleSavePackage}
            >
              Save Package
            </Button>
          </Group>
        </Stack>
      </Modal>

      {/* Cards Grid */}
      <Grid gutter="md">
        {packages.map((pkg, index) => (
          <Grid.Col span={{ base: 12, sm: 6, md: 4 }} key={pkg.id}>
            <PackageCard
              data={pkg}
              index={index}
              onEdit={() => handleEditPackage(pkg)}
              onDelete={() => handleDeleteClick(pkg)}
            />
          </Grid.Col>
        ))}
      </Grid>

      {totalPages > 1 && (
        <Group justify="end" mt="sm">
          <Pagination
            value={currentPage}
            onChange={setCurrentCPage}
            total={totalPages}
            color="primary.5"
          />
        </Group>
      )}
      <CustomModal
        opened={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        icon={IMAGES.QUESTION}
        title="Confirm Deletion"
        subtext="Are you sure you want to delete this package?"
        actionText="Yes, Delete"
        onAction={handleConfirmDelete}
        showCancel
        cancelText="No"
      />
    </>
  );
};

export default PackageSetup;
