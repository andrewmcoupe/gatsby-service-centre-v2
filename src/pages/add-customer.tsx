import React from 'react'
import { navigate } from 'gatsby'
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
  useToast,
} from '@chakra-ui/react'
import { useAddCustomer } from '@hooks/use-add-customer/use-add-customer.hook'

const AddCustomerPage = () => {
  const { handleChange, onSubmit, status } = useAddCustomer()
  const toast = useToast()

  React.useEffect(() => {
    if (status === 'success') {
      toast({
        title: 'Success!',
        description: 'Customer created',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })

      navigate('/customers')
    }
  }, [status])

  return (
    <>
      <Heading size={'lg'}>Add a new customer</Heading>
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
            <Input placeholder="Customer name" name={'name'} onChange={handleChange} />
          </FormControl>
        </Box>
        <Box>
          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input placeholder="someone@somewhere.com" name={'email'} onChange={handleChange} />
          </FormControl>
        </Box>
        <Box>
          <FormControl isRequired>
            <FormLabel>Address</FormLabel>
            <Input placeholder="123 Smith Rd, Bury, Lancs, BL9 9BT" name={'address'} onChange={handleChange} />
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
            <Input placeholder="Name" name={'phoneName1'} onChange={handleChange} />
          </FormControl>
        </Box>
        <Box>
          <FormControl>
            <FormLabel>Number</FormLabel>
            <Input placeholder="01204111222" name={'phoneNumber1'} onChange={handleChange} />
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
            <Input placeholder="Name" name={'phoneName2'} onChange={handleChange} />
          </FormControl>
        </Box>
        <Box>
          <FormControl>
            <FormLabel>Number</FormLabel>
            <Input placeholder="01204111222" name={'phoneNumber2'} onChange={handleChange} />
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
            <Input placeholder="Name" name={'phoneName3'} onChange={handleChange} />
          </FormControl>
        </Box>
        <Box>
          <FormControl>
            <FormLabel>Number</FormLabel>
            <Input placeholder="01204111222" name={'phoneNumber3'} onChange={handleChange} />
          </FormControl>
        </Box>
      </SimpleGrid>
      <HStack spacing="24px" marginY={8}>
        <Button isLoading={status === 'loading'} onClick={onSubmit} loadingText="Saving customer" colorScheme="green">
          Save customer
        </Button>{' '}
      </HStack>
    </>
  )
}

export default AddCustomerPage
