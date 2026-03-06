import { useState } from "react";
import {
  Badge, Box, Card, Center, Group, ScrollArea,
  SimpleGrid, Stack, Text, UnstyledButton,
} from "@mantine/core";
import { IconChevronRight, IconLock } from "@tabler/icons-react";
import { CORAL, CORAL_LIGHT, softCard } from "@/utils/constants";
import { MenuItem } from "./MenuSection.types";
import { CustomModal } from "@/components/CustomModal";

// ─── Types ────────────────────────────────────────────────────────────────────
// MenuItem lives in MenuSection.types.ts — add isAccess there:
//
//   export interface MenuItem {
//     icon: Icon;
//     label: string;
//     badge?: string;
//     isAccess?: boolean;  // undefined = true (fully accessible)
//   }

// ─── MenuSection ──────────────────────────────────────────────────────────────

interface MenuSectionProps {
  items: MenuItem[];
  title?: string;
  onSeeAll?: () => void;
}

export function MenuSection({
  items,
  title = "Quick Actions",
  onSeeAll,
}: MenuSectionProps) {
  const [upgradeOpen, setUpgradeOpen] = useState(false);

  return (
    <>
      <Card radius="xl" padding="lg" style={softCard}>
        <Group justify="space-between" mb="md">
          <Text fw={900} fz="md" c="#1a1a1a">{title}</Text>
          {onSeeAll && (
            <Group gap={2} style={{ cursor: "pointer" }} onClick={onSeeAll}>
              <Text fz="sm" fw={700} c={CORAL}>See All</Text>
              <IconChevronRight size={15} color={CORAL} />
            </Group>
          )}
        </Group>

        {/* Desktop: wrap grid */}
        <Box visibleFrom="xs">
          <SimpleGrid cols={{ base: 4, sm: 5, md: 7 }} spacing="md">
            {items.map((item) => (
              <MenuButton
                key={item.label}
                item={item}
                onUpgradeClick={() => setUpgradeOpen(true)}
              />
            ))}
          </SimpleGrid>
        </Box>

        {/* Mobile: horizontal scroll */}
        <Box hiddenFrom="xs">
          <ScrollArea scrollbarSize={0}>
            <Group gap="sm" wrap="nowrap" pb={4}>
              {items.map((item) => (
                <MenuButton
                  key={item.label}
                  item={item}
                  onUpgradeClick={() => setUpgradeOpen(true)}
                />
              ))}
            </Group>
          </ScrollArea>
        </Box>
      </Card>

      {/* ── Upgrade Modal ── */}
      <CustomModal
        icon = {<IconLock size={28} color={CORAL} stroke={1.8} />}
        opened={upgradeOpen}
        onClose={() => setUpgradeOpen(false)}
        title="Upgrade Your Plan"
        subtext="This feature is not available on your current plan. Upgrade to unlock full access to all modules."
        actionText="Upgrade Now"
        onAction={() => {
          setUpgradeOpen(false);
          // TODO: navigate to upgrade / billing page
        }}
        showCancel
        cancelText="Maybe Later"
      />
    </>
  );
}

// ─── MenuButton ───────────────────────────────────────────────────────────────

interface MenuButtonProps {
  item: MenuItem;
  onUpgradeClick: () => void;
}

function MenuButton({ item, onUpgradeClick }: MenuButtonProps) {
  const [hovered, setHovered] = useState(false);

  // treat omitted isAccess as accessible
  const accessible = item.isAccess !== false;

  return (
    <UnstyledButton
      style={{ width: "100%", cursor: accessible ? "pointer" : "not-allowed" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => { if (!accessible) onUpgradeClick(); }}
    >
      <Stack align="center" gap={6} style={{ position: "relative" }}>

        {/* Notification badge — accessible items only */}
        {accessible && item.badge && (
          <Badge
            size="xs"
            circle
            variant="filled"
            color="red"
            style={{
              position: "absolute",
              top: -3,
              right: "calc(50% - 34px)",
              zIndex: 1,
              fontSize: 9,
            }}
          >
            {item.badge}
          </Badge>
        )}

        {/* Lock indicator — inaccessible items only */}
        {!accessible && (
          <Center
            style={{
              position: "absolute",
              top: -3,
              right: "calc(50% - 34px)",
              zIndex: 1,
              width: 18,
              height: 18,
              borderRadius: "50%",
              background: "#bbb",
            }}
          >
            <IconLock size={10} color="#fff" stroke={2.5} />
          </Center>
        )}

        {/* Circle icon */}
        <Center
          style={{
            width: 58,
            height: 58,
            borderRadius: "50%",
            background: accessible
              ? `linear-gradient(145deg, ${CORAL} 0%, ${CORAL_LIGHT} 100%)`
              : "linear-gradient(145deg, #d0d0d0 0%, #e8e8e8 100%)",
            boxShadow: accessible
              ? hovered ? `0 10px 24px ${CORAL}66` : `0 6px 18px ${CORAL}44`
              : "0 4px 10px rgba(0,0,0,0.06)",
            transform: accessible && hovered
              ? "translateY(-4px) scale(1.07)"
              : "translateY(0) scale(1)",
            opacity: accessible ? 1 : 0.55,
            transition: "transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease",
          }}
        >
          <item.icon size={24} color="#fff" stroke={1.6} />
        </Center>

        {/* Label */}
        <Text
          fz="10px" fw={800} lh={1.3} ta="center"
          style={{
            color: !accessible ? "#bbb" : hovered ? CORAL : "#555",
            transition: "color 0.2s ease",
          }}
        >
          {item.label}
        </Text>

      </Stack>
    </UnstyledButton>
  );
}