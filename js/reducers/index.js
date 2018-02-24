import {combineReducers} from 'redux';
import { reducer as formReducer } from 'redux-form';
import { toastReducer as toast } from 'react-native-redux-toast';
import globalReducer from './globalReducer';
import loginReducer from './loginReducer';
import signupReducer from './signupReducer';
import attendanceReducer from './attendanceReducer';
const reducers = {
  form: formReducer,
  toast: toast,
  globalReducer: globalReducer,
  loginReducer: loginReducer,
  signupReducer: signupReducer
}
const allReducers= combineReducers(reducers);
export default allReducers;