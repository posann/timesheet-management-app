import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { AddProject } from "@/utils/network/add-project";
import ToastComponent from "../toast";

const AddProjectModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [name, setName] = useState("");

  const handleNameProyek = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const [status, setStatus] = useState<number | null>(null);

  const handleSuccess = () => setStatus(1);
  const handleError = () => setStatus(2);
  const handleLoading = () => setStatus(3);

  const handleAddProyek = async () => {
    await handleLoading();
    if (name !== "") {
      const promise = await AddProject(name);
      await handleSuccess();
      onClose();
    } else {
      await handleError();
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Tambah Kegiatan Baru</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel fontSize="sm">Nama Proyek</FormLabel>
              <Input name="name" value={name} onChange={handleNameProyek} />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button size="sm" colorScheme="red" onClick={onClose}>
              Batal
            </Button>
            <Button
              size="sm"
              colorScheme="blue"
              ml={3}
              onClick={handleAddProyek}
            >
              Simpan
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {status !== null && <ToastComponent status={status} />}
    </>
  );
};

export default AddProjectModal;
