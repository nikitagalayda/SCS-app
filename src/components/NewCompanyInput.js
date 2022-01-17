import React, { useEffect, useState, useRef } from "react";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { Button, IconButton } from "@mui/material";
import FounderInput from "./FounderInput";

export default function NewCompanyInput({
  numFounders,
  setNumFounders,
  newCompanyInfo,
  setNewCompanyInfo,
}) {
  // const [numFounders, setNumFounders] = useState(1);

  const changeHandler = (e) => {
    if (e.target.name == "founders") {
      // setNewCompanyInfo({
      //   ...newCompanyInfo,
      //   founders: [...newCompanyInfo.founders, e.target.value],
      // });
    } else {
      setNewCompanyInfo({ ...newCompanyInfo, [e.target.name]: e.target.value });
    }
  };

  const addNewFounder = (id, address) => {
    var newFounders = { ...newCompanyInfo.founders };
    newFounders[id] = address;

    console.log(newFounders);

    setNewCompanyInfo({
      ...newCompanyInfo,
      founders: newFounders,
    });
  };

  const removeFounder = (id) => {
    if (numFounders > 1) {
      var newFounders = newCompanyInfo.founders;
      delete newFounders[id];
      console.log(newFounders);

      setNewCompanyInfo({
        ...newCompanyInfo,
        founders: newFounders,
      });

      setNumFounders(numFounders - 1);
    }
  };

  return (
    <Grid
      width="100%"
      container
      direction="column"
      // justifyContent="start"
      // alignItems="center"
      rowSpacing={2}
    >
      <Grid item width="100%">
        <TextField
          fullWidth
          id="outlined-basic"
          label="Name"
          variant="outlined"
          name="name"
          onChange={changeHandler}
        />
      </Grid>
      <Grid item width="100%">
        {/* <Grid item flex={1}>
              <IconButton
                onClick={() => setNumFounders(Math.max(1, numFounders + 1))}
              >
                <AddIcon />
              </IconButton>
            </Grid> */}
        <Grid item>
          <Grid
            container
            direction="column"
            // alignItems="center"
            rowSpacing={2}
          >
            {Array.from(Array(numFounders)).map((_, index) => (
              <Grid item width="100%">
                <FounderInput
                  id={index}
                  addNewFounder={addNewFounder}
                  removeFounder={removeFounder}
                  key={index}
                ></FounderInput>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
      {/* <Grid item xs={2} sm={4} md={4}>
          <TextField
            id="outlined-basic"
            label="Founders"
            variant="outlined"
            name="founders"
            onChange={changeHandler}
          />
        </Grid> */}

      {/* <Button
          variant="contained"
          onClick={() => setNumFounders(numFounders - 1)}
        >
          Remove a founder
        </Button> */}
      <Grid item width="100%">
        <TextField
          fullWidth
          id="outlined-basic"
          label="Shares"
          variant="outlined"
          name="shares"
          onChange={changeHandler}
        />
      </Grid>
    </Grid>
  );
}
