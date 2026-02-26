"use client";

import {
  Button,
  Center,
  Container,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IconNumber91Small } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useErrorBoundary } from "react-error-boundary";

const Register = () => {
  const { showBoundary } = useErrorBoundary();
  const router = useRouter();

  const form = useForm({
    initialValues: {
      name: "",
      mobile: "",
      password: "",
      confirmPassword: "",
    },
    validate: {
      name: (value) =>
        value.trim().length >= 3 ? null : "Name must be at least 3 characters",
      mobile: (value) =>
        /^\d{10}$/.test(value) ? null : "Invalid mobile number",
      password: (value) =>
        value.length >= 6 ? null : "Password must be at least 6 characters",
      confirmPassword: (value, values) =>
        value === values.password ? null : "Passwords do not match",
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    try {
      notifications.show({
        title: "Registered Successfully!",
        message: `Welcome, ${values.name}!`,
        color: "green",
      });

      router.push("/auth/login");
    } catch (err) {
      showBoundary(err);
    }
  };

  return (
    <Container size={420} my={40}>
      <Center>
        <Title>Create Account</Title>
      </Center>
      <Center>
        <Text color="dimmed" size="sm" mt={5}>
          Sign up to get started
        </Text>
      </Center>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label="Full Name"
            placeholder="John Doe"
            {...form.getInputProps("name")}
            withAsterisk
          />

          <TextInput
            label="Mobile Number"
            placeholder="1234567890"
            {...form.getInputProps("mobile")}
            leftSectionPointerEvents="none"
            leftSection={<IconNumber91Small size={24} stroke={2} />}
            mt="md"
            withAsterisk
            maxLength={10}
          />

          <PasswordInput
            label="Password"
            placeholder="Your password"
            mt="md"
            {...form.getInputProps("password")}
            withAsterisk
          />

          <PasswordInput
            label="Confirm Password"
            placeholder="Re-enter password"
            mt="md"
            {...form.getInputProps("confirmPassword")}
            withAsterisk
          />

          <Button fullWidth mt="xl" type="submit">
            Register
          </Button>
        </form>

              <Center mt="md">
                  <Text size="sm" color="dimmed">
                      Already have an account?{" "}
                      <Text
                          span
                          c="blue"
                          style={{ cursor: "pointer", textDecoration: "underline" }}
                          onClick={() => router.push("/auth/login")}
                      >
                          Login
                      </Text>
                  </Text>
              </Center>

      </Paper>
    </Container>
  );
};

export default Register;
