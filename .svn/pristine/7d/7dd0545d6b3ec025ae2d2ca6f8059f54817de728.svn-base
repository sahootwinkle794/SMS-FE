import { Card, Stack, Box, Title, Text } from "@mantine/core";
import { Feature } from "../../types";

interface FeatureCardProps {
  feature: Feature;
}

export default function FeatureCard({ feature }: FeatureCardProps) {
  const Icon = feature.icon;

  return (
    <Card
      shadow="sm"
      radius="lg"
      p="xl"
      style={{ height: "100%", border: "1px solid #FFE4E9" }}
    >
      <Stack gap="md" align="center" ta="center">
        <Box
          style={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            backgroundColor: "#FFE4E9",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon size={40} color="#E63946" stroke={1.5} />
        </Box>
        <Title order={3} size={24} fw={700} c="#8B1538">
          {feature.title}
        </Title>
        <Text c="dimmed">{feature.description}</Text>
      </Stack>
    </Card>
  );
}
