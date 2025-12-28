
/**
 * Pads a number with a leading zero if it's less than 10.
 */
export const padZero = (num: number): string => {
  return num < 10 ? `0${num}` : `${num}`;
};

/**
 * Returns a human-readable string for the current period (AM/PM).
 */
export const getAmPm = (hours: number): string => {
  return hours >= 12 ? 'PM' : 'AM';
};
