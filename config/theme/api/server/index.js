import axios from 'axios';




export const api = axios.create({

    // baseURL: 'http://localhost:3100/api/v1',
    baseURL: 'https://warm-brushlands-37235.herokuapp.com/api/v1',
})



export const apiAjax = axios.create({

    baseURL: 'https://warm-brushlands-37235.herokuapp.com/ajax',

})

