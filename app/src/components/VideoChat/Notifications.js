import React, { useContext } from 'react'
import { Button } from '@material-ui/core'
import { SocketContext } from '../ContextProvider/ContextProvider'

const Notifications = () => {
  const { callAccepted, call, answerCall } = useContext(SocketContext)
  return (
    <>
      {call.isReceivingCall && !callAccepted && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
        <h2>{call.name} is calling </h2>
        <Button variant='contained' color='primary' onClick={answerCall}>Answer</Button>
      </div>
      )}
    </>
  )
}

export default Notifications