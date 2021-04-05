import React from 'react'
import { render } from '@testing-library/react'
import LayoutComponent from './layout.component'

jest.mock('gatsby', () => ({
  Link: ({ children, to }: { children: any; to: string }) => <a href={to}>{children}</a>,
}))

describe('<Layout />', () => {
  it('should render child elements', () => {
    const { getByText } = render(
      <LayoutComponent>
        <button>Like</button>
      </LayoutComponent>,
    )
    const button = getByText('Like')

    expect(button).toBeInTheDocument()
  })
})
