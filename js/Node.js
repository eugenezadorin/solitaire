import { Color } from './Color.js';

export class Node {
    constructor(moves, coords) {
        this.moves = moves || [];
        this.x = coords[0] || 0;
        this.y = coords[1] || 0;
        this.isEmpty = false;
        this.isActive = false;
        this.color = Color.randomHsl();
    }

    static get HEIGHT() {
        return 48;
    }

    static get WIDTH() {
        return 48;
    }
}