"use client";
import { useGreeting } from "@/hooks/useGreeting";
import { useAuthStore } from "@/store/auth.store";
import { maskPhone } from "@/utils/common";
import { Title, Text, Center, Stack } from "@mantine/core";

const VisitorDashboard = () => {
  const greeting = useGreeting();
  const user = useAuthStore((state) => state.user);
  return (
    <Center>
      <Stack align="center">
        <Title order={5}>{greeting}</Title>
        <Title order={2} ta="center">
          Welcome
        </Title>

        <Text size="md" ta="center" c="dimmed">
          Your registration has been completed using your phone number{" "}
          {maskPhone(user?.userId)}.
          <br />
          Your account is currently registered as a <strong>Guest User</strong>
          {""} and is pending <strong>Administrator approval</strong>.
          <br />
          Please contact the administrator to activate your access.
        </Text>
      </Stack>
    </Center>
  );
};

export default VisitorDashboard;
