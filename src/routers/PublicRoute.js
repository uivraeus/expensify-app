import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

//Some clever descrtucturing here...
export const PublicRoute = ({ 
  isAuthenticated, 
  component: Component, //use capital C for React component in jsx below
  ...rest //all but isAuthenticated and component end up in "rest"
}) => (
  <Route { ...rest } component={(props) => (
    isAuthenticated ? (
      <Redirect to="/dashboard" />
    ) : (
      <Component { ...props } />
    )
  )}/>
);

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.auth.uid // True or False
});

export default connect(mapStateToProps)(PublicRoute);