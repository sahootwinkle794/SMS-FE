"use client";

import { useWindowScroll } from "@mantine/hooks";
import { Affix, Transition, ActionIcon } from "@mantine/core";
import { IconArrowUp } from "@tabler/icons-react";

export default function ScrollToTop() {
  const [scroll, scrollTo] = useWindowScroll();

  return (
    <Affix position={{ bottom: 30, right: 30 }}>
      <Transition transition="pop" duration={300} mounted={scroll.y > 300}>
        {(styles) => (
          <ActionIcon
            size={55}
            radius="xl"
            onClick={() => scrollTo({ y: 0 })}
            style={styles}
            className="scroll-btn"
          >
            <IconArrowUp size={26} className="arrow-icon" />
          </ActionIcon>
        )}
      </Transition>
    </Affix>
  );
}