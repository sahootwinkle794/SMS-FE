"use client";

import {
  Card,
  Group,
  Text,
  Image,
  Badge,
  Stack,
  ActionIcon,
  Tooltip,
  Box,
  useMantineTheme,
} from "@mantine/core";
import { IconEdit, IconTrash, IconEye, IconSitemap } from "@tabler/icons-react";
import { IMAGES } from "@/utils/images";
import { useState } from "react";
import { buildSvgSrc } from "@/utils/constants";

interface EntityCardProps {
  title: string;
  description?: string;
  iconBase64?: string | null;
  status?: number;
  bg?: string;
  meta?: { label: string; value: string | number }[];
  actions?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  onView?: () => void;
  onClickCard?: () => void;
  actionLabels?: {
    edit?: string;
    delete?: string;
    view?: string;
  };
}

const EntityCard = ({
  title,
  description,
  iconBase64,
  status,
  bg,
  meta = [],
  actions = false,
  onEdit,
  onDelete,
  onView,
  onClickCard,
  actionLabels,
}: EntityCardProps) => {
  const theme = useMantineTheme();
  const [imgError, setImgError] = useState(false);


  const imageSrc = !imgError ? buildSvgSrc(iconBase64) : IMAGES.FALLBACK_IMG;

  return (
    <Card
      radius="lg"
      p={0}
      withBorder={false}
      onClick={onClickCard}
      style={{
        cursor: onClickCard ? "pointer" : "default",
        background: theme.colors.primary?.[7],
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        boxShadow: `0 10px 6px ${theme.colors.primary?.[6]}33, 0 2px 4px ${theme.colors.primary?.[6]}1a`,
        overflow: "hidden",
        border: "2px dotted #cccccc",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = `0 12px 24px ${theme.colors.primary?.[6]}40, 0 6px 12px ${theme.colors.primary?.[6]}26`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = `0 4px 6px ${theme.colors.primary?.[6]}33, 0 2px 4px ${theme.colors.primary?.[6]}1a`;
      }}
    >
      <Stack gap={0} style={{ height: "100%", display: "flex", flexDirection: "column" }}>
        {/* MAIN CONTENT */}
        <Box p="md" style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <Group align="flex-start" gap="md">
            <Box
              w={52}
              h={52}
              bg="rgba(255, 255, 255, 0.14)"
              style={{
                borderRadius: 14,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                flexShrink: 0,
              }}
            >
              <Image
                src={imageSrc}
                w={30}
                h={30}
                fit="contain"
                onError={() => setImgError(true)}
                alt={title}
              />
            </Box>

            <Stack gap={4} style={{ flex: 1, minWidth: 0 }}>
              <Group justify="space-between" gap="xs" wrap="nowrap">
                <Text 
                  fw={600} 
                  size="md" 
                  c="white" 
                  lineClamp={1}
                  style={{ 
                    textShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  {title}
                </Text>

                {typeof status === "number" && (
                  <Badge
                    size="sm"
                    radius="md"
                    color={status === 1 ? "teal" : "gray"}
                    variant="filled"
                    style={{
                      background: status === 1 
                        ? "rgba(32, 201, 151, 0.9)" 
                        : "rgba(134, 142, 150, 0.9)",
                      color: "white",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      fontSize: "10px",
                      letterSpacing: "0.5px",
                      flexShrink: 0,
                    }}
                  >
                    {status === 1 ? "Active" : "Inactive"}
                  </Badge>
                )}
              </Group>

              {description && (
                <Text 
                  size="sm" 
                  c="rgba(255, 255, 255, 0.9)" 
                  lineClamp={2}
                  style={{
                    lineHeight: 1.5,
                  }}
                >
                  {description}
                </Text>
              )}

              {meta.length > 0 && (
                <Group gap="md" mt={6}>
                  {meta.map((m, idx) => (
                    <Group key={idx} gap={4}>
                      <Text 
                        size="xs" 
                        c="rgba(255, 255, 255, 0.7)"
                        fw={500}
                        tt="uppercase"
                        style={{ letterSpacing: "0.5px" }}
                      >
                        {m.label}
                      </Text>
                      <Text 
                        size="xs" 
                        c="white"
                        fw={600}
                      >
                        {m.value}
                      </Text>
                    </Group>
                  ))}
                </Group>
              )}
            </Stack>
          </Group>
        </Box>

        {/* ACTIONS */}
        {actions && (onView || onEdit || onDelete) && (
          <Box
            p="xs"
            px="md"
            style={{
              background: "rgba(0, 0, 0, 0.1)",
              borderTop: "1px solid rgba(255, 255, 255, 0.1)",
              marginTop: "auto",
            }}
          >
            <Group justify="flex-end" gap={8}>
              {onView && (
                <Tooltip 
                  label={actionLabels?.view ?? "View structure"} 
                  withArrow
                  color="dark"
                >
                  <ActionIcon
                    size="lg"
                    radius="md"
                    variant="subtle"
                    color="white"
                    onClick={(e) => {
                      e.stopPropagation();
                      onView();
                    }}
                    style={{
                      background: "rgba(255, 255, 255, 0.15)",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(255, 255, 255, 0.25)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(255, 255, 255, 0.15)";
                    }}
                  >
                    <IconSitemap size={16} color="white" />
                  </ActionIcon>
                </Tooltip>
              )}

              {onEdit && (
                <Tooltip 
                  label={actionLabels?.edit ?? "Edit"} 
                  withArrow
                  color="dark"
                >
                  <ActionIcon
                    size="lg"
                    radius="md"
                    variant="subtle"
                    color="white"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit();
                    }}
                    style={{
                      background: "rgba(255, 255, 255, 0.15)",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(255, 255, 255, 0.25)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(255, 255, 255, 0.15)";
                    }}
                  >
                    <IconEdit size={16} color="white" />
                  </ActionIcon>
                </Tooltip>
              )}

              {onDelete && (
                <Tooltip 
                  label={actionLabels?.delete ?? "Delete"} 
                  withArrow
                  color="dark"
                >
                  <ActionIcon
                    size="lg"
                    radius="md"
                    variant="subtle"
                    color="white"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete();
                    }}
                    style={{
                      background: "rgba(255, 76, 76, 0.69)",
                      border: "1px solid rgba(255, 82, 82, 0.3)",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(255, 82, 82, 0.35)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(255, 82, 82, 0.2)";
                    }}
                  >
                    <IconTrash size={16} color="white" />
                  </ActionIcon>
                </Tooltip>
              )}
            </Group>
          </Box>
        )}
      </Stack>
    </Card>
  );
};

export default EntityCard;