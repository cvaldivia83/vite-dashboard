import { render, screen, waitFor } from "@testing-library/react";
import DeleteModal from "../../components/Modal/DeleteModal";
import { expect, it, describe, vi } from 'vitest';
import "@testing-library/jest-dom";

const mockSetActiveModal = vi.fn();
const mockOnDeleteUser = vi.fn();
const mockSelectedUser = {
  id: "1",
  nome: "Alice",
  sobrenome: 'Campbell',
  email: "ali.camp@gmail.com",
  endereco: 'Rua Visconde de Piraja, 58',
  data_nascimento: "2000-10-23T02:00:07Z",
  data_abertura: "2017-11-26T19:00:34Z",
  valor_carteira: 3.73945587,
  endereco_carteira: "1DYp6uTvgGhswNHaPctqCzXBaXzQUiiDMJ"
};

describe("DeleteModal", () => {
  it('should render modal with title, texts, and buttons', async () => {
    render(
      <DeleteModal
        isOpen={true}
        setActiveModal={mockSetActiveModal}
        selectedUser={mockSelectedUser}
        onDeleteUser={mockOnDeleteUser}
      />
    );

    // title
    expect(screen.getByRole('heading', { level: 3, name: 'Excluir carteira' })).toBeInTheDocument();

    // paragraphs
    expect(screen.getByText('Tem certeza que deseja excluir essa Carteira?')).toBeInTheDocument();
    expect(screen.getByText('Esta ação não poderá ser desfeita.')).toBeInTheDocument();

    // buttons
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Excluir/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Cancelar/i })).toBeInTheDocument();
    });
  });
});