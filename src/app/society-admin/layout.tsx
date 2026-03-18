"use client";

import {SocietyAdminLayout} from "@/layouts";

export default function SocietySectionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SocietyAdminLayout>{children}</SocietyAdminLayout>;
}
