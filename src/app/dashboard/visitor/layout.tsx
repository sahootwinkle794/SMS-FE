"use client";

import {VisitorLayout} from "@/layouts";

export default function AdminSectionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <VisitorLayout>{children}</VisitorLayout>;
}
