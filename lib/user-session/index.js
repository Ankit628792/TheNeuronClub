"use strict"
import jwt from 'jsonwebtoken'

const userSession = () => {
    try {
        if(typeof window !== 'undefined'){
            const data = JSON.parse(window.localStorage.getItem('token'));
            const verifyToken = jwt.verify(data?.token, 'zyxwvutsrqponmlkjihgfedcbaneuronclub');
            return verifyToken;
        }
    } catch (error) {
        return ;
    }
}

export { userSession }