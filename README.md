# CM6, contextmenu/tooltip problem

## The setup

- A CodeMirror 6 editor
- with a `tooltip`, which shows a message above some position in the document
- An event handler for `contextmenu`, which dispatches an effect to show the message tooltip
  when the user right-clicks on the editor.


## The problem

In firefox, this works correctly. The message tooltip is shown on right-click, and 
dismissed when we click elsewhere in the editor.

In chrome, this does not work consistently. Very often, the first click does not show 
the tooltip, and we need to right-click a second time to make it appear.

Also, in chrome, if we right-click a blank line, we seem to always get the tooltip message.

It seems that something is wrong in the interaction between chrome, the contextmenu event,
and the way CM6 handles tooltips.

## Gifs

In Firefox:


![](images/cm-firefox.gif)

In Chrome:


![](images/cm-chrome.gif)

## Clues

We have several log messages to help us debug this issue.
On interesting pattern we see in chrome is that when the contextmenu event fires,
the `compute()` function seems to get called *twice* in rapid succession. In 
the first call, we see the tooltip object as we expect, but in the second call,
we see a `null`. This may account for how the tooltip is not shown.


## Work-around

If we add a second event handler, for `mouseup`, with a filter on `button === 2`, we 
can make this behave consistently across both browsers, at the expense of calling the 
relevant code twice.

See commented-out code in `index.js`.

Notably, we need *both* handlers to make it work consistently. Either of them on their own is not sufficient.


## To run:

``` sh
npm ci

npm start
```

See `index.html`, and `index.js` for code.
