import ava from 'ava';

import TimeMath from '../../src/assets/scripts/client/engine/TimeMath';
import { buildMockDate } from './_mocks/MockDate';

const name = 'TimeMath';
ava(`${name}#getCurrentTimestamp should provide a timestamp of the current time`, t => {
    const time = 12345;

    const OldDate = global.Date;
    global.Date = buildMockDate(time);

    t.is(
        TimeMath.getCurrentTimestamp(),
        time,
        'Expected `getCurrentTimestamp` to provide the current time of the Date'
    );

    global.Date = OldDate;
});

ava(`${name}#toSeconds should use the public coefficient to apply to your input`, t => {
    const ms = 76543;
    const s = ms * TimeMath.MILLISECONDS_TO_SECONDS;

    const seconds = TimeMath.toSeconds(ms);

    t.is(s, seconds, 'Expected the seconds to be the same as the milliseconds converted to seconds');
});
