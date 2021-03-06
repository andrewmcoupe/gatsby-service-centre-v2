import React from 'react'
import { Link, navigate } from 'gatsby'
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
  useToast,
} from '@chakra-ui/react'
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'
import { useDeleteCustomer } from '@hooks/use-delete-customer'
import { GetCustomersResponse } from '@http/fetch-customers'
import NextDueBadge from '@components/next-due-badge/next-due-badge.component'
import { getNextDueItem } from '@utils/customer-history'

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
  const toast = useToast()

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

  React.useEffect(() => {
    if (status === 'success') {
      toast({
        title: 'Success!',
        description: 'Customer deleted',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    }
  }, [status])

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
                <IconButton
                  onClick={() => navigate(`/edit-customer/${customer._id}`)}
                  colorScheme="teal"
                  aria-label="Edit customer"
                  size="lg"
                  icon={<EditIcon />}
                />

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
            <Td>
              <NextDueBadge item={getNextDueItem(customer.history)} />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  ) : null
}
