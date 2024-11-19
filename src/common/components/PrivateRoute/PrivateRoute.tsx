import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { Path } from 'common/router'
import { useSelector } from 'react-redux'
import { selectIsLoggedIn } from '../../../features/auth/model/authSelector'

export const PrivateRoute = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn)

  return !isLoggedIn ? <Navigate to={Path.Login} /> : <Outlet />
}
