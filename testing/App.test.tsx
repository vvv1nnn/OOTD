//This page makes basic snapshot tests for our main pages. - Adriana
// TODO: come back to make the one for Profile page, without it beign attached to our firebase DB yet it's really hard to test.
import React from 'react'
import renderer from 'react-test-renderer'
import { describe, expect, test } from '@jest/globals'
import Friends from '@/app/(tabs)/friends'

describe('Friends component', () => {
  it('renders the component correctly', () => {
    const tree = renderer.create(<Friends />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})

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
