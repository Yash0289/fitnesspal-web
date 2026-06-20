import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Profile from '../pages/Profile'

const mockGetUser = vi.fn()
const mockSingle = vi.fn()

vi.mock('../services/supabase', () => ({
  supabase: {
    auth: {
      getUser: () => mockGetUser()
    },
    from: () => ({
      select: () => ({
        eq: () => ({
          single: () => mockSingle()
        })
      })
    })
  }
}))

describe('Profile page', () => {
  it('renders profile data when DB returns a row', async () => {
    mockGetUser.mockResolvedValue({ data: { user: { id: 'user-1', email: 'me@example.com' } } })
    mockSingle.mockResolvedValue({ data: { name: 'Test User', email: 'me@example.com', goal: 'Stay Active' }, error: null })

    render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>
    )

    expect(screen.getByText(/Your Profile/i)).toBeInTheDocument()
    await waitFor(() => expect(screen.getByText('Test User')).toBeInTheDocument())
    expect(screen.getByText('me@example.com')).toBeInTheDocument()
    expect(screen.getByText('Stay Active')).toBeInTheDocument()
  })
})
