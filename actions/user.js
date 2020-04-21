import actionTypes from './actionTypes'
import {service, loginRequest, loginRequestJQ} from '../requests'
import { message } from 'antd'
import user from '../reducers/user'

const startLogin=()=>{
    return{
        type:actionTypes.START_LOGIN
    }
}

const loginSuccess=(userInfo)=>{
    return{
        type:actionTypes.LOGIN_SUCCESS,
        payload: {
            userInfo
        }
    }
}

const loginFailed=()=>{
    window.localStorage.removeItem("authToken")
    window.localStorage.removeItem("userInfo")
    window.sessionStorage.removeItem("authToken")
    window.sessionStorage.removeItem("userInfo")
    return{
        type:actionTypes.LOGIN_FAILED,

    }
}

export const logout=()=>{
    return dispatch =>{
        //should report to server that user exit
        dispatch(loginFailed())
    }
}

export const login=(p_userInfo)=>{
    return dispatch=>{
        dispatch(startLogin())
        loginRequest(p_userInfo)
        .then(resp=>{
            if (resp.data.code === 200)
            {
                console.log(resp)
                const{
                    authToken,
                    ...userInfo 
                } = resp.data.data
                console.log("p_userInfo")
                console.log(p_userInfo)
                if (p_userInfo.remember === true)
                {
                    window.localStorage.setItem('authToken', authToken)
                    window.localStorage.setItem('userInfo', JSON.stringify(userInfo))
                }
                else{
                    window.sessionStorage.setItem('authToken', resp.data.data.authToken)
                    window.sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
                }
                dispatch(loginSuccess(resp.data.data))
            }
            else{
                dispatch(loginFailed())
            }
        })
       
    }
}