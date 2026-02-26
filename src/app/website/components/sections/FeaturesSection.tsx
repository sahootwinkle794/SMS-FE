"use client";

import {
  Container,
  Grid,
  Box,
  Stack,
  Title,
  Card,
  Text,
  Group,
  Badge,
} from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import SectionHeader from "../ui/SectionHeader";
import FeatureCard from "../ui/FeatureCard";
import { FEATURES, COLORS } from "../../constants";
import { featureArt } from "../../assets/utils/images";
import { iconFeatureOne } from "../../assets/utils/images";
import { iconFeatureTwo } from "../../assets/utils/images";
import { iconFeatureThree } from "../../assets/utils/images";

export default function FeaturesSection() {
  return (
    <Box
      className="feature"
      id="features"
      pt={80}
      style={{ backgroundColor: COLORS.lightBg }}
    >
      <Container size="xl" className="feature-con">
        <Grid>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Title order={4} fw={400} className="feature-title">
              Why SMS?
            </Title>
            <Title order={3} fw={100} className="feature-title2">
              One Platform.
            </Title>
            <Title order={3} fw={600} className="feature-title2">
              Three Experiences.
              <br /> Zero Complexity.
            </Title>
            <Title order={4}  className="feature-title3">
              Every society is different — so why use a one-size-
              <br />
              fits-all solution?
            </Title>
            <Title order={6} fw={400} className="feature-title4">
              SMS adapts automatically for High-End, Mid-End, and Low-End
              societies, ensuring every resident and admin gets exactly what
              they need.
            </Title>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Carousel
              withIndicators
              height={370}
              slideSize="33.333333%"
              slideGap="md"
              emblaOptions={{
                loop: true,
                align: "start",
                slidesToScroll: 3,
                dragFree: false,
              }}
            >
              <Carousel.Slide>
                <Card shadow="sm" padding="lg" radius="md" withBorder className="featureCard">
                  <Group justify="space-between" mt="md" mb="xs">
                    <img src={iconFeatureOne.src} alt="iconFeatureOne" />
                    <Text size="xl" fw={700} className="Feature-card-text">Simplifies daily operations</Text>
                  </Group>

                  <Text size="sm" c="dimmed" className="feature-p">
                    Create fast, responsive websites that hook visitors and push them down the conversion pipeline.
                  </Text>
                </Card>
              </Carousel.Slide>
              <Carousel.Slide>
                <Card shadow="sm" padding="lg" radius="md" withBorder className="featureCard">
                  <Group justify="space-between" mt="md" mb="xs">
                    <img src={iconFeatureTwo.src} alt="iconFeatureOne" />
                    <Text size="xl" fw={700} className="Feature-card-text">Automates finances & communication</Text>
                  </Group>

                  <Text size="sm" c="dimmed" className="feature-p">
                    Build custom applications that automate staff tasks, meet regulatory requirements, and improve service delivery.
                  </Text>
                </Card>
              </Carousel.Slide>
              <Carousel.Slide>
                <Card shadow="sm" padding="lg" radius="md" withBorder className="featureCard">
                  <Group justify="space-between" mt="md" mb="xs">
                    <img src={iconFeatureThree.src} alt="iconFeatureOne" />
                    <Text size="xl" fw={700} className="Feature-card-text">Strengthens Security</Text>
                  </Group>

                  <Text size="sm" c="dimmed" className="feature-p">
                    Turn data into insights to make smarter business decisions.
                  </Text>
                </Card>
              </Carousel.Slide>
              <Carousel.Slide>
                <Card shadow="sm" padding="lg" radius="md" withBorder className="featureCard">
                  <Group justify="space-between" mt="md" mb="xs">
                    <img src={iconFeatureOne.src} alt="iconFeatureOne" />
                    <Text size="xl" fw={700} className="Feature-card-text">Simplifies daily operations</Text>
                  </Group>

                  <Text size="sm" c="dimmed" className="feature-p">
                    Create fast, responsive websites that hook visitors and push them down the conversion pipeline.
                  </Text>
                </Card>
              </Carousel.Slide>
              <Carousel.Slide>
                <Card shadow="sm" padding="lg" radius="md" withBorder className="featureCard">
                  <Group justify="space-between" mt="md" mb="xs">
                    <img src={iconFeatureTwo.src} alt="iconFeatureOne" />
                    <Text size="xl" fw={700} className="Feature-card-text">Simplifies daily operations</Text>
                  </Group>

                  <Text size="sm" c="dimmed" className="feature-p">
                    Create fast, responsive websites that hook visitors and push them down the conversion pipeline.
                  </Text>
                </Card>
              </Carousel.Slide>


              
            </Carousel>
          </Grid.Col>
        </Grid>
        {/* <SectionHeader
          subtitle="Why SMS?"
          highlightedText="Three Experiences."
          title="Zero Complexity."
        />

        <Grid gutter={40}>
          {FEATURES.map((feature, index) => (
            <Grid.Col key={index} span={{ base: 12, sm: 4 }}>
              <FeatureCard feature={feature} />
            </Grid.Col>
          ))}
        </Grid> */}
      </Container>
      <img src={featureArt.src} alt="Feature Art" />
    </Box>
  );
}
