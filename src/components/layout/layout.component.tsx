import React from 'react'
import { Container } from '@chakra-ui/react'
import Header from '@components/header/header'

const Layout: React.FC = ({ children }) => {
  return (
    <Container maxW={'container.xl'} paddingX={32}>
      <Header />
      {children}
    </Container>
  )
}

export default Layout
