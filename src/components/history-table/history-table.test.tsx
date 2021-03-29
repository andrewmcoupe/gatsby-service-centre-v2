import React from 'react'
import { render } from '@testing-library/react'
import { HistoryTable, tableHeads } from './history-table.component'
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

  it('should render the correct table head titles', () => {
    const { getByText } = render(<HistoryTable historyItems={stubHistoryItems} />)

    for (const headTitle of tableHeads) {
      expect(getByText(headTitle)).toBeInTheDocument()
    }
  })

  it('should render items in the history items array', () => {
    const { getByText } = render(<HistoryTable historyItems={stubHistoryItems} />)

    expect(getByText(stubHistoryItems[0].compressor)).toBeInTheDocument()
    expect(getByText(stubHistoryItems[0].supplier)).toBeInTheDocument()
    expect(getByText(stubHistoryItems[0].purchaseOrderNumber)).toBeInTheDocument()
    expect(getByText(stubHistoryItems[0].jobDescription)).toBeInTheDocument()
    expect(getByText(stubHistoryItems[0].invoiceNumber)).toBeInTheDocument()
  })

  it('should render 5 missing badges if 5 media items are falsy', () => {
    const stubHistoryItemsWithFalsyMedia: HistoryItem[] = [
      {
        ...stubHistoryItems[0],
        quoteMedia: '',
        powraMedia: '',
        jobSheetMedia: '',
        ramMedia: '',
        invoiceMedia: '',
      },
    ]
    const { getAllByText } = render(<HistoryTable historyItems={stubHistoryItemsWithFalsyMedia} />)

    expect(getAllByText('Missing').length).toBe(5)
  })

  it('should render 3 N/A badges if 3 media items are not required', () => {
    const stubHistoryItemsWithFalsyMedia: HistoryItem[] = [
      {
        ...stubHistoryItems[0],
        quoteMedia: '',
        powraMedia: '',
        jobSheetMedia: '',
        ramMedia: '',
        invoiceMedia: '',
        notRequiredInputs: ['quoteMedia', 'ramMedia', 'invoiceMedia'],
      },
    ]
    const { getAllByText } = render(<HistoryTable historyItems={stubHistoryItemsWithFalsyMedia} />)

    expect(getAllByText('N/A').length).toBe(3)
  })
})
