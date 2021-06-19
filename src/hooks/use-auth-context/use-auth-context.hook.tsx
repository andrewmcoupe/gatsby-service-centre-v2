import React from 'react'
import { Auth } from 'aws-amplify'

type Context = {
  isAuthenticated: React.MutableRefObject<boolean> | null
  //   setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean | undefined>> | null
  logout: (() => Promise<void>) | null
  login: ((email: string, password: string) => Promise<void>) | null
  confirmIsAuthenticated: (() => Promise<void>) | null
}

const AuthContext = React.createContext<Context>({
  isAuthenticated: null,
  //   setIsAuthenticated: null,
  logout: null,
  login: null,
  confirmIsAuthenticated: null,
})

export const useAuthContext = () => {
  console.log('use auth hook render')

  const context = React.useContext(AuthContext)

  if (!context) throw new Error('Maybe you need to wrap with AuthProvider')

  return context
}

export const AuthProvider: React.FC = ({ children }) => {
  const isAuthenticated = React.useRef(false)

  const logout = async () => {
    try {
      await Auth.signOut()
      isAuthenticated.current = false
    } catch (error) {
      alert(error)
    }
  }

  const login = async (email: string, password: string) => {
    console.log('logging in')

    try {
      await Auth.signIn(email, password)
      isAuthenticated.current = true
    } catch (error) {
      alert(error)
    }
  }

  const confirmIsAuthenticated = async () => {
    try {
      const data = await Auth.currentSession()

      if (data) {
        isAuthenticated.current = true
      }
    } catch (error) {
      alert(error)
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, logout, login, confirmIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
