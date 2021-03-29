import React from 'react'
import { render } from '@testing-library/react'
import { HistoryTable } from './history-table.component'
import { HistoryItem } from '@http/fetch-customer'

const stubHistoryItems: HistoryItem[] = [
  {
    _id: '123',
    compressor: 'Hertz 123',
    invoiceMedia: 'https://foo.bar.baz.com',
    invoiceNumber: '123443',
    jobDescription: 'A test description',
    jobSheetMedia: 'https://foo.bar.baz.com',
    nextDueDate: new Date(),
    powraMedia: 'https://foo.bar.baz.com',
    purchaseOrderNumber: '123',
    quoteMedia: 'https://foo.bar.baz.com',
    ramMedia: 'https://foo.bar.baz.com',
    supplier: 'Hertz',
    notRequiredInputs: [],
  },
]

const stubEmptyHistoryItems: HistoryItem[] = []

describe('<HistoryTable />', () => {
  it('should render some help text if history items is empty', () => {
    const { getByText } = render(<HistoryTable historyItems={stubEmptyHistoryItems} />)

    expect(getByText('This customer does not have any history of work completed yet')).toBeInTheDocument()
  })

  it('should render items in the history items array', () => {
    const { getByText } = render(<HistoryTable historyItems={stubHistoryItems} />)

    expect(getByText(stubHistoryItems[0].compressor)).toBeInTheDocument()
    expect(getByText(stubHistoryItems[0].supplier)).toBeInTheDocument()
    expect(getByText(stubHistoryItems[0].purchaseOrderNumber)).toBeInTheDocument()
    expect(getByText(stubHistoryItems[0].jobDescription)).toBeInTheDocument()
    expect(getByText(stubHistoryItems[0].invoiceNumber)).toBeInTheDocument()
  })
})
