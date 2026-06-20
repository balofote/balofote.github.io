import { Slider, Action } from "./../types";
export interface EqualizerState {
    on: boolean;
    auto: boolean;
    sliders: Record<Slider, number>;
}
declare const equalizer: (state: EqualizerState | undefined, action: Action) => EqualizerState;
export default equalizer;
