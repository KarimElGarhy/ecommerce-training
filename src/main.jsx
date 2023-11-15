import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import "./index.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import UserContextProvider from "./Components/Context/UserContext.jsx"
import { QueryClient, QueryClientProvider } from "react-query"

const root = ReactDOM.createRoot(document.getElementById("root"))
let queryClient = new QueryClient()
root.render(
  <QueryClientProvider client={queryClient}>
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </QueryClientProvider>
)
