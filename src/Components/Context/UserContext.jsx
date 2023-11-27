import { createContext, useState } from "react"

export let userContext = createContext()
export default function UserContextProvider(props) {
  const [userToken, setUserToken] = useState(null)
  const [userId, setUserID] = useState(null)

  return (
    <userContext.Provider
      value={{ userToken, setUserToken, setUserID, userId }}
    >
      {props.children}
    </userContext.Provider>
  )
}
