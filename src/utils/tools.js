/* eslint-disable camelcase */
/**
 * Capitalizes the first word and replaces underscores with spaces in the column name.
 *
 * @param {string} columnName - The column name.
 * @returns {string} - The capitalized label.
 */
export const columnNameToLabel = (columnName) => {
  const words = columnName.split('_'); // Split the column name by "_"
  const firstWord = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  words[0] = firstWord;
  const label = words.join(' '); // Join the words with spaces
  return label;
};

/**
 * Converts an object of columns into an array of table headers.
 *
 * @param {object} columns - The columns object with boolean values.
 * @returns {Array} - An array of objects with table headers.
 */
export const convertColumnsToHeaders = (columns) => {
  return Object.keys(columns)
    .map((column) => ({
      id: column,
      numeric: false,
      disablePadding: false,
      label: columnNameToLabel(column),
    }));
};

/**
 * Limits the length of a string and appends ' [...]' if it's longer than the specified amount.
 *
 * @param {string} string - The input string to limit.
 * @param {number} amount - The maximum length allowed for the string.
 * @returns {string} - The limited string with possible ' [...]' if truncated.
 */
export function limitString(string, amount) {
  return string
    ? string.slice(0, amount).concat(string.length > amount ? ' [...]' : '')
    : '';
}

/**
 * Creates a data object with specified properties.
 */
export const createData = ({
  id, name, document, cv_zonajobs, cv_bumeran, phone, email, date, age,
  has_university, career, graduated, courses_approved, location,
  accepts_working_hours, desired_salary, had_interview, reason,
}) => {
  return {
    id,
    name,
    document,
    cv_zonajobs,
    cv_bumeran,
    phone,
    email,
    date,
    age,
    has_university,
    career,
    graduated,
    courses_approved,
    location,
    accepts_working_hours,
    desired_salary,
    had_interview,
    reason,
  };
};
