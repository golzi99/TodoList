import { SxProps } from "@mui/material"

export const getListItemSx = (isDone: boolean): SxProps => ({
  p: 0,
  justifyContent: "space-between",
  borderBottom: "1px solid grey",

  // '& span': {
  //     opacity: isDone ? '0.5' : '1',
  //     fontWeight: isDone ? '400' : 'bold',
  //     textDecoration: isDone ? 'line-through' : ''
  // },

  "& span:last-of-type": {
    opacity: isDone ? "0.5" : "1",
    fontWeight: isDone ? "400" : "bold",
    textDecoration: isDone ? "line-through" : "",
  },
})
