import { Socket } from 'socket.io';

export class CreateGateFields {
  topic: string;
  votesPerVoter: number;
  name: string;

}
export class JoinGateFields {
  gateID: string
  name: string;

}
export class RejoinGateFields {
  gateID: string
  userID: string
  name: string
}

export class AddParticipant {
  gateID: string
  userID: string
  name: string
}

// guard types
export type AuthPayload = {
  userID: string;
  gateID: string;
  name: string;
};

export type SocketWithAuth = Socket & AuthPayload;