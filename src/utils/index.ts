import gsap from 'gsap';
import {
  domSelectors,
  EDITOR_ID,
  offsets,
  SELECTI_BUTTON_ID,
  VisibilityAttributes,
} from './config';

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
  domSelectors.editorTextSelectionButton.setAttribute('data-visible', visibility);
};
const appendToEditorSelection = function (selection: Selection | null) {
  const clonedRange = selection?.getRangeAt(0)?.cloneRange();
  const isBackwardDirection = getSelectionDirection(selection);
  clonedRange?.collapse(isBackwardDirection);
  const { x, y } = clonedRange?.getBoundingClientRect()!;
  const computedSide = (isBackwardDirection ? offsets.right : offsets.left) + x;
  gsap.to(`#${SELECTI_BUTTON_ID}`, { left: computedSide, top: y + offsets.top });
  setSelectiVisibility(VisibilityAttributes.OPEN);
};

export const onEditorWordSelect = function () {
  const selection = getDocumentSelection();
  // prevent selecting any other elemens other then our editor
  if (selection?.anchorNode?.parentElement?.closest(`#${EDITOR_ID}`) === null) {
    return;
  }

  const isTextSelected = !!selection?.toString()?.length;
  if (isTextSelected) {
    appendToEditorSelection(selection);
  }
};

export const debounceSelection = function (func: any, timeout = 50) {
  let timer: number | undefined;
  return (...args: any[]) => {
    if (
      domSelectors.editorTextSelectionButton.getAttribute('data-visible') ===
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
