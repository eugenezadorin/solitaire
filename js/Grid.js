export class Grid {
    constructor() {
        this.nodes = [];
        this.activeNode = false;
    }

    static get EDGE() {
        return 100;
    }

    static get INIT_POS() {
        return [36, -36];
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