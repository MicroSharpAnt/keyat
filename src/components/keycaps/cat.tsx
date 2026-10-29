import { motion, useReducedMotion } from "motion/react";
import { keymaps } from "@/lib/keymaps";
import { useKeyStyle } from "@/stores/key_style";
import type { KeycapProps } from ".";
import { PressCount } from "./press-count";
import { LineCatFrame, LineCatLetter } from "./line-cat";

type CatSkin = "cat" | "line-cat" | "watercolor-cat";

// Pixel bounds measured from the transparent 1374 × 1145 atlas, in A–Z order.
// Explicit bounds keep the irregular illustrations clear of neighboring letters.
const letterBounds = [
    [38, 35, 238, 248], [286, 31, 462, 247], [487, 28, 679, 248],
    [718, 32, 910, 247], [953, 27, 1125, 245], [1166, 28, 1331, 247],
    [31, 254, 253, 474], [289, 263, 509, 474], [538, 259, 660, 472],
    [719, 259, 892, 474], [943, 262, 1126, 472], [1164, 264, 1343, 473],
    [28, 490, 261, 696], [282, 489, 468, 696], [487, 485, 707, 699],
    [733, 486, 902, 694], [922, 489, 1136, 698], [1168, 482, 1344, 697],
    [44, 703, 219, 918], [260, 707, 459, 914], [468, 720, 681, 913],
    [686, 716, 882, 914], [896, 720, 1132, 913], [1151, 717, 1347, 913],
    [28, 925, 214, 1119], [264, 916, 449, 1118],
] as const;

// Bounds of the watercolor atlas, including the detached head of I.
const watercolorBounds = [
    [26, 24, 238, 245], [281, 21, 476, 244], [484, 24, 698, 245],
    [716, 19, 917, 245], [942, 25, 1133, 245], [1160, 30, 1362, 245],
    [22, 270, 233, 475], [270, 264, 474, 475], [535, 260, 653, 475],
    [706, 267, 909, 480], [937, 266, 1133, 479], [1160, 263, 1365, 476],
    [20, 497, 241, 708], [257, 492, 475, 710], [480, 497, 709, 710],
    [704, 487, 900, 708], [925, 494, 1141, 716], [1173, 500, 1364, 711],
    [37, 726, 238, 931], [252, 726, 465, 933], [483, 730, 685, 931],
    [696, 727, 911, 934], [912, 727, 1153, 934], [1163, 726, 1360, 932],
    [39, 937, 229, 1143], [252, 933, 471, 1136],
] as const;

export const CatLetter = ({ letter, size, skin = "cat" }: { letter: string; size: number; skin?: CatSkin }) => {
    if (skin === "line-cat") return <LineCatLetter letter={letter} size={size} />;
    const bounds = (skin === "watercolor-cat" ? watercolorBounds : letterBounds)[letter.charCodeAt(0) - 65];
    if (!bounds) return null;
    const [left, top, right, bottom] = bounds;
    const width = right - left;
    const height = bottom - top;
    const scale = size * 0.9 / Math.max(width, height);
    return <span role="img" aria-label={letter} style={{
        display: "flex", alignItems: "center", justifyContent: "center", width: size, height: size,
    }}><span style={{
        display: "block", width: width * scale, height: height * scale,
        backgroundImage: `url("/skins/${skin === "watercolor-cat" ? "watercolor-cat" : "cat"}/alphabet.png")`,
        backgroundSize: `${1374 * scale}px ${1145 * scale}px`,
        backgroundPosition: `${-left * scale}px ${-top * scale}px`,
        backgroundRepeat: "no-repeat",
    }} /></span>;
};

export const CatKeycap = ({ event, isPressed, lastest, skin = "cat" }: KeycapProps & { skin?: CatSkin }) => {
    const text = useKeyStyle(state => state.text);
    const layout = useKeyStyle(state => state.layout);
    const reducedMotion = useReducedMotion();
    const letter = /^Key[A-Z]$/.test(event.name) ? event.name.slice(3) : null;
    const display = keymaps[event.name];
    const label = text.variant === "text-short"
        ? display?.shortLabel ?? display?.label ?? event.name
        : display?.label ?? event.name;
    const Icon = layout.showIcon && (text.variant === "icon" || event.isArrow()) ? display?.icon : undefined;
    const size = text.size * 2.75;
    const width = letter ? size : Math.max(size, (Icon ? 2.75 : label.length * 0.48 + 1.1) * text.size);

    return <div style={{ position: "relative", width, height: size, flexShrink: 0 }}>
        {lastest && layout.showPressCount && event.pressedCount > 1 && <PressCount count={event.pressedCount} />}
        <motion.div
            animate={{ scale: isPressed ? 0.94 : 1, y: isPressed ? text.size * 0.1 : 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.1 }}
            style={{ width: "100%", height: "100%", transformOrigin: "center bottom" }}
        >
            {letter ? <CatLetter letter={letter} size={size} skin={skin} /> : <>
                {skin === "line-cat" ? <LineCatFrame /> : <svg aria-hidden="true" viewBox="0 0 120 120" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
                    <path d="M18 43 L17 17 Q18 11 24 16 L42 31 Q60 24 78 31 L96 16 Q102 11 103 18 L102 43 Q115 56 112 77 Q110 104 86 106 H34 Q10 104 8 77 Q5 56 18 43Z" fill={skin === "watercolor-cat" ? "#a3adae" : "#efa347"} stroke={skin === "watercolor-cat" ? "#41494b" : "#59351c"} strokeWidth="3.5" strokeLinejoin="round" />
                    <path d="M23 23 L25 39 L35 33Z M97 23 L95 39 L85 33Z" fill="#ed9b9e" />
                    <path d="M52 29 L55 41 M66 29 L64 41" stroke={skin === "watercolor-cat" ? "#687579" : "#cf7629"} strokeWidth="5" strokeLinecap="round" />
                    <path d="M22 58 Q60 44 98 58 V84 Q96 99 80 99 H40 Q24 99 22 84Z" fill={skin === "watercolor-cat" ? "#faf6f0" : "#fff0ce"} />
                    <path d="M8 69 L20 72 M7 81 L20 79 M100 72 L112 69 M100 79 L113 81" stroke={skin === "watercolor-cat" ? "#41494b" : "#59351c"} strokeWidth="2" strokeLinecap="round" />
                </svg>}
                <div role="img" aria-label={label} style={{ position: "absolute", inset: "43% 18% 19%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: skin === "line-cat" ? "#171717" : skin === "watercolor-cat" ? "#41494b" : "#59351c", fontSize: text.size * 0.7, lineHeight: 1.1, fontWeight: 650, whiteSpace: "nowrap" }}>
                    {Icon ? <Icon size={text.size * 0.85} /> : <>
                        {layout.showSymbol && display?.symbol && <span style={{ fontSize: "0.65em" }}>{display.symbol}</span>}
                        <span>{label}</span>
                    </>}
                </div>
            </>}
        </motion.div>
    </div>;
};
