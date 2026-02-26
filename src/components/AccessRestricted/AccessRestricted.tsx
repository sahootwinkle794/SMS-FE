import { Center, Stack, ThemeIcon, Text } from "@mantine/core";
import { IconLock } from "@tabler/icons-react";

interface AccessRestrictedProps {
  pageTitle: string;
}
const AccessRestricted = ({ pageTitle }: AccessRestrictedProps) => {
  return (
    <Center h="70vh">
      <Stack align="center" gap="md">
        <ThemeIcon size={56} radius="xl" color="red" variant="light">
          <IconLock size={28} />
        </ThemeIcon>

        <Text size="xl" fw={600}>
          Access Restricted
        </Text>

        <Text size="sm" c="dimmed" ta="center">
          You don’t have permission to view the <b>{pageTitle}</b> page.
          <br />
          Please contact your administrator if you need access.
        </Text>
      </Stack>
    </Center>
  );
};

export default AccessRestricted;
