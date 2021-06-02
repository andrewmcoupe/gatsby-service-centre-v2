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
  Items: CustomerModel[]
}

export const fetchCustomers = async () => {
  return await axios.get<GetCustomersResponse>(`${process.env.CUSTOMERS_SERVICE_API_ENDPOINT}/customers`)
}
