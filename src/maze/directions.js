const DIRECTIONS = {
    UP: 'up',
    DOWN: 'down',
    LEFT: 'left',
    RIGHT: 'right',
    getXY: dir => {
        let x = 0,
            y = 0;

        if (dir === DIRECTIONS.UP) {
            y = -1;
        } else if (dir === DIRECTIONS.LEFT) {
            x = -1;
        } else if (dir === DIRECTIONS.DOWN) {
            y = 1;
        } else if (dir === DIRECTIONS.RIGHT) {
            x = 1;
        }

        return { x, y };
    }
};

export default DIRECTIONS;
