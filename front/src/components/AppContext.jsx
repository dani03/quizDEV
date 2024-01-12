import { createContext, useCallback, useEffect, useState } from "react"

export const AppContext = createContext(null)

const AppContextProvider = (props) => {
  const [jwt, setJwt] = useState(null)
  useEffect(() => setJwt(localStorage.getItem("session_jwt")), [])
  const [userId, setUserId] = useState(null)
  useEffect(() => setUserId(localStorage.getItem("id")), [])
  const [user, setUser] = useState(null)
  useEffect(() => setUser(localStorage.getItem("user")), [])

  const saveJwt = useCallback((jwt, userId) => {
    localStorage.setItem("session_jwt", jwt)
    localStorage.setItem("id", userId)
    setJwt(jwt)
    setUserId(userId)
  }, [])

  const saveUser = useCallback((user) => {
    localStorage.setItem("user", user)
    setUser(user)
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem("session_jwt")
    localStorage.removeItem("id")
    localStorage.removeItem("user")
    setJwt(null)
    setUserId(null)
    setUser(null)
  }, [])

  // surveiller les changements dans le localStorage et mettre à jour les valeurs du contexte en conséquence
  useEffect(() => {
    const updateContext = () => {
      setJwt(localStorage.getItem("session_jwt"))
      setUserId(localStorage.getItem("id"))
      setUser(localStorage.getItem("user"))
    }
    window.addEventListener("storage", updateContext)
    return () => window.removeEventListener("storage", updateContext)
  }, [])

  return (
    <AppContext.Provider
      {...props}
      value={{ saveJwt, setUserId, logout, jwt, userId, saveUser, user }}
    />
  )
}

export default AppContextProvider
