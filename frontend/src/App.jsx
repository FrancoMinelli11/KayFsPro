import { MainLayout } from "./layouts/MainLayout"
import { MainRouter } from "./router/MainRouter"

export const App = () => {
  return (
    <MainLayout>
      <MainRouter />
    </MainLayout>
  )
}