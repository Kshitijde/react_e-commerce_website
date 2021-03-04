import './App.css';
import React from 'react';
import HomePage from './pages/homepage/homepage.component';
import {Route,Switch} from 'react-router-dom'
import './pages/homepage/homepage.styles.scss';
import ShopPage from './pages/shop/shop.component.jsx';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import {auth,createUserProfileDocument} from './firebase/firebase.utils';
import {connect} from 'react-redux';
import {setCurrentUser} from './redux/user/user.actions';

class App extends React.Component {

  unsubscribeFromAuth=null;

  componentDidMount()
  {
    const {setCurrentUser}=this.props;
    this.unsubscribeFromAuth=auth.onAuthStateChanged(async userAuth =>{
      
      if(userAuth)
      {
        const userRef=await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapshot=>{
          setCurrentUser({
              id:snapshot.id,
              ...snapshot.data()
          })
          // console.log(this.state);
        })
        // console.log(this.state);
      }
      else{
        // console.log("No authorised user");
        setCurrentUser(userAuth);//here userAuth comes in else loop so always null,we set it and let the app know here tho.
      }
    })
  }

  componentWillUnmount()
  {
    this.unsubscribeFromAuth();
  }

  render(){
    return (
      <div>
        <Header/>
        <Switch>
          <Route exact={true} path="/" component={HomePage} />
          <Route exact={false} path="/shop" component={ShopPage} />
          <Route exact={false} path="/signin" component={SignInAndSignUpPage} />
        </Switch>
        
      </div>
    );
  }
}

const mapDispatchToProps=dispatch=>({
    setCurrentUser:user=>dispatch(setCurrentUser(user))

})

export default connect(null,mapDispatchToProps)(App);
