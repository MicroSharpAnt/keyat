import { useKeyStyle } from "@/stores/key_style";
import { KeyEvent } from "@/types/event";
import { LowProfileKeycap } from "./lowprofile";
import { LaptopKeycap } from "./laptop";
import { MinimalKeycap } from "./minimal";
import { PBTKeycap } from "./pbt";
import { CatKeycap } from "./cat";

export interface KeycapProps {
    event: KeyEvent;
    isPressed: boolean;
    lastest: boolean;
}

const components = {
    minimal: MinimalKeycap,
    laptop: LaptopKeycap,
    lowprofile: LowProfileKeycap,
    pbt: PBTKeycap,
} as const;

export const Keycap = (props: KeycapProps) => {
    const style = useKeyStyle(state => state.appearance.style);
    const skin = useKeyStyle(state => state.appearance.skin);
    if (skin === "cat" || skin === "line-cat" || skin === "watercolor-cat") return <CatKeycap {...props} skin={skin} />;
    const KeycapComponent = components[style];
    
    return <KeycapComponent {...props} />;
};
