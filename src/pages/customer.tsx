import React from 'react'
import { Heading, Spinner, Text } from '@chakra-ui/react'
import Layout from '@components/layout/layout.component'
import { useQuery } from 'react-query'
import { fetchCustomer } from '@http/fetch-customer'
import { ContactList } from '@components/contact-list/contact-list.component'

const CustomerPage: React.FC<{ id: string }> = ({ id }) => {
  const { data: customer, status } = useQuery(['single-customer', id], () => fetchCustomer(id))

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
      {status === 'success' && !!customer && (
        <>
          <Heading>{customer.name}</Heading>
          <Text fontSize="lg" marginBottom={8}>
            {customer.address}
          </Text>
          <ContactList contacts={[customer.phone1!, customer.phone2!, customer.phone3!]} />
        </>
      )}
    </Layout>
  )
}

export default CustomerPage
