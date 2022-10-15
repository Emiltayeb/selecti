import {
  debounceSelection,
  getDocumentSelection,
  getEditorContent,
  onEditorWordSelect,
} from './utils';
import { domSelectors } from './utils/config';

const handelInputChange = function () {
  if (getEditorContent().length === 0) {
    domSelectors.editor.setAttribute('data-placeholder', 'Insert your text here');
  } else {
    domSelectors.editor.removeAttribute('data-placeholder');
  }
};

const onSelectiClick = function () {
  alert(`You Selected : ${getDocumentSelection()?.toString()}`);
};

const init = function () {
  domSelectors.editor.focus();
  domSelectors.editor.addEventListener('input', handelInputChange);
  domSelectors.editorTextSelectionButton.addEventListener('click', onSelectiClick);
  document.addEventListener('selectionchange', debounceSelection(onEditorWordSelect, 500));
};

init();
