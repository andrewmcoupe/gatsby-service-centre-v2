import { wrapRootElement as wrapWithReactQuery } from '@components/root-wrapper'
import { Amplify } from 'aws-amplify'

import { config } from './src/auth-config'

//TODO: make env vars below

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID,
  },
  API: {
    endpoints: [
      {
        name: 'customers',
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION,
      },
    ],
  },
})

export const wrapRootElement = wrapWithReactQuery
