import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {MenuButton} from './Menu/MenuButton';
import Switch from '@mui/material/Switch';
// import {useTheme} from '@mui/material';

type ButtonAppBarPropsType = {
    onChange: () => void
}

export default function ButtonAppBar({onChange}: ButtonAppBarPropsType) {
    // const theme = useTheme()

    return (
        <Box sx={{ flexGrow: 1 , paddingBottom: '80px'}}>
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        News
                    </Typography>
                    <MenuButton color="inherit">Login</MenuButton>
                    <MenuButton color="inherit">LogOut</MenuButton>
                    <MenuButton color="inherit">FAQ</MenuButton>
                    <Switch color={'default'} onChange={onChange}/>
                </Toolbar>
            </AppBar>
        </Box>
    );
}