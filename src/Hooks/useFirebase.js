import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile } from 'firebase/auth';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { setIsLoading } from '../features/isloadingSlice';
import { login, logout } from '../features/userSlice';
import initAuth from '../Firebase/initAuth';

initAuth();

export const useFirebase = () => {
    const auth = getAuth();
    const location = useLocation();
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    // const dispatch = useDispatch();
    const [updateCount, setUpdateCount] = useState(0);
    const storage = getStorage();
    const Redirect = () => {
        console.log(location);
        const destination = location?.state?.from?.pathname || '/';
        navigate(destination);
    }

    const uploadAvatar = async (file) => {
        const fileRef = ref(storage, 'avatar/' + auth?.currentUser?.uid + '.png');
        setIsLoading(true);
        // dispatch(setIsLoading(true));
        const snapshot = await uploadBytes(fileRef, file);
        const photoURL = await getDownloadURL(fileRef);
        updateProfile(auth.currentUser, { photoURL })
            .then(() => setUpdateCount(updateCount + 1))
            .then(() => setUser(auth.currentUser))
            .catch(e => console.log(e.message))
        setIsLoading(false);
        // dispatch(setIsLoading(false));
        console.log(snapshot);
    }

    const userRegister = (name, photoURL, email, password) => {
        setIsLoading(true);
        // dispatch(setIsLoading(true));
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                updateProfile(auth.currentUser, {
                    displayName: name, photoURL
                }).then(() => { })
                setUser({ displayName: name, email, photoURL });
                // dispatch(login({ displayName: name, email, photoURL }));
                Redirect();
            }).catch(error => alert(error.message))
            .finally(() => {
                setIsLoading(false);
                // dispatch(setIsLoading(false))
            })
    }

    const logIn = (email, password) => {
        setIsLoading(true)
        // dispatch(setIsLoading(true));
        signInWithEmailAndPassword(auth, email, password)
            .then(userAuth => {
                setUser({ ...userAuth?.user })
                // dispatch(login({ ...userAuth?.user }));
                Redirect();
            }).catch(error => alert(error.message))
            .finally(() => {
                setIsLoading(false);
                // dispatch(setIsLoading(false))
            })
    }

    const logOut = () => {
        setIsLoading(true);
        // dispatch(setIsLoading(true));
        signOut(auth)
            .then(() => {
                setUser({});
                // dispatch(logout())
                Redirect();
            }).catch(error => alert(error.message))
            .finally(() => {
                setIsLoading(false);
                // dispatch(setIsLoading(false))
            })
    }


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (result) => {
            // dispatch(setIsLoading(true));
            if (result) {
                setUser({ ...result });
                // dispatch(login({ ...result }))
            }
            else {
                setUser({});
                // dispatch(login({}))
            }
            setIsLoading(false);
            // dispatch(setIsLoading(false));
        })
        return () => unsubscribe;
    }, [updateCount, auth])

    return {
        user,
        setUser,
        logIn,
        logOut,
        Redirect,
        isLoading,
        uploadAvatar,
        setIsLoading,
        userRegister,
    }
}