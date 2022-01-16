import React, { useEffect, useState } from "react";

import Grid from "@mui/material/Grid";
import CompanyCard from "./CompanyCard";
import { Button, List, ListItem, Paper, TextField } from "@mui/material";
import { Box } from "@mui/system";

import { mintShares, burnShares, reissueShares } from "../Web3Client";

export default function ContractInteractionInterface() {
  const [interactionInfo, setInteractionInfo] = useState({
    contractAddress: "",
    amountShares: 0,
  });

  const changeHandler = (e) => {
    var newInfo = { ...interactionInfo };
    newInfo[e.target.name] = e.target.value;

    console.log(newInfo);

    setInteractionInfo(newInfo);
  };

  const mint = () => {
    console.log(interactionInfo);
    mintShares(interactionInfo.contractAddress, interactionInfo.amountShares)
      .then((tx) => {
        console.log(tx);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const burn = () => {
    console.log(interactionInfo);
    burnShares(interactionInfo.contractAddress, interactionInfo.amountShares)
      .then((tx) => {
        console.log(tx);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const reissue = () => {
    console.log(interactionInfo);
    reissueShares(interactionInfo.contractAddress, interactionInfo.amountShares)
      .then((tx) => {
        console.log(tx);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      rowSpacing={2}
    >
      {/* <h2>Your address</h2>
        <Grid item>
          <TextField
            id="outlined-basic"
            label="Address"
            variant="outlined"
            name="address"
            onChange={changeHandler}
          /> */}
      {/* </Grid> */}
      {/* <h2>Contract address</h2> */}
      <Grid item>
        <TextField
          id="outlined-basic"
          label="Contract address"
          variant="outlined"
          name="contractAddress"
          onChange={changeHandler}
        />
      </Grid>
      {/* <h2>Number of shares</h2> */}
      <Grid item>
        <TextField
          id="outlined-basic"
          label="Shares"
          variant="outlined"
          name="amountShares"
          onChange={changeHandler}
        />
      </Grid>
      <Grid item>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <Grid item>
            <Button variant="contained" onClick={() => mint()}>
              Mint
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={() => burn()}>
              Burn
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={() => reissue()}>
              Reissue
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
