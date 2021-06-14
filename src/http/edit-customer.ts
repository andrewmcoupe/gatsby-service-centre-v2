import axios from 'axios'
import { UpdateCustomerRequest } from '@hooks/use-edit-customer/use-edit-customer.hook'

export const editCustomer = async (args: { formData: UpdateCustomerRequest; id: string }) =>
  await axios.put(`${process.env.CUSTOMERS_SERVICE_API_ENDPOINT}/customers/${args.id}`, args.formData)
