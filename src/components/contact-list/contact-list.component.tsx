import React from 'react'
import { PhoneContact } from '@http/fetch-customer'
import { Stack, Text } from '@chakra-ui/react'

export type Contacts = [string, PhoneContact, PhoneContact, PhoneContact]

type ContactListProps = {
  contacts: Contacts
}

const renderContact = (contact: PhoneContact | string, index: number) => {
  if (!isPhone(contact)) {
    return (
      <Text fontSize="sm" key={index}>
        <span>{contact}</span>
      </Text>
    )
  }

  if (!contact.name || !contact.number) return null

  return (
    <Text fontSize="sm" key={index}>
      <span>{contact.name}</span> - <span>{contact.number}</span>
    </Text>
  )
}

const isPhone = (contact: PhoneContact | string): contact is PhoneContact => {
  return typeof contact !== 'string'
}

export const ContactList: React.FC<ContactListProps> = ({ contacts }) => {
  return (
    <Stack spacing={3} borderColor={'lightgrey'} borderWidth={2} borderRadius={6} padding={4} minWidth={300}>
      <Text fontSize={'lg'} fontWeight={'semibold'}>
        Contact info
      </Text>
      {contacts.map((contact, index) => renderContact(contact, index))}
    </Stack>
  )
}
