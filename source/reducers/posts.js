import Immutable from "immutable"

export default function(state = Immutable.OrderedMap({}), action) {
  switch (action.type) {
    case "ADD_POST":
      return state.set(String(action.data.id), action.data)
    default:
      return state
  }
}
