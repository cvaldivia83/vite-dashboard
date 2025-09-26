import React from 'react';
import { userInterface, UserRowProps } from "../types/user";
import { ReactComponent as Pencil } from '../assets/pencil.svg';
import { ReactComponent as Bin } from '../assets/bin.svg';

const UserRow = ({user, setActiveModal, setSelectedUser}: UserRowProps) => {
  const [isNew, setIsNew] = React.useState(user.isNew);

  function setModal(user: userInterface, action: 'edit' | 'delete') {
    setSelectedUser(user);
    setActiveModal(action);
  }

  React.useEffect(() => {
    if (isNew) {
      const timer = setTimeout(() => {
        setIsNew(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isNew]);

  return (
    <tr className={isNew ? 'bg-green-100' : (Number.parseInt(user.id) % 2 === 0 ? 'bg-table' : 'bg-white')} key={user.id}>
      <td className="table-item p-2">{user.nome}</td>
      <td className="table-item">{user.sobrenome}</td>
      <td className="table-item">{user.email}</td>
      <td className="table-item">{user.valor_carteira}</td>
      <td className="table-item actions">
        <Pencil onClick={() => setModal(user, 'edit')} />
        <Bin onClick={() => setModal(user, 'delete')} />
      </td>
    </tr>
  )
}

export default UserRow;