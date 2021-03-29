import React from 'react'
import { IconButton, Table, Tbody, Td, Th, Thead, Tr, HStack, Text, Link, Badge, Heading } from '@chakra-ui/react'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { HistoryItem } from '@http/fetch-customer'

const MediaLink: React.FunctionComponent<{ mediaUrl: string }> = ({ mediaUrl }) => {
  return (
    <Link isExternal={true} href={mediaUrl}>
      <Badge colorScheme="green">View</Badge>
    </Link>
  )
}

type MediaProperty = Pick<HistoryItem, 'ramMedia' | 'quoteMedia' | 'jobSheetMedia' | 'powraMedia' | 'invoiceMedia'>

const renderMedia = (item: HistoryItem, mediaName: keyof MediaProperty) => {
  if (item.notRequiredInputs.includes(mediaName)) {
    return <Badge colorScheme="gray">N/A</Badge>
  }

  if (!item[mediaName]) {
    return <Badge colorScheme="red">Missing</Badge>
  }

  return <MediaLink mediaUrl={item[mediaName]} />
}

const tableHeadStyles = {
  background: 'white',
  top: '0',
  zIndex: '1',
}

export const HistoryTable: React.FC<{ historyItems: HistoryItem[] }> = ({ historyItems }) => {
  return historyItems.length > 0 ? (
    <>
      <Heading size={'lg'} marginTop={10} marginBottom={4}>
        History of work
      </Heading>
      <Table variant="striped" size={'sm'} data-testid={'history-table'}>
        <Thead>
          <Tr>
            <Th {...tableHeadStyles} position={'sticky'}>
              Actions
            </Th>
            <Th {...tableHeadStyles} position={'sticky'}>
              Compressor
            </Th>
            <Th {...tableHeadStyles} position={'sticky'}>
              Description
            </Th>
            <Th {...tableHeadStyles} position={'sticky'}>
              Supplier
            </Th>
            <Th {...tableHeadStyles} position={'sticky'}>
              PON
            </Th>
            <Th {...tableHeadStyles} position={'sticky'}>
              Quote
            </Th>
            <Th {...tableHeadStyles} position={'sticky'}>
              POWRA
            </Th>
            <Th {...tableHeadStyles} position={'sticky'}>
              RAMS
            </Th>
            <Th {...tableHeadStyles} position={'sticky'}>
              Jobsheet
            </Th>
            <Th {...tableHeadStyles} position={'sticky'}>
              Invoice
            </Th>
            <Th {...tableHeadStyles} position={'sticky'}>
              Invoice No.
            </Th>
            <Th {...tableHeadStyles} position={'sticky'}>
              Next due
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {historyItems.map((item) => (
            <Tr key={item._id}>
              <Td>
                <HStack>
                  <IconButton colorScheme="teal" aria-label="Edit customer" size="lg" icon={<EditIcon />} />
                  <IconButton colorScheme="red" aria-label="Delete customer" size="lg" icon={<DeleteIcon />} />
                </HStack>
              </Td>
              <Td>{item.compressor}</Td>
              <Td>{item.jobDescription}</Td>

              <Td>{item.supplier}</Td>
              <Td>{item.purchaseOrderNumber}</Td>
              <Td>{renderMedia(item, 'quoteMedia')}</Td>
              <Td>{renderMedia(item, 'powraMedia')}</Td>
              <Td>{renderMedia(item, 'ramMedia')}</Td>
              <Td>{renderMedia(item, 'jobSheetMedia')}</Td>
              <Td>{renderMedia(item, 'invoiceMedia')}</Td>
              <Td>{item.invoiceNumber}</Td>
              <Td>10 days</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  ) : (
    <Text>This customer does not have any history of work completed yet</Text>
  )
}
