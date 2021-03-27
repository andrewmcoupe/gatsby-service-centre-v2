import React from 'react'
import { QueryClientProvider, QueryClient } from 'react-query'
import Layout from '@components/layout/layout.component'
import { ReactQueryDevtools } from 'react-query/devtools'

const queryClient = new QueryClient()

export const wrapRootElement: React.FunctionComponent<{ element: React.ReactNode }> = ({ element }) => (
  <QueryClientProvider client={queryClient}>
    <Layout>{element}</Layout>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
)
