import {
  Box,
  Button,
  Heading,
  HStack,
  Icon,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { useTransaction } from "./../../contexts/Transaction";
import Tilt from "react-parallax-tilt";

import { FaEthereum } from "react-icons/fa";
import { FcSimCardChip } from "react-icons/fc";
import { useAuth } from "../../contexts/Auth";
import { useEffect } from "react";

const WalletCard = () => {
  const meshGradient = {
    insured: {
      backgroundImage: `background-color:#9b99ff;
      background-image:
      radial-gradient(at 87% 3%, hsla(129,76%,77%,1) 0px, transparent 50%),
      radial-gradient(at 95% 87%, hsla(227,88%,70%,1) 0px, transparent 50%),
      radial-gradient(at 84% 69%, hsla(223,81%,62%,1) 0px, transparent 50%),
      radial-gradient(at 44% 60%, hsla(338,70%,78%,1) 0px, transparent 50%),
      radial-gradient(at 10% 87%, hsla(237,78%,65%,1) 0px, transparent 50%),
      radial-gradient(at 13% 38%, hsla(259,69%,76%,1) 0px, transparent 50%),
      radial-gradient(at 60% 28%, hsla(154,91%,78%,1) 0px, transparent 50%),
      url(https://grainy-gradients.vercel.app/noise.svg);`,
      bg: "#9b99ff",
    },
    hospital: {
      backgroundImage: `radial-gradient(at 87% 57%, hsla(130,63%,71%,1) 0px, transparent 50%),
      radial-gradient(at 92% 49%, hsla(237,86%,69%,1) 0px, transparent 50%),
      radial-gradient(at 4% 17%, hsla(140,77%,60%,1) 0px, transparent 50%),
      radial-gradient(at 40% 75%, hsla(129,83%,61%,1) 0px, transparent 50%),
      radial-gradient(at 43% 25%, hsla(6,96%,67%,1) 0px, transparent 50%),
      radial-gradient(at 1% 37%, hsla(193,86%,64%,1) 0px, transparent 50%),
      radial-gradient(at 79% 61%, hsla(123,86%,70%,1) 0px, transparent 50%),
      url(https://grainy-gradients.vercel.app/noise.svg)
      ;`,
      bg: "#ff99ce",
    },
    insurer: {
      backgroundImage: `radial-gradient(at 43% 19%, hsla(344,83%,57%,1) 0px, transparent 50%),
      radial-gradient(at 24% 38%, hsla(43,83%,57%,1) 0px, transparent 50%),
      radial-gradient(at 56% 63%, hsla(63,83%,57%,1) 0px, transparent 50%),
      radial-gradient(at 80% 85%, hsla(15,83%,57%,1) 0px, transparent 50%),
      radial-gradient(at 26% 86%, hsla(10,83%,57%,1) 0px, transparent 50%),
      radial-gradient(at 96% 5%, hsla(344,83%,57%,0.6) 0px, transparent 50%),
      radial-gradient(at 84% 39%, hsla(296,83%,57%,1) 0px, transparent 50%),
      url(https://grainy-gradients.vercel.app/noise.svg);`,
      bg: "hsla(346,77%,55%,1)",
    },
  };

  const { connectWallet, connectedAccount, balance } = useTransaction();

  const { user, role } = useAuth();

  const handleConnectWallet = () => {
    connectWallet();
  };

  const isConnected = connectedAccount !== "";

  useEffect(() => {}, []);

  if (!isConnected)
    return (
      <Box>
        <Tooltip
          label="Please only select the address which is linked to your account to avoid any problems."
          px={3}
          py={2}
          lineHeight="1.2"
          borderRadius="2xl"
        >
          <Button
            colorScheme="whatsapp"
            variant="solid"
            fontFamily="Roboto Mono"
            onClick={handleConnectWallet}
            fontSize="lg"
            py="4rem"
            px="3rem"
          >
            Connect
            <br />
            Wallet
          </Button>
        </Tooltip>
      </Box>
    );
  else
    return (
      <Box maxW="330px" minH="140px">
        <Tilt
          scale={1.07}
          transitionSpeed={2000}
          tiltMaxAngleX={17}
          tiltMaxAngleY={17}
          glareEnable={true}
          glareColor="violet"
          glareBorderRadius="1.2rem"
        >
          <Box
            bg={meshGradient[role] ? meshGradient[role].bg : "blackAlpha.50"}
            backgroundImage={
              meshGradient[role] ? meshGradient[role].backgroundImage : ""
            }
            filter="brightness(100%) contrast(160%) saturate(90%);"
            borderRadius="1.2rem"
            _hover={{ shadow: "xl" }}
          >
            <VStack
              borderRadius="1rem"
              w="100%"
              align="start"
              justify="start"
              px={4}
              py={3}
            >
              {/* Stuff */}

              <Box color="black" w="100%">
                <HStack align="start" justify="space-between" spacing={10}>
                  <Text
                    fontWeight="bold"
                    fontSize="0.9rem"
                    fontFamily="Plus Jakarta Sans"
                    opacity={0.37}
                    color="blue.800"
                    isTruncated
                    maxW="13rem"
                  >
                    {user.email}
                  </Text>
                  <Icon
                    as={FcSimCardChip}
                    h="3rem"
                    w="3rem"
                    opacity={0.6}
                    transform="translate(0px, -3px)"
                  />
                </HStack>
                <HStack mt={3} mb={3} opacity={0.53}>
                  <Icon as={FaEthereum} h="2.1rem" w="2.1rem" opacity={1} />
                  <Text
                    fontSize="2.07rem"
                    fontFamily="Roboto Mono"
                    fontWeight="bold"
                  >
                    {balance === -1
                      ? "..."
                      : balance.toString().substr(0, 7) + "E"}
                  </Text>
                </HStack>
                <HStack
                  mt={1}
                  ms="0.4rem"
                  spacing={8}
                  opacity={0.5}
                  justify="space-between"
                >
                  <Box>
                    <Heading
                      fontSize="0.68rem"
                      fontWeight="black"
                      color="teal.800"
                    >
                      ADDRESS
                    </Heading>
                    <Text
                      fontWeight="bold"
                      fontFamily="Roboto Mono"
                      fontSize="0.92rem"
                    >
                      {connectedAccount.substr(0, 8) +
                        "..." +
                        connectedAccount.substr(connectedAccount.length - 6, 6)}
                    </Text>
                  </Box>
                  <Box pe={2}>
                    <Heading
                      fontSize="0.68rem"
                      fontWeight="black"
                      color="teal.800"
                    >
                      ROLE
                    </Heading>
                    <Text
                      fontWeight="bold"
                      fontFamily="Roboto Mono"
                      fontSize="0.92rem"
                    >
                      {role}
                    </Text>
                  </Box>
                </HStack>
              </Box>
            </VStack>
          </Box>
        </Tilt>
      </Box>
    );
};

export default WalletCard;
