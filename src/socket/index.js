import { io } from "socket.io-client";
import { store } from "../store/configureStore";
let { getState, dispatch } = store;
console.log(getState(),"store--<>>>")

const token = getState()?.authReducer?.loginData?.data?.access_token
console.log(token,'tokenForSocket')
// Need to implement token handshake
// const MediPulseSocket = io('https://https://www.google.com',{auth: {token: token}});
const MediPulseSocket = io('wss://ss.stagingsdei.com:9169',{
    query: {
        token,
      },
});
export default MediPulseSocket;

// import { io, Socket } from "socket.io-client";

// import { store } from "../store/configureStore";
// let { getState, dispatch } = store;
// console.log(getState(),"store--<>>>")
// const token = getState()?.authReducer?.loginData?.data?.access_token
// console.log(token,'tokenForSocket')
// let MediPulseSocket = null;
//   if (token) {
//     createMediPulseSocket(token);
//   }
// function createMediPulseSocket(token) {
//   if (MediPulseSocket) {
//     MediPulseSocket.disconnect();
//   }
//   MediPulseSocket = io('wss://ss.stagingsdei.com:9169', {
//     query: {
//       token,
//     },
//   });

// }




function getMediPulseSocket() {

  if (!MediPulseSocket) {

    throw new Error("MediPulse socket is not initialized.");

  }


  return MediPulseSocket;

}




export { getMediPulseSocket };