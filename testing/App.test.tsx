import renderer from 'react-test-renderer'
import { describe, expect, test } from '@jest/globals'
import { ref, onValue, query, orderByChild, update } from 'firebase/database'

import Feed from '@/app/(tabs)/feed'

describe('Feed component', () => {
  it('renders the component with dummy data correctly', () => {
    const tree = renderer.create(<Feed />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})

import App from '@/app/(tabs)/carousel'

describe('Carousel component', () => {
  it('renders the component with empty data', () => {
    const tree = renderer.create(<App />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
