import {useState,useEffect,createContext, useContext} from 'react'

const UserContext = createContext(null);

const UserProvider = ({children})=>{
    const [user,setUser] = useState();     

    useEffect(()=>{
        const data = localStorage.getItem(user);
        if(data){
            const parseData = JSON.parse(data);
            setUser(parseData);
        }
    },[user]);

    return(
        <UserContext.Provider value={[user,setUser]}>
            {children}
        </UserContext.Provider>
    )
}

// custom hook
const useUser = ()=> useContext(UserContext);

export {useUser , UserProvider};