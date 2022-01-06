import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile } from 'firebase/auth'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { setIsLoading } from '../features/isloadingSlice';
import { login, logout } from '../features/userSlice';
import initAuth from '../Firebase/initAuth';

initAuth();

export const useFirebase = () => {
    const auth = getAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const Redirect = () => {
        console.log(location);
        const destination = location?.state?.from?.pathname || '/';
        navigate(destination);
    }

    const signWithGoogle = () => {
        dispatch(setIsLoading(true));
        const googleProvider = new GoogleAuthProvider();
        signInWithPopup(auth, googleProvider)
            .then(authUser => {
                dispatch(login({ ...authUser.user }));
                Redirect();
            }).catch(error => alert(error.message))
            .finally(() => dispatch(setIsLoading(false)))
    }

    const userRegister = (name, photoURL, email, password) => {
        dispatch(setIsLoading(true));
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                updateProfile(auth.currentUser, {
                    displayName: name, photoURL
                }).then(() => { })
                dispatch(login({ displayName: name, email, photoURL }));
                Redirect();
            }).catch(error => alert(error.message))
            .finally(() => dispatch(setIsLoading(false)))
    }

    const logIn = (email, password) => {
        dispatch(setIsLoading(true));
        signInWithEmailAndPassword(auth, email, password)
            .then(userAuth => {
                dispatch(login({ ...userAuth?.user }));
                Redirect();
            }).catch(error => alert(error.message))
            .finally(() => dispatch(setIsLoading(false)))
    }

    const logOut = () => {
        console.log('bal');
        dispatch(setIsLoading(true));
        signOut(auth)
            .then(() => {
                dispatch(logout())
                Redirect();
            }).catch(error => alert(error.message))
            .finally(() => dispatch(setIsLoading(false)))
    }


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            // dispatch(setIsLoading(true));
            if (user) {
                dispatch(login({ ...user }))
            }
            else {
                dispatch(login({}))
            }
            dispatch(setIsLoading(false));
        })
        return () => unsubscribe;
    }, [])

    return {
        logIn,
        logOut,
        Redirect,
        userRegister,
        signWithGoogle,
    }
}