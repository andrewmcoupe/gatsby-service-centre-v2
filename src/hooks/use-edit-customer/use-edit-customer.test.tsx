import { renderHook, act } from '@testing-library/react-hooks'
import { UpdateCustomerRequest, useEditCustomer } from './use-edit-customer.hook'
import { WithQueryClient } from '@test-helpers/render-with-query-client'
import axios from 'axios'

jest.mock('axios')

const stubInputEvents = [
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

describe('useEditCustomer()', () => {
  it('should return the correct values by default', () => {
    const { result } = renderHook(() => useEditCustomer('123'), { wrapper: WithQueryClient })

    expect(result.current.handleChange).toBeDefined()
    expect(result.current.handleSubmit).toBeDefined()
    expect(result.current.mutationError).toBeNull()
    expect(result.current.mutationStatus).toBe('idle')
    expect(result.current.queryError).toBeNull()
    expect(result.current.queryStatus).toBe('loading')
    expect(result.current.state).toEqual({
      name: '',
      address: '',
      email: '',
      phoneName1: '',
      phoneNumber1: '',
      phoneName2: '',
      phoneNumber2: '',
      phoneName3: '',
      phoneNumber3: '',
      history: [],
    })
  })

  it('should update the correct state key when handleChange is invoked', () => {
    const { result } = renderHook(() => useEditCustomer('123'), { wrapper: WithQueryClient })

    for (const stubEvent of stubInputEvents) {
      act(() => {
        result.current.handleChange(stubEvent)
      })

      expect(result.current.state[stubEvent.target.name]).toEqual(stubEvent.target.value)
    }
  })

  it('should make a request with the correct body when calling onSubmit', async () => {
    const { result, waitFor } = renderHook(() => useEditCustomer('123'), { wrapper: WithQueryClient })

    for (const stubEvent of stubInputEvents) {
      act(() => {
        result.current.handleChange(stubEvent)
      })
    }

    const expectedPostData: UpdateCustomerRequest = {
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
      history: [],
    }

    act(() => {
      result.current.handleSubmit()
    })

    await waitFor(() => {
      expect(axios.put).toHaveBeenCalledWith('CUSTOMERS_SERVICE_API_ENDPOINT/customers/123', expectedPostData)
    })
  })
})
