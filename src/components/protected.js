import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Protected = function(props){
    const {Component} = props;
    const navigate = useNavigate()
    useEffect(()=>{
        let login = localStorage.getItem("UID");
        let api = localStorage.getItem("api_key");
        let resume = localStorage.getItem("Subscriptiontype")
        // if(Component==="UpdateResume" && resume){
        //     navigate('/updateresume')
        // }
        // else if(Component==="updategemini" && api){
        //     navigate('/updategemini')
        // }
        // else if(Component==="Demo" && login && api && resume){
        //     navigate('/demo')
        // }
        if(!login){
            navigate('/login')
        }
    })
    return (
        <div>
            <Component/>
        </div>
    )
}

export default Protected;