import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import CircularProgress from '@mui/material/CircularProgress';
import { useSelector } from 'react-redux';
import { useFirebase } from '../Hooks/useFirebase';
import { selectUser } from '../features/userSlice';
import { selectIsLoading } from '../features/isloadingSlice';
import { NavLink, useLocation } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import useAuth from '../Hooks/useAuth';

const pages = [
    { title: 'Home', to: '/home' },
    { title: 'Schedule', to: '/schedule' },
    { title: 'Classes', to: '/classes' },
    { title: 'Contact us', to: '/contact' }
];

const useStyles = makeStyles((theme) => ({
    appBarTransparent: {
        backgroundColor: 'rgba(13, 10, 10,0.8) !important',
        transition: '0.3s ease-in !important'
    },
    appBarSolid: {
        backgroundColor: 'rgb(13, 10, 10) !important',
        transition: '0.3s ease-in-out !important'
    }
}));

const Navigation = () => {
    const { logOut, user, isLoading } = useAuth();
    // const { logOut, user, isLoading } = useFirebase();
    const location = useLocation();
    // const user = useSelector(selectUser);
    // const isLoading = useSelector(selectIsLoading)
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const [navBackground, setNavBackground] = React.useState('appBarTransparent');
    const navRef = React.useRef();
    navRef.current = navBackground;

    React.useEffect(() => {
        const handleScroll = () => {
            const show = window.scrollY > 70;
            if (show)
                setNavBackground('appBarSolid')
            else
                setNavBackground('appBarTransparent')
        }
        document.addEventListener('scroll', handleScroll);
        return () => {
            document.removeEventListener('scroll', handleScroll);
        }
    }, [])

    const navList = (
        <>
            {
                pages.map((item, index) => (
                    <NavLink to={item.to} key={index} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <MenuItem
                            onClick={handleCloseNavMenu}
                        >
                            <Typography variant='button'>
                                {item.title}
                            </Typography>
                        </MenuItem>
                    </NavLink>
                ))
            }
        </>
    )
    const classes = useStyles();

    if (!location?.pathname?.includes('dashboard'))
        return (
            <AppBar position="fixed" className={classes[navRef.current]}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                        >
                            FITNESS
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                    {navList}
                                </Box>
                            </Menu>
                        </Box>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                        >
                            FITNESS
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {navList}
                        </Box>
                        {
                            user?.email ? (
                                <Box sx={{ flexGrow: 0 }}>
                                    <Typography variant='button' sx={{ display: 'inline', mr: 2 }}>{user.displayName}</Typography>
                                    <Tooltip title="Open settings">
                                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                            {isLoading ? <CircularProgress color="inherit" />
                                                : <Avatar alt="avatar" src={user.photoURL} />
                                            }
                                        </IconButton>
                                    </Tooltip>
                                    <Menu
                                        sx={{ mt: '45px' }}
                                        id="menu-appbar"
                                        anchorEl={anchorElUser}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={Boolean(anchorElUser)}
                                        onClose={handleCloseUserMenu}
                                    >
                                        <NavLink style={{ textDecoration: 'none', color: 'inherit' }} to="/dashboard">
                                            <MenuItem onClick={handleCloseUserMenu}>
                                                Dashboard
                                            </MenuItem>
                                        </NavLink>
                                        <NavLink style={{ textDecoration: 'none', color: 'inherit' }} to="/settings">
                                            <MenuItem onClick={handleCloseUserMenu}>
                                                Settings
                                            </MenuItem>
                                        </NavLink>
                                        <Typography sx={{ color: 'inherit' }} onClick={logOut}>
                                            <MenuItem onClick={handleCloseUserMenu}>
                                                Log out
                                            </MenuItem>
                                        </Typography>
                                    </Menu>
                                </Box>
                            ) : <NavLink to='/login' style={{ textDecoration: 'none', color: 'inherit' }}><Button variant=''>Login</Button></NavLink>
                        }
                    </Toolbar>
                </Container>
            </AppBar>
        );
    return null;
};
export default Navigation;
