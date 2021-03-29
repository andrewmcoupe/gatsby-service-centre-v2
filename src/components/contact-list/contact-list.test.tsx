import React from 'react'
import { render } from '@testing-library/react'
import faker from 'faker'
import { ContactList } from './contact-list.component'
import { PhoneContact } from '@http/fetch-customer'

const stubContacts: PhoneContact[] = [
  { number: faker.phone.phoneNumber(), name: faker.internet.userName() },
  { number: faker.phone.phoneNumber(), name: faker.internet.userName() },
  { number: faker.phone.phoneNumber(), name: faker.internet.userName() },
]

describe('<ContactList />', () => {
  it('should render a list of phone contacts', () => {
    const { getByText } = render(<ContactList contacts={stubContacts} />)

    for (const contact of stubContacts) {
      expect(getByText(contact.name)).toBeInTheDocument()
      expect(getByText(contact.number)).toBeInTheDocument()
    }
  })
})
