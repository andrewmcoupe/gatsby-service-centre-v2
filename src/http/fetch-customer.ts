import axios from 'axios'

type PhoneContact = {
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
  _id: string
  compressor: string
  jobDescription: string
  supplier: string
  quoteSheetUrl: string
  powraSheetUrl: string
  ramsSheetUrl: string
  jobSheetUrl: string
  invoiceUrl: string
  invoiceNumber: string
  nextDueDate: Date | null
  purchaseOrderNumber: string
}

export type GetCustomersResponse = {
  data: CustomerModel
}

export const fetchCustomer = async (id: string) => {
  const response = await axios.get<CustomerModel>(`${process.env.CUSTOMERS_SERVICE_API_ENDPOINT}/customers/${id}`)

  return response.data
}
