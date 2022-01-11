import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link, Outlet } from 'react-router-dom';
import { useFirebase } from '../../Hooks/useFirebase';
import useAuth from '../../Hooks/useAuth';
// import Pay from '../Components/Dashboard/Pay';
// import MyOrder from '../Components/Dashboard/MyOrder';
// import AddReview from '../Components/Dashboard/AddReview';
// import AdminRoute from '../ProtectedRoute/AdminRoute';
// import MakeAdmin from '../Components/Dashboard/MakeAdmin';
// import AddProduct from '../Components/Dashboard/AddProduct';
// import ManageAllOrders from '../Components/Dashboard/ManageAllOrders';
// import ManageProducts from '../Components/Dashboard/ManageProducts';

const drawerWidth = 250;

export default function Dashboard(props) {
    // let test = useMatch();
    // console.log(test);
    const { logOut } = useAuth();
    // const { logOut } = useFirebase();
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);


    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <List>
                <Link to='/' style={{ color: 'inherit', textDecoration: 'none' }}>
                    <ListItem button >
                        <ListItemText primary="Home" />
                    </ListItem>
                </Link>
                {
                    // admin &&
                    <Box>
                        <Link to="" style={{ color: 'inherit', textDecoration: 'none' }}>
                            <ListItem button >
                                <ListItemText primary="Manage all orders" />
                            </ListItem>
                        </Link>
                        <Link to="manageproducts" style={{ color: 'inherit', textDecoration: 'none' }}>
                            <ListItem button >
                                <ListItemText primary="Manage products" />
                            </ListItem>
                        </Link>
                        <Link to="addproduct" style={{ color: 'inherit', textDecoration: 'none' }}>
                            <ListItem button >
                                <ListItemText primary="Add product" />
                            </ListItem>
                        </Link>
                    </Box>
                }
                {
                    // !admin &&
                    // <Box>
                    //     <Link to={`${url}/pay`} style={{ color: 'inherit', textDecoration: 'none' }}>
                    //         <ListItem button >
                    //             <ListItemText primary="Pay" />
                    //         </ListItem>
                    //     </Link>
                    // </Box>
                }
            </List>
            <Divider />
            <List>
                <ListItem button onClick={logOut}>
                    <ListItemText primary={<Typography variant='button' color={'primary'}>Log out</Typography>} />
                </ListItem>
            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Dashboard
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />

                <Outlet />

                {/* <Switch>
                    {!admin ?
                     <Route exact path={path}>
                        <MyOrder />
                    </Route> :
                        <AdminRoute exact path={`${path}`}>
                            <ManageProducts />
                        </AdminRoute>
                    }
                    <Route exact path={`${path}/pay`}>
                        <Pay />
                    </Route>
                    <Route exact path={`${path}/review`}>
                        <AddReview />
                    </Route>
                    <AdminRoute exact path={`${path}/addproduct`}>
                        <AddProduct />
                    </AdminRoute>
                    <AdminRoute exact path={`${path}/addadmin`}>
                        <MakeAdmin />
                    </AdminRoute>
                    <AdminRoute exact path={`${path}/manageallorders`}>
                        <ManageAllOrders />
                    </AdminRoute>
                </Switch> */}


            </Box>
        </Box>
    );
}
