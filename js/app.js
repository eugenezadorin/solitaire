import { Node } from './Node.js';
import { Grid } from './Grid.js';
import { Game } from './Game.js';

(function(){

    // https://ru.wikipedia.org/wiki/Солитер_(игра)

    const grid = new Grid;

    const node0 = new Node( [ [1, 2], [5, 9] ], Grid.INIT_POS );
    const node1 = new Node( [ [2, 3], [6, 10] ], [node0.x + Grid.EDGE, node0.y] );
    const node2 = new Node( [ [1, 0], [3, 4], [6, 9], [7, 11] ], [node1.x + Grid.EDGE, node0.y] );
    const node3 = new Node( [ [2, 1], [7, 10] ], [node2.x + Grid.EDGE, node0.y] );
    const node4 = new Node( [ [3, 2], [8, 11] ], [node3.x + Grid.EDGE, node0.y] );

    const node5 = new Node( [ [6, 7], [9, 12] ], Grid.getVertex(node0, node1) );
    const node6 = new Node( [ [7, 8], [10, 13] ], Grid.getVertex(node1, node2) );
    const node7 = new Node( [ [6, 5], [10, 12] ], Grid.getVertex(node2, node3) );
    const node8 = new Node( [ [7, 6], [11, 13] ], Grid.getVertex(node3, node4) );

    const node9 = new Node( [ [5, 0], [12, 14], [10, 11], [6, 2] ], Grid.getVertex(node5, node6) );
    const node10 = new Node( [ [6, 1], [7, 3] ], Grid.getVertex(node6, node7) );
    const node11 = new Node( [ [8, 4], [13, 14], [10, 9], [7, 2] ], Grid.getVertex(node7, node8) );

    const node12 = new Node( [ [9, 5], [10, 7] ], Grid.getVertex(node9, node10) );
    const node13 = new Node( [ [10, 6], [11, 8] ], Grid.getVertex(node10, node11) );

    const node14 = new Node( [ [12, 9], [13, 11] ], Grid.getVertex(node12, node13) );

    node2.isEmpty = true;

    grid.nodes = [
        node0, node1, node2, node3, node4,
        node5, node6, node7, node8,
        node9, node10, node11,
        node12, node13,
        node14
    ];

    const el = document.getElementById('app');
    const game = new Game(el, grid);
    game.render();

})();