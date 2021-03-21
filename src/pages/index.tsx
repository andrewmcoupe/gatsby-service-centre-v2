import React from 'react'
import { Link } from 'gatsby'
import { Heading, Button } from '@chakra-ui/react'
import Layout from '@components/layout/layout.component'

const IndexPage = () => {
  return (
    <Layout>
      <Heading>Service Centre v2</Heading>
      <Button as={Link} to={'/add-customer'}>
        Add customer
      </Button>
    </Layout>
  )
}

export default IndexPage
