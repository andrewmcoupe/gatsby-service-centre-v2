import React from 'react'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { Input, Button, Stack } from '@chakra-ui/react'
import { useAuthContext } from '@hooks/use-auth-context/use-auth-context.hook'

export const Login = () => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const authContext = useAuthContext()

  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault()

    try {
      authContext.login?.(email, password)
    } catch (error) {
      alert(error.message)
    }
  }

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt.target.name === 'email') {
      setEmail(evt.target.value)
    } else {
      setPassword(evt.target.value)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={4}>
        <FormControl id="username" isRequired>
          <FormLabel>Username</FormLabel>
          <Input onChange={handleChange} name="email" value={email} placeholder="Username/email" />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <Input onChange={handleChange} name="password" value={password} type="password" placeholder="*****" />
        </FormControl>
        <Button type="submit">Submit</Button>
      </Stack>
    </form>
  )
}
