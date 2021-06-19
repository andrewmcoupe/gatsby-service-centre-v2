import React from 'react'
import { Link, PageProps } from 'gatsby'
import { Heading, Spinner, Text, HStack, Button, Box } from '@chakra-ui/react'
import { useQuery } from 'react-query'
import { fetchCustomer } from '@http/fetch-customer'
import { ContactList } from '@components/contact-list/contact-list.component'
import { HistoryTable } from '@components/history-table/history-table.component'

export const FormattedAddress = ({ address }: { address: string }) => (
  <>
    {address.split(',').map((item, index) => (
      <Text fontSize="md" key={index}>
        {item}
      </Text>
    ))}
  </>
)

const CustomerPage = ({ id }: { id: string } & PageProps) => {
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
          <HStack justifyContent={'space-between'} alignItems={'flex-start'}>
            <Box>
              <Heading size={'md'}>{customer.name}</Heading>
              <FormattedAddress address={customer.address} />
            </Box>
            <ContactList contacts={[customer.email, customer.phone1!, customer.phone2!, customer.phone3!]} />
          </HStack>
          <HStack justifyContent={'space-between'}>
            <Heading size={'md'} marginTop={10} marginBottom={4}>
              History of work
            </Heading>
            <Button as={Link} to={`/add-history/${id}?name=${customer.name}`} colorScheme="blue" variant={'outline'}>
              Add item
            </Button>
          </HStack>
          <HistoryTable historyItems={customer.history} />
        </>
      )}
    </>
  )
}

export default CustomerPage
