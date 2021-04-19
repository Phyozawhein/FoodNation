import React,{useState} from 'react'
import {Button,Alert} from "react-bootstrap"
import {useAuth} from "../../context/AuthContext"
import {Link, useHistory} from "react-router-dom"

export default function Dashboard() {

    const [error, setError] =useState("")
    const {currentUser,logout } = useAuth()



    return (
        <div>
            <p>Dashboard</p>
        </div>
    )
}
