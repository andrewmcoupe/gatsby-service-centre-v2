import React from 'react'
import { IconButton, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'
import { GetCustomersResponse } from '@http/fetch-customers'

type CustomersTableProps = {
  data:
    | {
        data: GetCustomersResponse
      }
    | undefined
}

export const CustomersTable: React.FC<CustomersTableProps> = ({ data }) => {
  return data ? (
    <Table variant="unstyled" data-testid={'customers-table'}>
      <Thead>
        <Tr>
          <Th></Th>
          <Th></Th>
          <Th>Name</Th>
          <Th>Email</Th>
          <Th>Primary phone</Th>
          <Th>Next due</Th>
        </Tr>
      </Thead>
      <Tbody>
        {data?.data.Items.map((customer) => (
          <Tr>
            <Td>
              <IconButton colorScheme="teal" aria-label="Edit customer" size="lg" icon={<EditIcon />} />
            </Td>
            <Td>
              <IconButton colorScheme="red" aria-label="Delete customer" size="lg" icon={<DeleteIcon />} />
            </Td>
            <Td>{customer.name}</Td>
            <Td>{customer.email}</Td>
            <Td>{customer.phone1.number}</Td>
            {/*TODO: Calculate this*/}
            <Td>10 days</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  ) : null
}
