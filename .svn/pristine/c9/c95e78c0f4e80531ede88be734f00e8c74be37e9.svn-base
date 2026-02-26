import { Box, Title, Text, Stack } from "@mantine/core";

interface SectionHeaderProps {
  subtitle?: string;
  title: string;
  description?: string;
  highlightedText?: string;
  align?: "center" | "left";
}

export default function SectionHeader({
  subtitle,
  title,
  description,
  highlightedText,
  align = "center",
}: SectionHeaderProps) {
  return (
    <Stack gap="xl" mb={60} ta={align}>
      {subtitle && (
        <Text size="sm" c="dimmed" tt="uppercase" fw={600}>
          {subtitle}
        </Text>
      )}
      <Title order={2} size={42} fw={900} c="#8B1538">
        {highlightedText ? (
          <>
            <Text component="span" inherit c="#E63946">
              {highlightedText}
            </Text>
            <br />
            {title}
          </>
        ) : (
          title
        )}
      </Title>
      {description && (
        <Text
          size="lg"
          c="dimmed"
          maw={700}
          mx={align === "center" ? "auto" : 0}
        >
          {description}
        </Text>
      )}
    </Stack>
  );
}
