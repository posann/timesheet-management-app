import { ReactNode } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { TabsUI } from "./tab";

export default function Navbar() {
  return (
    <>
      <Box px={8}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Box>
            <Text fontSize={"2xl"} fontWeight={700} color={"reds"}>
              Timesheet Management
            </Text>
          </Box>
        </Flex>
      </Box>
    </>
  );
}
