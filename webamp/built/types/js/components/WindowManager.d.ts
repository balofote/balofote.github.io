import { ReactNode } from "react";
interface Props {
    windows: {
        [windowId: string]: ReactNode;
    };
    parentDomNode: HTMLElement;
}
export default function WindowManager({ windows: propsWindows, parentDomNode, }: Props): import("react/jsx-runtime").JSX.Element;
export {};
