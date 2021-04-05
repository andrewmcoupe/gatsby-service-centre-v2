import React from 'react'
import { Link } from 'gatsby'
import { Container, HStack, Heading } from '@chakra-ui/react'

const Header = () => {
  return (
    <header>
      <Container maxW={'container.xl'} paddingY={24}>
        <HStack justifyContent={'space-between'}>
          <Heading size={'2xl'}>
            <Link to={'/'}>Service Centre</Link>
          </Heading>
          <HStack>
            <Heading size={'2xl'} marginRight={8}>
              <Link to={'/add-customer'}>Add customer</Link>
            </Heading>
            <Heading size={'2xl'}>
              <Link to={'/customers'}>Customers</Link>
            </Heading>
          </HStack>
        </HStack>
      </Container>
    </header>
  )
}

export default Header
