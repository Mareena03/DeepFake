import { useState } from "react"
import LoginForm from "./components/LoginForm"
function App() {
  const [showLogin,setShowLogin]=useState(false)
  return (
    <>
      <LoginForm show={showLogin} setShow={setShowLogin}/>
    </>
  )
}
export default App
