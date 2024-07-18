import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import Quiz from './quiz';

jest.mock('axios');

describe('Quiz Component', () => {
  it('renders quiz and handles form submission', async () => {
    const jwt = 'fake-jwt-token';

    axios.post.mockResolvedValue({ data: { access_token: 'fake-access-token' } });

    render(<Quiz jwt={jwt} />);

    expect(screen.getByText('Create your custom quiz')).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText('firstname'), {
      target: { value: 'John' },
    });
    fireEvent.change(screen.getByPlaceholderText('lastname'), {
      target: { value: 'Doe' },
    });
    fireEvent.change(screen.getByPlaceholderText('email@email.com'), {
      target: { value: 'john.doe@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('********'), {
      target: { value: 'password' },
    });
    fireEvent.change(screen.getAllByPlaceholderText('********')[1], {
      target: { value: 'password' },
    });

    fireEvent.submit(screen.getByRole('button', { name: 'REGISTER' }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(1);
    });

    expect(screen.getByText('Congratulations, the quiz is over')).toBeInTheDocument();
  });
});
