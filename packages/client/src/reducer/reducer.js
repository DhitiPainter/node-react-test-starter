import {
    POST_USER_REQUEST,
    POST_USER_SUCCESS,
    POST_USER_FAILURE
} from '../actions/actions';

const initialState = {
    message: "",
    error: null,
    loading: false
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case POST_USER_REQUEST:
            return {
                loading: true,
                error: null,
                message: ""
            };
        case POST_USER_SUCCESS:
            return {
                loading: false,
                error: null,
                message: action.payload
            };
        case POST_USER_FAILURE:
            return {
                loading: false,
                error: action.payload,
                message: ""
            };
        default:
            return state;
    }
}

