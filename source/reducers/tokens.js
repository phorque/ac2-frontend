import Immutable from 'immutable';

export default function (state = Immutable.Map({}), action) {
    switch (action.type) {
    case 'TOKEN_ADD':
        return state.set(action.data.access_token, action.data);

    case 'TOKEN_CLEAR':
        return state.clear();

    default:
        return state;
    }
}
