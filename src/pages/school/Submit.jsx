import { Container, Paper, Typography } from "@mui/material";
import React from "react";

const Submit = () => {
  return (
    <Container maxWidth="lg" sx={{paddingTop: "20px"}}>
      <Paper variant="elevation">
        <div>
          <div>
            <Typography>SO SUBMISSION</Typography>
          </div>
        </div>
      </Paper>
    </Container>
  );
};

export default Submit;
