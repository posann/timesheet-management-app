"use client";

import { BASE_URL_BACKEND } from "@/utils/constant";
import { AddEmployee } from "@/utils/network/add-employee";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightAddon,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { FormEvent, useState } from "react";
import { FaClock } from "react-icons/fa6";
import ToastComponent from "../toast";

export const Pengaturan = ({ name, rate }: { name: string; rate: number }) => {
  const [nameInput, setNameInput] = useState<string>(name);
  const [rateInput, setRateInput] = useState<number>(rate);
  const [isLoading, setIsLoading] = useState(false);

  const [status, setStatus] = useState<number | null>(null);

  const handleSuccess = () => setStatus(1);
  const handleError = () => setStatus(2);
  const handleLoading = () => setStatus(3);

  const handleButtonSimpan = async () => {
    setIsLoading(true);
    handleLoading();
    try {
      const response = await AddEmployee(nameInput, rateInput);
      handleSuccess();
    } catch (error) {
      console.log(error);
      handleError();
    } finally {
      setIsLoading(false);
      // Refresh the browser without using cache
      location.reload();
    }
  };

  return (
    <Flex minH={"70vh"} w={"full"} align={"center"} justify={"center"}>
      <Stack spacing={4} mx={"auto"} px={2}>
        <Box rounded={"lg"} bg={"white"} boxShadow={"lg"} p={4}>
          <Stack spacing={2}>
            <FormControl id="name" fontSize={"sm"}>
              <FormLabel fontSize={"sm"}>Nama Karyawan</FormLabel>
              <Input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
              />
            </FormControl>
            <FormControl id="rate" fontSize={"sm"}>
              <FormLabel fontSize={"sm"}>Rate Pembayaran</FormLabel>
              <InputGroup>
                <Input
                  type="number"
                  value={rateInput}
                  onChange={(e) => setRateInput(Number(e.target.value))}
                />
                <InputRightAddon>
                  <FaClock color={"blue.400"} />
                </InputRightAddon>
              </InputGroup>
            </FormControl>
            <Stack spacing={10}>
              <Button
                colorScheme={"blue"}
                disabled={isLoading}
                onClick={handleButtonSimpan}
              >
                {isLoading ? "Loading..." : "Simpan"}
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
      {status !== null && <ToastComponent status={status} />}
    </Flex>
  );
};
