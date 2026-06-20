import { Action, PlayerMediaStatus, TimeMode } from "../types";
export interface MediaState {
    timeMode: TimeMode;
    timeElapsed: number;
    volume: number;
    balance: number;
    shuffle: boolean;
    repeat: boolean;
    status: PlayerMediaStatus;
}
declare const media: (state: MediaState | undefined, action: Action) => MediaState;
export default media;
