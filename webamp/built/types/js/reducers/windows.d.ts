import { Action, WindowId, Box, Point } from "../types";
export type WindowPositions = {
    [windowId: string]: Point;
};
export interface WebampWindow {
    title: string;
    size: [number, number];
    open: boolean;
    shade?: boolean;
    canResize: boolean;
    canShade: boolean;
    canDouble: boolean;
    hotkey?: string;
    position: Point;
}
export interface WindowInfo extends Box {
    key: WindowId;
}
export interface WindowsState {
    focused: WindowId | null;
    genWindows: {
        [name: string]: WebampWindow;
    };
    browserWindowSize: {
        height: number;
        width: number;
    };
    positionsAreRelative: boolean;
    windowOrder: WindowId[];
    milkdropEnabled: boolean;
}
declare const windows: (state: WindowsState | undefined, action: Action) => WindowsState;
export default windows;
