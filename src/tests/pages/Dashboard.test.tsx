import { describe, it , expect, vi, beforeEach, beforeAll } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Dashboard from '../../pages/Dashboard';
import { UsersService } from '../../services/users';


vi.mock('../../services/users');

const mockUsers = [
  {id: "1", nome: 'Alice', sobrenome: 'Carvalho', email: 'alice@example.com', endereco: 'Rua Selva Alegra, 134', data_nascimento: "1996-01-03T14:28:31Z", data_abertura: "2018-05-16T15:50:23Z", valor_carteira: 3.83526236, endereco_carteira: "1Q956unZUz1RHVtUrZbEZSXgu65RLMF5h3"},
  {id: "2", nome: 'Michel', sobrenome: 'Troisgros', email: 'michel.troigros@example.com', endereco: 'Rua Alice, 534', data_nascimento: "1991-01-03T14:28:31Z", data_abertura: "2019-04-16T15:50:23Z", valor_carteira: 8.83526236, endereco_carteira: "9Q999unZUz1RHVtUrZbEZSXgu65RLMF5h3"}
];


describe('Dashboard', () => {
  beforeAll(() => {
  window.HTMLElement.prototype.scrollIntoView = function() {};
  });

  beforeEach(() => {
    vi.resetAllMocks();
  })

  it('shows loading state in first load', () => {
    render(<Dashboard />);
    // Check for Loading spinner by role
    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('renders a users table after fetch from API', async () => {
    (UsersService.getUsers as vi.Mock).mockResolvedValueOnce(mockUsers);

    render(<Dashboard />)

    await waitFor(() => {
      expect(screen.getByText('Alice')).toBeInTheDocument();
      expect(screen.getByText('Michel')).toBeInTheDocument();
    })
  });

  it('shows success toast when user is added', async () => {
    (UsersService.getUsers as vi.Mock).mockResolvedValueOnce(mockUsers);
    (UsersService.createUser as vi.Mock).mockResolvedValueOnce({ ...mockUsers[0], id: "3", nome: "Novo" });
    render(<Dashboard />);
  });
  //   it('filters users when searching', async () => {
  //   (UsersService.getUsers as vi.Mock).mockResolvedValueOnce(mockUsers);
  //   render(<Dashboard />);
  //   // Simulate search
  //   const searchInput = screen.getByPlaceholderText(/nome/i);
  //   fireEvent.change(searchInput, { target: { value: 'Alice' } });
  //   await waitFor(() => expect(screen.getByText('Alice')).toBeInTheDocument());
  //   expect(screen.queryByText('Michel')).not.toBeInTheDocument();
  // });

  it('opens and closes AddModal', async () => {
    (UsersService.getUsers as vi.Mock).mockResolvedValueOnce(mockUsers);
    render(<Dashboard />);
    // Open modal

    await waitFor(() => {
      expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument();
    })

    const addBtn = screen.getByTestId('add-wallet-btn')

    fireEvent.click(addBtn);

    expect(screen.getByTestId('add-user-modal')).toBeInTheDocument();
    
   const cancelBtn = screen.getByTestId('add-modal-cancel-btn');

   fireEvent.click(cancelBtn);

   expect(screen.getByTestId('add-user-modal')).toHaveClass('hidden');
   
  });
})