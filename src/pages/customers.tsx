import React from 'react'
import { Heading, Spinner } from '@chakra-ui/react'
import Layout from '@components/layout/layout.component'
import { useQuery } from 'react-query'
import { fetchCustomers } from '@http/fetch-customers'
import { CustomersTable } from '@components/customers-table/customers-table.component'

const CustomersPage = () => {
  const { data, status } = useQuery('customers', fetchCustomers)

  return (
    <Layout>
      <Heading>Our customers</Heading>
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
      {status === 'error' && <p>There was an error retrieving our customers</p>}
      {status === 'success' && (
        <>
          <CustomersTable data={data} />
        </>
      )}
    </Layout>
  )
}

export default CustomersPage
