import React,{createContext,useState} from "react"
import App from "./App";

export const Context = createContext()

export function AppProvider({children}){
    const [user, setUser] = useState(null);
    const [currentContact, setCurrentContact] = useState(1235);
    const [contacts, setContacts] = useState([]);
    const [messages, setMessages] = useState({});

    return (
        <Context.Provider value={{
            user,setUser,
            messages,setMessages,
            contacts,setContacts,
            currentContact,setCurrentContact
            }} >
                {children}
        </Context.Provider>
    )
}

export default Context