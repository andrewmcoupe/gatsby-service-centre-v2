import React from 'react'
import { Container } from '@chakra-ui/react'
import Header from '@components/header/header'
import AuthProvider from '@hooks/use-auth-context/use-auth-context.hook'

const Layout: React.FC = ({ children }) => {
  return (
    <AuthProvider>
      <Container maxW={'container.xl'} paddingX={32}>
        <Header />
        {children}
      </Container>
    </AuthProvider>
  )
}

export default Layout
