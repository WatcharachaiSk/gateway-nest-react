export class CreateGateType {
  gate?: {
    id: string,
    topic: string,
    participants: {},
    messages: {},
    adminID: string,
  }
  accessToken?: string
}

export class JoinGateType {
  gateID?: string
  name?: string
  topic?: string
  accessToken?: string
}