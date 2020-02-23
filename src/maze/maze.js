import MU from './mazeUtil';
import MAZES from './mazes';
import DIR from './directions';

class Maze {
    constructor(mazeIdx) {
        this.mazeIdx = mazeIdx;
        this.pos = MU.randomPoint();
        this.goal = null;
        this._updateGoal();
    }

    _getMaze() {
        return MAZES[this.mazeIdx];
    }

    _randomGoal() {
        return MU.randomGoal(this._getMaze());
    }

    _updateGoal() {
        this.goal = this._randomGoal();
        while (MU.equal(this.pos, this.goal)) {
            this.goal = this._randomGoal();
        }
    }

    _isValidMove(start, end) {
        const shift = p => ({ x: p.x + 0.5, y: p.y + 0.5 });
        const sStart = shift(start);
        const sEnd = shift(end);
        const { walls } = this._getMaze();
        for (let i = 0; i < walls.length; i++) {
            const [a, b] = walls[i];
            if (MU.intersects(sStart, sEnd, a, b)) return false;
        }
        return true;
    }

    move(dir) {
        const { x, y } = DIR.getXY(dir);

        // Don't move if invalid direction
        if (x + y === 0) {
            return;
        }

        // Get old and new positions
        const pos = this.pos;
        const newPos = {
            x: MU.bound(pos.x + x),
            y: MU.bound(pos.y + y)
        };

        // Return bad wall if invalid move
        if (!this._isValidMove(pos, newPos)) {
            return MU.getWallBetween(pos, newPos);
        }

        // Update position
        this.pos = newPos;

        // Update goal
        if (MU.equal(this.pos, this.goal)) {
            this._updateGoal();
        }
    }
}

export default Maze;
