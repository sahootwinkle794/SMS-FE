'use client';
import {
  Box,
  Checkbox,
  Divider,
  Flex,
  Grid,
  Paper,
  Pill,
  Text,
  Title,
  ActionIcon,
  useMantineTheme,
  Tooltip,
} from "@mantine/core";
import { useEffect, useState } from "react";

const CommonCategory = ({
  title,
  description,
  amenities,
  icon,
  future = false,
  onEdit,
  amenityStatuses = {},
  amenityDisplayOrders = {},
}: {
  title: string;
  description?: string;
  amenities: string[];
  icon?: string;
  future?: boolean;
  amenityDisplayOrders?: Record<string, number>;  
  onEdit?: () => void;
  amenityStatuses?: Record<string, boolean>;
  isChecked?: boolean;
}) => {
  const [enabled, setEnabled] = useState(!future);
  const [selectedAmenities, setSelectedAmenities] = useState<Record<string, boolean>>(
    Object.fromEntries(amenities.map((a) => [a, amenityStatuses[a] ?? false]))
  );

  const theme = useMantineTheme();

  useEffect(() => {
    setSelectedAmenities(
      Object.fromEntries(amenities.map((a) => [a, amenityStatuses[a] ?? false]))
    );
  }, [JSON.stringify(amenityStatuses)]);

  return (
    <Paper
      radius="md"
      p={10}
      bg="transparent"
      withBorder={true}
      style={{
        transition: "all 0.2s ease",
      }}
    >
      {/* Header Section */}
      <Flex justify="space-between" align="center" mb="md">
        <Flex align="center" gap="sm">
          {icon && (
            <Box
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                background: enabled
                  ? theme.colors.primary[0]
                  : theme.colors.gray[0],
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: enabled ? theme.colors.primary[7] : theme.colors.gray[5],
                transition: "all 0.2s ease",
              }}
            >
              <Text size="xl" style={{ lineHeight: 1 }}>
                {icon}
              </Text>
            </Box>
          )}

          <Box>
            <Flex align="center" gap="xs">
              <Title
                order={4}
                fw={500}
                style={{ fontSize: "1.1rem", color: theme.colors.gray[8] }}
              >
                {title}
              </Title>
              {future && (
                <Pill
                  size="sm"
                  style={{
                    background: theme.colors.gray[1],
                    color: theme.colors.gray[6],
                    fontWeight: 400,
                    fontSize: 11,
                    padding: "2px 8px",
                  }}
                >
                  Coming soon
                </Pill>
              )}
            </Flex>

            {description && (
              <Text size="xs" c={theme.colors.gray[5]} fw={400} mt={2}>
                {description}
              </Text>
            )}
          </Box>
        </Flex>

        <Tooltip label="Edit amenities" position="left" withArrow>
          <ActionIcon
            variant="subtle"
            color="gray"
            size="md"
            onClick={onEdit}
            style={{
              "&:hover": {
                background: theme.colors.gray[0],
              },
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </ActionIcon>
        </Tooltip>
      </Flex>

      <Divider
        my="md"
        color={enabled ? theme.colors.gray[2] : theme.colors.gray[1]}
        style={{ opacity: enabled ? 1 : 0.5 }}
      />

      {/* Amenities Grid */}
      {amenities.length === 0 ? (
        // Empty state
        <Flex
          direction="column"
          align="center"
          justify="center"
          gap="xs"
          py="xl"
          style={{
            background: theme.colors.gray[0],
            borderRadius: theme.radius.md,
            border: `1px solid ${theme.colors.gray[2]}`,
          }}
        >
          <Text size="32px" style={{ filter: "grayscale(1)", opacity: 0.5 }}>
            📭
          </Text>
          <Text fw={400} size="sm" c={theme.colors.gray[5]}>
            No amenities mapped yet
          </Text>
          <Text size="xs" c={theme.colors.gray[4]} ta="center" maw={240}>
            Click the edit button to assign amenities to this category
          </Text>
        </Flex>
      ) : (
        <Grid gutter="xs">
          {amenities.map((amenity) => (
            <Grid.Col span={{ base: 12, sm: 6, md: 4 }} key={amenity}>
              <Flex
                align="center"
                justify="space-between"
                style={{
                  padding: "10px 12px",
                  background: selectedAmenities[amenity]
                    ? theme.colors.primary[0]
                    : "white",
                  borderRadius: theme.radius.sm,
                  transition: "all 0.15s ease",
                  border: `1px solid ${
                    selectedAmenities[amenity]
                      ? theme.colors.primary[2]
                      : theme.colors.gray[5]
                  }`,
                  boxShadow: "0 1px 2px rgba(0,0,0,0.02)",
                  opacity: enabled ? 1 : 0.7,
                }}
              >
                <Flex align="center" gap="sm" style={{ flex: 1 }}>
                  <Checkbox
                    checked={selectedAmenities[amenity] ?? false}
                    onChange={() => {}} // Empty function since it's unclickable
                    size="xs"
                    color="primary.5"
                    disabled={!enabled}
                    styles={{
                      input: {
                        cursor: "default",
                        borderColor: selectedAmenities[amenity]
                          ? theme.colors.primary[5]
                          : theme.colors.gray[3],
                      },
                    }}
                  />
                  <Text
                    size="sm"
                    fw={400}
                    c={enabled ? theme.colors.gray[7] : theme.colors.gray[5]}
                    style={{
                      userSelect: "none",
                    }}
                  >
                    {amenity}
                  </Text>
                </Flex>

                <Pill
                  size="sm"
                  style={{
                    background: theme.colors.primary[0],
                    color: theme.colors.primary[7],
                    fontWeight: 600,
                    fontSize: 11,
                    minWidth: 30,
                    textAlign: "center",
                    border: `1px solid ${theme.colors.primary[2]}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {amenityDisplayOrders[amenity] ?? "-"}
                </Pill>
              </Flex>
            </Grid.Col>
          ))}
        </Grid>
      )}

      {/* Disabled hint */}
      {!enabled && amenities.length > 0 && (
        <Text
          size="xs"
          c={theme.colors.gray[4]}
          mt="md"
          ta="center"
          style={{ fontStyle: "italic" }}
        >
          Enable this category to manage amenities
        </Text>
      )}
    </Paper>
  );
};

export default CommonCategory;