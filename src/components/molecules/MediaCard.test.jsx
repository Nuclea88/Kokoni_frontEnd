import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import MediaCard from './MediaCard';

describe('MediaCard component', () => {
  it('renders correctly with given props', () => {
    render(<MediaCard title="Naruto" subtitle="Manga" cover="http://example.com/cover.jpg" />);
    expect(screen.getByText('Naruto')).toBeInTheDocument();
    expect(screen.getByText('Manga')).toBeInTheDocument();
  });

  it('renders badge if provided', () => {
    render(<MediaCard title="One Piece" badge="NEW" cover="http://example.com/cover.jpg" />);
    expect(screen.getByText('NEW')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<MediaCard title="Bleach" onClick={handleClick} cover="cover.jpg" />);
    fireEvent.click(screen.getByText('Bleach'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
