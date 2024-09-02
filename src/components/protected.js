import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Protected = function(props){
    const {Component} = props;
    const navigate = useNavigate()
    useEffect(()=>{
        let login = localStorage.getItem("UID");
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