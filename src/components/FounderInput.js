import { Button, Grid, IconButton } from "@mui/material";
import TextField from "@mui/material/TextField";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useEffect, useState, useRef } from "react";

export default function FounderInput({ id, addNewFounder, removeFounder }) {
  const [founderAddress, setFounderAddress] = useState("");

  const changeHandler = (e) => {
    // console.log(e.target.value);
    addNewFounder(id, e.target.value);
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
    >
      <Grid item flex={1}>
        <TextField
          fullWidth
          id="outlined-basic"
          label="Founder"
          variant="outlined"
          name="founders"
          onChange={changeHandler}
        />
      </Grid>
      <Grid item>
        <IconButton variant="contained" onClick={() => removeFounder(id)}>
          <DeleteIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
}
