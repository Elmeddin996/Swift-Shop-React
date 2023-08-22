import { Box, Button, Grid } from '@mui/material'
import React from 'react'

export const LoginRegisterBtn = () => {
  return (
    <Grid  >
              <Box>
                <Button
                  variant="outlined"
                  sx={{
                    marginLeft: "auto",
                    background: "rgba(0,0,0,0.9976365546218487)",
                    color: "white",
                  }}
                >
                  Login
                </Button>
                <Button
                  variant="outlined"
                  sx={{
                    marginLeft: 1,
                    background: "rgba(0,0,0,0.9976365546218487)",
                    color: "white",
                  }}
                >
                  Register
                </Button>
              </Box>
            </Grid>
  )
}
