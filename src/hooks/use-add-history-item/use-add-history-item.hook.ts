import React from 'react'
import { useMutation } from 'react-query'
import axios from 'axios'
import { HistoryItem } from '@http/fetch-customer'

export enum ActionTypes {
  change = 'change',
  fileChange = 'fileChange',
}

export type Action = {
  type: ActionTypes
  payload: React.ChangeEvent<HTMLInputElement> & { mediaUrl?: string }
}

export type NewHistoryItem = Omit<HistoryItem, '_id'>

const initialState: NewHistoryItem = {
  compressor: '',
  invoiceMedia: '',
  jobDescription: '',
  invoiceNumber: '',
  jobSheetMedia: '',
  nextDueDate: null,
  powraMedia: '',
  notRequiredInputs: [],
  purchaseOrderNumber: '',
  quoteMedia: '',
  ramMedia: '',
  supplier: '',
}

const newHistoryItemReducer = (state: NewHistoryItem, action: Action) => {
  switch (action.type) {
    case ActionTypes.change:
      return {
        ...state,
        [action.payload.target.name]: action.payload.target.value,
      }
    case ActionTypes.fileChange:
      return {
        ...state,
        [action.payload.target.name]: action.payload.mediaUrl,
      }
    default:
      return state
  }
}

const postMediaAndRetrieveUrl = async (file: File, customerName: string): Promise<string> => {
  const date = Date.now()
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', 'service-centre')
  formData.append('folder', customerName)
  formData.append('public_id', `/${customerName}/${date}`)
  formData.append('cloud_name', 'dsghor3jp')

  const response = await axios.post('https://api.cloudinary.com/v1_1/dsghor3jp/image/upload', formData)
  return response.data.url
}

export const useAddHistoryItem = (id: string, name: string, initialStateOverride?: NewHistoryItem) => {
  const [state, dispatch] = React.useReducer(newHistoryItemReducer, initialStateOverride ?? initialState)
  const { status, mutate } = useMutation((formData: NewHistoryItem) =>
    axios.post(`${process.env.CUSTOMERS_SERVICE_API_ENDPOINT}/customers/${id}/history`, formData),
  )

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      const mediaUrl = await postMediaAndRetrieveUrl(event.target.files[0], name)

      return dispatch({ type: ActionTypes.fileChange, payload: { ...event, mediaUrl } })
    }

    dispatch({ type: ActionTypes.change, payload: event })
  }

  const onSubmit = async () => {
    mutate(state)
  }

  return {
    onSubmit,
    handleChange,
    status,
    state,
  }
}
