import { Routes, Route } from "react-router-dom"
import Layout from "./pages/Layout"
import FilmDetails from "./pages/FilmDetails"
import Home from "./pages/Home"


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="film/:id" element={<FilmDetails />} />
      </Route>
    </Routes>
  )
}

export default App
