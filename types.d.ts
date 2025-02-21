import {Connection} from "mongoose";
declare global {
  // eslint-disable-next-line no-var
  var mongoose: {
    //if the connection is established or not there
    conn: Connection | null
    //if the connection in on the way or not there
    promise: Promise<Connection> | null
  }
}

export {};