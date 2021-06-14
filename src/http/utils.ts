import { NewCustomerState } from '@hooks/use-add-customer/use-add-customer.hook'
import { NewCustomerRequest } from './create-customer'

export const buildRequestBody = (formData: NewCustomerState): NewCustomerRequest => {
  return {
    name: formData.name,
    address: formData.address,
    email: formData.email,
    phone1: {
      name: formData.phoneName1,
      number: formData.phoneNumber1,
    },
    phone2: {
      name: formData.phoneName2,
      number: formData.phoneNumber2,
    },
    phone3: {
      name: formData.phoneName3,
      number: formData.phoneNumber3,
    },
  }
}
