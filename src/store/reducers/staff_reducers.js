const initialState = {
    isInprogress: false,
    isError: false,
    message: '',
    status: null,
    stafflist: [],
};

export default function Staff_Party_Master_Reducer(state = initialState, action) {
    switch (action.type) {
        case 'CLIENT_PARTY_MASTER_INPROGRESS':
            return {
                ...state,
                isInprogress: true,
                isError: false,
                message: ''
            }

        case 'STAFF_PARTY_MASTER_SUCCESS':
            return {
                ...state,
                isInprogress: true,
                isError: false,
                message: action.messsage,
                stafflist: action.data
            }

        case 'STAFF_PARTY_MASTER_FAILURE':
            return {
                ...state,
                isInprogress: false,
                isError: true,
                message: action.messsage,
            }
        case 'DELETE_STAFF_PARTY_MASTER_SUCCESS':
            return {
                ...state,
                isInprogress: true,
                isError: false,
                message: action.messsage
            }
        case 'DELETE_STAFF_PARTY_MASTER_FAILURE':
            return {
                ...state,
                isInprogress: false,
                isError: true,
                message: action.messsage,
            }
        case 'UPDATE_STAFF_PARTY_MASTER_SUCCESS':
            return {
                ...state,
                isInprogress: true,
                isError: false,
                message: action.messsage,
            }
        case 'UPDATE_STAFF_PARTY_MASTER_FAILURE':
            return {
                ...state,
                isInprogress: false,
                isError: true,
                message: action.messsage,
            }
        case 'UPDATE_Date_SUCCESS':
            return {
                ...state,
                isInprogress: true,
                isError: false,
                message: action.messsage,
            }
        case 'UPDATE_Date_FAILURE':
            return {
                ...state,
                isInprogress: false,
                isError: true,
                message: action.messsage,
            }
        default:
            return state;
    }
}