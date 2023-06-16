import { OnModuleInit, UseInterceptors } from "@nestjs/common";
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";
@WebSocketGateway({
  // cors: {
  //   origin: ['http://127.0.0.1:5173', "http://localhost:5173"]
  // },
  cors: {
    origin: '*',
  },
})
export class MyGateways implements OnModuleInit {

  @WebSocketServer()
  server: Server

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log('Socket ID', socket.id, " Connected");

    })
  }

  // ส่งเข้ามา Subscribe Name -> newMessage
  @SubscribeMessage('newMessage')
  onNewMessage(@MessageBody() body: any) {
    console.log("Body IS ", body);

    // ส่งกลับไป Events -> onMessage
    this.server.emit('onMessage', {
      msg: 'New Message',
      content: body
    })
  }

}