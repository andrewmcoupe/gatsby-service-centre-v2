import React from 'react'
import { Link } from 'gatsby'
import {
  IconButton,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
} from '@chakra-ui/react'
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'
import { useDeleteCustomer } from '@hooks/use-delete-customer'
import { GetCustomersResponse } from '@http/fetch-customers'

type CustomersTableProps = {
  data:
    | {
        data: GetCustomersResponse
      }
    | undefined
}

export const CustomersTable: React.FC<CustomersTableProps> = ({ data }) => {
  const { deleteCustomerById, status, setSelectedCustomerId, selectedCustomerId } = useDeleteCustomer()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleOpenModal = (id: string) => {
    onOpen()
    setSelectedCustomerId(id)
  }

  const handleCloseModal = () => {
    onClose()
    setSelectedCustomerId('')
  }

  const confirmDelete = () => {
    if (selectedCustomerId) {
      deleteCustomerById(selectedCustomerId)
      onClose()
    }
  }

  // TODO: if there is an error we want to show a toast with an error message

  return data ? (
    <Table variant="striped" data-testid={'customers-table'} size={'sm'}>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Customer</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to delete this customer? This will also delete the history of work for this customer.
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={handleCloseModal} isLoading={status === 'loading'}>
              Cancel
            </Button>
            <Button colorScheme="blue" isLoading={status === 'loading'} onClick={confirmDelete}>
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Thead>
        <Tr>
          <Th>Actions</Th>
          <Th>Name</Th>
          <Th>Email</Th>
          <Th>Primary phone</Th>
          <Th>Next due</Th>
        </Tr>
      </Thead>
      <Tbody>
        {data?.data.Items.map((customer) => (
          <Tr key={customer._id}>
            <Td>
              <HStack>
                <IconButton colorScheme="teal" aria-label="Edit customer" size="lg" icon={<EditIcon />} />

                <IconButton
                  onClick={() => handleOpenModal(customer._id)}
                  colorScheme="red"
                  aria-label="Delete customer"
                  size="lg"
                  icon={<DeleteIcon />}
                />
              </HStack>
            </Td>

            <Td>
              <Link to={`/customer/${customer._id}`}>{customer.name}</Link>
            </Td>
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
