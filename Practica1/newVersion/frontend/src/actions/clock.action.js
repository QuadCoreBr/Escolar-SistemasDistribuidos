export const ADD_CLOCK = 'ADD_CLOCK';

export function addClock(clockData){
    const action = {
        type: ADD_CLOCK,
        clockData
    }
    return action;
}