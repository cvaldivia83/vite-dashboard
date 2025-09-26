import React from 'react';
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import Table from "../components/Table";
import Footer from '../components/Footer';
import Pagination from '../components/Pagination';
import AddModal from '../components/Modal/AddModal';
import EditModal from '../components/Modal/EditModal';
import DeleteModal from '../components/Modal/DeleteModal';
import Loading from '../components/Loading';

import { userInterface } from '../types/user';
import { SearchQuery } from '../types/search';
import { UsersService } from '../services/users';
import { Toast } from '../types/toast';
import ToastSuccess from '../components/Toast/ToastSuccess';
import ToastWarning from '../components/Toast/ToastWarning';


const Dashboard = () => {
  const [users, setUsers] = React.useState<userInterface[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [activeModal, setActiveModal] = React.useState<'add' | 'edit' | 'delete' | null>(null);
  const [selectedUser, setSelectedUser] = React.useState<userInterface | null>(null);
  const [toast, setToast] = React.useState<Toast>({ show: false, message: '', status: 0});
  const [submittedQuery, setSubmittedQuery] = React.useState<SearchQuery>({
    nome: '',
    sobrenome: '',
    email: ''
  });
  const [page, setPage] = React.useState<number>(1);
  const items_per_page = 10;
  // const items = users?.items || 0;
  const items = users.length;
  // const pages = users?.pages || 1;
  const pages = Math.ceil(items / items_per_page)

  const paginatedUsers = users.slice((page - 1) * items_per_page, page * items_per_page);
  const tableRef = React.useRef<HTMLDivElement>(null);


  // Loads users from API
  React.useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);

      try {
        const data: userInterface[] = await UsersService.getUsers(submittedQuery, page);
        setUsers(data);
      } catch(error) {
        console.error('Error searching users', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [submittedQuery, page])

  // when page changes, scroll to table component
  React.useEffect(() => {
    if(tableRef.current) {
      tableRef.current.scrollIntoView({ behavior: 'smooth'});
    }
  }, [page])

  // functions to handle users
  const handleAddUser = async (formData: { nome: string; sobrenome: string; email: string; valor_carteira: string }) => {
    setLoading(true);
    try {
      const newUser = await UsersService.createUser(formData);

      setUsers((prevUsers) => [{ ...newUser, isNew: true }, ...prevUsers]);
      setToast({ show: true, message: 'Usuário adicionado com sucesso.', status: 200 });
      setActiveModal(null);
    } catch (error) {
      setToast({ show: true, message: 'Erro ao adicionar usuário.', status: 400 });
    } finally {
      setLoading(false);
    }
  }

  const handleEditUser = async (userId: string, updatedUser: object) => {
   
    setLoading(true);
    try {
      const editedUser = await UsersService.updateUser(userId, updatedUser);
  
      setUsers(prevUsers => prevUsers.map(user => user.id === userId ? { ...user, ...editedUser } : user));
      setToast({ show: true, message: 'Usuário atualizado com sucesso.', status: 200 });
      setActiveModal(null);
    } catch(error) {
      setToast({ show: true, message: 'Não foi possível editar o usuário.', status: 400 });
    } finally {
      setLoading(false);
    }
  }

  const handleDeleteUser = async (userId: string) => {
    setLoading(true);
    try {
      await UsersService.deleteUser(userId);
      setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
      setToast({ show: true, message: 'Usuário deletado com sucesso', status: 200 });
      setActiveModal(null);
    } catch(error) {
      setToast({ show: true, message: 'Erro: usuário não apagado.', status: 400});
    } finally {
      setLoading(false);
    }
  }

  
  { if (loading) return (<Loading />) }
  if (users) return (
    <>
      <main className="dashboard">
        <Navbar />
        <div className="content">
          <Header setActiveModal={setActiveModal} />
          <SearchBar setSubmittedQuery={setSubmittedQuery} />
          <div className="board" ref={tableRef}>
            { users ? <Table users={paginatedUsers} setActiveModal={setActiveModal} setSelectedUser={setSelectedUser} /> : <h2 className='text-center font-semibold'>Estamos com problemas técnicos. Por favor, voltar mais tarde.</h2> }
             <div className="w-full h-0.5 mt-8 mb-2 bg-table"></div>
             <Pagination totalPages={pages} currentPage={page} items={items} onPageChange={setPage} />
          </div>
          <Footer />

          <div className="toast-container">
            {toast.show && (
              toast.status === 200
              ? <ToastSuccess message={toast.message} setToast={setToast} />
              : <ToastWarning message={toast.message} setToast={setToast} />
            )}
          </div>
        </div>
      
      </main>

      

      <div className={activeModal !== null ? "modal-container" : ""}>
        
        <AddModal isOpen={activeModal === "add"} setActiveModal={setActiveModal} onAddUser={handleAddUser} />

        <EditModal isOpen={activeModal === "edit"} setActiveModal={setActiveModal} selectedUser={selectedUser} onEditUser={handleEditUser} />

        <DeleteModal isOpen={activeModal === "delete"} selectedUser={selectedUser} setActiveModal={setActiveModal} onDeleteUser={handleDeleteUser} />
      
      </div>
    </>
  


  )
}

export default Dashboard;