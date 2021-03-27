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
  Items: CustomerModel[]
}

export const fetchCustomers = async () => {
  return await axios.get<GetCustomersResponse>(`${process.env.CUSTOMERS_SERVICE_API_ENDPOINT}/customers`)
}
