import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AuthContext, AuthProvider } from './AuthContext';
import authService from '../services/authService';
import React from 'react';

vi.mock('../services/authService', () => ({
  default: {
    getCurrentUser: vi.fn(),
    login: vi.fn(),
    register: vi.fn()
  }
}));

const TestComponent = () => {
    return (
        <AuthContext.Consumer>
            {(value) => (
                <div>
                    <span data-testid="auth-status">{value.isAuthenticated ? 'Logged In' : 'Logged Out'}</span>
                    <span data-testid="user-name">{value.user?.username || 'Guest'}</span>
                </div>
            )}
        </AuthContext.Consumer>
    );
};

describe('AuthContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('provides authentication state correctly when logged in', async () => {
    localStorage.setItem('kokoni_token', 'fake-token');
    authService.getCurrentUser.mockResolvedValue({ username: 'testUser' });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(await screen.findByText('Logged In')).toBeInTheDocument();
    expect(screen.getByTestId('user-name').textContent).toBe('testUser');
  });

  it('logs out and clears token if getCurrentUser fails', async () => {
     localStorage.setItem('kokoni_token', 'invalid-token');
     authService.getCurrentUser.mockRejectedValue(new Error('Invalid token'));

     render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      expect(await screen.findByText('Logged Out')).toBeInTheDocument();
      expect(localStorage.getItem('kokoni_token')).toBeNull();
  });
});
