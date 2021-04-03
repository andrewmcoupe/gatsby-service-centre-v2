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

type MediaProperty = keyof Pick<
  HistoryItem,
  'ramMedia' | 'quoteMedia' | 'jobSheetMedia' | 'powraMedia' | 'invoiceMedia'
>

const renderMedia = (item: HistoryItem, mediaName: MediaProperty) => {
  if (item.notRequiredInputs.includes(mediaName)) {
    return <Badge colorScheme="gray">N/A</Badge>
  }

  if (!item[mediaName]) {
    return <Badge colorScheme="red">Missing</Badge>
  }

  return <MediaLink mediaUrl={item[mediaName]} />
}

export const tableHeads = [
  'Actions',
  'Compressor',
  'Description',
  'Supplier',
  'PON',
  'Quote',
  'POWRA',
  'RAMS',
  'Jobsheet',
  'Invoice',
  'Invoice no.',
  'Next due',
] as const

export const HistoryTable: React.FC<{ historyItems: HistoryItem[] }> = ({ historyItems }) => {
  return historyItems.length > 0 ? (
    <>
      <Heading size={'md'} marginTop={10} marginBottom={4}>
        History of work
      </Heading>
      <Table variant="striped" size={'sm'} data-testid={'history-table'}>
        <Thead>
          <Tr>
            {tableHeads.map((headerTitle) => (
              <Th position={'sticky'} background={'white'} top={0} zIndex={1}>
                {headerTitle}
              </Th>
            ))}
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
