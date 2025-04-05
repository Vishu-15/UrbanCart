import toast, { Toaster } from 'react-hot-toast';
import React from 'react'
import Header from '../Header/Header'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import {Helmet} from "react-helmet";

const Layout = ({children,description,keywords,author,title}) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header/>
      <Navbar/>
      {/* <Toaster position='top-right' toastOptions={{style:{marginTop:'5rem'}}}/> */}
      <Toaster 
        position='bottom-left'
        toastOptions={
          {style:
            {
              backgroundColor:'blue',
              color:'white',
            }
          }
        }
      />
      <main>{children}</main>
      <Footer/>
    </div>
  )
}

Layout.defaultProps = {
  title : "UrbanCarts" ,
  description : "MERN stack project e-commerce project." ,
  keywords : "MERN,React,Node,MongoDB" ,
  author : "Vishu" ,
}

export default Layout
