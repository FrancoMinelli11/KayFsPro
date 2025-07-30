import { Footer } from "./components/Footer"
import { NavBar } from "./components/NavBar"
import { MainLayout } from "./layouts/MainLayout"
import { MainRouter } from "./router/MainRouter"

export const App = () => {
  return (
    <MainLayout>
      <MainRouter />
      <Footer />
    </MainLayout>
  )
}