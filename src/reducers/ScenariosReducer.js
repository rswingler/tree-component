export default function ScenariosReducer(state = {scenarios: []}, action) {
    switch (action.type) {
        case 'UPDATE':
            return {...state, scenarios: [...action.value]}
        default:
            return state
    }
}