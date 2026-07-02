# Manual Test: Issue #52 — End Of Prior shows "undefined"

The "End Of Prior" field is rendered by `copyPreviousRecordFromLsToElement()`, which
reads the `previousRecord` object from `localStorage` and builds a display string. Missing
properties must render as `none`, never as the literal words `undefined` or `null`.

Run these checks in a browser (Firefox/Chrome) with `Bigfoot-Bib-Report-Initial.html` open.
Use the DevTools console to seed `localStorage`, then reload the page.

## 1. Valid last entry still renders correctly

```js
localStorage.setItem('previousRecord', JSON.stringify(
  { runner: '123', action: 'IN', time: '08:30', dayOfMonth: '14', messageNumber: '5' }));
```
Reload. Expect End Of Prior: `#123, IN, 08:30, D:14, M#5`

## 2. Missing fields render "none", not "undefined"

```js
localStorage.setItem('previousRecord', JSON.stringify({}));
```
Reload. Expect End Of Prior: `#none, none, none, D:none, M#none`
FAIL if any part reads `undefined` or `null`.

## 3. Partial fields (the reported failure)

```js
localStorage.setItem('previousRecord', JSON.stringify(
  { runner: '', action: undefined, time: null, messageNumber: '5' }));
```
Reload. Expect End Of Prior: `#none, none, none, D:none, M#5`
Before the fix this rendered `#, undefined, none, D:undefined, M#5`.

## 4. Add / save / load unchanged

- Add an IN/OUT/DROP entry and confirm End Of Prior updates to that entry.
- Save the form (submit) and reload saved data; a valid last entry must still display correctly.
