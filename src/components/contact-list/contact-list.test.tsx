import React from 'react'
import { render } from '@testing-library/react'
import faker from 'faker'
import { ContactList, Contacts } from './contact-list.component'

const stubContacts: Contacts = [
  'andy@andy.com',
  { number: faker.phone.phoneNumber(), name: faker.internet.userName() },
  { number: faker.phone.phoneNumber(), name: faker.internet.userName() },
  { number: faker.phone.phoneNumber(), name: faker.internet.userName() },
]

describe('<ContactList />', () => {
  it('should render a list of email  and phone contacts', () => {
    const { getByText } = render(<ContactList contacts={stubContacts} />)

    expect(getByText(stubContacts[0])).toBeInTheDocument()
    expect(getByText(stubContacts[1].name)).toBeInTheDocument()
    expect(getByText(stubContacts[2].name)).toBeInTheDocument()
    expect(getByText(stubContacts[3].name)).toBeInTheDocument()
    expect(getByText(stubContacts[1].number)).toBeInTheDocument()
    expect(getByText(stubContacts[2].number)).toBeInTheDocument()
    expect(getByText(stubContacts[3].number)).toBeInTheDocument()
  })
})
