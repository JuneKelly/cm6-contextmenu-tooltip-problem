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
        console.log("  - Show message for:", message)
        return {
          pos: 1,
          above: true,
          create: view => {
            console.log("  - Create tooltip for:", message)
            return createMessageElement(message)
          }
        }
      }
    }
  },
  provide: f => showTooltip.compute([f], state => {
    const value = state.field(f)
    console.log("  - in showTooltip.compute(), with field value: ", value)
    return value
  })
})

let counter = 0

const dispatchShowCounterEffect = (view) => {
  counter++
  view.dispatch({
    effects: [
      showMessage.of(`Count: ${counter}`)
    ]
  })
}

const initialState = EditorState.create({
  doc: 'Hello there\n\nthis is nice.\n\nTest one two\n\nThree four.',
  extensions: [
    EditorView.domEventHandlers({
      contextmenu: (event, view) => {
        console.log(">>>>>>>>>> contextmenu event <<<<<<<<<<<<<<")
        event.preventDefault()
        dispatchShowCounterEffect(view)
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
