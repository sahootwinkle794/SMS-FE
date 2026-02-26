"use client";

import { ErrorFallback } from "@/components";
import { Loader, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import { ErrorInfo, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ibmPlex } from "@/app/font";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MantineProvider
      defaultColorScheme="light"
      theme={{
        fontFamily: "var(--font-ibm-plex), sans-serif",
        headings: {
          fontFamily: "var(--font-ibm-plex), sans-serif",
          fontWeight: "600",
        },
        colors: {
          danger: [
            "#ffe5e5",
            "#ffb3b3",
            "#ff8080",
            "#ff4d4d",
            "#ff1a1a",
            "#E51619",
            "#b31212",
            "#800d0d",
            "#4d0707",
            "#1a0202",
          ],
          primary: [
            "#FFE6EA",
            "#FFCFD5",
            "#FFB7C0",
            "#FF9FAB",
            "#FF8797",
            "#FF3951",
            "#E63348",
            "#CC2D3F",
            "#B32736",
            "#8b0010",
          ],
          secondary: [
            "#F4F4F4", // 0 - lightest
            "#E9E9E9", // 1
            "#DFDFDF", // 2
            "#D4D4D4", // 3
            "#C9C9C9", // 4
            "#BEBEBE", // 5 - base
            "#A8A8A8", // 6
            "#919191", // 7
            "#7A7A7A", // 8
            "#636363", // 9 - darkest
          ],
          success: [
            "#E8F5E4",
            "#D4EBD0",
            "#BEE1BA",
            "#A7D6A3",
            "#8DCB8A",
            "#4F8E3A",
            "#457E33",
            "#3A6E2C",
            "#2F5C24",
            "#214219",
          ],
        },
      }}
    >
      <div className={ibmPlex.variable}>
        <ModalsProvider>
          <Suspense fallback={<Loader variant="dots" size="xl" />}>
            <ErrorBoundary
              FallbackComponent={ErrorFallback}
              onError={(error: unknown, info: ErrorInfo) => {
                if (error instanceof Error) {
                  console.error(error.message, info);
                } else {
                  console.error("Unknown error:", error, info);
                }
              }}
            >
              {children}
            </ErrorBoundary>
          </Suspense>
          <Notifications position="top-right" />
        </ModalsProvider>
      </div>
    </MantineProvider>
  );
}
