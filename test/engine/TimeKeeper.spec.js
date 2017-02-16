import ava from 'ava';
import sinon from 'sinon';

import TimeKeeper from '../../src/assets/scripts/client/engine/TimeKeeper';
import TimeMath from '../../src/assets/scripts/client/engine/TimeMath';
import { buildMockDate } from './_mocks/MockDate';

const name = 'TimeKeeper';

ava(`${name}#elapsedTime is 0 at construction time`, t => {
    const timer = new TimeKeeper();

    t.is(timer.elapsedTime, 0, 'Expected the elapsed time to be 0 at creation time');
});

ava(`${name}#elapsedTimeInSeconds is 0 at construction time`, t => {
    const timer = new TimeKeeper();

    t.is(timer.elapsedTimeInSeconds, 0, 'Expected the elapsed time to be 0 at creation time');
});

ava(`${name}#currentDelta is 0 at construction time`, t => {
    const timer = new TimeKeeper();

    t.is(timer.currentDelta, 0, 'Expected the delta time to be 0 at creation time');
});

ava(`${name}#currentDeltaInSeconds is 0 at construction time`, t => {
    const timer = new TimeKeeper();

    t.is(timer.currentDeltaInSeconds, 0, 'Expected the delta time to be 0 at creation time');
});

ava(`${name}#currentTimestamp is the same as the time at construction time`, t => {
    const time = 12345;

    const OldDate = global.Date;
    global.Date = buildMockDate(time);

    const timer = new TimeKeeper();

    t.is(timer.currentTimestamp, time, 'Expected the timestamp to be the same as the Dates');

    global.Date = OldDate;
});

ava(`${name}#currentTimestampInSeconds is the same as the time at construction time`, t => {
    const time = 12345;

    const OldDate = global.Date;
    global.Date = buildMockDate(time);

    const timer = new TimeKeeper();

    t.is(
        timer.currentTimestampInSeconds,
        TimeMath.toSeconds(time),
        'Expected the timestamp to be the same as the Dates as seconds'
    );

    global.Date = OldDate;
});

ava(`${name}#lastTimestamp is the same as the time at construction time`, t => {
    const time = 12345;

    const OldDate = global.Date;
    global.Date = buildMockDate(time);

    const timer = new TimeKeeper();

    t.is(timer.lastTimestamp, time, 'Expected the timestamp to be the same as the Dates');

    global.Date = OldDate;
});

ava(`${name}#lastTimestampInSeconds is the same as the time at construction time`, t => {
    const time = 12345;

    const OldDate = global.Date;
    global.Date = buildMockDate(time);

    const timer = new TimeKeeper();

    t.is(
        timer.lastTimestampInSeconds,
        TimeMath.toSeconds(time),
        'Expected the timestamp to be the same as the Dates as seconds'
    );

    global.Date = OldDate;
});

ava(`${name}#elapsedFrames is 0 at construction time`, t => {
    const timer = new TimeKeeper();

    t.is(timer.elapsedFrames, 0, 'Expected the elapsed frames to be 0 at creation time');
});

ava(`${name}#update should increment the elapsedFrames`, t => {
    const timer = new TimeKeeper();
    const previousElapsedFrames = timer.elapsedFrames;
    timer.update(123);

    t.is(timer.elapsedFrames, previousElapsedFrames + 1, 'Expected the elapsed frames to be updated');

    const numberToIncrementBy = 5;
    for (let i = 0; i < 5; i++) {
        timer.update(123);
    }

    t.is(
        timer.elapsedFrames,
        previousElapsedFrames + 1 + numberToIncrementBy,
        'Expected the elapsed frames to be updated'
    );
});

ava(`${name}#step should call update with the delta in time`, t => {
    const originalGetCurrentTimestamp = TimeMath.getCurrentTimestamp;
    const initialTimestamp = 0;
    const nextTimestamp = 45;
    TimeMath.getCurrentTimestamp = () => initialTimestamp;
    const timer = new TimeKeeper();
    TimeMath.getCurrentTimestamp = () => nextTimestamp;
    timer.update = sinon.spy();
    timer.step();

    t.true(timer.update.calledWith(nextTimestamp), 'Expected the update to be called with the delta');

    TimeMath.getCurrentTimestamp = originalGetCurrentTimestamp;
});
