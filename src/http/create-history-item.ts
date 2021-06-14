import { NewHistoryItem } from '@hooks/use-add-history-item/use-add-history-item.hook'
import axios from 'axios'

export const createHistoryItem = async (formData: NewHistoryItem, id: string) => {
  const response = await axios.post(`${process.env.CUSTOMERS_SERVICE_API_ENDPOINT}/customers/${id}/history`, formData)
  return response.data
}
