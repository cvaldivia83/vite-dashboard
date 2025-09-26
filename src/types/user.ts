export interface userInterface {
  id: string;
  nome: string;
  sobrenome: string;
  email: string;
  endereco: string;
  data_nascimento: string;
  data_abertura: string;
  valor_carteira: number;
  endereco_carteira: string;
  isNew?: boolean;
}

export interface userPagination {
  first?: number;
  prev?: number | null;
  next?: number | null;
  last?: number;
  pages?: number;
  items?: number;
  data: userInterface[];
}

export interface UserRowProps {
  user: userInterface;
  setActiveModal:  React.Dispatch<React.SetStateAction<'add' | 'edit' | 'delete' | null>>;
  setSelectedUser: React.Dispatch<React.SetStateAction<userInterface | null>>;
}