import React from 'react'
import s from './Page404.module.css'
import { Link } from 'react-router'
import { Path } from 'common/router'
import { MenuButton } from 'common/components/Menu/MenuButton'

export const Page404 = () => {
  return (
    <div className={s.container}>
      <h1 className={s.title}>404</h1>
      <h2 className={s.subTitle}>page not found</h2>
      <MenuButton component={Link} to={Path.Main}>
        Go back
      </MenuButton>
    </div>
  )
}
