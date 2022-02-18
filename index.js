import { EditorState, StateField, StateEffect } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import {Tooltip, showTooltip} from "@codemirror/tooltip"

console.log(">> init")

const showMessage = StateEffect.define()

const createMessageElement = (message) => {
  const dom = document.createElement('div')
  dom.textContent = message
  return { dom }
}

const messageTooltipField = StateField.define({
  create: () => {
    return null
  },
  update(tooltip, tr) {
    for (const effect of tr.effects) {
      if (effect.is(showMessage)) {
        const message = effect.value
        return {
          pos: 1,
          above: true,
          create: view => {
            return createMessageElement(message)
          }
        }
      }
    }
  },
  provide: f => showTooltip.compute([f], state => state.field(f))
})

const initialState = EditorState.create({
  doc: 'Hello there\n\nthis is nice.\n\nTest one two\n\nThree four.',
  extensions: [
    EditorView.domEventHandlers({
      contextmenu: (event, view) => {
        console.log(">> contextMenu")
        event.preventDefault()
        view.dispatch({
          effects: [
            showMessage.of(`Time: ${new Date()}`)
          ]
        })
      }
    }),
    messageTooltipField
  ],
});

const view = new EditorView({
  parent: document.getElementById('editor'),
  state: initialState,
});

window.view = view;
