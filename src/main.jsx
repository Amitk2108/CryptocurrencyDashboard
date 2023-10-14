
import { Provider } from "react-redux";
import { store } from "../src/features/store";

import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
 </Provider>
)
