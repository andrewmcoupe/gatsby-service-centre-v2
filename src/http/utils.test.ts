import faker from 'faker'
import { buildRequestBody } from './utils'
import { NewCustomerState } from '@hooks/use-add-customer/use-add-customer.hook'
import { NewCustomerRequest } from './create-customer'

const stubFormData: NewCustomerState = {
  name: faker.company.companyName(),
  address: faker.address.streetAddress(),
  email: faker.internet.email(),
  phoneName1: faker.name.firstName(),
  phoneNumber1: faker.phone.phoneNumber(),
  phoneName2: faker.name.firstName(),
  phoneNumber2: faker.phone.phoneNumber(),
  phoneName3: faker.name.firstName(),
  phoneNumber3: faker.phone.phoneNumber(),
}

describe('buildRequestBody()', () => {
  it('should return the correct shape object', () => {
    const expected: NewCustomerRequest = {
      name: stubFormData.name,
      address: stubFormData.address,
      email: stubFormData.email,
      phone1: {
        name: stubFormData.phoneName1,
        number: stubFormData.phoneNumber1,
      },
      phone2: {
        name: stubFormData.phoneName2,
        number: stubFormData.phoneNumber2,
      },
      phone3: {
        name: stubFormData.phoneName3,
        number: stubFormData.phoneNumber3,
      },
    }
    const result = buildRequestBody(stubFormData)

    expect(result).toStrictEqual(expected)
  })
})
