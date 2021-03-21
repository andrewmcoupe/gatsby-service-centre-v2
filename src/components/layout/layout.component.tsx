import React from 'react'
import { Container } from '@chakra-ui/react'

const Layout: React.FC = ({ children }) => {
  return (
    <Container maxW={'container.xl'} p={4}>
      {children}
    </Container>
  )
}

export default Layout
