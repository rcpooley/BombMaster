import React from 'react';

class Util {
    static bold(text) {
        return <span className="font-weight-bold">{text}</span>;
    }

    static manual(page) {
        return (
            'http://www.bombmanual.com/print/KeepTalkingAndNobodyExplodes-BombDefusalManual-v1.pdf#page=' +
            page
        );
    }

    static rnd(min, max) {
        if (max == null) {
            max = min;
            min = 0;
        }
        return Math.floor(Math.random() * (max - min)) + min;
    }
}

export default Util;
