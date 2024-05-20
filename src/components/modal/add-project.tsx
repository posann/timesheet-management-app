import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Select,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { AddProject } from "@/utils/network/add-project";

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

  const handleAddProyek = async () => {
    const response = await AddProject(name);
    onClose();
    location.reload();
  };

  return (
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
          <Button size="sm" colorScheme="blue" ml={3} onClick={handleAddProyek}>
            Simpan
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddProjectModal;
