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
    cartCount:number;
    fetchCart:()=> Promise<void>;
    addToCart:()=> Promise<void>;
}
const defaultAuthContext: AuthContextProps ={
    isLoggedIn: false,
    loggedUserId: null,
    loggedUserCartId:null,
    isAdmin: false,
    authenticateUser: async ()=> {},
    cartCount:0,
    fetchCart:async ()=> {},
    addToCart:async ()=> {},
}

const AuthContext = createContext(defaultAuthContext)

function AuthWrapper(props: AuthWrapperProps){
const [isLoggedIn, setIsLoggedIn] = useState(false);
const [loggedUserId, setLoggedUserId] = useState(null);
const [loggedUserCartId, setLoggedUserCartId] = useState(null);
const [isAuthenticating, setIsAuthenticating] = useState(true);
const [isAdmin, setIsAdmin] = useState(false);
const [cartCount, setCartCount] = useState(0);

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

const fetchCart = async (userId:number) => {
    try {
      userId
      const response = await service.get(`/users/${userId}`);
      const fetchedCart = response.data.response[0].cart_items 
      const totalQuantity = fetchedCart.reduce((total,item)=>total + item.quantity, 0)
      setCartCount(totalQuantity)  
      console.log("fetchCart")
    }catch(error){
        console.log(error)
    }
  }
  const addToCart = async (itemId, quantity,userId,cartId) => {
    const payload = {
      product_id: itemId,
      quantity:quantity,
      user_id: userId,
      cart_id: cartId
    };
    console.log(payload)
    try {
      const response = await service.post("/users/cart", payload);
      await fetchCart(loggedUserId)
      console.log("product added")
      return { success: true, data: response.data }
    } catch (error) {
      console.log("was not able to add to cart", error);
      return { success: false, error: error.response?.data || error.message }
    }
  };

const passedContext = {
    isLoggedIn,
    loggedUserId,
    loggedUserCartId,
    isAdmin,
    authenticateUser,
    cartCount,
    fetchCart,
    addToCart
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