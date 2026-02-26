"use client";

import { useGreeting } from "@/hooks/useGreeting";
import { Stack, Title } from "@mantine/core";

const AdminDashboard = () => {
  const greeting = useGreeting();
  return (
    <Stack align="center" gap="xs">
      <Title order={5}>{greeting}</Title>
      <Title order={6}>Welcome to Admin Dashboard Screen</Title>
    </Stack>
  );
};

export default AdminDashboard;
