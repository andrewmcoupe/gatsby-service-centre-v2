import axios from 'axios'

export const deleteCustomer = async (id: string) =>
  await axios.delete(`${process.env.CUSTOMERS_SERVICE_API_ENDPOINT}/customers/${id}`)
