import { createContext,useEffect,useState,ReactNode } from "react";
import service from "../service/service.config";

interface AuthWrapperProps{
    children: ReactNode
}
interface AuthContextProps{
    isLoggedIn: boolean;
    loggedUserId: string|null;
    loggedUserCartId: number|null;
    isAdmin: boolean;
    authenticateUser: ()=> Promise<void>;
}
const defaultAuthContext: AuthContextProps ={
    isLoggedIn: false,
    loggedUserId: null,
    loggedUserCartId:null,
    isAdmin: false,
    authenticateUser: async ()=> {}
}

const AuthContext = createContext(defaultAuthContext)

function AuthWrapper(props: AuthWrapperProps){
const [isLoggedIn, setIsLoggedIn] = useState(false);
const [loggedUserId, setLoggedUserId] = useState(null);
const [loggedUserCartId, setLoggedUserCartId] = useState(null);
const [isAuthenticating, setIsAuthenticating] = useState(true);
const [isAdmin, setIsAdmin] = useState(false);
const authenticateUser = async ()=>{
    const token = localStorage.getItem("token")
    if(!token){
        setIsLoggedIn(false)
        setIsAdmin(false)
        setIsAuthenticating(false)
        setLoggedUserId(null)
        setLoggedUserCartId(null)
        console.log("no token found")
        return
    }
    try {
        const response = await service.get ("/auth/user",{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        setIsLoggedIn(true)
        setLoggedUserId(response.data.user.userId)
        setLoggedUserCartId(response.data.user.cartId)
        setIsAuthenticating(false)
        if(response.data.user.role === "admin"){
            setIsAdmin(true)
        }else{
            setIsAdmin(false)
        }
       
        console.log("authenticateUser successfull")
    } catch (error) {
        console.log("was not able to authenticate user",error);
      setIsLoggedIn(false);
      setLoggedUserId(null);
      setIsAuthenticating(false);
      setIsAdmin(false);
      setLoggedUserCartId(null)
    }
}

const passedContext = {
    isLoggedIn,
    loggedUserId,
    loggedUserCartId,
    isAdmin,
    authenticateUser
}
useEffect(()=>{
authenticateUser()
},[])

if(isAuthenticating){
    return( <h3>Validating credentials ...</h3>)
}

return(
    <AuthContext.Provider value={passedContext}>
        {props.children}
    </AuthContext.Provider>
)
}

export {AuthContext, AuthWrapper}