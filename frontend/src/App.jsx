
import { AuthProvider } from "./context/authContext"
import { MainLayout } from "./layouts/MainLayout"
import { MainRouter } from "./router/MainRouter"

export const App = () => {
  return (
    <MainLayout>
        <AuthProvider>
          <MainRouter />
        </AuthProvider>
    </MainLayout>
  )
}