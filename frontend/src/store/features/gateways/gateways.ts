import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { CreateGateType, JoinGateType } from './types'

export interface GateState {
  createGate: {
    gate: {
      id: string,
      topic: string,
      participants: {},
      messages: {},
      adminID: string,
    },
    accessToken: string
  }
  joinGate: {
    gateID: string,
    name: string,
    topic: string,
    accessToken: string
  }
}

const initialState: GateState = {
  createGate: {
    gate: {
      id: "",
      topic: "",
      participants: {},
      messages: {},
      adminID: ""
    },
    accessToken: ''
  },
  joinGate: {
    gateID: "",
    name: "",
    topic: "",
    accessToken: ""
  }
}

export const gateSlice = createSlice({
  name: 'gateways',
  initialState,
  reducers: {
    createGateWays: (state, action: PayloadAction<CreateGateType> | any) => {
      state.createGate = action.payload
    },
    joinGateWays: (state, action: PayloadAction<JoinGateType> | any) => {
      state.joinGate = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { createGateWays, joinGateWays } = gateSlice.actions

export default gateSlice.reducer