import { Node } from './Node.js';

export class Game {
    constructor(el, grid) {
        this.el = el;
        this.grid = grid;
        this.movesCount = 0;
        this.el.style.height = this.el.offsetWidth + 40 + 'px';
    }

    render() {
        if (!this.grid || !this.el) return false;

        this.el.innerHTML = '';
        this.grid.nodes.forEach( this.renderNode.bind(this) );

        this.renderStatusBar();
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
        domNode.style.width = Node.WIDTH + 'px';
        domNode.style.height = Node.HEIGHT + 'px';
        this.el.append(domNode);
        domNode.addEventListener('click', event => {
            if (node.isEmpty) {
                this.moveActiveNodeTo(idx);
            } else {
                this.toggleNode(idx);
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

    toggleNode(index) {
        if (this.grid.nodes[index].isActive) {
            this.grid.nodes.forEach(node => node.isActive = false);
            this.grid.activeNode = false;
        } else {
            this.grid.nodes.forEach(node => node.isActive = false);
            this.grid.nodes[index].isActive = true;
            this.grid.activeNode = index;
        }
    }

    renderStatusBar() {
        let newGameBtn = () => {
            let n = document.createElement('a');
            n.setAttribute('href', '');
            n.classList.add('new-game');
            n.innerHTML = 'Новая игра';
            return n;
        };

        let status = () => {
            let statusText = 'Ваш ход';
            if (this.isOver()) {
                statusText = this.isWin() ? 'Победа!' : 'Упс :(';
            }
            let n = document.createElement('div');
            n.innerHTML = statusText;
            n.classList.add('status');
            return n;
        };

        let moves = () => {
            let n = document.createElement('div');
            n.classList.add('moves');
            n.innerHTML = 'Ходы: ' + this.movesCount;
            return n;
        };

        let statusBar = document.createElement('div');
        statusBar.classList.add('status-bar');
        statusBar.append(status());
        statusBar.append(newGameBtn());
        statusBar.append(moves());
        this.el.append(statusBar);
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