import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import {describe, it, expect, vi } from 'vitest';
import Header from '../../components/Header';

describe('Header', () => {
  const mockSetActiveModal = vi.fn();
  
  it('renders title correctly', () => {
    render(<Header setActiveModal={mockSetActiveModal} />)

    expect(screen.getByRole('heading', { name: /BTC Carteiras/i })).toBeInTheDocument();
  })

  it('renders button with the correct text', () => {
    render(<Header setActiveModal={mockSetActiveModal} />)

    expect(screen.getByRole('button', { name: /Adicionar carteira/i })).toBeInTheDocument();
  })

  it('calls onClick function on Button component', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(
      <div className="header">
        <h2 className="H2Bold">BTC Carteiras</h2>
        <button onClick={handleClick}>Adicionar Carteira</button>
      </div>
    )

    await user.click(
      screen.getByRole('button', { name: /Adicionar Carteira/i } )
    )
    expect(handleClick).toHaveBeenCalledTimes(1);

  })
})