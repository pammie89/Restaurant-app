/* /components/Layout.js */

import React, { useContext } from "react";
import Head from "next/head";
import Link from "next/link";
import { Container, Nav, NavItem } from "reactstrap";
import AppContext from "./context";
import Footer from "../pages/footer";






const Layout = (props) => {
const title = "Welcome to Nextjs";



const [user] = useContext(AppContext);
console.log('(layout)', user);

  return (
    <div>
    


      
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
          integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
          crossOrigin="anonymous"
        />
        <script src="https://js.stripe.com/v3" />
      </Head>
      <html style={{backgroundImage: 'url("../images/background-image.jpg")', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center'}}>
      <header>
        <style jsx>
          {`
            a {
              color: white;
            }
            h5 {
              color: white;
              padding-top: 11px;
            }
            
            
            
          `}
        </style>
        
        <Nav className="navbar navbar-dark" style={{backgroundColor: '#506580'}} >
          <NavItem>
            <Link href="/">
              <a className="navbar-brand"><img src="../images/selectos-little.png"></img></a>
            </Link>
          </NavItem>
          <NavItem className="ml-auto">
            {user ? (
              <h5>{user.username}</h5>
            ) : (
              <Link href="/register">
                <a className="nav-link"> SIGN UP</a>
              </Link>
            )}
          </NavItem>
          <NavItem>
            {user ? (
              <Link href="/">
                <a
                  className="nav-link"
                  onClick={() => {
                    logout();
                    setUser(null);
                  }}
                >
                  Logout
                </a>
              </Link>
            ) : (
              <Link href="/login">
                <a className="nav-link" >SIGN IN</a>
                
              </Link>
            )}
          </NavItem>
          <NavItem><Link href="/cart">
                <a className="nav-link">CART</a>
                
              </Link></NavItem>
          
              <NavItem><Link href="/checkout">
                <a className="nav-link">CHECKOUT</a>
                
              </Link></NavItem>
        </Nav>
        
        <div>{user}</div>

      </header>
      <body style={{backgroundColor: 'transparent'}}>
 
      <Container style={{ backgroundColor: "rgba(0, 0, 0, 0.6)", marginTop: '3rem', marginBottom: '3rem'}}>{props.children}</Container>
      
      </body>
      
      </html>
      
    </div>
    
  );
  
};

export default Layout;