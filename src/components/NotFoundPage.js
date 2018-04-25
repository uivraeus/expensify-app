import React from 'react';
import { Link } from 'react-router-dom';

//Clasic (server-side) way, with "anchor tag":
//404 - <a href="/">Go home</a>
const NotFoundPage = () => (
  <div>
    404 - <Link to="/">Go home</Link>
  </div>  
);

export default NotFoundPage;