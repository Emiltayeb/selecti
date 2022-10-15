import gsap from 'gsap';
import { domSelectors, offsets, SELECTI_BUTTON_ID, VisibilityAttributes } from '../config';

// In order to show the selection based if the user started the election from L->R or R->L
//referenced from  @willlMa https://stackoverflow.com/a/23512678/11246548
const getSelectionDirection = function (selection: Selection | null) {
  if (!selection || !selection.anchorNode || !selection.focusNode) return;
  const position = selection.anchorNode.compareDocumentPosition(selection.focusNode);
  return !!(
    (!position && selection.anchorOffset > selection.focusOffset) ||
    position === Node.DOCUMENT_POSITION_PRECEDING
  );
};

export const getEditorContent = function () {
  return domSelectors.editor.innerText;
};

export const getDocumentSelection = function () {
  return document.getSelection();
};

export const setSelectiVisibility = function (visibility: VisibilityAttributes) {
  domSelectors.editorTextSelectionButton.setAttribute(domSelectors.visibilityAttr, visibility);
};

const getCurrentCaretPositionBySelection = function (selection: Selection | null) {
  const clonedRange = selection?.getRangeAt(0)?.cloneRange();
  const isBackwardDirection = getSelectionDirection(selection);
  clonedRange?.collapse(isBackwardDirection);
  const { x, y } = clonedRange?.getBoundingClientRect()!;
  return {
    x: (isBackwardDirection ? offsets.right : offsets.left) + x,
    y: y + offsets.top,
  };
};

// Displaying the selecti logo on user caret position
export const showSelectiOnCurrentCaretPosition = function (selection: Selection | null) {
  const { x, y } = getCurrentCaretPositionBySelection(selection);
  gsap.to(`#${SELECTI_BUTTON_ID}`, { left: x, top: y });
  setSelectiVisibility(VisibilityAttributes.OPEN);
};

// Run extra logic to hide the selecti logo when selection change
export const debounceSelection = function (func: any, timeout = 50) {
  let timer: number | undefined;
  return (...args: any[]) => {
    if (
      domSelectors.editorTextSelectionButton.getAttribute(domSelectors.visibilityAttr) ===
      VisibilityAttributes.OPEN
    ) {
      setSelectiVisibility(VisibilityAttributes.CLOSED);
    }
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(null, args);
    }, timeout);
  };
};
