import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'

const mockGetUser = vi.fn()
const mockSignOut = vi.fn()

vi.mock('../services/supabase', () => ({
  supabase: {
    auth: {
      getUser: () => mockGetUser(),
      signOut: () => mockSignOut()
    }
  }
}))

describe('Dashboard page', () => {
  it('shows welcome with email and calls signOut on logout', async () => {
    mockGetUser.mockResolvedValue({ data: { user: { email: 'me@example.com' } } })
    mockSignOut.mockResolvedValue({ error: null })

    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    )

    expect(await screen.findByText(/Welcome back/i)).toBeInTheDocument()
    expect(screen.getByText(/me@example.com/)).toBeInTheDocument()

    const user = userEvent.setup()
    await user.click(screen.getByRole('button', { name: /Sign Out/i }))
    expect(mockSignOut).toHaveBeenCalled()
  })
})
