"use client";

import {
  Button,
  Center,
  Stack,
  Text,
  Title,
  Box,
  Image,
  Anchor,
} from "@mantine/core";
import { useRouter } from "next/navigation";
import { IMAGES } from "@/utils/images";
import { STATUS_CODE, STATUS_MESSAGE } from "@/utils/constants";

const NotAuthorized = () => {
  const router = useRouter();

  return (
    <Box
      style={{
        backgroundImage: `url(${IMAGES.SCREEN_ERROR_BACKGROUND})`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Center h="100vh">
        <Stack align="center" gap="md">
          <Image
            src={IMAGES.UNAUTHORIZED}
            alt="Unauthorized access"
            w={200}
            fit="contain"
          />

          <Title order={1} fw={700}>
            {STATUS_CODE.UNAUTHORIZED}
          </Title>

          <Title order={3} ta="center">
            {STATUS_MESSAGE.ACCESS_DENIED}
          </Title>

          <Text c="dimmed" ta="center" maw={420}>
            {STATUS_MESSAGE.CONTACT_SU_MSG}
            <Anchor href="mailto:support@silicontechlab.com" c="blue" fw={500}>
              support@silicontechlab.com
            </Anchor>
            .
          </Text>

          {/* Action */}
          <Button mt="sm" onClick={() => router.back()} color="primary.5">
            Go back
          </Button>
        </Stack>
      </Center>
    </Box>
  );
};

export default NotAuthorized;
