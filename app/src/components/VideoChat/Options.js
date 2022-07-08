import React, { useContext, useState } from 'react'
import { Button, TextField, Grid, Typography, Container, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Phone, Assignment, PhoneDisabled } from '@material-ui/icons'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { SocketContext } from '../ContextProvider/ContextProvider'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  gridContainer: {
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column'
    }
  },
  container: {
    width: '600px',
    margin: '35px 0',
    padding: '0',
    [theme.breakpoints.down('xs')]: {
      width: '80%'
    }
  },
  margin: {
    marginTop: 20,
  },
  padding: {
    padding: 20
  },
  paper: {
    padding: '10px 20px',
    border: '2px solid #121212'
  },
  button: {
    background: "#3f51b5",
  }
}))

const Options = (props) => {
  const { me, callAccepted, CallEnded, name, setName, callUser, leaveCall } = useContext(SocketContext)
  const [idToCall, setIdToCall] = useState('');
  const classes = useStyles()

  const inputHandler = e => {
    setName(e.target.value)
  }
  const idHandler = e => {
    setIdToCall(e.target.value)
  }

  const showButton = () => {
    if (callAccepted && !CallEnded) {
      return (
        <Button 
        variant='contained'
        color='secondary'
        className={classes.margin}
        fullWidth
        startIcon={<PhoneDisabled fontSize='large' />}
        onClick={leaveCall}
        >
          Leave Call 
        </Button>
      )
    }
    return (
      <Button 
      variant='contained'
      color='primary'
      className={classes.margin}
      fullWidth
      startIcon={<Phone fontSize='large' />}
      onClick={() => callUser(idToCall)}
      >
        Make a Call 
      </Button>
    )
  }
  return (
    <Container className={classes.container}>
      <Paper elevation={10} className={classes.paper}>
        <form noValidate autoComplete='off' className={classes.root}>
          <Grid container className={classes.gridContainer}>
            <Grid item md={6} xs={12} className={classes.padding}>
              <Typography gutterBottom variant='h5'>Account Info</Typography>
              <TextField label='name' value={name} onChange={inputHandler} fullWidth/>
              <CopyToClipboard text={me} className={classes.margin}>
                <Button variant='contained' color='primary' fullWidth startIcon={<Assignment fontSize='large' />}>
                  Copy Your ID
                </Button>
              </CopyToClipboard>
            </Grid>

            <Grid item md={6} xs={12} className={classes.padding}>
              <Typography gutterBottom variant='h5'>Make a Call</Typography>
              <TextField label='ID to call' value={idToCall} onChange={idHandler} fullWidth/>
              {showButton()}
            </Grid>
          </Grid>
        </form>
      {props.children}
      </Paper>
    </Container>
  )
}

export default Options