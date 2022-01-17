import logo from "./logo.svg";
import "./App.css";
import Button from "@mui/material/Button";

import CompanyList from "./components/CompanyList";
import NewCompanyInterface from "./components/NewCompanyInterface";

import React, { useEffect, useState } from "react";
import Web3 from "web3";

import { retrieveCompanies, addNewCompany, init } from "./Web3Client";
import { Box } from "@mui/system";
import { Grid } from "@mui/material";
import ContractInteractionInterface from "./components/ContractInteractionInterface";

function App() {
  // const providerUrl = process.env.REACT_APP_PROVIDER_URL;

  const [companies, setCompanies] = useState([]);

  const retrieve = () => {
    retrieveCompanies()
      .then((tx) => {
        setCompanies(tx);
        console.log(tx);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const add = (name, founders, shares) => {
    addNewCompany()
      .then((tx) => {
        console.log(tx);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const mint = (address, contractAddress, shares) => {};

  return (
    <div className="App">
      {/* <Grid container direction="column" alignContent="center"> */}
      <Box width="100vw" height="100vh" marginTop="10%">
        <Grid
          container
          direction="row"
          // justifyContent="center"
          alignItems="flex-start"
        >
          <Grid
            item
            width="33%"
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item>
              <h1>GET COMPANIES</h1>
            </Grid>
            <Grid item>
              <Button variant="contained" onClick={() => retrieve()}>
                {" "}
                GET COMPANIES{" "}
              </Button>
            </Grid>
            {/* <Box style={{ maxHeight: "100px", overflow: "auto" }}> */}
            {companies.length > 0 ? (
              <CompanyList companyList={companies}></CompanyList>
            ) : (
              <div></div>
              // <h1>No companies</h1>
            )}
            {/* </Box> */}
          </Grid>
          <Grid item width="33%">
            <Grid container direction="column" alignItems="center">
              <h1>ADD A COMPANY</h1>
              <NewCompanyInterface></NewCompanyInterface>
            </Grid>
          </Grid>

          <Grid item width="33%">
            <Grid container direction="column" alignItems="center">
              <h1>INTERACT</h1>
              <ContractInteractionInterface></ContractInteractionInterface>
            </Grid>
          </Grid>

          {/* <Button variant="contained" onClick={() => add()}>
        ADD TEST COMPANY
      </Button> */}

          {/* <NewCompanyInput></NewCompanyInput> */}
        </Grid>
      </Box>
      {/* </Grid> */}
    </div>
  );
}

export default App;
