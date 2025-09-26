import { describe, it , expect, vi } from 'vitest';
import { render, screen } from "@testing-library/react"
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import SearchBar from '../../components/SearchBar';

describe('SearchBar component', () => {
  it('renders inputs correctly with placeholders', () => {
    render(<SearchBar setSubmittedQuery={vi.fn()} />)

    const nome = screen.getByPlaceholderText(/^Nome/i);
    const sobrenome = screen.getByPlaceholderText(/^Sobrenome/i);
    const email = screen.getByPlaceholderText(/e-mail/i);

    expect(nome).toBeInTheDocument();
    expect(sobrenome).toBeInTheDocument();
    expect(email).toBeInTheDocument();
  })

  it('renders button with search text', () => {
    render(<SearchBar setSubmittedQuery={vi.fn()} />)

    expect(screen.getByRole('button', { name: /Buscar/i })).toBeInTheDocument();
  })

  it('allows users to type into the inputs', async () => {
    const user = userEvent.setup();
    render(<SearchBar setSubmittedQuery={vi.fn()} />)

    const nome = screen.getByPlaceholderText(/^Nome/i) as HTMLInputElement
    const sobrenome = screen.getByPlaceholderText(/^Sobrenome/i) as HTMLInputElement
    const email = screen.getByPlaceholderText(/E-mail/i) as HTMLInputElement

    await user.type(nome, 'Maria')
    await user.type(sobrenome, 'Silva')
    await user.type(email, 'maria.silva@hotmail.com')

    expect(nome.value).toBe('Maria');
    expect(sobrenome.value).toBe('Silva')
    expect(email.value).toBe('maria.silva@hotmail.com')
  })

  // it('calls handleSearch function when button clicked', () => {

  // })
})