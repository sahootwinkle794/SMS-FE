"use client";

import {
  Container,
  Grid,
  Stack,
  Title,
  Text,
  Paper,
  TextInput,
  Textarea,
  Button,
  Image,
  Box,
  Transition,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import axios from "axios";
import { useState } from "react";
import { COLORS } from "../../constants";
import { IMAGE } from "../../assets/utils/images";
import { useIntersection } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconCircleCheck, IconX } from "@tabler/icons-react";
import { API_PATH } from "@/utils/apiPath";
import { postRequest } from "@/service";

type FormValues = {
  name: string;
  mobile: string;
  email: string;
  city: string;
  projectDescription: string;
};

export default function ContactSection() {
  const { ref, entry } = useIntersection({ threshold: 0.3 });
  const [loading, setLoading] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL4;

  const form = useForm<FormValues>({
    initialValues: {
      name: "",
      mobile: "",
      email: "",
      city: "",
      projectDescription: "",
    },

    validate: {
      name: (value) =>
        value.length < 2 ? "Name must be at least 2 characters" : null,

      mobile: (value) =>
        /^[0-9]{10}$/.test(value) ? null : "Enter valid 10 digit mobile number",

      email: (value) =>
        /^\S+@\S+\.\S+$/.test(value) ? null : "Invalid email address",

      city: (value) => (value.length === 0 ? "City is required" : null),

      projectDescription: (value) =>
        value.length < 10 ? "Minimum 10 characters required" : null,
    },
  });

  const handleSubmit = async (values: FormValues) => {
    try {
      setLoading(true);

      const payload = {
        fullName: values.name,
        mobileNo: values.mobile,
        email: values.email,
        city: values.city,
        projectDescription: values.projectDescription,
      };

      // console.log("Payload:", payload);

      // await axios.post(`${API_URL}/guest-users/public`, payload);
      await postRequest(API_PATH.POST_GUEST_USER_PUBLIC, payload);

      // SUCCESS NOTIFICATION
      notifications.show({
        title: "Thank You!",
        message:
          "Your request has been submitted successfully. Our team will contact you within 24-48 hours.",
        color: "green",
        icon: <IconCircleCheck size={20} />,
      });

      form.reset();
    } catch (error) {
      console.error("API Error:", error);

      // ERROR NOTIFICATION
      notifications.show({
        title: "Submission Failed",
        message: "Something went wrong. Please try again.",
        color: "red",
        icon: <IconX size={20} />,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      className="contacts"
      id="contact"
      style={{ backgroundColor: "white", padding: "60px 0" }}
    >
      <Container size="xl">
        <Grid gutter={60} align="center">
          {/* LEFT SIDE CONTENT */}

          <Grid.Col span={{ base: 12, md: 6 }} ref={ref}>
            <Transition
              mounted={entry?.isIntersecting || false}
              transition="slide-up"
              duration={700}
            >
              {(styles) => (
                <Stack gap="xl" style={styles}>
                  <Title className="contact-title">
                    Ready to discuss <br /> your toughest <br />
                    <Text className="contact-title2">tech challenges?</Text>
                  </Title>

                  <Title className="contact-title3">
                    Fill out the form and get on a call within 24-48 hours with
                    our product and tech expert.
                  </Title>

                  <Title className="contact-title3">
                    No account managers –
                    <Text component="span" className="highlight">
                      that’s a promise.
                    </Text>
                  </Title>
                </Stack>
              )}
            </Transition>
          </Grid.Col>

          {/* RIGHT SIDE FORM */}

          <Grid.Col span={{ base: 12, md: 6 }}>
            <Paper
              shadow="md"
              radius="lg"
              p="xl"
              style={{ border: `1px solid ${COLORS.pinkAccent}` }}
            >
              <form onSubmit={form.onSubmit(handleSubmit)}>
                <Grid gutter="md">
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <TextInput
                      label="Hello, my name is:"
                      placeholder="Full name"
                      {...form.getInputProps("name")}
                    />
                  </Grid.Col>

                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <TextInput
                      label="Mobile No:"
                      maxLength={10}
                      placeholder="9876543210"
                      {...form.getInputProps("mobile")}
                    />
                  </Grid.Col>

                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <TextInput
                      label="Email ID:"
                      placeholder="your.email@example.com"
                      {...form.getInputProps("email")}
                    />
                  </Grid.Col>

                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <TextInput
                      label="City:"
                      placeholder="Enter your city"
                      {...form.getInputProps("city")}
                    />
                  </Grid.Col>

                  <Grid.Col span={12}>
                    <Textarea
                      label="I am interested in..."
                      placeholder="Your Project Description"
                      minRows={4}
                      {...form.getInputProps("projectDescription")}
                    />
                  </Grid.Col>

                  <Grid.Col span={12}>
                    <Button
                      className="btn-text"
                      type="submit"
                      loading={loading}
                      size="lg"
                      radius="sm"
                      variant="gradient"
                      gradient={{ from: "#FF7853", to: "#FF2C36", deg: 135 }}
                      rightSection={
                        <Image
                          src={IMAGE.ARROW_IMG}
                          width={18}
                          height={18}
                          alt="icon"
                        />
                      }
                    >
                      Book a demo with us
                    </Button>
                  </Grid.Col>
                </Grid>
              </form>
            </Paper>
          </Grid.Col>
        </Grid>
      </Container>
    </Box>
  );
}
