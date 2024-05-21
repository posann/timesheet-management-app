import { ProjectResponseData } from "@/types";
import { Duration } from "@/utils/duration";
import { AddActivityData } from "@/utils/network/add-activity";
import { GetProject } from "@/utils/network/get-project";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Flex,
  Select,
  Badge,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ToastComponent from "../toast";

const AddActivityModal = ({
  isOpen,
  onClose,
  id,
}: {
  isOpen: boolean;
  onClose: () => void;
  id: number;
}) => {
  const [newActivity, setNewActivity] = useState({
    title: "",
    name: "",
    dateStart: "",
    dateEnd: "",
    timeStart: "",
    timeEnd: "",
  });

  const [isValid, setIsValid] = useState(false);

  const [project, setProject] = useState<ProjectResponseData[]>([]);
  const [selectedProject, setSelectedProject] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewActivity((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [status, setStatus] = useState<number | null>(null);

  const handleSuccess = () => setStatus(1);
  const handleError = () => setStatus(2);
  const handleLoading = () => setStatus(3);

  const handleAdd = async () => {
    await handleLoading();
    const duration = Duration(
      newActivity.timeStart.toString(),
      newActivity.timeEnd.toString()
    );
    const data: {
      title: string;
      id_project: number;
      id_employee: number;
      dateStart: string;
      dateEnd: string;
      timeStart: string;
      timeEnd: string;
      duration: string;
    } = {
      title: newActivity.title,
      id_project: Number(selectedProject),
      id_employee: id,
      dateStart: newActivity.dateStart,
      dateEnd: newActivity.dateEnd,
      timeStart: newActivity.timeStart,
      timeEnd: newActivity.timeEnd,
      duration: duration.toString(),
    };

    try {
      AddActivityData(
        data.title,
        data.id_project,
        data.id_employee,
        data.dateStart,
        data.dateEnd,
        data.timeStart,
        data.timeEnd,
        data.duration
      );

      await handleSuccess();
    } catch (error) {
      handleError();
      console.error(error);
    }

    onClose();
  };

  useEffect(() => {
    const fetchDataNameProject = async () => {
      try {
        const response = await GetProject();
        setProject(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    // Validasi semua input
    const isInputValid =
      newActivity.title !== "" &&
      selectedProject !== "" &&
      newActivity.dateStart !== "" &&
      newActivity.dateEnd !== "" &&
      newActivity.timeStart !== "" &&
      newActivity.timeEnd !== "";

    setIsValid(isInputValid);

    fetchDataNameProject();
  }, [newActivity, selectedProject, status]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Tambah Kegiatan Baru</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel fontSize="sm">Judul Kegiatan</FormLabel>
            <Input
              name="title"
              value={newActivity.title}
              onChange={handleInputChange}
              required
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel fontSize="sm">Nama Proyek</FormLabel>
            <Select
              placeholder="Pilih Nama Proyek"
              name="name"
              value={selectedProject}
              onChange={(e) => {
                setSelectedProject(e.target.value);
              }}
              required
            >
              {project.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </Select>
          </FormControl>
          <Flex gap={4} mt={4} direction={{ base: "column", md: "row" }}>
            <FormControl>
              <FormLabel fontSize="sm">Tanggal Mulai</FormLabel>
              <Input
                type="date"
                name="dateStart"
                value={newActivity.dateStart}
                onChange={handleInputChange}
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel fontSize="sm">Tanggal Selesai</FormLabel>
              <Input
                type="date"
                name="dateEnd"
                value={newActivity.dateEnd}
                onChange={handleInputChange}
                required
              />
            </FormControl>
          </Flex>
          <Flex gap={4} mt={4} direction={{ base: "column", md: "row" }}>
            <FormControl>
              <FormLabel fontSize="sm">Waktu Mulai</FormLabel>
              <Input
                type="time"
                name="timeStart"
                value={newActivity.timeStart}
                onChange={handleInputChange}
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel fontSize="sm">Waktu Selesai</FormLabel>
              <Input
                type="time"
                name="timeEnd"
                value={newActivity.timeEnd}
                onChange={handleInputChange}
                required
              />
            </FormControl>
          </Flex>
        </ModalBody>
        <ModalFooter gap={3}>
          {!isValid && (
            <Badge size="lg" colorScheme="red">
              Lengkapi Semua
            </Badge>
          )}
          <Button size="sm" colorScheme="red" onClick={onClose}>
            Batal
          </Button>
          {isValid && (
            <Button size="sm" colorScheme="blue" onClick={handleAdd}>
              Simpan
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
      {status !== null && <ToastComponent status={status} />}
    </Modal>
  );
};

export default AddActivityModal;
