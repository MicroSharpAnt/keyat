// A single open contour and two dot eyes make each cat a readable letter.
// Coordinates share a 100 × 110 viewBox; eye direction follows the cat's head.
const glyphs: Record<string, { path: string; eyes: [number, number, number, number] }> = {
    A: { path: "M17 91 L36 20 L43 34 L57 34 L65 20 L83 91", eyes: [44, 48, 57, 48] },
    B: { path: "M32 36 C8 38 14 14 43 15 C78 14 82 44 55 51 C89 54 86 92 60 94 L54 81 L43 91 L29 86 L22 96", eyes: [38, 101, 51, 101] },
    C: { path: "M79 27 C45 -3 12 24 13 61 Q14 84 34 91 L42 77 L51 91 L65 89 L72 76 L84 87", eyes: [51, 101, 65, 101] },
    D: { path: "M20 92 L20 22 L31 34 L46 32 L54 18 L59 35 C105 33 101 91 39 91", eyes: [31, 47, 43, 47] },
    E: { path: "M77 20 L69 35 L52 32 L44 20 L36 36 Q10 42 20 58 Q25 66 49 61 M49 61 Q7 72 24 91 Q41 106 82 90", eyes: [37, 48, 49, 48] },
    F: { path: "M38 95 L38 64 Q10 62 20 44 L31 26 L41 39 L62 38 L74 24 L81 39 M38 64 L64 64", eyes: [43, 51, 57, 51] },
    G: { path: "M76 26 C34 0 6 37 17 76 Q20 88 32 93 L41 79 L50 94 L65 91 L72 80 L80 92 C102 61 73 57 53 60", eyes: [49, 102, 64, 101] },
    H: { path: "M24 17 L24 94 M24 40 L36 53 L62 53 L76 39 M76 17 L76 94", eyes: [42, 67, 58, 67] },
    I: { path: "M34 20 L68 20 M51 20 L51 58 L39 51 L44 68 L51 74 L51 94 M34 94 L68 94", eyes: [59, 67, 69, 60] },
    J: { path: "M75 18 L75 76 Q75 98 59 93 L50 81 L41 92 L28 87 L18 94", eyes: [36, 101, 50, 102] },
    K: { path: "M23 17 L23 94 M23 58 L80 20 M25 57 L38 48 L40 63 L51 69 L66 64 L65 78 L83 94", eyes: [44, 79, 57, 85] },
    L: { path: "M25 17 L25 80 Q25 95 37 89 L45 80 L54 92 L69 89 L77 81 L85 91", eyes: [51, 102, 65, 102] },
    M: { path: "M16 94 L16 32 L29 20 L32 37 L45 28 L47 45 L83 22 L83 94", eyes: [29, 50, 41, 51] },
    N: { path: "M21 94 L21 21 L35 34 L45 30 L48 47 L77 91 L77 20", eyes: [33, 48, 44, 51] },
    O: { path: "M32 92 C0 76 15 15 51 15 C92 14 103 78 75 94 L67 81 L58 94 L45 91 L37 79 L32 92", eyes: [46, 102, 61, 103] },
    P: { path: "M24 96 L24 34 L35 20 L42 34 L58 34 L68 20 L72 37 C99 68 58 84 26 67", eyes: [41, 48, 56, 48] },
    Q: { path: "M32 88 C3 73 15 15 51 15 C91 14 102 74 77 87 L68 75 L59 89 L46 86 L38 74 L32 88 M67 87 L84 102", eyes: [46, 98, 59, 99] },
    R: { path: "M23 96 L23 34 L34 20 L41 34 L57 34 L67 20 L72 38 C95 67 59 82 24 65 M45 71 Q57 87 83 94", eyes: [41, 48, 55, 48] },
    S: { path: "M77 28 C47 2 18 19 21 45 L34 36 L33 51 L57 60 L71 50 L70 67 C85 101 34 109 21 84", eyes: [44, 70, 59, 75] },
    T: { path: "M15 26 Q32 20 46 30 L58 24 L67 37 L79 25 L87 37 M46 30 L46 96", eyes: [58, 47, 72, 47] },
    U: { path: "M20 19 L20 76 Q20 98 36 91 L44 79 L52 92 L66 89 L75 77 Q81 59 80 19", eyes: [49, 101, 63, 100] },
    V: { path: "M22 20 L36 20 L29 34 L40 40 L35 53 L46 59 L52 94 L84 20", eyes: [22, 43, 26, 56] },
    W: { path: "M13 20 L25 20 L19 34 L29 42 L25 54 L36 61 L41 94 L58 53 L70 94 L92 20", eyes: [13, 44, 17, 57] },
    X: { path: "M22 18 L40 58 L18 96 M80 18 L61 58 L83 96 M40 58 L48 48 L54 49 L61 58", eyes: [43, 73, 58, 73] },
    Y: { path: "M22 18 L23 42 L34 51 L44 43 L56 48 L66 40 L75 50 M81 18 Q83 65 34 97", eyes: [42, 62, 57, 62] },
    Z: { path: "M19 23 L83 23 L65 48 L48 46 L52 58 L40 66 L46 78 L29 82 L23 96 L82 96", eyes: [61, 65, 55, 78] },
};

export const LineCatLetter = ({ letter, size }: { letter: string; size: number }) => {
    const glyph = glyphs[letter];
    if (!glyph) return null;
    const [x1, y1, x2, y2] = glyph.eyes;
    return <svg role="img" aria-label={letter} width={size} height={size} viewBox="0 0 100 110" style={{ display: "block" }}>
        {/* A fine white edge keeps the black ink legible over dark desktop content. */}
        <path d={glyph.path} fill="none" stroke="#fff" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d={glyph.path} fill="none" stroke="#171717" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <g fill="#171717" stroke="#fff" strokeWidth="1.2">
            <circle cx={x1} cy={y1} r="3.5" /><circle cx={x2} cy={y2} r="3.5" />
        </g>
    </svg>;
};

export const LineCatFrame = () => <svg aria-hidden="true" viewBox="0 0 120 120" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
    <path d="M17 99 L17 31 L29 16 L37 32 Q60 25 81 32 L93 16 L103 34 L103 83 Q103 101 84 101 L17 99" fill="#fff" fillOpacity="0.94" stroke="#fff" strokeWidth="7" strokeLinejoin="round" />
    <path d="M17 99 L17 31 L29 16 L37 32 Q60 25 81 32 L93 16 L103 34 L103 83 Q103 101 84 101 L17 99" fill="none" stroke="#171717" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="49" cy="43" r="3" fill="#171717" /><circle cx="67" cy="43" r="3" fill="#171717" />
</svg>;
