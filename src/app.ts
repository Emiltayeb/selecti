import {
  handelInputChange,
  handelSelectiButtonClick,
  handelEditorWordSelection,
} from './editor-events';
import { debounceSelection } from './utils';
import { domSelectors } from './config';

const init = function () {
  domSelectors.editor.focus();
  domSelectors.editor.addEventListener('input', handelInputChange);
  domSelectors.editorTextSelectionButton.addEventListener('click', handelSelectiButtonClick);
  document.addEventListener('selectionchange', debounceSelection(handelEditorWordSelection, 500));
};

init();
