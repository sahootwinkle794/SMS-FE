"use client";

import { useGreeting } from "@/hooks/useGreeting";
import { Center, Title } from "@mantine/core";

const SuperAdminDashboard = () => {
  const greeting = useGreeting();
  return (
    <>
      <Center>
        <Title order={5}>{greeting}</Title>
      </Center>
      <Center>
        <Title order={6}>Welcome to Super Admin Dashboard Screen</Title>
      </Center>
    </>
  );
};

export default SuperAdminDashboard;
