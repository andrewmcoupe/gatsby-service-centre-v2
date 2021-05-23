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
  Button,
  HStack,
  useToast,
} from '@chakra-ui/react'
import { useLocation } from '@reach/router'
import { parse as queryStringParser } from 'querystring'
import { useAddHistoryItem } from '@hooks/use-add-history-item/use-add-history-item.hook'

type AddHistoryPageProps = {
  id: string
}

const AddHistoryPage = ({ id }: AddHistoryPageProps) => {
  const location = useLocation()
  const { name } = queryStringParser(location.search, '?')

  const { onSubmit, handleChange, status } = useAddHistoryItem(id, name as string)

  const toast = useToast()

  React.useEffect(() => {
    if (status === 'success') {
      toast({
        title: 'Success!',
        description: 'Work item created',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })

      navigate(`/customer/${id}`)
    }
  }, [status])

  return (
    <>
      <Heading size={'lg'}>Add work for {name}</Heading>
      <Heading size={'md'} marginTop={8} marginBottom={4}>
        Compressor Info
      </Heading>
      <SimpleGrid columns={2} spacing={6}>
        <Box>
          <FormControl id="compressor-name" isRequired>
            <FormLabel>Name of compressor</FormLabel>
            <Input name="compressor" onChange={handleChange} />
          </FormControl>
        </Box>
        <Box>
          <FormControl id="job-description" isRequired>
            <FormLabel>Job description</FormLabel>
            <Input name={'jobDescription'} onChange={handleChange} />
          </FormControl>
        </Box>
        <Box>
          <FormControl id="supplier" isRequired>
            <FormLabel>Supplier</FormLabel>
            <Input name={'supplier'} onChange={handleChange} />
          </FormControl>
        </Box>
        <Box>
          <FormControl id="purchase-order-number" isRequired>
            <FormLabel>Customer PON</FormLabel>
            <Input name={'purchaseOrderNumber'} onChange={handleChange} />
          </FormControl>
        </Box>
      </SimpleGrid>
      <Divider marginY={8} />
      <Heading size={'md'} marginTop={8} marginBottom={4}>
        Document uploads
      </Heading>
      <SimpleGrid columns={2} spacing={6}>
        <Box>
          <FormControl id="quote-media" isRequired>
            <FormLabel>Quote</FormLabel>
            <Input name={'quoteMedia'} onChange={handleChange} type={'file'} />
          </FormControl>
        </Box>
        <Box>
          <FormControl id="powra-media" isRequired>
            <FormLabel>POWRA</FormLabel>
            <Input name={'powraMedia'} onChange={handleChange} type={'file'} />
          </FormControl>
        </Box>
        <Box>
          <FormControl id="rams-media" isRequired>
            <FormLabel>RAMS</FormLabel>
            <Input name={'ramMedia'} onChange={handleChange} type={'file'} />
          </FormControl>
        </Box>
        <Box>
          <FormControl id="jobsheet-media" isRequired>
            <FormLabel>Jobsheet</FormLabel>
            <Input name={'jobSheetMedia'} onChange={handleChange} type={'file'} />
          </FormControl>
        </Box>
        <Box>
          <FormControl id="invoice" isRequired>
            <FormLabel>Invoice</FormLabel>
            <Input name={'invoiceMedia'} onChange={handleChange} type={'file'} />
          </FormControl>
        </Box>
      </SimpleGrid>
      <Divider marginY={8} />
      <Heading size={'md'} marginTop={8} marginBottom={4}>
        Additional info
      </Heading>
      <SimpleGrid columns={2} spacing={6}>
        <Box>
          <FormControl id="invoice-number" isRequired>
            <FormLabel>Invoice number</FormLabel>
            <Input name={'invoiceNumber'} onChange={handleChange} />
          </FormControl>
        </Box>
        <Box>
          <FormControl id="next-due-date" isRequired>
            <FormLabel>Next due for service</FormLabel>
            <Input type={'date'} name={'nextDueDate'} onChange={handleChange} />
          </FormControl>
        </Box>
      </SimpleGrid>
      <HStack spacing="24px" marginY={8}>
        <Button colorScheme="green" onClick={onSubmit} isLoading={status === 'loading'}>
          Save
        </Button>
      </HStack>
    </>
  )
}

export default AddHistoryPage
