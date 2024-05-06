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