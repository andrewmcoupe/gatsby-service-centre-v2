import { act, renderHook } from '@testing-library/react-hooks'
import axios from 'axios'
import { NewHistoryItem, useAddHistoryItem } from './use-add-history-item.hook'
import { WithQueryClient } from '@test-helpers/render-with-query-client'
import { waitFor } from '@testing-library/react'

jest.mock('axios')

const initialState: NewHistoryItem = {
  compressor: '',
  invoiceMedia: '',
  jobDescription: '',
  invoiceNumber: '',
  jobSheetMedia: '',
  nextDueDate: null,
  powraMedia: '',
  notRequiredInputs: [],
  purchaseOrderNumber: '',
  quoteMedia: '',
  ramMedia: '',
  supplier: '',
}

const stubEvents = [
  {
    target: {
      name: 'compressor',
      value: 'test compressor',
    },
  },
  {
    target: {
      name: 'invoiceMedia',
      value: 'test invoiceMedia',
    },
  },
  {
    target: {
      name: 'jobDescription',
      value: 'test jobDescription',
    },
  },
  {
    target: {
      name: 'invoiceNumber',
      value: 'test invoiceNumber',
    },
  },
  {
    target: {
      name: 'jobSheetMedia',
      value: 'test jobSheetMedia',
    },
  },
  {
    target: {
      name: 'nextDueDate',
      value: 'test nextDueDate',
    },
  },
  {
    target: {
      name: 'powraMedia',
      value: 'test powraMedia',
    },
  },

  {
    target: {
      name: 'purchaseOrderNumber',
      value: 'test purchaseOrderNumber',
    },
  },
  {
    target: {
      name: 'quoteMedia',
      value: 'test quoteMedia',
    },
  },
  {
    target: {
      name: 'ramMedia',
      value: 'test ramMedia',
    },
  },
  {
    target: {
      name: 'supplier',
      value: 'test supplier',
    },
  },
] as React.ChangeEvent<HTMLInputElement>[]

describe('useAddHistory', () => {
  it('should return the default state initially', () => {
    const { result } = renderHook(() => useAddHistoryItem('123', 'Test customer'), { wrapper: WithQueryClient })

    expect(result.current.status).toBeDefined()
    expect(result.current.onSubmit).toBeDefined()
    expect(result.current.handleChange).toBeDefined()
  })

  it('should update the correct state key when handleChange is invoked', () => {
    const { result } = renderHook(() => useAddHistoryItem('123', 'Test customer'), { wrapper: WithQueryClient })

    for (const stubEvent of stubEvents) {
      act(() => {
        result.current.handleChange(stubEvent)
      })

      expect(result.current.state[stubEvent.target.name]).toEqual(stubEvent.target.value)
    }
  })

  it('should make a http post request with the correct data', async () => {
    const { result } = renderHook(() => useAddHistoryItem('123', 'Test customer', initialState), {
      wrapper: WithQueryClient,
    })

    act(() => {
      result.current.onSubmit()
    })

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('CUSTOMERS_SERVICE_API_ENDPOINT/customers/123/history', initialState)
    })
  })
})
