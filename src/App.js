import logo from './logo.svg';
import './App.css';
import HomePage from './pages/homepage/homepage.component';
import {Route,Switch} from 'react-router-dom'
import './pages/homepage/homepage.styles.scss';

const HatsPage=()=>(
  <div>
    <h1>
      HatsPage
    </h1>
  </div>

)

function App() {
  return (
    <div>
      <Switch>
        <Route exact={true} path="/" component={HomePage} />
        <Route exact={false} path="/hats" component={HatsPage} />
      </Switch>
      
    </div>
  );
}

export default App;
