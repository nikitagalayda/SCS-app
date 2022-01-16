import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import React, { useEffect, useState } from "react";
import Web3 from "web3";

import { retrieveCompanies, addNewCompany, init } from "../Web3Client";
import NewCompanyInput from "./NewCompanyInput";
import { Grid } from "@mui/material";

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
    })
    .catch((err) => {
      console.log(err);
    });
};

export default function NewCompanyInterface() {
  const [newCompanyInfo, setNewCompanyInfo] = useState({
    name: "",
    founders: {},
    shares: 0,
  });

  return (
    <Box sx={{ justifyContent: "center" }}>
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
