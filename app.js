(function(){

    // https://ru.wikipedia.org/wiki/Солитер_(игра)

    function randomColor() {
        const randomInt = (min, max) => {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };
        const h = randomInt(0, 360);
        const s = randomInt(42, 98);
        const l = randomInt(50, 60);
        return `hsl(${h},${s}%,${l}%)`;
    }

    class Node {
        constructor(moves, coords) {
            this.moves = moves || [];
            this.x = coords[0] || 0;
            this.y = coords[1] || 0;
            this.isEmpty = false;
            this.isActive = false;
            this.color = randomColor();
        }

        static get HEIGHT() {
            return 48;
        }

        static get WIDTH() {
            return 48;
        }
    }

    class Grid {
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

    class Game {
        constructor(el, grid) {
            this.el = el;
            this.grid = grid;
            this.movesCount = 0;
        }

        render() {
            if (!this.grid || !this.el) return false;

            this.el.innerHTML = '';
            this.grid.nodes.forEach((item, idx) => {
                let domNode = document.createElement('div');
                domNode.classList.add('node');
                if (item.isEmpty) {
                    domNode.classList.add('is-empty');
                }
                if (item.isActive) {
                    domNode.classList.add('is-active');
                }
                domNode.style.backgroundColor = item.color;
                domNode.setAttribute('data-index', idx);
                domNode.setAttribute('data-x', item.x);
                domNode.setAttribute('data-y', item.y);
                domNode.style.top = this.el.offsetHeight - Node.HEIGHT + item.y + 'px';
                domNode.style.left = item.x + 'px';
                this.el.append(domNode);
                domNode.addEventListener('click', event => {
                    if (item.isEmpty) {
                        // перемещение ноды
                        if (this.grid.activeNode === false) return false;

                        this.grid.nodes[ this.grid.activeNode ].moves.forEach(move => {
                            let moveOver = move[0];
                            let moveTo = move[1];

                            if (moveTo == idx && !this.grid.nodes[moveOver].isEmpty) {
                                this.grid.nodes[moveOver].isEmpty = true;
                                this.grid.nodes[moveTo].isEmpty = false;
                                this.grid.nodes[moveTo].color = this.grid.nodes[ this.grid.activeNode ].color;
                                this.grid.nodes[ this.grid.activeNode ].isEmpty = true;
                                this.grid.nodes[ this.grid.activeNode ].isActive = false;
                                this.grid.activeNode = false;
                                this.movesCount++;
                                this.render();
                            }
                        });
                    } else {
                        // активация ноды
                        this.grid.nodes.forEach(n => n.isActive = false);
                        this.grid.nodes[idx].isActive = true;
                        this.grid.activeNode = idx;
                    }
                    this.render();
                });

            });

            let statusText = '';
            let newGameBtn = false;

            if (this.isOver()) {
                if (this.isWin()) {
                    statusText = 'You win!';
                } else {
                    statusText = 'Game over :(';
                }
                newGameBtn = document.createElement('span');
                newGameBtn.classList.add('new-game');
                newGameBtn.innerHTML = 'New game';
                newGameBtn.addEventListener('click', e => window.location.reload());
            } else {
                statusText = 'Next move';
            }
            let statusBar = document.createElement('div');
            statusBar.classList.add('status');
            statusBar.innerHTML = statusText;
            if (newGameBtn) {
                statusBar.append(newGameBtn);
            }
            this.el.append(statusBar);

            let movesBar = document.createElement('div');
            movesBar.classList.add('moves');
            movesBar.innerHTML = 'Moves: ' + this.movesCount;
            this.el.append(movesBar);
        }

        isOver() {
            let gameOver = true;
            this.grid.nodes.forEach((item, idx) => {
                if (item.isEmpty) return;
                item.moves.forEach(move => {
                    let moveOver = move[0];
                    let moveTo = move[1];
                    if (!this.grid.nodes[moveOver].isEmpty && this.grid.nodes[moveTo].isEmpty) {
                        gameOver = false;
                    }
                });
            });
            return gameOver;
        }

        isWin() {
            let count = 0;
            this.grid.nodes.forEach(item => {
                if (!item.isEmpty) count++;
            });
            return count === 1;
        }
    }

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