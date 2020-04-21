import axios from 'axios'
import {message} from 'antd'
import $ from "jquery";

//webpack setting
const isDev = process.env.NODE_ENV ==='development'

export const service = axios.create({
    baseURL:isDev?'http://rap2api.taobao.org/app/mock/176929':'http://rap2api.taobao.org/app/mock/176929'
})

export const service1 = axios.create({
    baseURL:isDev?'http://rap2api.taobao.org/app/mock/176929':'http://rap2api.taobao.org/app/mock/176929'
})

//add token
service.interceptors.request.use((config)=>{
    config.data = {
        ...config,
        authToken:'itisatokenplaceholder'
    }
    return config
}
)

service.interceptors.response.use((resp)=>{

    if (resp.data.code === 200){
        return resp.data.data
    }
    else
    {
        message.error(resp.data.errMsg)
    }
}

)

export const getArticles = (offset=0, limited=10)=>{
    return service.post('/api/v1/articleList', {offset, limited})
}

export const deleteArticleId =(id)=>{
    return service.post(`/api/v1/articleDelete/${id}`)
}

export const saveArticle =(id,data)=>{
    return service.post(`/api/v1/articleEdit/${id}`,data)
}

export const getArticleAmount=()=>{
    return service.post('/api/v1/articleAmount')
}

export const getNotifications=()=>{
    return service.post('/api/v1/notifications')
}

export const loginRequest=(userInfo)=>{
    return service1.post('/api/v1/login/', userInfo)
}

export const loginRequestJQ=(userInfo)=>{
    var settings = {
        "url": "http://rap2api.taobao.org/app/mock/176929/api/v1/login/",
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Content-Type": "application/x-www-form-urlencoded",
          //"Cookie": "koa.sid=zeRkfnfLcnUkqOfOqPXG0NIOK5qsPc8D; koa.sid.sig=E6tqt1khzdCZdZXRgH5Z5nv-Sic"
        },
        "data": userInfo
      };

      return $.ajax(settings).done()
}
