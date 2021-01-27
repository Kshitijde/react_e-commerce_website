import './App.css';
import HomePage from './pages/homepage/homepage.component';
import {Route,Switch} from 'react-router-dom'
import './pages/homepage/homepage.styles.scss';
import ShopPage from './pages/shop/shop.component.jsx';
import Header from './components/header/header.component'

function App() {
  return (
    <div>
      <Header/>
      <Switch>
        <Route exact={true} path="/" component={HomePage} />
        <Route exact={false} path="/shop" component={ShopPage} />
      </Switch>
      
    </div>
  );
}

export default App;
