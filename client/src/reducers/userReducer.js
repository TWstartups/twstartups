import { SIGN_UP, LOG_IN, LOG_OUT, FETCH_USER, ERR_MSG_RESET } from '../actions/types'

const INITIAL_STATE = {
  email: null,
  _id: null,
  type: null,
  errMsg: null,
  candidate: null,
  isLogIn: false,
  company: null
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SIGN_UP:
    if (action.payload.err) {
      return { ...state, errMsg: action.payload.err }
    }
    // put jwt in local storage for future verify login
    localStorage.setItem('tw_token', action.payload.token)
    // return userObj
    return { ...state, ...action.payload.user, isLogIn: true }
  case LOG_IN:
    if (action.payload.err) {
      return { ...state, errMsg: action.payload.err }
    }
    localStorage.setItem('tw_token', action.payload.token)
    return { ...state, ...action.payload.user, isLogIn: true }
  case LOG_OUT:
    localStorage.removeItem('tw_token')
    return { ...INITIAL_STATE }
  case ERR_MSG_RESET:
    return { ...state, errMsg: null }
  case FETCH_USER:
    return { ...state, ...action.payload.user, isLogIn: true }
  default:
    return state
  }
}
