import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import "@testing-library/jest-dom";
import Input from '../../components/Modal/Input';

describe('Input component', () => {

  const testProps = {
    id: 'email',
    label: 'E-mail',
    placeholder: '',
    classname: 'custom-styles',
    type: 'text',
    value: '',
    onChange: vi.fn(),
    onBlur: vi.fn(),
    error: ''
  };

  it('hides label visually when placeholder is provided', () => {
    render(<Input {...testProps} placeholder="Enter email" />);

    const label = screen.getByText('E-mail');

    expect(label).toHaveClass('visually-hidden');
  })

  it('calls onChange when typing', () => {
    const handleChange = vi.fn();
    render(<Input {...testProps} onChange={handleChange} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test@gmail.com' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
  })

  it('calls onBlur when leaving Input', () => {
    const handleBlur = vi.fn();
    render(<Input {...testProps} onBlur={handleBlur} />);

    const input = screen.getByRole('textbox');
    fireEvent.blur(input);

    expect(handleBlur).toHaveBeenCalledTimes(1);
  })

  it('shows error message when error prop is passed', () => {
    render(<Input {...testProps} error="Campo obrigatório" />);

    expect(screen.getByText("Campo obrigatório")).toBeInTheDocument();
    expect(screen.getByText('Campo obrigatório')).toHaveClass('input-error');
  })
})