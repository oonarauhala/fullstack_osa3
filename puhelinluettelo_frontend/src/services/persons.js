import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => {
        return response.data
    })
}

const create = person => {
    const request = axios.post(baseUrl, person)
    return request.then(response => {
        return response.data
    })
}

const drop = personId => {
    const request = axios.delete(baseUrl + `/${personId}`)
    return request.then(response => {
        return response.data
    })
}

const update = (personId, newPerson) => {
    const request = axios.put(baseUrl + `/${personId}`, newPerson)
    return request.then(response => {
        return response.data
    })
}

export default {
    getAll, create, drop, update
}