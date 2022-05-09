import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import Router from './Router';
import { store } from './redux/store.js'
import './styles/index.scss'

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <div className="App">
          <Router />
        </div>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
