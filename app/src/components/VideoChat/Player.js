import React, { useContext } from 'react'
import { Grid, Typography, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { SocketContext } from '../ContextProvider/ContextProvider'

const useStyles = makeStyles((theme) => ({
  video: {
    width: '550px',
    [theme.breakpoints.down('xs')]: {
      width: '300px'
    }
  },
  gridContainer: {
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column'
    }
  },
  paper: {
    padding: '10px',
    border: '2px solid #121212',
    margin: '10px'
  }
}))

const Player = () => {
  const classes = useStyles()

  const { stream, call, callAccepted, CallEnded, name, myVideo, userVideo } = useContext(SocketContext);
  return (
    <Grid container className={classes.gridContainer}>
      {/* My video */}
      {stream && (
        <Paper className={classes.paper}>
          <Grid item xs={12} md={6}>
            <Typography variant='h5' gutterBottom>{name || 'Name'}</Typography>
            <video playsInline muted ref={myVideo} autoPlay className={classes.video} />
          </Grid>
        </Paper>
      )}
      {/* The other person video */}
      {
        callAccepted && !CallEnded && (
          <Paper className={classes.paper}>
            <Grid item xs={12} md={6}>
              <Typography variant='h5' gutterBottom>{call.name || 'Name'}</Typography>
              <video playsInline ref={userVideo} autoPlay className={classes.video} />
            </Grid>
          </Paper>
        )
      }
    </Grid>
  )
}

export default Player