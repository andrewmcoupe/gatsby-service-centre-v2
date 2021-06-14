import axios from 'axios'
import { CustomerModel } from './fetch-customer'

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

export const createCustomer = async (formData: NewCustomerRequest) => {
  const response = await axios.post<CustomerModel>(`${process.env.CUSTOMERS_SERVICE_API_ENDPOINT}/customers`, formData)
  return response.data
}
