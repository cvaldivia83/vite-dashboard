import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Button from '../../components/Button';
import { describe, expect, it, vi } from 'vitest';

describe('Button component', () => {
  it('renders with the correct text', () => {
    render(<Button size="base" background="azul" color="branco" border text='Adicionar' onClick={() => {}} />)

    expect(screen.getByRole('button', { name: /adicionar/i })).toBeInTheDocument();
  })

  it('applies correct classes from props', () => {
    render(<Button text='Clique' background="azul" color="branco" size="base" border={true} onClick={() => {}} />)

    const button = screen.getByRole('button', { name: /clique/i })

    expect(button).toHaveClass('btn-base');
    expect(button).toHaveClass('bg-azul');
    expect(button).toHaveClass('text-white');
    expect(button).toHaveClass('border');
  })

  it('does not have border class when border is false', () => {
    render(<Button text='Clique' background="azul" color="branco" size="base" border={false} onClick={() => {}} />);

    const button = screen.getByRole('button', { name: /clique/i });

    expect(button).not.toHaveClass('btn-border');
  })

  it('calls the click function provided in props', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(<Button text='Adicionar Carteira' background="azul" color="branco" size="base" border={false} onClick={handleClick} />)

    await user.click(screen.getByRole('button', { name: /Adicionar Carteira/i }))
    expect(handleClick).toHaveBeenCalled();
  })
})