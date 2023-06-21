import { OnModuleInit, Req, UseGuards, UseInterceptors } from "@nestjs/common";
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayDisconnect, OnGatewayConnection, ConnectedSocket } from "@nestjs/websockets";
import { Server, Namespace, Socket } from "socket.io";
import { WebsocketAuthJwtGuard } from "./websocket-auth-jwt.guard";
import { SocketWithAuth } from "src/types/types";
import { GatewaysService } from "./gateways.service";
@WebSocketGateway({
  // cors: {
  //   origin: ['http://127.0.0.1:5173', "http://localhost:5173"]
  // },
  cors: {
    origin: '*',
    namespace: 'gateways'
  },
})
export class MyGateways implements OnGatewayConnection, OnGatewayDisconnect {

  constructor(
    private websocketAuthJwtGuard: WebsocketAuthJwtGuard,
    private readonly gatewaysService: GatewaysService
  ) { }

  @WebSocketServer()
  server: Server

  async handleConnection(client: SocketWithAuth) {
    const sockets = this.server.sockets;
    console.log("client is ", client.handshake.headers.authorization);
    const user = await this.websocketAuthJwtGuard.verify(
      client.handshake.headers.authorization,
      true
    );
    if (!user) {
      client.disconnect();
      return;
    }

    const roomName = user.gateID;
    await client.join(roomName);

    const connectedClients = sockets.adapter.rooms?.get(roomName)?.size ?? 0;
    console.log(`userID: ${user.userID} joined room with name: ${roomName}`,);
    console.log(`Total clients connected to room '${roomName}': ${connectedClients}`);


    const updateGate = await this.gatewaysService.addParticipant(
      {
        gateID: user.gateID,
        name: user.name,
        userID: user.sub
      }
    )

    this.server.to(user.gateID).emit('hello', { msg: `Hello from ${user.name}`, updateGate });
    this.server.to(user.gateID).emit('connectedClients', { msg: `Clients Is : ${connectedClients}` });

  }
  // @UseGuards(WebsocketAuthJwtGuard)
  // afterInit(server: Server) {
  //   // ตัวชี้วัด (middleware) ที่ใช้งานกับทุกเชื่อมต่อใน WebSocketGateway
  //   this.websocketAuthJwtGuard = new WebsocketAuthJwtGuard();
  // }

  async handleDisconnect(client: SocketWithAuth) {
    const sockets = this.server.sockets

    const user = await this.websocketAuthJwtGuard.verify(
      client.handshake.headers.authorization,
      true
    );
    const roomName = user.gateID;
    const updateGate = await this.gatewaysService.removeParticipant(
      {
        gateID: user.gateID,
        userID: user.sub
      }
    )
    const connectedClients = sockets.adapter.rooms?.get(roomName)?.size ?? 0;

    this.server.to(roomName).emit('hello', { msg: `User Disconnected from ${user.name}`, updateGate });
    this.server.to(roomName).emit('connectedClients', { msg: `Clients Is : ${connectedClients}` });

  }

  @UseGuards(WebsocketAuthJwtGuard)
  @SubscribeMessage('start_message')
  startMessage(@Req() client: any, @MessageBody() body: any) {

    const request = client.handshake; // ดึงคำขอเข้าถึงของ Socket.IO
    const user = request.user

    // 
    console.log("user ", user);
    console.log("client.gateID ", user.gateID);
    console.log(`Attempting to start voting for Gate: ${user.gateID}`);
    // 

    // const updatedPoll = await this.pollsService.startPoll(user.gateID);

    this.server.to(user.gateID).emit('Message', {
      msg: body
    });
  }

  // ส่งเข้ามา Subscribe Name -> newMessage
  // @UseGuards(WebsocketAuthJwtGuard)
  // @SubscribeMessage('newMessage')
  // onNewMessage(@Req() client: any, @MessageBody() body: any) {
  //   console.log("Body IS ", body);

  //   const request = client.handshake; // ดึงคำขอเข้าถึงของ Socket.IO
  //   console.log("request ", request);

  //   // ส่งกลับไป Events -> onMessage
  //   this.server.emit('onMessage', {
  //     msg: 'New Message',
  //     content: body
  //   })
  // }

}