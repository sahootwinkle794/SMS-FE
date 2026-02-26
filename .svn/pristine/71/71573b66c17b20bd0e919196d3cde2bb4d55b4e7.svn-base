"use client";

import { ICONS } from "@/utils/icons";
import { IMAGES } from "@/utils/images";
import { Anchor, BackgroundImage, Flex, rem, Text } from "@mantine/core";
import Image from "next/image";
import { FallbackProps } from "react-error-boundary";

const ErrorFallback = ({ error }: FallbackProps) => {
  const currentDate = new Date().toLocaleString();

  return (
    <Flex direction="column" h="100vh" justify="center">
      {/* Background Section */}
      <BackgroundImage
        src={IMAGES.SCREEN_ERROR_BACKGROUND}
        h={300}
        bgp="center"
        // bgsize="cover"
        data-testid="screen-error-background"
      >
        <Image
          src={ICONS.ICON_SCREEN_ERROR}
          alt="screen-error-icon"
          width={250}
          height={250}
          style={{
            margin: "9vh auto",
            display: "block",
          }}
        />
      </BackgroundImage>

      {/* Content Section */}
      <Flex direction="column" m={rem(34)} ta="center">
        <Text c="gray.9" fz={32} lh="40px" fw={500} m={rem(8)}>
          Oops, something went wrong
        </Text>

        <Flex direction="column" justify="center" maw={600} m="0 auto">
          <Text mb="sm" c="gray.7">
            {error instanceof Error
              ? error.message
              : "An unexpected error occurred."}
          </Text>

          <Text mb="sm" c="gray.7">
            {currentDate}
          </Text>

          <Text c="gray.8">
            Please screenshot and send to
            <Anchor
              href="mailto:support@silicontechlab.com"
              fw={700}
              underline="never"
              mx={4}
            >
              support@silicontechlab.com
            </Anchor>
            via email.
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ErrorFallback;
