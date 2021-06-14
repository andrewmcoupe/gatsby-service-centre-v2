import React from 'react'
import { Heading } from '@chakra-ui/react'

import Amplify, { Auth } from 'aws-amplify'
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import awsConfig from '../aws-exports'
Amplify.configure(awsConfig)
Auth.configure(awsConfig)

const IndexPage = () => {
  return (
    <>
      <AmplifySignOut />
      <Heading>Homepage</Heading>
    </>
  )
}

export default withAuthenticator(IndexPage)
