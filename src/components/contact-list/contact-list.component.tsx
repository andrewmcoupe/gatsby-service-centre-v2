import React from 'react'
import { PhoneContact } from '@http/fetch-customer'
import { Stack, Text } from '@chakra-ui/react'

type ContactListProps = {
  contacts: PhoneContact[]
}

const renderContact = (contact: PhoneContact) => {
  if (!contact.name || !contact.number) return null

  return (
    <Text fontSize="lg">
      <span>{contact.name}</span>-<span>{contact.number}</span>
    </Text>
  )
}

export const ContactList: React.FC<ContactListProps> = ({ contacts }) => {
  return <Stack spacing={3}>{contacts.map((contact) => renderContact(contact))}</Stack>
}
