import { GET_ERRORS, CLEAR_ERRORS } from '../actions/types';

const intialState = {
};

export default function(state = intialState, action) {
    switch (action.type) {
        case CLEAR_ERRORS: 
            return {};
        case GET_ERRORS:
            return action.payload;
        default:
            return state;
    }
}