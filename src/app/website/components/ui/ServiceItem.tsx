import { Group, Box, Stack, Text } from "@mantine/core";
import { Service } from "../../types";

interface ServiceItemProps {
  service: Service;
}

export default function ServiceItem({ service }: ServiceItemProps) {
  const Icon = service.icon;

  return (
    <Group gap="lg" align="flex-start">
      <Box
        style={{
          width: 60,
          height: 60,
          borderRadius: "50%",
          backgroundColor: "rgba(230, 57, 70, 0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Icon size={30} color="#FFB3C1" stroke={1.5} />
      </Box>
      <Stack gap={4}>
        <Text fw={700} size="lg" c="white">
          {service.title}
        </Text>
        <Text c="rgba(255, 255, 255, 0.7)" size="sm">
          {service.description}
        </Text>
      </Stack>
    </Group>
  );
}
