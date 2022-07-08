import React from 'react'
import {Typography, AppBar} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Player from './Player'
import Notifications from './Notifications'
import Options from './Options'

const useStyles = makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: '30px 100px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '600px',
    border: '2px solid #121212',
    [theme.breakpoints.down('xs')]: {
      width: '95%'
    }
  },
  image: {
    marginLeft: '15px',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  }
}))

const Main = () => {
  let classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography variant="h2" align="center">Video Chat</Typography>
      </AppBar>
      <Player />
      <Options>
        <Notifications />
      </Options>
    </div>
  )
}

export default Main