import React from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { deleteCustomer } from '@http/delete-customer'

type UseDeleteCustomerHookReturn = {
  deleteCustomerById: (id: string) => void
  status: 'idle' | 'loading' | 'success' | 'error'
  error: unknown
  selectedCustomerId: string | null
  setSelectedCustomerId: (id: string) => void
}

export const useDeleteCustomer = (): UseDeleteCustomerHookReturn => {
  const [selectedCustomerId, setSelectedCustomerId] = React.useState<string>('')
  const queryClient = useQueryClient()
  const { status, mutate, error } = useMutation((id: string) => deleteCustomer(id), {
    onSuccess: () => {
      setSelectedCustomerId('')
      queryClient.invalidateQueries('customers') // invalidates and refetches queries as we know the user has updated
    },
    onError: () => {
      setSelectedCustomerId('')
    },
  })

  const deleteCustomerById = (id: string) => mutate(id)

  return {
    deleteCustomerById,
    status,
    error,
    selectedCustomerId,
    setSelectedCustomerId,
  }
}
