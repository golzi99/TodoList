import React, { useEffect } from 'react'
import { useAppSelector } from 'common/hooks'
import { Path, Routing } from 'common/router'
import { useNavigate } from 'react-router'
import { selectIsLoggedIn } from 'app/appSlice'

export const ProtectedRoute = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoggedIn) navigate(Path.Login)
  }, [isLoggedIn])

  return <Routing />
}
