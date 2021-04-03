import { QueryClient, QueryClientProvider } from 'react-query'
import React from 'react'

const queryClient = new QueryClient()

export const WithQueryClient: React.FC = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)
