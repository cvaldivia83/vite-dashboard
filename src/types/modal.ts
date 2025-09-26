import { userInterface, userPagination } from "./user";

interface ModalProps {
  isOpen: boolean;
  setActiveModal: React.Dispatch<React.SetStateAction<'add' | 'edit' | 'delete' | null>>;
  onAddUser?: (formData: { nome: string; sobrenome: string; email: string; valor_carteira: string }) => void;
}

interface EditModalProps {
  isOpen: boolean;
  setActiveModal: React.Dispatch<React.SetStateAction<'add' | 'edit' | 'delete' | null>>;
  selectedUser: userInterface | null;
  onEditUser: (userId: string, updatedUser: object) => void;
}

interface DeleteModalProps {
  isOpen: boolean;
  setActiveModal: React.Dispatch<React.SetStateAction<'add' | 'edit' | 'delete' | null>>;
  selectedUser: userInterface | null;
  onDeleteUser: (userId: string) => void;
}

export { EditModalProps, ModalProps, DeleteModalProps };