import React, { useEffect, useState } from "react";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";

import { retrieveCompanyShares } from "../Web3Client";

export default function CompanyCard({ companyInfo }) {
  const [shares, setShares] = useState(0);

  const retrieveShares = () => {
    retrieveCompanyShares(companyInfo[3])
      .then((tx) => {
        setShares(tx);
        console.log(tx);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let companyShares = retrieveShares();
  console.log(companyShares);

  return (
    <Card width="100%" sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography xs={2} sx={{ fontSize: 14 }} component="div">
          <Box fontWeight="bold" display="inline">
            Name:
          </Box>
          {companyInfo[0]}
        </Typography>
        <Typography
          xs={2}
          sx={{ fontSize: 14, fontWeight: "bold" }}
          component="div"
        >
          Founders:
        </Typography>
        {companyInfo[1].map((address, index) => (
          <Typography xs={2} sx={{ fontSize: 14 }} component="div">
            {address}
          </Typography>
        ))}
        <Typography xs={2} sx={{ fontSize: 14 }} component="div">
          <Box fontWeight="bold" display="inline">
            Shares:
          </Box>
          {shares}
          {/* {companyInfo[2]} */}
        </Typography>
        <Typography xs={2} sx={{ fontSize: 14 }} component="div">
          <Box fontWeight="bold" display="inline">
            Contract Address:
          </Box>
          <Typography xs={2} sx={{ fontSize: 14 }} component="div">
            {companyInfo[3]}
          </Typography>
        </Typography>
      </CardContent>
    </Card>
  );
}
