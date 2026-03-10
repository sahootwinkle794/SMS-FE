import { Icon } from "@tabler/icons-react";

export interface MenuItem {
  icon: Icon;
  label: string;
  badge?: string;
  isAccess?: boolean;
  section?: "amenities" | "services";
}