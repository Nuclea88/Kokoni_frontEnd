import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import MangaListItem from './MangaListItem';

describe('MangaListItem component', () => {
  it('renders title and author correctly', () => {
    render(<MangaListItem title="Naruto" author="Masashi Kishimoto" cover="http://example.com/cover.jpg" />);
    expect(screen.getByText('Naruto')).toBeInTheDocument();
    expect(screen.getByText('Masashi Kishimoto')).toBeInTheDocument();
  });

  it('renders genres correctly', () => {
    render(
      <MangaListItem 
        title="Naruto" 
        author="Kishimoto" 
        cover="http://example.com/cover.jpg" 
        genres={['Action', 'Adventure']}
      />
    );
    expect(screen.getByText('Action')).toBeInTheDocument();
    expect(screen.getByText('Adventure')).toBeInTheDocument();
  });

  it('calls onAddClick when the list button is clicked', () => {
    const handleAdd = vi.fn();
    const { container } = render(
      <MangaListItem 
        title="Naruto" 
        author="Kishimoto" 
        cover="cover.jpg" 
        onAddClick={handleAdd} 
      />
    );
    const button = container.querySelector('button'); 
    if (button) fireEvent.click(button);
    expect(handleAdd).toHaveBeenCalledTimes(1);
  });
});
