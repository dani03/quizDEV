import { createContext, useCallback, useEffect, useState } from "react"

export const AppContext = createContext(null)

const AppContextProvider = (props) => {
  const [jwt, setJwt] = useState(null)
  useEffect(() => setJwt(localStorage.getItem("access_token")), [])
  const [userId, setUserId] = useState(null)
  useEffect(() => setUserId(localStorage.getItem("id")), [])
  const [user, setUser] = useState(null)
  useEffect(() => setUser(localStorage.getItem("user")), [])
  const [isError, setIsError] = useState(false)

  const saveJwt = useCallback((jwt, userId) => {
    localStorage.setItem("access_token", jwt)
    localStorage.setItem("id", userId)
    setJwt(jwt)
    setUserId(userId)
  }, [])

  const saveUser = useCallback((user) => {
    if (user) {
      localStorage.setItem("user", user)
      setUser(user)
    } else {
      return console.error("error in user data name !")
    }
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem("access_token")
    localStorage.removeItem("id")
    localStorage.removeItem("user")
    setJwt(null)
    setUserId(null)
    setUser(null)
  }, [])

  const changeIsError = () => {
    setIsError(!isError)
  }

  // surveiller les changements dans le localStorage et mettre à jour les valeurs du contexte en conséquence
  useEffect(() => {
    const updateContext = () => {
      setJwt(localStorage.getItem("access_token"))
      setUserId(localStorage.getItem("id"))
      setUser(localStorage.getItem("user"))
    }
    window.addEventListener("storage", updateContext)
    return () => window.removeEventListener("storage", updateContext)
  }, [])

  return (
    <AppContext.Provider
      {...props}
      value={{
        saveJwt,
        setUserId,
        logout,
        jwt,
        userId,
        saveUser,
        user,
        isError,
        changeIsError,
      }}
    />
  )
}

export default AppContextProvider
