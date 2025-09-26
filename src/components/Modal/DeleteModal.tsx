import Button from '../Button';
import { ReactComponent as Delete } from '../../assets/delete.svg';
import { DeleteModalProps } from '../../types/modal';



const DeleteModal = ({ isOpen, setActiveModal, selectedUser, onDeleteUser }: DeleteModalProps) => {

  // if (!selectedUser) return (<p>Usuário não encontrado</p>);

  
  if (selectedUser) return (  
    <div className={`modal ${isOpen ? "" : "hidden"}`}>
      <Delete className="modal-icon" />
      <h3 className="H3Bold">Excluir carteira</h3>
      <p className="modal-p">Tem certeza que deseja excluir essa Carteira?</p>
      <p className="modal-p">Esta ação não poderá ser desfeita.</p>
      <Button size="large" color="branco" background="vermelho" text="Excluir" border={false} onClick={() => onDeleteUser(selectedUser.id)} type="submit" />
      <Button size="large" color="azul" background="branco" text="Cancelar" border={false} onClick={() => setActiveModal(null)} type="button" />
    </div>
  );
}

export default DeleteModal;