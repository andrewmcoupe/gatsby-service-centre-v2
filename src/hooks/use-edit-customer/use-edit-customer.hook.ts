import React from 'react'
import { useMutation, useQuery } from 'react-query'
import { CustomerModel, fetchCustomer, HistoryItem } from '@http/fetch-customer'
import axios from 'axios'
import { buildRequestBody } from '@http/utils'

export type UpdateCustomerState = {
  [key: string]: string | HistoryItem[]
  name: string
  address: string
  email: string
  phoneName1: string
  phoneNumber1: string
  phoneName2: string
  phoneNumber2: string
  phoneName3: string
  phoneNumber3: string
  history: HistoryItem[]
}

export type UpdateCustomerRequest = {
  name: string
  address: string
  email: string
  phone1: {
    name: string
    number: string
  }
  phone2: {
    name: string
    number: string
  }
  phone3: {
    name: string
    number: string
  }
  history: HistoryItem[]
}

export enum ActionTypes {
  change = 'change',
  update = 'update',
}

export type ChangeAction = {
  type: ActionTypes.change
  payload: React.ChangeEvent<HTMLInputElement>
}

export type UpdateAction = {
  type: ActionTypes.update
  payload: UpdateCustomerState
}

export type Action = ChangeAction | UpdateAction

const editCustomerReducer = (state: UpdateCustomerState, action: Action) => {
  switch (action.type) {
    case ActionTypes.change:
      return {
        ...state,
        [action.payload.target.name]: action.payload.target.value,
      }
    case ActionTypes.update:
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}

const getInitialStateFromResponse = (customer: CustomerModel | undefined): UpdateCustomerState => {
  if (!customer) throw new Error('No customer provided')
  console.log({ getInitialStateFromResponse: customer })
  const { name, email, address, phone1, phone2, phone3, history } = customer

  return {
    name,
    address,
    email,
    phoneName1: phone1.name,
    phoneNumber1: phone1.number,
    phoneName2: phone2.name,
    phoneNumber2: phone2.number,
    phoneName3: phone3.name,
    phoneNumber3: phone3.number,
    history: [...history],
  }
}

const initialState: UpdateCustomerState = {
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
}

export const useEditCustomer = (id: string) => {
  const { data: customer, status: queryStatus, error: queryError } = useQuery(['single-customer', id], () =>
    fetchCustomer(id),
  )
  const { status: mutationStatus, mutate, error: mutationError } = useMutation((formData: UpdateCustomerRequest) =>
    axios.put(`${process.env.CUSTOMERS_SERVICE_API_ENDPOINT}/customers/${id}`, formData),
  )
  const [state, dispatch] = React.useReducer(editCustomerReducer, initialState)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    dispatch({ type: ActionTypes.change, payload: event })
  const handleSubmit = () => {
    const requestBody = buildRequestBody(state)

    mutate({
      ...requestBody,
      history: [...state.history],
    })
  }

  React.useEffect(() => {
    if (queryStatus === 'success') {
      // Map the response values to a customer state structure
      const newState = getInitialStateFromResponse(customer)

      dispatch({ type: ActionTypes.update, payload: newState })
    }
  }, [queryStatus, customer])

  return {
    queryStatus,
    mutationStatus,
    queryError,
    mutationError,
    state,
    handleChange,
    handleSubmit,
  }
}
