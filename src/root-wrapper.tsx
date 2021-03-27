import React from 'react'
import { QueryClientProvider, QueryClient } from 'react-query'
import Layout from '@components/layout/layout.component'

const queryClient = new QueryClient()

export const wrapRootElement: React.FunctionComponent<{ element: React.ReactNode }> = ({ element }) => (
  <QueryClientProvider client={queryClient}>
    <Layout>{element}</Layout>
  </QueryClientProvider>
)
