import { Card, CardBody } from "@chakra-ui/react";

export const CardUI = ({ children }: { children: React.ReactNode }) => {
  return (
    <Card bg={"white"}>
      <CardBody>{children}</CardBody>
    </Card>
  );
};
