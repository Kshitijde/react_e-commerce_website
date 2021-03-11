import './App.css';
import React from 'react';
import HomePage from './pages/homepage/homepage.component';
import {Route,Switch,Redirect} from 'react-router-dom'
import './pages/homepage/homepage.styles.scss';
import ShopPage from './pages/shop/shop.component.jsx';
import CheckoutPage from './pages/checkout/checkout.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import {auth,createUserProfileDocument} from './firebase/firebase.utils';
import {connect} from 'react-redux';
import {setCurrentUser} from './redux/user/user.actions';
import {selectCurrentUser} from './redux/user/user.selector';
import {createStructuredSelector} from 'reselect';

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
          <Route exact path="/signin" render={()=>this.props.currentUser?(<Redirect to='/'/>):(<SignInAndSignUpPage/>)} />
          <Route exact path="/checkout" component={CheckoutPage} />

        </Switch>
        
      </div>
    );
  }
}

const mapStateToProps=createStructuredSelector({
    currentUser:selectCurrentUser  //or ={user} and user.curentUser only in this line
})

const mapDispatchToProps=dispatch=>({
    setCurrentUser:user=>dispatch(setCurrentUser(user))

})

export default connect(mapStateToProps,mapDispatchToProps)(App);
