import { basicSetup, EditorState, EditorView } from '@codemirror/basic-setup';
import { javascript } from '@codemirror/lang-javascript';
import { keymap } from '@codemirror/view';

console.log(">> init")

const initialState = EditorState.create({
  doc: 'Hello there\n\nthis is nice.',
  extensions: [
    basicSetup,
    javascript(),
  ],
});

const view = new EditorView({
  parent: document.getElementById('editor'),
  state: initialState,
});

window.view = view;
