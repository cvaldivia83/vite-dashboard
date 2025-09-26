import { userInterface } from "./user";

interface TableProps {
  users: userInterface[] | null;
  setActiveModal: React.Dispatch<React.SetStateAction<'add' | 'edit' | 'delete' | null>>
  setSelectedUser: React.Dispatch<React.SetStateAction<userInterface | null>>;
}

export default TableProps;