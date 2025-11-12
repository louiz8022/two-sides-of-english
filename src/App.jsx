import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Home } from "./pages/Home"
import { Questions } from "./pages/Questions"
import { Results } from "./pages/Results"

const App = () => {

  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/questions' element={<Questions />} />
          <Route path='/results' element={<Results />} />

        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App