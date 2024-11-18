import React from "react"
import s from "./Page404.module.css"
import { Link } from "react-router-dom"
import { styled } from "@mui/material"

export const Page404 = () => {
  return (
    <div className={s.container}>
      <h1 className={s.title}>404</h1>
      <h2 className={s.subTitle}>page not found</h2>
      <LinkStyle to={"/"}>Go back</LinkStyle>
    </div>
  )
}

const LinkStyle = styled(Link)(({ theme }) => ({
  minWidth: "110px",
  fontWeight: "bold",
  boxShadow: `0 0 0 2px ${theme.palette.primary.dark}, 4px 4px 0 0 ${theme.palette.primary.dark}`,
  borderRadius: "2px",
  textTransform: "capitalize",
  padding: "8px 24px",
  color: theme.palette.primary.contrastText,
  background: theme.palette.primary.light,
  "&:hover": {
    background: theme.palette.primary.main,
  },
}))
