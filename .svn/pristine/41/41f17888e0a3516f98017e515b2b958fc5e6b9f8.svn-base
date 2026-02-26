"use client";

import { CustomModal } from "@/components";
import { Box, Flex, Title } from "@mantine/core";
import { useState } from "react";
import { AppHeader } from "../../components/Header";
import { IMAGES } from "@/utils/images";
import { useLogout } from "@/hooks/useLogout";
import { FOOTER_TEXT } from "@/utils/constants";

export default function VisitorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { logout } = useLogout();
  // const pathname = usePathname();

  // const formatSegment = (segment: string) =>
  //   segment.charAt(0).toUpperCase() + segment.slice(1);

  // const segments = pathname.split("/").filter(Boolean);

  // const crumbs = segments.map((seg, i) => ({
  //   title: formatSegment(seg.replace(/-/g, " ")),
  //   href: "/" + segments.slice(0, i + 1).join("/"),
  // }));

  const [modal, setModal] = useState({
    open: false,
    title: "",
    message: "",
    type: "",
    onAction: () => {},
  });

  return (
    <Flex h="100vh" bg="var(--background)">
      {/* Sidebar */}

      <Flex direction="column" flex={1} h="100%">
        <AppHeader
          onLogout={() =>
            setModal({
              open: true,
              title: "Confirm Logout",
              message: "Are you sure you want to logout?",
              type: "logout",
              onAction: () => {
                logout();
                setModal({ ...modal, open: false });
              },
            })
          }
        />
        <Box
          flex={1}
          m="lg"
          bg="var(--body-bg)"
          p="md"
          style={{
            boxShadow: "2.5px 5px 5px #ccc",
            overflowY: "auto",
            overflowX: "hidden",
            minHeight: 0,
          }}
        >
          {/* Page Content */}
          <Box>{children}</Box>
        </Box>

        {/* Footer */}
        <Flex
          justify="center"
          align="center"
          h={40}
          style={{
            borderTop: "1px solid #eee",
            flexShrink: 1,
          }}
        >
          <Title order={6}>{FOOTER_TEXT}</Title>
        </Flex>
      </Flex>

      <CustomModal
        opened={modal.open}
        onClose={() => setModal({ ...modal, open: false })}
        icon={IMAGES.QUESTION}
        title={modal.title}
        subtext={modal.message}
        size="sm"
        onAction={modal.onAction}
        showCancel={modal.type === "logout"}
        cancelText="Cancel"
      />
    </Flex>
  );
}
