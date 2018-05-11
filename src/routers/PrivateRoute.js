import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';

//Some clever descrtucturing here...
export const PrivateRoute = ({ 
  isAuthenticated, 
  component: Component, //use capital C for React component in jsx below
  ...rest //all but isAuthenticated and component end up in "rest"
}) => (
  <Route { ...rest } component={(props) => (
    isAuthenticated ? (
      <div>
        <Header/>
        <Component { ...props } />
      </div>
    ) : (
      <Redirect to="/" />
    )
  )}/>
);

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.auth.uid // True or False
});

export default connect(mapStateToProps)(PrivateRoute);