import { createBrowserRouter, Navigate, RouteObject } from 'react-router-dom'
import App from 'app/App'
import { Main } from 'app/Main'
import { Login } from '../../features/auth/ui/Login/Login'
import { Page404, PrivateRoute } from 'common/components'
import React from 'react'

export const Path = {
  Login: 'login',
  Main: '/',
} as const

const publicRoutes: RouteObject[] = [
  {
    path: Path.Login,
    element: <Login />,
  },
  {
    path: '*',
    element: <Page404 />,
  },
]
const privateRoutes: RouteObject[] = [
  {
    path: Path.Main,
    element: <Main />,
  },
]

export const router = createBrowserRouter([
  {
    path: Path.Main,
    element: <App />,
    errorElement: <Navigate to={'*'} />,
    children: [
      {
        element: <PrivateRoute />,
        children: privateRoutes,
      },
      ...publicRoutes,
    ],
  },
])
