import React from 'react'
import {
  Heading,
  FormControl,
  FormLabel,
  Input,
  SimpleGrid,
  Box,
  Divider,
  HStack,
  Button,
  Spinner,
  useToast,
} from '@chakra-ui/react'
import Layout from '@components/layout/layout.component'
import { useEditCustomer } from '@hooks/use-edit-customer'

const EditCustomerPage: React.FC<{ id: string }> = ({ id }) => {
  const { queryStatus, queryError, mutationStatus, mutationError, handleChange, state, handleSubmit } = useEditCustomer(
    id,
  )
  const toast = useToast()

  if (mutationError) {
    toast({
      title: 'Customer update failed',
      description: `${mutationError}`,
      status: 'error',
      duration: 5000,
      isClosable: true,
    })
  }

  if (queryError) {
    toast({
      title: 'Failed to retrieve customer details',
      description: `${queryError}`,
      status: 'error',
      duration: 5000,
      isClosable: true,
    })
  }

  return (
    <Layout>
      <Heading>Edit customer</Heading>

      {queryStatus === 'loading' && (
        <Spinner
          justifySelf={'center'}
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      )}
      {queryStatus === 'error' && <p>There was an error retrieving this customer</p>}
      {queryStatus === 'success' && (
        <>
          <SimpleGrid
            columns={2}
            spacing={8}
            width={'100%'}
            marginTop={10}
            border={'1px'}
            borderColor={'inherit'}
            borderRadius={12}
            padding={8}
          >
            <Heading size={'md'} gridColumn={'1 / -1'}>
              Primary details
            </Heading>
            <Box>
              <FormControl isRequired>
                <FormLabel>Customer name</FormLabel>
                <Input placeholder="Customer name" name={'name'} onChange={handleChange} value={state.name} />
              </FormControl>
            </Box>
            <Box>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input placeholder="someone@somewhere.com" name={'email'} onChange={handleChange} value={state.email} />
              </FormControl>
            </Box>
            <Box>
              <FormControl isRequired>
                <FormLabel>Address</FormLabel>
                <Input
                  placeholder="123 Smith Rd, Bury, Lancs, BL9 9BT"
                  name={'address'}
                  onChange={handleChange}
                  value={state.address}
                />
              </FormControl>
            </Box>
          </SimpleGrid>
          <Divider marginY={10} />
          <SimpleGrid
            border={'1px'}
            borderColor={'inherit'}
            borderRadius={12}
            padding={8}
            columns={2}
            spacing={8}
            width={'100%'}
            marginTop={8}
          >
            <Heading size={'md'} gridColumn={'1 / -1'}>
              Primary phone contact
            </Heading>
            <Box>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input placeholder="Name" name={'phoneName1'} onChange={handleChange} value={state.phoneName1} />
              </FormControl>
            </Box>
            <Box>
              <FormControl>
                <FormLabel>Number</FormLabel>
                <Input
                  placeholder="01204111222"
                  name={'phoneNumber1'}
                  onChange={handleChange}
                  value={state.phoneNumber1}
                />
              </FormControl>
            </Box>
          </SimpleGrid>
          <SimpleGrid
            border={'1px'}
            borderColor={'inherit'}
            borderRadius={12}
            padding={8}
            columns={2}
            spacing={8}
            width={'100%'}
            marginTop={8}
          >
            <Heading size={'md'} gridColumn={'1 / -1'}>
              Additional phone contact
            </Heading>
            <Box>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input placeholder="Name" name={'phoneName2'} onChange={handleChange} value={state.phoneName2} />
              </FormControl>
            </Box>
            <Box>
              <FormControl>
                <FormLabel>Number</FormLabel>
                <Input
                  placeholder="01204111222"
                  name={'phoneNumber2'}
                  onChange={handleChange}
                  value={state.phoneNumber2}
                />
              </FormControl>
            </Box>
          </SimpleGrid>
          <SimpleGrid
            border={'1px'}
            borderColor={'inherit'}
            borderRadius={12}
            padding={8}
            columns={2}
            spacing={8}
            width={'100%'}
            marginTop={8}
          >
            <Heading size={'md'} gridColumn={'1 / -1'}>
              Additional phone contact
            </Heading>
            <Box>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input placeholder="Name" name={'phoneName3'} onChange={handleChange} value={state.phoneName3} />
              </FormControl>
            </Box>
            <Box>
              <FormControl>
                <FormLabel>Number</FormLabel>
                <Input
                  placeholder="01204111222"
                  name={'phoneNumber3'}
                  onChange={handleChange}
                  value={state.phoneNumber3}
                />
              </FormControl>
            </Box>
          </SimpleGrid>
          <HStack spacing="24px" marginY={8}>
            <Button
              isLoading={mutationStatus === 'loading'}
              onClick={handleSubmit}
              loadingText="Saving customer"
              colorScheme="green"
            >
              Save customer
            </Button>{' '}
          </HStack>
        </>
      )}
    </Layout>
  )
}

export default EditCustomerPage
