import * as React from "react";

import Grid from "@mui/material/Grid";
import CompanyCard from "./CompanyCard";
import { List, ListItem, Paper } from "@mui/material";
import { Box } from "@mui/system";

export default function CompanyList({ companyList }) {
  return (
    <Box style={{ maxHeight: "300px", overflow: "auto" }}>
      <List>
        {companyList.map((_, index) => (
          <ListItem>
            <CompanyCard companyInfo={companyList[index]}></CompanyCard>
          </ListItem>
        ))}
      </List>
    </Box>
    // <Grid
    //   container
    //   // xs={8}
    //   // sm={8}
    //   // md={8}
    //   direction="row"
    //   spacing={2}
    //   // justifyContent="center"
    //   // alignItems="center"
    // >
    // {companyList.map((_, index) => (
    //   <Grid item key={index}>
    //     <CompanyCard companyInfo={companyList[index]}></CompanyCard>
    //   </Grid>
    // ))}
    // </Grid>
  );
}
