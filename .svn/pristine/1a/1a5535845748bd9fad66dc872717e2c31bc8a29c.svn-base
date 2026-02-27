"use client";

import { Container, Grid, Stack, Box, Title, Button } from "@mantine/core";
import ServiceItem from "../ui/ServiceItem";
import { SERVICES, COLORS } from "../../constants";
import { Carousel } from "@mantine/carousel";
import { dashBoard,iconServeOne, iconServeTwo, iconServeThree} from "../../assets/utils/images";

export default function ServicesSection() {
  return (
    <Box
      className="service"
      id="services"
      style={{
        position: "relative",
      }}
    >
      <Container size="xl">
        <Grid gutter={60} align="center">
          <Grid.Col span={{ base: 12, md: 6 }} className="serve-one">
            <Stack gap="xl">
              <Title
                order={2}
                size={32}
                fw={600}
                c="white"
                className="serve-head"
              >
                WHO WE SERVE ?
              </Title>
              <Stack gap="md">
                <img
                  src={iconServeOne.src}
                  alt="iconServeOne"
                  className="who-icon"
                />
                <Title className="who-title">High-End Societies</Title>
                <Title className="who-p" textWrap="balance">
                  Smart home integrations, concierge services, valet management,
                  premium amenities, and luxury-grade UX.
                </Title>
              </Stack>
              <Stack gap="md">
                <img
                  src={iconServeTwo.src}
                  alt="iconServeTwo"
                  className="who-icon"
                />
                <Title className="who-title">Mid-End Societies</Title>
                <Title className="who-p" textWrap="balance">
                  Maintenance billing, payments, announcements, polls, visitor
                  management, and community engagement tools.
                </Title>
              </Stack>
              <Stack gap="md">
                <img
                  src={iconServeThree.src}
                  alt="iconServeThree"
                  className="who-icon"
                />
                <Title className="who-title">Low-End Societies</Title>
                <Title className="who-p" textWrap="balance">
                  Free communication, basic payments, digital notice board,
                  simple complaint tracking, and visitor alerts.
                </Title>
              </Stack>
              <Button
                size="lg"
                style={{ backgroundColor: COLORS.accent, width: "fit-content" }}
                variant="gradient"
                gradient={{ from: "#FF7853", to: "#FC2631", deg: 180 }}
                className="who-btn"
              >
                View All Features
              </Button>
            </Stack>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }} className="serve-two">
            <Carousel withIndicators height={600}>
              <Carousel.Slide>
                <Title className="serve-title1">Core Highlight</Title>
                <Title className="serve-title2">
                  One App for Residents. Three Panels for Admins. One Central
                  Dashboard for Site Managers.
                </Title>
                <img
                  src={dashBoard.src}
                  alt="dashBoard"
                  className="dashboard-img"
                />
                <Title className="serve-title2">
                  Automated Billing & Online Payments
                </Title>
              </Carousel.Slide>
              <Carousel.Slide>
                <Title className="serve-title1">Core Highlight</Title>
                <Title className="serve-title2">
                  One App for Residents. Three Panels for Admins. One Central
                  Dashboard for Site Managers.
                </Title>
                <img
                  src={dashBoard.src}
                  alt="dashBoard"
                  className="dashboard-img"
                />
                <Title className="serve-title2">
                  Automated Billing & Online Payments
                </Title>
              </Carousel.Slide>
              <Carousel.Slide>
                <Title className="serve-title1">Core Highlight</Title>
                <Title className="serve-title2">
                  One App for Residents. Three Panels for Admins. One Central
                  Dashboard for Site Managers.
                </Title>
                <img
                  src={dashBoard.src}
                  alt="dashBoard"
                  className="dashboard-img"
                />
                <Title className="serve-title2">
                  Automated Billing & Online Payments
                </Title>
              </Carousel.Slide>
            </Carousel>
          </Grid.Col>
        </Grid>
      </Container>
    </Box>
  );
}
