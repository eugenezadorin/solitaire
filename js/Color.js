export class Color {

    static randomHsl() {
        const randomInt = (min, max) => {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };
        const h = randomInt(0, 360);
        const s = randomInt(42, 98);
        const l = randomInt(50, 60);
        return `hsl(${h},${s}%,${l}%)`;
    }

}