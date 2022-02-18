import { EditorState } from '@codemirror/state';
import { EditorView } from '@codemirror/view';

console.log(">> init")

const initialState = EditorState.create({
  doc: 'Hello there\n\nthis is nice.',
  extensions: [
  ],
});

const view = new EditorView({
  parent: document.getElementById('editor'),
  state: initialState,
});

window.view = view;
