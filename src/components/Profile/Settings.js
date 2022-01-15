import { PhotoCamera } from '@mui/icons-material';
import { Button, createTheme, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Input, Slide, Slider, Stack, TextField, ThemeProvider } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import React, { useRef, useState } from 'react';
import AvatarEditor from 'react-avatar-editor';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import { useFirebase } from '../../Hooks/useFirebase';
import { BiZoomIn, BiZoomOut } from 'react-icons/bi';
import { ImCross } from 'react-icons/im';

const theme = createTheme();

const useStyles = makeStyles((theme) => ({
    cover: ({ photoURL }) => ({
        position: 'relative',
        width: '100%',
        height: '280px',
        background: `url(${photoURL || `http://0.gravatar.com/avatar/ad516503a11cd5ca435acc9bb6523536?s=320`}) center center / cover`
    }),
    coverOverlay: {
        position: 'absolute',
        display: 'grid',
        placeItems: 'center',
        width: '100%',
        height: '100%',
        background: 'rgba(68, 67, 67, 0.45)',
        // boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        backdropFilter: 'blur(12px)'
    },
    imgContainer: ({ photoURL }) => ({
        position: 'relative',
        width: '150px',
        height: '150px',
        borderRadius: '50%',
        background: `url(${photoURL || `http://0.gravatar.com/avatar/ad516503a11cd5ca435acc9bb6523536?s=320`}) center center / cover`,
        // transition: '0.25s ease-out',
        // '&:hover': {
        //     transition: '0.325s ease-in',
        //     boxShadow: '0 0 16px 1px rgba(160, 229, 255, 0.5)',
        // }
    }),
    uploadIconContainer: {
        position: 'absolute',
        bottom: '8px',
        right: '0',
        zIndex: '10'
    },
    uploadIcon: {
        background: 'rgb(79, 77, 77) !important',
        color: 'rgb(206, 196, 196) !important'
    },
    modal: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        zIndex: '100',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3
    },
    crop_container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: '80px',
        width: '300px',
        height: '300px'
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Settings = () => {
    const user = useSelector(selectUser)
    const { uploadAvatar, updateNewName } = useFirebase();
    const [imgSelect, setImgSelect] = useState(null);
    const [newName, setNewName] = useState('');
    const [open, setOpen] = React.useState(false);
    const [scale, setScale] = useState(1);
    const EditorRef = useRef(null);


    const handleClickOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }

    const HandleSelectImg = (e) => {
        const img = e.target.files[0];
        console.log(e.target.files[0]);
        setImgSelect(img);
        if (img != null)
            handleClickOpen();
        // uploadAvatar(img);
    }

    const handleChangeName = (e) => {
        updateNewName(newName);
        setNewName('');
        e.preventDefault();
    }

    const showCroppedImage = async () => {
        if (EditorRef.current) {
            const img = EditorRef.current.getImage().toDataURL();
            uploadAvatar(img);
            console.log(img);
        }
    }

    const classes = useStyles(user);

    return (
        <ThemeProvider theme={theme}>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                // keepMounted
                // onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <Button
                    variant='contained'
                    sx={{
                        position: 'absolute',
                        right: '20px',
                        top: '20px',
                        width: 'auto',
                        backgroundColor: 'red !important'
                    }}
                    onClick={handleClose}
                >
                    <ImCross />
                </Button>
                <DialogTitle>update avatar</DialogTitle>
                <DialogContent>
                    <Box>
                        <AvatarEditor
                            ref={EditorRef}
                            image={imgSelect}
                            width={250}
                            height={250}
                            border={35}
                            borderRadius={0}
                            scale={scale}
                            color={[89, 72, 72, 0.5]}
                        />
                    </Box>
                    <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                        <BiZoomIn style={{ fontSize: '2rem' }} />
                        <Slider min={0.92} max={10} step={0.01} onChange={(e) => setScale(e.target.value)} />
                        <BiZoomOut style={{ fontSize: '2rem' }} />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button variant='contained' onClick={showCroppedImage}>upload</Button>
                </DialogActions>
            </Dialog>
            <Box style={{ display: 'grid', placeItems: 'center', height: '100vh' }}>
                <Box sx={{ boxShadow: '8px 8px 20px #C0C0C0', mt: 10, width: { xs: 0.9, sm: 0.4, md: 0.3 } }}>
                    <Box className={classes.cover}>
                        <Box className={classes.coverOverlay}>
                            <Box className={classes.imgContainer}>
                                <label htmlFor="icon-button-file" className={classes.uploadIconContainer}>
                                    <Input accept="image/*" value='' onChange={HandleSelectImg} id="icon-button-file" type="file" style={{ display: 'none' }} />
                                    <IconButton className={classes.uploadIcon} aria-label="upload picture" component="span">
                                        <PhotoCamera />
                                    </IconButton>
                                </label>
                            </Box>
                        </Box>
                    </Box>
                    <form onSubmit={handleChangeName}>
                        <Box sx={{ m: 3, display: 'grid', rowGap: '25px' }}>
                            <TextField onChange={(e) => setNewName(e.target.value)} defaultValue={newName} name="displayName" label="New name" variant="outlined" />
                            <Button type="submit" onClick={handleChangeName} disabled={!newName} variant="contained">Update</Button>
                        </Box>
                    </form>
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default Settings;