import { createContext, useEffect, useState } from 'react'
import { setToken, getToken, removeToken } from '../api/token'
import { getMeApi } from '../api/user'

export const AuthContext = createContext({
  auth: undefined,
  login: () => null,
  logout: () => null,
})

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(undefined)

  useEffect(() => {
    const loadUser = async () => {
      const token = getToken()

      if (!token) {
        setAuth(null)
        return
      }

      try {
        const me = await getMeApi(token)
        setAuth({ token, me })
      } catch (error) {
        removeToken()
        setAuth(null)
      }
    }

    loadUser()
  }, [])

  const login = async (token) => {
    setToken(token)

    const me = await getMeApi(token)

    setAuth({
      token,
      me,
    })
  }

  const logout = () => {
    removeToken()
    setAuth(null)
  }

  const valueContext = {
    auth,
    login,
    logout,
  }

  if (auth === undefined) {
    return null
  }

  return (
    <AuthContext.Provider value={valueContext}>
      {children}
    </AuthContext.Provider>
  )
}