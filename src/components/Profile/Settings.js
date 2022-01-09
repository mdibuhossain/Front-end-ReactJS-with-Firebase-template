import { PhotoCamera } from '@mui/icons-material';
import { Button, IconButton, Input, Paper, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box, height } from '@mui/system';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';

const Settings = () => {
    const user = useSelector(selectUser)

    const useStyles = makeStyles({
        cover: {
            position: 'relative',
            width: '100%',
            height: '280px',
            background: `url(${user?.photoURL}) center center / cover`
        },
        coverOverlay: {
            position: 'absolute',
            display: 'grid',
            placeItems: 'center',
            width: '100%',
            height: '100%',
            background: 'rgba(68, 67, 67, 0.45)',
            // boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
            backdropFilter: 'blur(15px)'
        },
        imgContainer: {
            position: 'relative',
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            background: `url(${user?.photoURL}) center center / cover`,
        },
        uploadIconContainer: {
            position: 'absolute',
            bottom: '8px',
            right: '0',
        },
        uploadIcon: {
            background: 'rgb(79, 77, 77) !important',
            color: 'rgb(206, 196, 196) !important'
        }
    })
    const classes = useStyles();

    return (
        <Box style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Box sx={{ boxShadow: '8px 8px 20px #C0C0C0', border: '1px solid black', width: { xs: 0.9, sm: 0.4, md: 0.3 } }}>
                <Box className={classes.cover}>
                    <Box className={classes.coverOverlay}>
                        <Box className={classes.imgContainer}>
                            <label htmlFor="icon-button-file" className={classes.uploadIconContainer}>
                                <Input accept="image/*" id="icon-button-file" type="file" style={{ display: 'none' }} />
                                <IconButton className={classes.uploadIcon} aria-label="upload picture" component="span">
                                    <PhotoCamera />
                                </IconButton>
                            </label>
                        </Box>
                    </Box>
                </Box>
                <form>
                    <Box sx={{ m: 3, display: 'grid', rowGap: '25px' }}>
                        <TextField label="New name" variant="outlined" />
                        <TextField label="Photo URL (optional)" variant="outlined" />
                        <Button variant="contained">Update</Button>
                    </Box>
                </form>
            </Box>
        </Box>
    );
};

export default Settings;