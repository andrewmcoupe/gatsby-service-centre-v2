import React from 'react'
import axios from 'axios'
import { useMutation } from 'react-query'
import { HistoryItem } from '@http/fetch-customer'

export type NewCustomerState = {
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
}

export type NewCustomerRequest = {
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
}

export enum ActionTypes {
  change = 'change',
}

export type Action = {
  type: ActionTypes
  payload: React.ChangeEvent<HTMLInputElement>
}

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

const newCustomerReducer = (state: NewCustomerState, action: Action) => {
  const { name, value } = action.payload.target

  switch (action.type) {
    case ActionTypes.change:
      return {
        ...state,
        [name]: value,
      }
    default:
      return state
  }
}

export const useAddCustomer = () => {
  const [state, dispatch] = React.useReducer(newCustomerReducer, initialState)
  const { status, mutate } = useMutation((formData: NewCustomerRequest) =>
    axios.post(`${process.env.CUSTOMERS_SERVICE_API_ENDPOINT}/customers`, formData),
  )
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    dispatch({ type: ActionTypes.change, payload: event })
  const onSubmit = async () => {
    const formData: NewCustomerRequest = {
      name: state.name,
      address: state.address,
      email: state.email,
      phone1: {
        name: state.phoneName1,
        number: state.phoneNumber1,
      },
      phone2: {
        name: state.phoneName2,
        number: state.phoneNumber2,
      },
      phone3: {
        name: state.phoneName3,
        number: state.phoneNumber3,
      },
    }

    mutate(formData)
  }

  return {
    state,
    handleChange,
    onSubmit,
    status,
  }
}
