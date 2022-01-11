import React, { createContext } from 'react';
import { useFirebase } from '../Hooks/useFirebase';

export const FirebaseAuth = createContext(null);

const AuthContext = ({ children }) => {
    const AllContext = useFirebase();
    return (
        <FirebaseAuth.Provider value={AllContext}>
            {children}
        </FirebaseAuth.Provider>
    );
};

export default AuthContext;