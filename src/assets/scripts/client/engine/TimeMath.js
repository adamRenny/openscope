/**
 * Coefficient used to calculate seconds from milliseconds
 *
 * @private
 * @static
 * @type {number}
 */
const MILLISECONDS_TO_SECONDS = 0.001;

/**
 * Math object used specifically for time and timestamp math
 */
class TimeMath {
    /**
     * Coefficient used to calculate seconds from milliseconds
     *
     * @static
     * @type {number}
     */
    MILLISECONDS_TO_SECONDS = MILLISECONDS_TO_SECONDS;

    /**
     * Provides the current unix timestamp for the immediate time
     *
     * Creates a new `Date` object when called
     *
     * @static
     * @returns {number}
     */
    getCurrentTimestamp() {
        return (new Date()).getTime();
    }

    /**
     * Conversion to seconds from milliseconds
     *
     * @static
     * @param {number} milliseconds Timestamp or time in milliseconds
     * @returns {number} Value transformed into seconds
     */
    toSeconds(milliseconds) {
        return milliseconds * MILLISECONDS_TO_SECONDS;
    }
}

export default new TimeMath();
