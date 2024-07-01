import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

//Returns entire json of all persons
const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

//Adds to json a new object and then returns new object
const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

//Replaces existing object existing with given id 
const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}


const deleteObject = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

export default {getAll, create, update, deleteObject}
