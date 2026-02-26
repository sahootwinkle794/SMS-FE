"use client";
import React, { useState } from "react";
import {
  FileInput,
  TextInput,
  Grid,
  Button,
  Image,
  Badge,
  Flex,
  Group,
} from "@mantine/core";
import { IMAGES } from "@/utils/images";
import { useGreeting } from "@/hooks/useGreeting";
import { CustomModal } from "@/components";

const ProfileSetup = () => {
  const greetingMsg = useGreeting();
  const [isDisabled, setIsDisabled] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Flex
        direction="column"
        w="100%"
        h="100%"
        p="sm"
      >
        <Grid>
          {/* LEFT SECTION */}
          <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
            <Flex direction="column" align="center" mb="sm">
              <Image
                radius="md"
                h={150}
                w="auto"
                fit="contain"
                src={IMAGES.USER_PROFILE}
                alt="User profile picture"
              />
            </Flex>

            <Flex direction="column" align="center">
              <h4 style={{ color: "#767676" }}>{greetingMsg}</h4>
              <h3>Soumya Ranjan Panda</h3>

              <Badge color="green" variant="light" mt="sm">
                Software Developer
              </Badge>

              <Badge
                color="blue"
                mt="sm"
                onClick={() => setIsDisabled(false)}
                style={{ cursor: "pointer" }}
                leftSection={
                  <Image
                    radius="md"
                    h={15}
                    w={15}
                    fit="contain"
                    src={IMAGES.EDIT_ICON_WHITE}
                    alt="Edit icon"
                  />
                }
              >
                Edit
              </Badge>
            </Flex>
          </Grid.Col>

          {/* RIGHT SECTION */}
          <Grid.Col span={{ base: 12, md: 6, lg: 8 }}>
            <h4>My Profile</h4>

            <Grid>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <TextInput
                  disabled={isDisabled}
                  label="FIRST NAME"
                  placeholder="Soumya Ranjan"
                />
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 6 }}>
                <TextInput
                  disabled={isDisabled}
                  label="LAST NAME"
                  placeholder="Panda"
                />
              </Grid.Col>
            </Grid>

            <Grid mt="sm">
              <Grid.Col span={{ base: 12, md: 6 }}>
                <TextInput
                  disabled={isDisabled}
                  label="EMAIL ADDRESS"
                  placeholder="soumya@gmail.com"
                />
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 6 }}>
                <TextInput
                  disabled={isDisabled}
                  label="PHONE"
                  placeholder="9876543210"
                />
              </Grid.Col>
            </Grid>

            <Grid mt="sm">
              <Grid.Col span={{ base: 12, md: 6 }}>
                <TextInput
                  disabled={isDisabled}
                  label="DESIGNATION"
                  placeholder="Software Developer"
                />
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 6 }}>
                <FileInput
                  disabled={isDisabled}
                  label="Profile Picture"
                  placeholder="Upload .svg or .png"
                  accept=".svg,.png"
                />
              </Grid.Col>
            </Grid>

            {/* BUTTON SECTION */}
            {!isDisabled && (
              <Group
                justify="flex-end"
                align="flex-end"
                mt="md"
                style={{ width: "100%" }}
              >
                <Button
                  variant="filled"
                  color="primary.5"
                  onClick={() => setModalOpen(true)}
                >
                  Submit
                </Button>

                <Button color="secondary.5" onClick={() => setIsDisabled(true)}>
                  Cancel
                </Button>
              </Group>
            )}
          </Grid.Col>
        </Grid>
      </Flex>

      {/* SUCCESS MODAL */}
      <CustomModal
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        icon=""
        title="Success"
        subtext="Profile Updated Successfully"
        size="lg"
        onAction={() => setModalOpen(false)}
      />
    </>
  );
};

export default ProfileSetup;
