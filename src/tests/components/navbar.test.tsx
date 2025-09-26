import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Navbar from '../../components/Navbar';
import { describe, expect, it} from 'vitest';

describe('Navbar component', () => {
  it('renders navbar component', () => {
    render(<Navbar />)

    expect(screen.getByRole('navigation')).toBeInTheDocument();
  })
})