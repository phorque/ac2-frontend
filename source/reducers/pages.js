import Immutable from 'immutable';

export default function (state = Immutable.Map({}), action) {
    switch (action.type) {
    case 'PAGE_ADD':
        return state.set(action.data.id, action.data);

    case 'PAGE_REMOVE':
        return state.delete(action.data.id);

    default:
        return state;
    }
}
