"use client";

import { AppBreadcrumbs } from "@/components";
import { RouteConfig } from "@/utils/routeConfig";

const packageToServicesMapping = () => {
  return (
    <AppBreadcrumbs
      items={[
        { label: "Society Management", path: RouteConfig.SOCIETY_MGT },
        {
          label: "Package Mapping",
          path: () => window.history.back(),
        },
        { label: "Package to Services Mapping" },
      ]}
    />
  );
};

export default packageToServicesMapping;
