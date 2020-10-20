import React,{createContext,useState} from "react"
import App from "./App";

export const Context = createContext()

export function AppProvider({children}){
    const [user, setUser] = useState(null);
    const [currentContact, setCurrentContact] = useState(1235);
    const [contacts, setContacts] = useState([]);
    const [messages, setMessages] = useState([
        {uid:1234,messages:[
            {text:"Hi",user:true},
            {text:"Hello What's up"},
        ]},
        {uid:1235,messages:[
            {text:"No idea"},
            {text:"In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content",user:true},
        ]},
        {uid:1236,messages:[
            {text:"Long time no see",user:true},
            {text:"Eid ka chaand"},
        ]},
    ]);

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