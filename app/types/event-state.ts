
export enum EventTemporalState {
  Past = 'past',
  Current = 'current',
  Future = 'future',
}

export type EventState = {
    temporalState: EventTemporalState;
    percentage?: number;
}
