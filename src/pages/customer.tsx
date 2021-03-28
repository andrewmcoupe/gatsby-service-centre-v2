import React from 'react'
import { Heading, Spinner } from '@chakra-ui/react'
import Layout from '@components/layout/layout.component'
import { useQuery } from 'react-query'
import { fetchCustomer } from '@http/fetch-customer'

const CustomerPage: React.FC<{ id: string }> = ({ id }) => {
  const { data, status } = useQuery('single-customer', () => fetchCustomer(id))

  return (
    <Layout>
      {status === 'loading' && (
        <Spinner
          justifySelf={'center'}
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      )}
      {status === 'error' && <p>There was an error retrieving this customer</p>}
      {status === 'success' && (
        <>
          <Heading>{data?.name}</Heading>
        </>
      )}
    </Layout>
  )
}

export default CustomerPage
