import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { MenuButton } from './MenuButton'
import Switch from '@mui/material/Switch'
import LinearProgress from '@mui/material/LinearProgress'
import { useAppDispatch, useAppSelector } from 'common/hooks'
import { selectAppStatus, selectIsLoggedIn, setAppStatus, setIsLoggedIn } from 'app/appSlice'
import { useLogoutMutation } from '../../../features/auth/api/auth-Api'
import { ResultCode } from '../../../features/todolists/lib/enums'
// import { clearTodolists } from '../../../features/todolists/model/todolistsSlice'
// import { clearTasks } from '../../../features/todolists/model/tasksSlice'
import { baseApi } from 'app/baseApi'

type Props = {
  onChange: () => void
}

export function ButtonAppBar({ onChange }: Props) {
  const status = useAppSelector(selectAppStatus)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const dispatch = useAppDispatch()

  const [logout] = useLogoutMutation()

  const logOutHandler = () => {
    logout()
      .then((res) => {
        if (res.data?.resultCode === ResultCode.Success) {
          dispatch(setAppStatus({ status: 'succeeded' }))
          dispatch(setIsLoggedIn({ isLoggedIn: false }))
          localStorage.removeItem('sn-token')
          // dispatch(clearTodolists())
          // dispatch(clearTasks())

          // dispatch(baseApi.util.resetApiState())
        }
      })
      .then(() => {
        dispatch(baseApi.util.invalidateTags(['Task', 'Todolist']))
      })
  }

  return (
    <Box sx={{ flexGrow: 1, paddingBottom: '80px' }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          {isLoggedIn && (
            <MenuButton color="inherit" onClick={logOutHandler}>
              LogOut
            </MenuButton>
          )}
          <MenuButton color="inherit">FAQ</MenuButton>
          <Switch color={'default'} onChange={onChange} />
        </Toolbar>
        {status === 'loading' && <LinearProgress />}
      </AppBar>
    </Box>
  )
}
