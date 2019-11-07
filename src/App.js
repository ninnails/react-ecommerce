import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import EventPage from './pages/event/event.component';
import Header from './components/header/header.component';

import { ApolloProvider } from "react-apollo";
import AWSAppSyncClient from "aws-appsync";
import { Rehydrated } from "aws-appsync-react";

import { setCurrentUser } from './redux/user/user.actions';

class App extends React.Component {

  componentDidMount() {
    // const { setCurrentUser } = this.props;
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route path='/event' component={EventPage} />
          <Route exact path='/signin' render={() => this.props.currentUser ? (<Redirect to='/' />) : (<SignInAndSignUpPage />)} />
        </Switch>
      </div>
    );
  }
}

const client = new AWSAppSyncClient({
  url: 'https://4doc4z3aerdg7hrmohnrh4h5xa.appsync-api.ap-northeast-2.amazonaws.com/graphql',
  region: 'ap-northeast-2',
  auth: {
    type: 'API_KEY',
    apiKey: 'da2-geguaumoebaktcw6ehbgt2u6la',
  }
})

const WithProvider = () => (
  <ApolloProvider client={client}>
    <Rehydrated>
      <App />
    </Rehydrated>
  </ApolloProvider>
);


const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

// export default connect(null, )(App);

export default connect(mapStateToProps, mapDispatchToProps)(WithProvider);
