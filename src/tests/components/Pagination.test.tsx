import { vi, describe, it, expect } from 'vitest';
import Dashboard from '../../pages/Dashboard';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { UsersService } from '../../services/users';

vi.mock('../../services/users');

const mockUsers = [
  {id: "1", nome: 'Alice', sobrenome: 'Carvalho', email: 'alice@example.com', endereco: 'Rua Selva Alegra, 134', data_nascimento: "1996-01-03T14:28:31Z", data_abertura: "2018-05-16T15:50:23Z", valor_carteira: 3.83526236, endereco_carteira: "1Q956unZUz1RHVtUrZbEZSXgu65RLMF5h3"},
  {id: "2", nome: 'Michel', sobrenome: 'Troisgros', email: 'michel.troigros@example.com', endereco: 'Rua Alice, 534', data_nascimento: "1991-01-03T14:28:31Z", data_abertura: "2019-04-16T15:50:23Z", valor_carteira: 8.83526236, endereco_carteira: "9Q999unZUz1RHVtUrZbEZSXgu65RLMF5h3"}
];

describe('Pagination', () => {
  it('changes page when pagination button is clicked', async () => {
    
    (UsersService.getUsers as vi.Mock).mockResolvedValueOnce(mockUsers);
    render(<Dashboard />);

    await waitFor(() => {
      expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument();
    })

    const pagination = await screen.getByTestId('pagination');

    expect(pagination).toBeInTheDocument();
  });
})