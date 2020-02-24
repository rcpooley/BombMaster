class MazeUtil {
    static p(x, y) {
        return { x, y };
    }

    static w(x1, y1, x2, y2) {
        return [MazeUtil.p(x1, y1), MazeUtil.p(x2, y2)];
    }

    static getWallBetween(start, end) {
        const { x, y } = start;
        const xc = end.x - x;
        const yc = end.y - y;
        if (yc === -1) {
            return MazeUtil.w(x, y, x + 1, y);
        } else if (yc === 1) {
            return MazeUtil.w(x, y + 1, x + 1, y + 1);
        } else if (xc === -1) {
            return MazeUtil.w(x, y, x, y + 1);
        } else if (xc === 1) {
            return MazeUtil.w(x + 1, y, x + 1, y + 1);
        }
    }

    static rnd(max) {
        return parseInt(Math.random() * max);
    }

    static randomPoint() {
        return MazeUtil.p(MazeUtil.rnd(6), MazeUtil.rnd(6));
    }

    static randomGoal(maze) {
        return maze.goals[MazeUtil.rnd(maze.goals.length)];
    }

    static bound(x, min = 0, max = 5) {
        return Math.min(Math.max(x, min), max);
    }

    static intersects(w, x, y, z) {
        let a = w.x,
            b = w.y,
            c = x.x,
            d = x.y,
            p = y.x,
            q = y.y,
            r = z.x,
            s = z.y;
        let det, gamma, lambda;
        det = (c - a) * (s - q) - (r - p) * (d - b);
        if (det === 0) {
            return false;
        } else {
            lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
            gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
            return 0 < lambda && lambda < 1 && 0 < gamma && gamma < 1;
        }
    }

    static equal(a, b) {
        if (Array.isArray(a)) {
            return MazeUtil.equal(a[0], b[0]) && MazeUtil.equal(a[1], b[1]);
        }
        return a.x === b.x && a.y === b.y;
    }

    static contains(points, p) {
        for (let i = 0; i < points.length; i++) {
            const { x, y } = points[i];
            if (x === p.x && y === p.y) return true;
        }
        return false;
    }
}

export default MazeUtil;
