// FindFriends.test.tsx

import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import FindFriends from 'components/Friends/findFriends.tsx'

describe('<FindFriends />', () => {
  it('renders correctly', () => {
    const { getByPlaceholderText } = render(<FindFriends />)
    const searchInput = getByPlaceholderText('Search friends...')
    expect(searchInput).toBeDefined()
  })

  it('filters friends based on search input', () => {
    const { getByPlaceholderText, getByText } = render(<FindFriends />)
    const searchInput = getByPlaceholderText('Search friends...')

    // Simulate typing in the search input
    fireEvent.changeText(searchInput, 'A') // Should match Alice, Adriana

    // Check if only 'Alice' and 'Adriana' are displayed
    expect(getByText('Alice')).toBeDefined()
    expect(getByText('Adriana')).toBeDefined()
    expect(() => getByText('Bob')).toThrow() // Bob should not be found

    fireEvent.changeText(searchInput, 'E') // Should match Emma
    expect(getByText('Emma')).toBeDefined()
  })
})
