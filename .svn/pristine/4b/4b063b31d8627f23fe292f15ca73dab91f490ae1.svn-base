"use client";

import { OtpInput } from "@/components";
import { postRequest } from "@/service";
import apiServer from "@/service/axios-server";
import { ApiResponseData } from "@/types/auth/login/login";
import { OtpResponse, UserResponse } from "@/types/auth/login/login";
import { API_PATH } from "@/utils/apiPath";
import { STATUS_MESSAGE } from "@/utils/constants";
import { IMAGES } from "@/utils/images";
import classes from "./Login.module.css";

import {
  Button,
  Center,
  Flex,
  Paper,
  Text,
  TextInput,
  Box,
  Image,
} from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import "@mantine/carousel/styles.css"; // Import carousel styles
import Autoplay from "embla-carousel-autoplay";

import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IconDeviceMobile, IconNumber91Small } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useErrorBoundary } from "react-error-boundary";
import { useAuthStore } from "@/store/auth.store";
import { RouteConfig } from "@/utils/routeConfig";

const slides = [
  IMAGES.SLIDE_IMG_1,
  IMAGES.SLIDE_IMG_2,
  IMAGES.SLIDE_IMG_3,
  IMAGES.SLIDE_IMG_4,
  IMAGES.SLIDE_IMG_5,
];

const Login = () => {
  const router = useRouter();
  const { showBoundary } = useErrorBoundary();
  const autoplay = useRef(Autoplay({ delay: 3000 }));

  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  const form = useForm({
    initialValues: { mobile: "" },
    validate: {
      mobile: (value) =>
        /^\d{10}$/.test(value) ? null : "Invalid mobile number",
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    try {
      const responseData = await postRequest<
        typeof values,
        ApiResponseData<OtpResponse>
      >(API_PATH.SEND_OTP, values);

      if (responseData?.data?.ok) {
        notifications.show({
          title: STATUS_MESSAGE.SUCCESSFUL,
          message: STATUS_MESSAGE.OTP_SENT,
          color: "green",
        });
        setOtpSent(true);
      } else {
        notifications.show({
          title: STATUS_MESSAGE.FAILED,
          message: STATUS_MESSAGE.OTP_FAILED,
          color: "red",
        });
      }
    } catch (err) {
      showBoundary(err);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const payload = { mobile: form.values.mobile, otp };

      const result = await apiServer.post<UserResponse>(
        "/api/auth/verify-otp",
        payload
      );

      useAuthStore.getState().setUser(result.data);

      notifications.show({
        title: STATUS_MESSAGE.SUCCESSFUL,
        message: STATUS_MESSAGE.OTP_VERIFIED,
        color: "green",
      });

      router.push(RouteConfig.DASHBOARD);
    } catch (err) {
      notifications.show({
        title: "Error",
        message: `Failed to verify OTP ${err}`,
        color: "red",
      });
    }
  };

  return (
    <Flex h="100vh">
      {/* LEFT SECTION – LOGIN FORM */}
      <Center w={420} px="xl">
        <Box w="100%">
          {/* Logo */}
          <Center>
            <Image
              src={IMAGES.BRAND_LOGO}
              alt="SMS Login Logo"
              w={120}
              h={120}
              fit="contain"
            />
          </Center>
          <Center>
            <Text c="dark" fw={"bold"} size="sm">
              Login into your account
            </Text>
          </Center>

          <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            {!otpSent && (
              <form onSubmit={form.onSubmit(handleSubmit)}>
                <TextInput
                  label="Mobile Number"
                  placeholder="Enter 10-digit Mobile Number"
                  {...form.getInputProps("mobile")}
                  leftSectionPointerEvents="none"
                  leftSection={<IconNumber91Small size={24} stroke={2} />}
                  rightSection={
                    <Box
                      bg="primary.5"
                      px={9}
                      py={8}
                      style={{
                        borderRadius: 4,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <IconDeviceMobile size={18} color="white" />
                    </Box>
                  }
                  maxLength={10}
                  withAsterisk
                  styles={(theme) => ({
                    input: {
                      backgroundColor: "#F1F3F6",
                      borderColor: theme.colors.primary[4],
                      "&:focus, &:focusWithin": {
                        borderColor: theme.colors.primary[6],
                      },
                    },
                  })}
                />

                <Button fullWidth mt="xl" type="submit" color="primary.5">
                  Send OTP
                </Button>
              </form>
            )}

            {otpSent && (
              <>
                <Flex justify="center" mt="md">
                  <OtpInput length={6} timerSeconds={10} onComplete={setOtp} />
                </Flex>

                <Button
                  fullWidth
                  mt="xl"
                  color="primary.5"
                  onClick={handleVerifyOtp}
                >
                  Verify
                </Button>
              </>
            )}
          </Paper>
        </Box>
      </Center>

      {/* RIGHT SECTION – CAROUSEL */}
      <Box flex={1} bg="#f8f9fa" visibleFrom="md">
        <Carousel
          withIndicators
          withControls={false}
          height="100%"
          plugins={[autoplay.current]}
          onMouseEnter={autoplay.current.stop}
          onMouseLeave={autoplay.current.reset}
          classNames={classes}
        >
          {slides.map((img, index) => (
            <Carousel.Slide key={index}>
              <Center h="100%">
                <Image
                  src={img}
                  alt={`Slide ${index + 1}`}
                  fit="contain"
                  h="65%"
                  w="65%"
                />
              </Center>
            </Carousel.Slide>
          ))}
        </Carousel>
      </Box>
    </Flex>
  );
};

export default Login;
