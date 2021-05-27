import React from 'react'
import { render } from '@testing-library/react'
import NextDueBadge from './next-due-badge.component'
import { HistoryItem } from '@http/fetch-customer'
import { differenceInDays, isPast, formatDistanceToNow } from 'date-fns'

jest.mock('date-fns')

const stubHistoryItem: HistoryItem = {
  _id: '123',
  compressor: 'Hertz 123',
  invoiceMedia: 'https://foo.bar.baz.com',
  invoiceNumber: '123443',
  jobDescription: 'A test description',
  jobSheetMedia: 'https://foo.bar.baz.com',
  nextDueDate: new Date('2021-05-28T00:00:00.000Z'),
  powraMedia: 'https://foo.bar.baz.com',
  purchaseOrderNumber: '123',
  quoteMedia: 'https://foo.bar.baz.com',
  ramMedia: 'https://foo.bar.baz.com',
  supplier: 'Hertz',
  notRequiredInputs: [],
}

beforeEach(() => {
  jest.resetAllMocks()
})

describe('NextDueBadge', () => {
  it('should render a N/A badge if item prop is falsy', () => {
    const { getByText } = render(<NextDueBadge item={{ ...stubHistoryItem, nextDueDate: null }} />)

    expect(getByText('N/A')).toBeInTheDocument()
  })

  it('should render a warning badge with the correct text if daysUntilAction is between 0 and 30', () => {
    const mockDifferenceInDays = differenceInDays as jest.Mock
    mockDifferenceInDays.mockReturnValue(15)

    const { getByText } = render(<NextDueBadge item={stubHistoryItem} />)

    expect(getByText('15 days')).toBeInTheDocument()
  })

  it('should render an overdue badge if the nextDueDate is in the past', () => {
    const mockIsPast = isPast as jest.Mock
    mockIsPast.mockReturnValue(true)
    const mockFormatDistanceToNow = formatDistanceToNow as jest.Mock
    mockFormatDistanceToNow.mockReturnValue('2 months')

    const { getByTestId } = render(<NextDueBadge item={stubHistoryItem} />)

    expect(getByTestId('overdue-badge')).toHaveTextContent('Overdue by 2 months')
  })

  it('should render the distance until action is due', () => {
    const mockFormatDistanceToNow = formatDistanceToNow as jest.Mock
    mockFormatDistanceToNow.mockReturnValue('2 months')

    const { getByText } = render(<NextDueBadge item={stubHistoryItem} />)

    expect(getByText('2 months')).toBeInTheDocument()
  })
})
