"use client";

import { useState } from "react";
import { AppBreadcrumbs, CommonCategory, DrawerForm } from "@/components";
import { RouteConfig } from "@/utils/routeConfig";
import { IconPlus } from "@tabler/icons-react";
import { PAGE_TITLE, SERVICES_CATEGORIES, STATUS_OPTIONS } from "@/utils/constants";
import {
  Stack,
  Affix,
  Button,
} from "@mantine/core";

const ServiceCategoryMapping = () => {

  const [drawerOpen, setDrawerOpen] = useState(false);
  const SERVICE_FORM_FIELDS = [
    {
      name: "category",
      label: "Service Category",
      type: "select",
      required: true,
      options: SERVICES_CATEGORIES.map((c) => ({
        value: c.title,
        label: c.title,
      })),
    },
    {
      name: "serviceName",
      label: "Service Name",
      type: "text",
      required: true,
      placeholder: "e.g. CCTV Monitoring",
    },
    {
      name: "description",
      label: "Service Description",
      type: "textarea",
      placeholder: "Optional description",
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      required: true,
      options: STATUS_OPTIONS.map((o) => ({ label: o.label, value: o.value })),
    },
  ];

  const handleAddService = (data: Record<string, any>) => {
    console.log("New service payload:", data);
  };
  return (
    <>
      <AppBreadcrumbs
        items={[
          { label: PAGE_TITLE.SOCIETY_MANAGEMENT, path: RouteConfig.SOCIETY_MGT },
          { label: PAGE_TITLE.SERVICE_CONFIGURATION, path: () => window.history.back(), },
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
          onClick={() => setDrawerOpen(true)}
        >
          Add services
        </Button>
      </Affix>

      <Stack gap="lg">
        {SERVICES_CATEGORIES.map((category) => (
          <CommonCategory
            key={category.title}
            title={category.title}
            description={category.description}
            amenities={category.amenities}
            icon={category.icon}
            onEdit={() => { }}
          />
        ))}
      </Stack>

      <DrawerForm
        opened={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title="Add New Service"
        fields={SERVICE_FORM_FIELDS as any}
        onSubmit={handleAddService}
        size="md"
      />

    </>
  )
}

export default ServiceCategoryMapping