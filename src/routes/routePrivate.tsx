import { ReactNode } from "react"
import { Navigate } from "react-router-dom"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "../../firebase/config"
import { LoadingSpinner } from "../components/loadingSpinner" 

interface PrivateRouteProps {
  children: ReactNode
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const [user, loading] = useAuthState(auth)

  if (loading) return (
    <div className="h-screen flex justify-center items-center">
      <LoadingSpinner />
    </div>
  )

  if (!user) return <Navigate to="/login" />

  return <>{children}</>
}

export default PrivateRoute
