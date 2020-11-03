import React from 'react';
import { Box, Container, Grid, Paper } from '@material-ui/core';
import { CircularPomodoroCountdown, ShareUrl } from 'src/molecules';
import { PomodoroTimerButton } from 'src/atoms';

export function PomodoroTimer() {
  return (
    <Container component="main">
      <Paper elevation={3}>
        <Box p={2}>
          <Grid
            container
            spacing={10}
            direction="row"
            alignItems="center"
            justify="center"
          >
            <Grid item xl={4} lg={4} xs={12} align="center">
              <CircularPomodoroCountdown />
            </Grid>
            <Grid item xl={4} lg={4} xs={12}>
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                spacing={2}
              >
                <Grid item>
                  <PomodoroTimerButton />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <Box p={4}>
          <Grid container alignItems="center" justify="center">
            <Grid item lg={8} xs={12}>
              <ShareUrl />
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
}
