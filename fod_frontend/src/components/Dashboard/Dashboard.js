import React,{useState} from 'react'
import {useAuth} from "../../context/AuthContext"
import {useHistory} from "react-router-dom"

export default function Dashboard() {

    const [error, setError] =useState("")
    const {currentUser,logout } = useAuth()
    const history = useHistory()

    async function handleLogout(){
        setError('')

        try{
            logout()
            history.push('/login')
        }
        catch{
            setError('Failed to log out')
        }
    }

    return (
        <div>
            <a href="" onClick={handleLogout}>Logout</a>
        </div>
    )
}
