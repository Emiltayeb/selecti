import {
  getEditorContent,
  getDocumentSelection,
  showSelectiOnCurrentCaretPosition,
} from '../utils';
import { domSelectors, EDITOR_ID } from '../config';

export const handelInputChange = function () {
  // hide / show the place holder based on text in our editor
  if (getEditorContent().length === 0) {
    domSelectors.editor.setAttribute(domSelectors.placeHolderAttr, 'Insert your text here');
  } else {
    domSelectors.editor.removeAttribute(domSelectors.placeHolderAttr);
  }
};

export const handelSelectiButtonClick = function () {
  alert(`You Selected : ${getDocumentSelection()?.toString()}`);
};

export const handelEditorWordSelection = function () {
  const selection = getDocumentSelection();
  // prevent selecting any other elemens other then our editor
  if (selection?.anchorNode?.parentElement?.closest(`#${EDITOR_ID}`) === null) {
    return;
  }
  const isTextSelected = !!selection?.toString()?.length;
  if (isTextSelected) {
    showSelectiOnCurrentCaretPosition(selection);
  }
};
