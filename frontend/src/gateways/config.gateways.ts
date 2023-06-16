import { io } from "socket.io-client";

export const socketSetup = io('http://localhost:3000');