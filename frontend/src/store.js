import { createStore } from "redux"

let reducer = (state, action) => {
  if (action.type === "login-success") {
    return { ...state, loggedIn: true, userData: action.user }
  }
  if (action.type === "searchQuery") {
    return { ...state, searchQuery: action.query }
  }
  if (action.type === "modify-profile") {
    return { ...state, modifyProfile: true }
  }
  if (action.type === "submit-profile-modification") {
    return { ...state, modifyProfile: false, userData: action.newProfile }
  }
  return state
}

const store = createStore(
  reducer,
  {
    loggedIn: false,
    searchQuery: "",
    userData: {},
    modifyProfile: false
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store
