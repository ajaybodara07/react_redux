import axios from "axios";

export function Staff_Party_Master_Get() {
    return (dispatch) => {
        return axios.get(`${process.env.REACT_APP_API_URL}`)
            .then(response => {
                dispatch({
                    type: 'STAFF_PARTY_MASTER_SUCCESS',
                    message: "cpmlist get list success",
                    data: response.data
                })
            })
            .catch(function (error) {
                dispatch({
                    type: 'STAFF_PARTY_MASTER_FAILURE',
                    message: 'Something went wrong' + error,
                })
            })
    }
}

export function Staff_Party_Master_Delete(id) {
    return (dispatch) => {
        return axios.delete(`${process.env.REACT_APP_API_URL}/${id}`)
            .then(response => {
                dispatch({
                    type: 'DELETE_STAFF_PARTY_MASTER_SUCCESS',
                    message: "client delete successfuly" + response,
                })
            })
            .catch(function (error) {
                dispatch({
                    type: 'DELETE_STAFF_PARTY_MASTER_FAILURE',
                    message: 'Something went wrong' + error,
                })
            })
    }
}

export function Staff_Party_Master_Update(email) {
    return (dispatch) => {
        return axios.put(`${process.env.REACT_APP_API_URL}/${email}`, { invite: true }, { headers: { 'content-type': 'application/json' } })
            .then(response => {
                dispatch({
                    type: 'UPDATE_STAFF_PARTY_MASTER_SUCCESS',
                    message: "client delete successfuly" + response,
                })
            })
            .catch(function (error) {
                dispatch({
                    type: 'UPDATE_STAFF_PARTY_MASTER_FAILURE',
                    message: 'Something went wrong' + error,
                })
            })
    }
}

export function Staff_Date_Update(id, data) {
    return (dispatch) => {
        return axios.put(`${process.env.REACT_APP_API_URL}/new/${id}`, data, { headers: { 'content-type': 'application/json' } })
            .then(response => {
                dispatch({
                    type: 'UPDATE_Date_SUCCESS',
                    message: "client delete successfuly" + response,
                })
            })
            .catch(function (error) {
                dispatch({
                    type: 'UPDATE_Date_FAILURE',
                    message: 'Something went wrong' + error,
                })
            })
    }
}
