import React, { createContext, useEffect, useRef, useState } from 'react'
import { io } from 'socket.io-client'
import Peer from 'simple-peer'

const SocketContext = createContext();

const socket = io('http://localhost:5000')

const ContextProvider = (props) => {
  const [stream, setStream] = useState()
  const [me, setMe] = useState('')
  const [call, setCall] = useState({})
  const [callAccepted, setCallAccepted] = useState(false)
  const [CallEnded, setCallEnded] = useState(false)
  const [name, setName] = useState('');

  const myVideo = useRef();
  const userVideo = useRef();
  const peerRef = useRef();

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);

        myVideo.current.srcObject = currentStream;
      });

    socket.on('me', (id) => setMe(id));

    socket.on('callUser', ({ from, name: callerName, signal }) => {
      setCall({ isReceivingCall: true, from, name: callerName, signal });
    });
  }, []);

  const answerCall = () => {
    setCallAccepted(true)
    const peer = new Peer({
      initiator: false,
      stream: stream,
      trickle: false
    })
    peer.on('signal', data => {
      socket.emit('acceptCall', { to: call.from, signal: data, name: call.name })
    })
    peer.on('stream', currentStream => {
      userVideo.current.srcObject = currentStream;
    })
    peer.signal(call.signal)
    peerRef.current = peer
  }

  const callUser = (userId) => {
    const peer = new Peer({ initiator: true, stream: stream, trickle: false })
    peer.on('signal', data => {
      socket.emit('callUser', { userToCall: userId, signalData: data, from: me, name })
    })
    peer.on('stream', currentStream => {
      userVideo.current.srcObject = currentStream;
    })
    socket.on('callAccepted', (signal) => {
      setCallAccepted(true)
      peer.signal(signal)
    })
    peerRef.current = peer
  }
  const leaveCall = () => {
    setCallEnded(true)
    peerRef.current.destroy()
    window.location.reload()
  }
  return (
    <>
      <SocketContext.Provider value={{
        stream,
        me,
        call,
        callAccepted,
        CallEnded,
        name,
        setName,
        myVideo,
        userVideo,
        peerRef,
        answerCall,
        callUser,
        leaveCall
      }} >
        {props.children}
      </SocketContext.Provider>
    </>
  )
}

export {ContextProvider, SocketContext}