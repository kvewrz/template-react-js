import { Outlet } from "react-router"
import Header from "../../widgets/header/header"


function Layouts() {
  return (
    <div>
      <Header />
      <main><Outlet /></main>
    </div>
  )
}

export default Layouts
