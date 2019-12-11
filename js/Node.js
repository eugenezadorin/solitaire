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
        let workspaceWidth = document.documentElement.clientWidth;
        if (workspaceWidth > 520) {
            return 48;
        }
        return 32;
    }

    static get WIDTH() {
        let workspaceWidth = document.documentElement.clientWidth;
        if (workspaceWidth > 520) {
            return 48;
        }
        return 32;
    }
}