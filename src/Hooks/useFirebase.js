import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile } from 'firebase/auth';
import { getDownloadURL, getStorage, ref, uploadBytes, uploadString } from 'firebase/storage';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { setIsLoading } from '../features/isloadingSlice';
import { login, logout, selectUser } from '../features/userSlice';
import initAuth from '../Firebase/initAuth';

initAuth();

export const useFirebase = () => {
    const auth = getAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const storage = getStorage();
    const [update, setUpdate] = useState(0);
    const Redirect = () => {
        const destination = location?.state?.from?.pathname || '/';
        navigate(destination);
    }

    const updateNewName = (displayName) => {
        updateProfile(auth?.currentUser, { displayName })
            .then(() => {
                console.log('new name updated')
                setUpdate(update + 1)
            })
            .catch((e) => console.log(e.message))
            .finally(() => dispatch(login({ ...user, displayName })))
    }

    const uploadAvatar = async (file) => {
        const fileRef = ref(storage, 'avatar/' + auth?.currentUser?.uid + '.png');
        dispatch(setIsLoading(true));
        const snapshot = await uploadString(fileRef, file, 'data_url');
        const photoURL = await getDownloadURL(fileRef);
        updateProfile(auth?.currentUser, { photoURL })
            .then(() => console.log('avatar uploaded'))
            .catch(e => console.log(e.message))
            .finally(() => dispatch(login({ ...user, photoURL })))
        dispatch(setIsLoading(false));
    }

    const userRegister = (name, photoURL, email, password) => {
        dispatch(setIsLoading(true));
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                updateProfile(auth.currentUser, {
                    displayName: name, photoURL
                }).then(() => { })
                dispatch(login(result?.user));
                // dispatch(login({ displayName: name, email, photoURL }));
                Redirect();
            }).catch(error => alert(error.message))
            .finally(() => dispatch(setIsLoading(false)))
    }

    const logIn = (email, password) => {
        dispatch(setIsLoading(true));
        signInWithEmailAndPassword(auth, email, password)
            .then(userAuth => {
                dispatch(login({ ...userAuth.user }));
                Redirect();
            }).catch(error => alert(error.message))
            .finally(() => dispatch(setIsLoading(false)))
    }

    const logOut = () => {
        dispatch(setIsLoading(true));
        signOut(auth)
            .then(() => {
                dispatch(logout())
                Redirect();
            }).catch(error => alert(error.message))
            .finally(() => dispatch(setIsLoading(false)))
    }


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (result) => {
            if (result) {
                dispatch(login({ ...result?.providerData[0] }))
            }
            else {
                dispatch(login({}))
            }
            dispatch(setIsLoading(false));
        })
        return () => unsubscribe;
    }, [auth, update])

    return {
        logIn,
        logOut,
        Redirect,
        uploadAvatar,
        userRegister,
        updateNewName
    }
}