import React from 'react'
import { renderHook, act } from '@testing-library/react-hooks'
import axios from 'axios'
import { NewCustomerRequest, NewCustomerState, useAddCustomer } from './use-add-customer.hook'
import { QueryClientProvider, QueryClient } from 'react-query'
import { waitFor } from '@testing-library/dom'

jest.mock('axios')

const initialState: NewCustomerState = {
  name: '',
  address: '',
  email: '',
  phoneName1: '',
  phoneNumber1: '',
  phoneName2: '',
  phoneNumber2: '',
  phoneName3: '',
  phoneNumber3: '',
}

const stubEvents = [
  {
    target: {
      name: 'name',
      value: 'test name',
    },
  },
  {
    target: {
      name: 'address',
      value: 'test address',
    },
  },
  {
    target: {
      name: 'email',
      value: 'test email',
    },
  },
  {
    target: {
      name: 'phoneName1',
      value: 'I am phone name 1',
    },
  },
  {
    target: {
      name: 'phoneNumber1',
      value: 'I am phone number 1',
    },
  },
] as React.ChangeEvent<HTMLInputElement>[]

const queryClient = new QueryClient()
const wrapper: React.FC = ({ children }) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>

describe('useAddCustomer', () => {
  it('should return the default state initially', () => {
    const { result } = renderHook(useAddCustomer, { wrapper })

    expect(result.current.state).toEqual(initialState)
  })

  it('should update the correct state key when handleChange is invoked', () => {
    const { result } = renderHook(useAddCustomer, { wrapper })

    for (const stubEvent of stubEvents) {
      act(() => {
        result.current.handleChange(stubEvent)
      })

      expect(result.current.state[stubEvent.target.name]).toEqual(stubEvent.target.value)
    }
  })

  it('should make a request with the correct request body when calling onSubmit', async () => {
    const { result } = renderHook(useAddCustomer, { wrapper })
    process.env.CUSTOMERS_SERVICE_API_ENDPOINT = 'test-endpoint'

    for (const stubEvent of stubEvents) {
      act(() => {
        result.current.handleChange(stubEvent)
      })
    }

    const expectedPostData: NewCustomerRequest = {
      name: result.current.state.name,
      address: result.current.state.address,
      email: result.current.state.email,
      phone1: {
        name: result.current.state.phoneName1,
        number: result.current.state.phoneNumber1,
      },
      phone2: {
        name: result.current.state.phoneName2,
        number: result.current.state.phoneNumber2,
      },
      phone3: {
        name: result.current.state.phoneName3,
        number: result.current.state.phoneNumber3,
      },
    }

    act(() => {
      result.current.onSubmit()
    })

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('test-endpoint/customers', expectedPostData)
    })
  })
})
