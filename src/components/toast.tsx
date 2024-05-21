import React from "react";
import { Box, useToast } from "@chakra-ui/react";

const ToastComponent = ({ status }: { status: number }) => {
  const toast = useToast();

  React.useEffect(() => {
    if (status === 1) {
      toast({
        title: "Success",
        description: "Operation successful",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
      setTimeout(() => {
        toast.closeAll();
        location.reload();
      }, 1200);
    } else if (status === 2) {
      toast({
        title: "Error",
        description: "Something went wrong",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
    } else if (status === 3) {
      toast({
        title: "Loading",
        description: "Please wait",
        status: "loading",
        duration: 400,
        isClosable: true,
      });
    }
  }, [status]);
  return <></>;
};

export default ToastComponent;
