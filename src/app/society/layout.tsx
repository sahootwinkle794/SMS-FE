"use client";

import {AdminLayout} from "@/layouts";

export default function SocietySectionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayout>{children}</AdminLayout>;
}
