import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router';
import Explore from './Explore';
import mangaService from '../services/mangaService';

vi.mock('../services/mangaService', () => ({
  default: {
    search: vi.fn()
  }
}));
vi.mock('../services/trackerService', () => ({
  default: {
    add: vi.fn()
  }
}));

describe('Explore component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.IntersectionObserver = class IntersectionObserver {
      constructor() {}
      observe() {}
      unobserve() {}
      disconnect() {}
    };
  });

  it('renders correctly and allows searching', async () => {
    const mockMangas = [
      { externalId: '1', title: 'Naruto', author: 'Kishimoto', imageUrl: 'img.jpg', isAddedToLibrary: false }
    ];
    mangaService.search.mockResolvedValue(mockMangas);

    render(
      <MemoryRouter>
        <Explore />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText('Busca por título...');
    fireEvent.change(input, { target: { value: 'Naruto' } });

    await waitFor(() => {
      expect(mangaService.search).toHaveBeenCalledWith('Naruto', 0);
      expect(screen.getAllByText(/Kishimoto/i).length).toBeGreaterThan(0);
    });
  });
});
