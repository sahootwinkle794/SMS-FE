"use client";

import React, { useState } from "react";
import {
  Card,
  Stack,
  Group,
  Text,
  Badge,
  ActionIcon,
  useMantineTheme,
} from "@mantine/core";
import {
  IconTag,
  IconCalendar,
  IconClockPlay,
  IconRepeat,
  IconEdit,
  IconTrash,
} from "@tabler/icons-react";

import { PACKAGE_COLORS } from "@/utils/constants";
import { PackageItem } from "@/types/admin/societyManagement/packageSetup/packageSetup";

interface PackageCardProps {
  data: PackageItem;
  index: number;
  onEdit: (data: PackageItem) => void;
  onDelete: (data: PackageItem) => void;
}

const PackageCard: React.FC<PackageCardProps> = ({
  data,
  index,
  onEdit,
  onDelete,
}) => {
  const theme = useMantineTheme();

  const colorKeys = Object.keys(PACKAGE_COLORS) as Array<
    keyof typeof PACKAGE_COLORS
  >;

  const cardColour = PACKAGE_COLORS[colorKeys[index % colorKeys.length]];

  // const [status] = useState(data.status === 1);

  return (
    <Card
      withBorder
      shadow="lg"
      radius="lg"
      padding="xl"
      bd={`1px solid ${theme.colors.primary[1]}`}
      className="hover:shadow-xl transition-shadow duration-300"
    >
      <Stack gap="md">
        {/* Header */}
        <Card.Section
          inheritPadding
          py="sm"
          style={{
            background: cardColour.bg,
            margin: "-0.75rem -0.75rem 0.75rem -0.75rem",
          }}
        >
          <Group justify="space-between" align="center">
            <Text fw={500} size="md" c="white">
              {data.packageName}
            </Text>

            <Badge
              radius="sm"
              variant="filled"
              color={data?.status === 1 ? "success.5" : "gray"}
            >
              {data?.status === 1 ? "ACTIVE" : "INACTIVE"}
            </Badge>
          </Group>
        </Card.Section>

        {/* Package Code + Actions */}
        <Group justify="space-between" align="center">
          <Group gap="xs" align="center">
            <IconTag size={12} className="text-gray-400" />
            <Text size="xs" fw={500} c="dimmed">
              {data.packageCode}
            </Text>
          </Group>

          <Group gap={6}>
            <ActionIcon
              size="md"
              radius="md"
              color="blue"
              variant="light"
              onClick={() => onEdit(data)}
            >
              <IconEdit size={18} />
            </ActionIcon>

            <ActionIcon
              size="md"
              radius="md"
              color="red"
              variant="light"
              onClick={() => onDelete(data)}
            >
              <IconTrash size={18} />
            </ActionIcon>
          </Group>
        </Group>

        {/* Price */}
        <Text size="2xl" fw={900} className="ml-4 tracking-tight">
          ₹{data.price}
          <Text span size="sm" fw={500} c="dimmed" className="ml-1">
            / {data.billingCycle.toLowerCase()}
          </Text>
        </Text>

        {/* Details */}
        <Stack gap="xs" mt="sm">
          <Group justify="space-between">
            <Group gap="xs">
              <IconCalendar size={14} className="text-gray-500" />
              <Text size="sm" fw={500}>
                Duration:
              </Text>
            </Group>
            <Text size="sm" fw={600}>
              {data.durationDays} days
            </Text>
          </Group>

          <Group justify="space-between">
            <Group gap="xs">
              <IconClockPlay size={14} className="text-gray-500" />
              <Text size="sm" fw={500}>
                Trial Period:
              </Text>
            </Group>
            <Badge
              size="sm"
              variant="light"
              color={data.allowsTrial ? "blue" : "gray"}
            >
              {data.allowsTrial ? `${data.trialDays} days` : "Not Available"}
            </Badge>
          </Group>

          <Group justify="space-between">
            <Group gap="xs">
              <IconRepeat size={14} className="text-gray-500" />
              <Text size="sm" fw={500}>
                Billing Cycle:
              </Text>
            </Group>
            <Badge
              size="sm"
              variant="light"
              color="violet"
              className="uppercase"
            >
              {data.billingCycle}
            </Badge>
          </Group>
        </Stack>
      </Stack>
    </Card>
  );
};

export default PackageCard;
