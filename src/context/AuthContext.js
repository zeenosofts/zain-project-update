import {createContext,useContext,useEffect,useState}from'react'
import {
    createUserWithEmailAndPassword, 
    getAuth,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
  } from 'firebase/auth';
  import {auth}from '../firebase/config'
  const UserContext=createContext()

  
export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState({});
  
   
     const signIn = (email, password) =>  {
      return signInWithEmailAndPassword(auth, email, password)
     }
  const signUp=(auth,email,password)=>{
    return createUserWithEmailAndPassword(auth,email,password)
  }
    const logout = (navigate) => {
        return signOut(auth)&&navigate('/login')
     
    }
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        console.log(currentUser);
        setUser(currentUser);
      });
      return () => {
        unsubscribe();
      };
    }, []);
  
    return (
      <UserContext.Provider value={{ user, logout, signIn,signUp }}>
        {children}
      </UserContext.Provider>
    );
  };
  
  export const UserAuth = () => {
    return useContext(UserContext);
  };
