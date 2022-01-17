import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import React, { useEffect, useState } from "react";
import Web3 from "web3";
import SCSContractBuild from "contracts/SCS.json";

import {
  retrieveCompanies,
  addNewCompany,
  init,
  getNewSCSContractInstance,
  SCSContract,
  // contractInitialized,
} from "../Web3Client";
import NewCompanyInput from "./NewCompanyInput";
import { Grid } from "@mui/material";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// var abi = SCSContractBuild.abi;
// var SCSContract = web3.eth.contract(abi);
// var ScsContract = SCSContract.at(0x5ec5c4537e1f5c30e5d2dc36d8296e1943a33080);
// let SCSContract = getNewSCSContractInstance();
// console.log(SCSContract.abi);
// SCSContract.events.CompanyCreated().on("connected", function (subscriptionId) {
//   console.log(subscriptionId);
// });

// event.watch(function (error, result) {
//   // result will contain various information
//   // including the argumets given to the `Deposit`
//   // call.
//   if (!error) console.log(result);
// });

export default function NewCompanyInterface() {
  const [newCompanyInfo, setNewCompanyInfo] = useState({
    name: "",
    founders: {},
    shares: 0,
  });

  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const addNew = (name, founders, shares) => {
    console.log("ADDING NEW COMPANY");
    console.log(name);
    console.log(shares);

    let founderAddresses = [];

    for (const address in founders) {
      founderAddresses.push(founders[address]);
    }

    addNewCompany(name, founderAddresses, shares)
      .then((tx) => {
        console.log(tx);
        setOpen(tx["status"]);
        setSnackbarSeverity("success");
      })
      .catch((err) => {
        console.log(err);
        setOpen(true);
        setSnackbarSeverity("error");
      });
  };

  return (
    <Box sx={{ justifyContent: "center" }}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Added a new company
        </Alert>
      </Snackbar>
      <Grid container direction="column" alignItems="center" spacing={2}>
        <Grid item>
          <NewCompanyInput
            newCompanyInfo={newCompanyInfo}
            setNewCompanyInfo={setNewCompanyInfo}
          ></NewCompanyInput>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            onClick={() => {
              addNew(
                newCompanyInfo.name,
                newCompanyInfo.founders,
                newCompanyInfo.shares
              );
            }}
          >
            ADD COMPANY
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
