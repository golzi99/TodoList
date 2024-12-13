import React, { ReactNode, useEffect } from 'react'
import { useAppSelector } from 'common/hooks'
import { Path } from 'common/router'
import { useNavigate } from 'react-router'
import { selectIsLoggedIn } from 'app/appSlice'

interface ProtectedRouteProps {
  children: ReactNode
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoggedIn) navigate(Path.Login)
  }, [isLoggedIn])

  return isLoggedIn ? <>{children}</> : null
}
