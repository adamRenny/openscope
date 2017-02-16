import TimeMath from './TimeMath';

/**
 * Model for managing time
 * Stores all time as milliseconds
 *
 * Used for tracking the time for a run loop or game loop
 *
 * @class
 */
export default class TimeKeeper {
    /**
     * Elapsed time in milliseconds since the beginning of the timer's calculations
     *
     * Can be reset, starts at 0
     *
     * @private
     * @type {number}
     */
    _elapsedTime = 0;

    /**
     * Current step's timestamp in milliseconds
     *
     * Can be reset, starts at 0
     *
     * @private
     * @type {number}
     */
    _currentTimestamp = 0;

    /**
     * Previous step's timestamp in milliseconds
     *
     * Can be reset, starts at 0
     *
     * @private
     * @type {number}
     */
    _lastTimestamp = 0;

    /**
     * Timestamp delta in milliseconds since the last timestamp
     *
     * Stored for caching purposes rather than recalculating on the fly
     *
     * Can be reset, starts at 0
     *
     * @private
     * @type {number}
     */
    _currentDelta = 0;

    /**
     * Number of frames/steps since the  beginning of the timer's calculations
     * One iteration, or call to `update` or `step` is the equivalent of a frame
     *
     * Has no units
     *
     * Can be reset, starts at 0
     *
     * @private
     * @type {number}
     */
    _elapsedFrames = 0;

    /**
     * Initializes the `TimeKeeper` by resetting all values
     *
     * @constructor
     */
    constructor() {
        this.reset();
    }

    /**
     * Elapsed time in milliseconds since the beginning of the timer's calculations
     *
     * Can be reset, starts at 0
     *
     * @type {number}
     */
    get elapsedTime() {
        return this._elapsedTime;
    }

    /**
     * Elapsed time in seconds since the beginning of the timer's calculations
     *
     * Can be reset, starts at 0
     *
     * @type {number}
     */
    get elapsedTimeInSeconds() {
        return this._elapsedTime * TimeMath.MILLISECONDS_TO_SECONDS;
    }

    /**
     * Current step's timestamp in milliseconds
     *
     * Can be reset, starts at 0
     *
     * @type {number}
     */
    get currentTimestamp() {
        return this._currentTimestamp;
    }

    /**
     * Current step's timestamp in seconds
     *
     * Can be reset, starts at 0
     *
     * @type {number}
     */
    get currentTimestampInSeconds() {
        return this._currentTimestamp * TimeMath.MILLISECONDS_TO_SECONDS;
    }

    /**
     * Timestamp delta in milliseconds since the last timestamp
     *
     * Stored for caching purposes rather than recalculating on the fly
     *
     * Can be reset, starts at 0
     *
     * @type {number}
     */
    get currentDelta() {
        return this._currentDelta;
    }

    /**
     * Timestamp delta in seconds since the last timestamp
     *
     * Stored for caching purposes rather than recalculating on the fly
     *
     * Can be reset, starts at 0
     *
     * @type {number}
     */
    get currentDeltaInSeconds() {
        return this._currentDelta * TimeMath.MILLISECONDS_TO_SECONDS;
    }

    /**
     * Previous step's timestamp in milliseconds
     *
     * Can be reset, starts at 0
     *
     * @type {number}
     */
    get lastTimestamp() {
        return this._lastTimestamp;
    }

    /**
     * Previous step's timestamp in seconds
     *
     * Can be reset, starts at 0
     *
     * @type {number}
     */
    get lastTimestampInSeconds() {
        return this._lastTimestamp * TimeMath.MILLISECONDS_TO_SECONDS;
    }

    /**
     * Number of frames/steps since the  beginning of the timer's calculations
     * One iteration, or call to `update` or `step` is the equivalent of a frame
     *
     * Has no units
     *
     * Can be reset, starts at 0
     *
     * @type {number}
     */
    get elapsedFrames() {
        return this._elapsedFrames;
    }

    /**
     * Mutable
     *
     * Resets the `TimeKeeper` to its initial values
     */
    reset() {
        const currentTimestamp = TimeMath.getCurrentTimestamp();
        this._currentDelta = 0;
        this._elapsedTime = 0;
        this._currentTimestamp = currentTimestamp;
        this._lastTimestamp = currentTimestamp;
        this._elapsedFrames = 0;
    }

    /**
     * Mutable
     *
     * Update call to increment the time keeper by a step based on the elapsed time provided
     *
     * Constitutes a new frame
     *
     * @param {number} elapsedTime Time in milliseconds since last increment
     */
    update(elapsedTime) {
        this._lastTimestamp = this._currentTimestamp;

        const timestamp = this._lastTimestamp + elapsedTime;
        this._currentDelta = elapsedTime;
        this._elapsedTime = this._elapsedTime + elapsedTime;
        this._currentTimestamp = timestamp;

        this._elapsedFrames = this._elapsedFrames + 1;
    }

    /**
     * Mutable
     *
     * Update call to update the time keeper to current timestamp, using the system timestamp
     *
     * Constitutes a new frame
     */
    step() {
        const timestamp = TimeMath.getCurrentTimestamp();
        const delta = timestamp - this._lastTimestamp;

        this.update(delta);
    }
}
