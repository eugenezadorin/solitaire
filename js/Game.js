import { Node } from './Node.js';

export class Game {
    constructor(el, grid) {
        this.el = el;
        this.grid = grid;
        this.movesCount = 0;
    }

    render() {
        if (!this.grid || !this.el) return false;

        this.el.innerHTML = '';
        this.grid.nodes.forEach( this.renderNode.bind(this) );

        this.renderStatusBar();
        this.renderMovesBar();
    }

    renderNode(node, idx) {
        let domNode = document.createElement('div');
        domNode.classList.add('node');
        if (node.isEmpty) {
            domNode.classList.add('is-empty');
        }
        if (node.isActive) {
            domNode.classList.add('is-active');
        }
        domNode.style.backgroundColor = node.color;
        domNode.style.top = this.el.offsetHeight - Node.HEIGHT + node.y + 'px';
        domNode.style.left = node.x + 'px';
        this.el.append(domNode);
        domNode.addEventListener('click', event => {
            if (node.isEmpty) {
                this.moveActiveNodeTo(idx);
            } else {
                this.activateNode(idx);
            }
            this.render();
        });
    }

    moveActiveNodeTo(index) {
        if (this.grid.activeNode === false) return false;

        this.grid.nodes[ this.grid.activeNode ].moves.forEach(move => {
            let moveOver = move[0];
            let moveTo = move[1];

            if (moveTo == index && !this.grid.nodes[moveOver].isEmpty) {
                this.grid.nodes[moveOver].isEmpty = true;
                this.grid.nodes[moveTo].isEmpty = false;
                this.grid.nodes[moveTo].color = this.grid.nodes[ this.grid.activeNode ].color;
                this.grid.nodes[ this.grid.activeNode ].isEmpty = true;
                this.grid.nodes[ this.grid.activeNode ].isActive = false;
                this.grid.activeNode = false;
                this.movesCount++;
            }
        });
    }

    activateNode(index) {
        this.grid.nodes.forEach(node => node.isActive = false);
        this.grid.nodes[index].isActive = true;
        this.grid.activeNode = index;
    }

    renderStatusBar() {
        let statusText = '';
        let newGameBtn = document.createElement('a');
        newGameBtn.setAttribute('href', '');
        newGameBtn.classList.add('new-game');
        newGameBtn.innerHTML = 'New game';

        if (this.isOver()) {
            if (this.isWin()) {
                statusText = 'You win!';
            } else {
                statusText = 'Game over :(';
            }

        } else {
            statusText = 'Next move';
        }
        let statusBar = document.createElement('div');
        statusBar.classList.add('status');
        statusBar.innerHTML = statusText;
        statusBar.append(newGameBtn);
        this.el.append(statusBar);
    }

    renderMovesBar() {
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