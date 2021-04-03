import { renderHook, act } from '@testing-library/react-hooks'
import axios from 'axios'
import { WithQueryClient } from '@test-helpers/render-with-query-client'
import { useDeleteCustomer } from '@hooks/use-delete-customer/use-delete-customer.hook'

jest.mock('axios')

describe('useDeleteCustomer', () => {
  it('should return the correct default values', () => {
    const { result } = renderHook(useDeleteCustomer, { wrapper: WithQueryClient })

    expect(result.current.status).toBe('idle')
    expect(result.current.error).toBe(null)
    expect(result.current.selectedCustomerId).toBe('')
  })

  it('should update the selectedCustomerId when calling setSelectedCustomerId', () => {
    const { result } = renderHook(useDeleteCustomer, { wrapper: WithQueryClient })

    act(() => {
      result.current.setSelectedCustomerId('123')
    })

    expect(result.current.selectedCustomerId).toEqual('123')
  })

  it('should make a delete request with the correct request body', async () => {
    const { result, waitFor } = renderHook(useDeleteCustomer, { wrapper: WithQueryClient })

    act(() => {
      result.current.deleteCustomerById('123')
    })

    await waitFor(() => {
      expect(axios.delete).toHaveBeenCalledWith(`CUSTOMERS_SERVICE_API_ENDPOINT/customers/123`)
    })
  })
})
