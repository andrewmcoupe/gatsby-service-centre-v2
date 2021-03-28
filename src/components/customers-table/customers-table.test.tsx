import React from 'react'
import faker from 'faker'
import { CustomersTable } from './customers-table.component'
import { render, waitFor } from '@testing-library/react'
import { GetCustomersResponse } from '@http/fetch-customers'

jest.mock('gatsby', () => ({
  Link: jest.fn(({ children, to }) => <a href={to}>{children}</a>),
}))

const stubCustomersResponse: GetCustomersResponse = {
  Items: [
    {
      _id: faker.random.number().toString(),
      address: faker.address.streetAddress(),
      email: faker.internet.email(),
      name: faker.company.companyName(),
      history: [
        {
          _id: faker.random.number().toString(),
          compressor: faker.vehicle.vehicle(),
          invoiceNumber: faker.random.number().toString(),
          invoiceUrl: faker.internet.domainName(),
          jobDescription: faker.lorem.sentence(6),
          jobSheetUrl: faker.internet.domainName(),
          nextDueDate: new Date(),
          powraSheetUrl: faker.internet.domainName(),
          purchaseOrderNumber: faker.random.number().toString(),
          quoteSheetUrl: faker.random.number().toString(),
          ramsSheetUrl: faker.random.number().toString(),
          supplier: faker.company.companyName(),
        },
      ],
      phone1: {
        name: faker.internet.userName(),
        number: faker.random.number().toString(),
      },
      phone2: {
        name: faker.internet.userName(),
        number: faker.random.number().toString(),
      },
      phone3: {
        name: faker.internet.userName(),
        number: faker.random.number().toString(),
      },
    },
  ],
}

describe('CustomersTable', () => {
  it('should not render if data is undefined', () => {
    const { queryByTestId } = render(<CustomersTable data={undefined} />)

    expect(queryByTestId('customers-table')).not.toBeInTheDocument()
  })

  it('should render a table of customers if provided along with edit and delete buttons', async () => {
    const { getByText, getByLabelText } = render(<CustomersTable data={{ data: stubCustomersResponse }} />)
    const { Items } = stubCustomersResponse

    await waitFor(() => {
      expect(getByText(Items[0].name)).toBeInTheDocument()
      expect(getByText(Items[0].email)).toBeInTheDocument()
      expect(getByText(Items[0].phone1.number)).toBeInTheDocument()
      expect(getByLabelText('Delete customer')).toBeInTheDocument()
      expect(getByLabelText('Edit customer')).toBeInTheDocument()
    })
  })
})
