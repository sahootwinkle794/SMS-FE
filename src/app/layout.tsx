import type { Metadata } from "next";
import "./globals.css";
import "@mantine/carousel/styles.css";
import Providers from "./providers";
import AuthHydrator from "@/AuthHydrator";

export const metadata: Metadata = {
  title: {
    default: "Society Management System",
    template: "%s | Society Management System",
  },
  description: "Official Society Management System platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthHydrator>
          <Providers>{children}</Providers>
        </AuthHydrator>
      </body>
    </html>
  );
}
