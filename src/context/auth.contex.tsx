import { createContext,useEffect,useState,ReactNode } from "react";
import service from "../service/service.config";
import { Box, CircularProgress } from "@mui/material";

interface AuthWrapperProps{
    children: ReactNode
}
interface AuthContextProps{
    isLoggedIn: boolean;
    loggedUserId: number|null;
    loggedUserCartId: number|null;
    isAdmin: boolean;
    authenticateUser: ()=> Promise<void>;
    cartCount:number;
    fetchCart:(userId:number)=> Promise<void>;
    addToCart:(itemId: number, quantity: number, userId: number, cartId: number) => Promise<{ success: boolean; data?: any; error?: string }>;
}
interface CartItem{
id: number;  
  quantity: number;
  userId:number;
  cartId:number
}
const defaultAuthContext: AuthContextProps ={
    isLoggedIn: false,
    loggedUserId: null,
    loggedUserCartId:null,
    isAdmin: false,
    authenticateUser: async ()=> {},
    cartCount:0,
    fetchCart:async ()=> {},
    addToCart:async () => ({ success: false }),
}

const AuthContext = createContext<AuthContextProps>(defaultAuthContext)

function AuthWrapper(props: AuthWrapperProps){
const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
const [loggedUserId, setLoggedUserId] = useState<number|null>(null);
const [loggedUserCartId, setLoggedUserCartId] = useState<number|null>(null);
const [isAuthenticating, setIsAuthenticating] = useState<boolean>(true);
const [isAdmin, setIsAdmin] = useState<boolean>(false);
const [cartCount, setCartCount] = useState<number>(0);

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
    if(!userId){
        console.error("fetchCart: userId is null or undefined")
        return
    }
    try {
      
      const response = await service.get(`/users/${userId}`);
      const fetchedCart:CartItem[] = response.data.response[0].cart_items 
      const totalQuantity = fetchedCart.reduce((total:number,item:CartItem)=>total + item.quantity, 0)
      setCartCount(totalQuantity)  
      console.log("fetchCart")
    }catch(error){
        console.log(error)
    }
  }
  const addToCart = async (itemId:number, quantity:number,userId:number,cartId:number) => {
      if(!userId || !cartId){
          console.error("addToCart: userId or cartId is null or undefined")
          return { success: false, error: "Invalid user or cart ID" }
      }
    const payload = {
      product_id: itemId,
      quantity:quantity,
      user_id: userId,
      cart_id: cartId
    };
    console.log(payload)
    try {
      const response = await service.post("/users/cart", payload);
      if(loggedUserCartId && loggedUserId){
          await fetchCart(loggedUserId)
      }
      console.log("product added")
      return { success: true, data: response.data }
    } catch (error:unknown) {
      console.log("was not able to add to cart", error);
      return { success: false, error:(error as any).response?.data || (error as Error).message }
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
    return( <Box sx={{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh"}}><h3>Validating credentials ...</h3> <CircularProgress color="secondary"/></Box>)
}

return(
    <AuthContext.Provider value={passedContext}>
        {props.children}
    </AuthContext.Provider>
)
}

export {AuthContext, AuthWrapper}