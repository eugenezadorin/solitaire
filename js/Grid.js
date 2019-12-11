import { Node } from './Node.js';

export class Grid {
    constructor() {
        this.nodes = [];
        this.activeNode = false;
    }

    static get WIDTH() {
        let workspaceWidth = document.documentElement.clientWidth;
        if (workspaceWidth > 520) {
            workspaceWidth = 520;
        }
        return workspaceWidth;
    }

    static get EDGE() {
        let workspaceWidth = document.documentElement.clientWidth;
        if (workspaceWidth > 520) {
            return 100;
        }
        return parseInt(workspaceWidth / 5);
    }

    static get INIT_POS() {
        const maxWidth = Grid.WIDTH;
        const top = -36;
        const left = parseInt(((maxWidth - (Grid.EDGE * 4)) / 2) - (Node.WIDTH / 2));

        return [left, top];
    }

    static getVertex(node1, node2) {
        const x1 = node1.x;
        const y1 = node1.y;
        const x2 = node2.x;
        const y2 = node2.y;

        const x3 = (x1 + x2 + (y2 - y1)*Math.sqrt(3)) / 2;
        const y3 = (y1 + y2 + (x1 - x2)*Math.sqrt(3)) / 2;

        return [x3, y3];
    }
}