//common button component with tooltip and variant support

"use client";

import { Button, ButtonProps, Tooltip } from "@mantine/core";
import { BRAND_COLORS } from "../../utils/constants";

interface AppButtonProps extends ButtonProps {
  tooltip?: string;
  tooltipPosition?: "top" | "bottom" | "left" | "right";
  variantType?: keyof typeof BRAND_COLORS;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

const AppButton: React.FC<AppButtonProps> = ({
  tooltip,
  variantType = "primary",
  tooltipPosition = "top",
  type = "button", // default type
  children,
  ...props
}) => {
  const variant = BRAND_COLORS[variantType];

  const Component = (
    <Button
      radius="md"
      size="md"
      fw={600}
      type={type}
      {...props}
      styles={() => ({
        root: {
          backgroundColor: variant.background,
          color: variant.text,
          transition: "all 150ms ease",
          "&:hover": {
            backgroundColor: variant.hover,
            transform: "translateY(-1px)",
          },
        },
      })}
    >
      {children}
    </Button>
  );

  if (tooltip) {
    return (
      <Tooltip label={tooltip} withArrow position={tooltipPosition}>
        {Component}
      </Tooltip>
    );
  }

  return Component;
};

export default AppButton;
