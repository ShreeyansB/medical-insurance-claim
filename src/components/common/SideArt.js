import React from "react";
import { Box, Heading, Show, VStack } from "@chakra-ui/react";
import { HStack } from "@chakra-ui/react";
import FadeIn from "./FadeIn";

const SideArt = () => {
  return (
    <Show breakpoint="(min-width: 950px)">
      <Box h="100vh" position="fixed" left="0" top="0">
        <HStack h="100%" p={0}>
          <Box bg="green.300" h="100%" w="450px" px="2.9rem" pt="5rem">
            <VStack justify="space-between" h="100%">
              <Heading
                mt="3.4rem"
                color="green.600"
                opacity={0.8}
                fontSize="3xl"
              >
                File a medical claim with ease and complete transparency.
              </Heading>
              <FadeIn>
                <picture
                  style={{
                    opacity: 0.85,
                    pointerEvents: "none",
                  }}
                >
                  <source
                    srcSet={process.env.PUBLIC_URL + "/assets/sideart.webp"}
                    type="image/webp"
                  />
                  <source
                    srcSet={process.env.PUBLIC_URL + "/assets/sideart.png"}
                    type="image/png"
                  />
                  <img
                    src={process.env.PUBLIC_URL + "/assets/sideart.png"}
                    alt="Home Art"
                    width="400rem"
                  />
                </picture>
              </FadeIn>
            </VStack>
          </Box>
        </HStack>
      </Box>
    </Show>
  );
};

export default SideArt;
