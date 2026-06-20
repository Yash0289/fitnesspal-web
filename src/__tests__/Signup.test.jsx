import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import Signup from '../pages/Signup'

const mockSignUp = vi.fn()
const mockInsert = vi.fn()

vi.mock('../services/supabase', () => ({
  supabase: {
    auth: {
      signUp: (...args) => mockSignUp(...args),
      getUser: vi.fn().mockResolvedValue({ data: { user: null } })
    },
    from: () => ({ insert: (...args) => mockInsert(...args) })
  }
}))

describe('Signup page', () => {
  it('allows a user to submit the signup form', async () => {
    mockSignUp.mockResolvedValue({ data: { user: { id: 'user-123' } }, error: null })
    mockInsert.mockResolvedValue({ data: {}, error: null })

    render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    )

    const user = userEvent.setup()
    await user.type(screen.getByPlaceholderText(/Enter your full name/i), 'Test User')
    await user.type(screen.getByPlaceholderText(/Enter your email/i), 'test@example.com')
    await user.type(screen.getByPlaceholderText(/Minimum 6 characters/i), 'password')
    await user.click(screen.getByRole('button', { name: /Create Account/i }))

    expect(mockSignUp).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password',
      options: expect.any(Object)
    })
    // ensure profile insert called with id from signUp
    expect(mockInsert).toHaveBeenCalledWith({
      id: 'user-123',
      name: 'Test User',
      email: 'test@example.com',
      goal: expect.any(String)
    })
  })
})
