import { useContext } from 'react';
import { FirebaseAuth } from '../Context/AuthContext';

const useAuth = () => {
    return useContext(FirebaseAuth)
}

export default useAuth;