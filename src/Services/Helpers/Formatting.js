/**
 * Trims the text to prevent over scaling.
 * @param {String} text The text thats required to be trimmed.
 * @param {number} limit The limit at which the trim should trigger.
 * @returns {string} Trimmed text follwed by "..." if it exceeds the limit
 */
export const trimBody = (text, limit) => {
  const cleanText = text.replace(/[\r\n]+/g, " ");

  return cleanText.slice(0, limit) + (cleanText.length >= limit ? "..." : "");
};

/**
 * Gets the computed line height of a given element/ref in pixels.
 * @param {React.RefObject|HTMLElement} refOrElement - The React ref or the DOM element.
 * @returns {number} The line height in pixels, or 0 if it can't be calculated.
 */
export const getLineHeight = (refOrElement) => {
  // Handle both React refs and direct DOM elements
  const element = refOrElement?.current || refOrElement;

  if (!element) return 0;

  const computedStyle = window.getComputedStyle(element);
  const lineHeight = computedStyle.lineHeight;

  // Handle the edge case where line-height is set to "normal"
  if (lineHeight === "normal") {
    // A safe browser fallback for "normal" is roughly 1.2 times the font size
    const fontSize = parseFloat(computedStyle.fontSize);
    return fontSize * 1.2;
  }

  return parseFloat(lineHeight);
};

/**
 * Checks if an element's text content exceeds its clamped line limit.
 * @param {React.RefObject|HTMLElement} refOrElement - The React ref or DOM element.
 * @returns {boolean} True if the text exceeds the clamped line limit.
 */
export const checkLineLimitExceeded = (refOrElement) => {
  const element = refOrElement?.current || refOrElement;
  if (!element) return false;

  // If scrollHeight is greater than clientHeight, the text is being cut off
  return element.scrollHeight > element.clientHeight;
};

/**
 * Auto-resizes a textarea based on its content.
 *
 * How it works:
 * 1. Resets the textarea height to the minimum height so shrinking works when text is deleted.
 * 2. Reads the textarea's scrollHeight to find the height needed to fit the current content.
 * 3. Sets the textarea height to that content height, but clamps it between minHeight and maxHeight.
 * 4. If the content exceeds maxHeight, vertical scrolling is enabled instead of growing further.
 *
 * @param {HTMLTextAreaElement} textarea - The textarea element to resize.
 * @param {number} [minHeight=10] - The minimum height of the textarea in pixels.
 * @param {number} [maxHeight=100] - The maximum height of the textarea in pixels.
 * @returns {void}
 */
export function autoSize(textarea, minHeight = 10, maxHeight = 100) {
  if (!textarea) return;

  textarea.style.height = `${minHeight}px`;

  const newHeight = Math.min(textarea.scrollHeight, maxHeight);

  textarea.style.height = `${newHeight}px`;
  textarea.style.overflowY =
    textarea.scrollHeight > maxHeight ? "auto" : "hidden";
}
