import React from 'react'
import { Heading, Spinner, Text, HStack } from '@chakra-ui/react'
import { useQuery } from 'react-query'
import { fetchCustomer } from '@http/fetch-customer'
import { ContactList } from '@components/contact-list/contact-list.component'
import { HistoryTable } from '@components/history-table/history-table.component'

const CustomerPage: React.FC<{ id: string }> = ({ id }) => {
  const { data: customer, status } = useQuery(['single-customer', id], () => fetchCustomer(id))

  return (
    <>
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
          <HStack justifyContent={'space-between'}>
            <div>
              <Heading>{customer.name}</Heading>
              <Text fontSize="lg">{customer.address}</Text>
              <Text fontSize="lg" marginBottom={8}>
                {customer.email}
              </Text>
            </div>
            <ContactList contacts={[customer.email, customer.phone1!, customer.phone2!, customer.phone3!]} />
          </HStack>
          <HistoryTable historyItems={customer.history} />
        </>
      )}
    </>
  )
}

export default CustomerPage
