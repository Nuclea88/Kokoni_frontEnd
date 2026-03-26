import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Tag from './Tag';

describe('Tag component', () => {
  it('renders children correctly', () => {
    render(<Tag>Action</Tag>);
    expect(screen.getByText('Action')).toBeInTheDocument();
  });

  it('applies active classes when active is true', () => {
    render(<Tag active={true}>Action</Tag>);
    const button = screen.getByText('Action');
    expect(button.className).toContain('bg-secondary');
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Tag onClick={handleClick}>Action</Tag>);
    fireEvent.click(screen.getByText('Action'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
