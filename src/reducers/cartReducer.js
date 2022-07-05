export const initialState = {
    items:[],
    total:0
}

export default function cartReducer(state,action){
    let newState

    switch (action.type) {
        case 'UPDATE':
            newState = {
                items:action.payload,
                total:state.payload
            }
            break;
        case 'CLEAR':
            newState = {
                items:[],
                total:0
            }
            break;
        default:
            newState = {
                ...state
            }
            break;
    }

    return newState
}