import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Input from './Input';
import { User } from 'lucide-react';

describe('Input component', () => {
  it('renders correctly with given placeholder', () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('calls onChange when user types', () => {
    const handleChange = vi.fn();
    render(<Input placeholder="Search" onChange={handleChange} />);
    const input = screen.getByPlaceholderText('Search');
    fireEvent.change(input, { target: { value: 'test' } });
    expect(handleChange).toHaveBeenCalled();
  });

  it('renders with an icon if provided', () => {
    const { container } = render(<Input icon={User} placeholder="User" />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });
});
