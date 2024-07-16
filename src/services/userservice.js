import axios from "axios"

const registerNewUser = (email, phone, password, username) => {
    return axios.post('http://localhost:8080/api/v1/register', {
        email, phone, password, username
    })
}

const loginUser = (valueLogin, password) => {
    return axios.post('http://localhost:8080/api/v1/login', {
        valueLogin, password
    })
}

const fetchAllUser =  (page, limit) => {
    return axios.get(`http://localhost:8080/api/v1/user/read?page=${page}&limit=${limit}`)
}

const deleteUser = (user) => {
    return axios.delete(`http://localhost:8080/api/v1/user/delete`, {data: {id: user.id}})
}

const fetchGroup = () => {
    return axios.get(`http://localhost:8080/api/v1/group/read`)
}

const createNewUser = (userData) => {
    return axios.post('http://localhost:8080/api/v1/user/create', {...userData})
}

export {
    registerNewUser, loginUser, fetchAllUser, deleteUser, fetchGroup,
    createNewUser
}