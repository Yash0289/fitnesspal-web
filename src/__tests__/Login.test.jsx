import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import Login from '../pages/Login'

const mockSignIn = vi.fn()

vi.mock('../services/supabase', () => ({
  supabase: {
    auth: {
      signInWithPassword: (...args) => mockSignIn(...args),
      getUser: vi.fn().mockResolvedValue({ data: { user: null } })
    }
  }
}))

describe('Login page', () => {
  it('allows a user to submit the login form', async () => {
    mockSignIn.mockResolvedValue({ data: { session: { user: { id: 'user-1' } } }, error: null })

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    )

    const user = userEvent.setup()
    await user.type(screen.getByLabelText(/Email/i), 'test@example.com')
    await user.type(screen.getByLabelText(/Password/i), 'password')
    await user.click(screen.getByRole('button', { name: /Sign In/i }))

    expect(mockSignIn).toHaveBeenCalledWith({ email: 'test@example.com', password: 'password' })
  })
})
