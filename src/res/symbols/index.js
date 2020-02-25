import ae from './ae.png';
import at from './at.png';
import bt from './bt.png';
import cdot from './cdot.png';
import comma from './comma.png';
import copy from './copy.png';
import emptystar from './emptystar.png';
import filledstar from './filledstar.png';
import hj from './hj.png';
import lambda from './lambda.png';
import lightning from './lightning.png';
import loopty from './loopty.png';
import magnify from './magnify.png';
import mirroredk from './mirroredk.png';
import notequals from './notequals.png';
import omega from './omega.png';
import paragraph from './paragraph.png';
import questionmark from './questionmark.png';
import revc from './revc.png';
import reve from './reve.png';
import revn from './revn.png';
import six from './six.png';
import smiley from './smiley.png';
import threeears from './threeears.png';
import threefizzle from './threefizzle.png';
import trident from './trident.png';
import yield from './yield.png';

const ALL = {};
[
    [{ ae }, 'AE'],
    [{ at }, 'AT'],
    [{ bt }, 'BT'],
    [{ cdot }, 'C Dot'],
    [{ comma }, 'Comma'],
    [{ copy }, 'Copy'],
    [{ emptystar }, 'Empty Star'],
    [{ filledstar }, 'Filled Star'],
    [{ hj }, 'HJ'],
    [{ lambda }, 'Lambda'],
    [{ lightning }, 'Lightning'],
    [{ loopty }, 'Loopty'],
    [{ magnify }, 'Magnify'],
    [{ mirroredk }, 'Mirrored K'],
    [{ notequals }, 'Not Equal'],
    [{ omega }, 'Omega'],
    [{ paragraph }, 'Paragraph'],
    [{ questionmark }, 'Question'],
    [{ revc }, 'Rev C'],
    [{ reve }, 'Rev E'],
    [{ revn }, 'Rev N'],
    [{ six }, 'Six'],
    [{ smiley }, 'Smiley'],
    [{ threeears }, '3 Ears'],
    [{ threefizzle }, '3 Fizzle'],
    [{ trident }, 'Trident'],
    [{ yield }, 'Yield']
].forEach(([o, label]) => {
    const key = Object.keys(o)[0];
    ALL[key] = { url: o[key], label };
});

export default ALL;
