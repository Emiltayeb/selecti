export const SELECTI_BUTTON_ID = 'selecti-logo';
export const EDITOR_ID = 'editor';
export const offsets = {
  right: -35,
  left: 10,
  top: -30,
};
export const domSelectors = {
  editor: document.getElementById(EDITOR_ID) as HTMLButtonElement,
  editorTextSelectionButton: document.getElementById(SELECTI_BUTTON_ID) as HTMLButtonElement,
};

export enum VisibilityAttributes {
  OPEN = 'open',
  CLOSED = 'closed',
}
