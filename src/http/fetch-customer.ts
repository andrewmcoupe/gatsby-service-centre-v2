import axios from 'axios'

export type PhoneContact = {
  name: string
  number: string
}

export type CustomerModel = {
  _id: string
  name: string
  email: string
  phone1: PhoneContact
  phone2: PhoneContact
  phone3: PhoneContact
  address: string
  history: HistoryItem[]
}

export type HistoryItem = {
  [key: string]: string | string[] | null | Date | undefined
  _id: string
  compressor: string
  jobDescription: string
  supplier: string
  quoteMedia: string
  powraMedia: string
  ramMedia: string
  jobSheetMedia: string
  invoiceMedia: string
  invoiceNumber: string
  nextDueDate: Date | null
  purchaseOrderNumber: string
  notRequiredInputs: string[]
}

export type GetCustomersResponse = {
  data: CustomerModel
}

export const fetchCustomer = async (id: string) => {
  const response = await axios.get<CustomerModel>(`${process.env.CUSTOMERS_SERVICE_API_ENDPOINT}/customers/${id}`)

  return response.data
}
