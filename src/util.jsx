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
}

export default Util;
