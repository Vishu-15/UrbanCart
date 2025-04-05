import React from 'react'
import HashLoader from "react-spinners/HashLoader";
import Layout from '../Layout/Layout';

const override = {
    display: "block",
    margin: "15vw auto",
    borderColor: "black",
};

const Loader = () => {
    return(
        <Layout>
        <div className="loader">
          <HashLoader
            color='black'
            loading='true'
            cssOverride={override}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
        /></div>
      </Layout>
    ) 
}

export default Loader
