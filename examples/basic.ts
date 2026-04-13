import { createElement, render } from 'preact'
import { Comark } from 'preact-comark'

const markdown = `
# Hello

This is **preact-comark**.

- Render markdown
- Keep Preact in control
`

const root = document.getElementById('app')

if (!root) {
  throw new Error('Missing #app root')
}

render(createElement(Comark, { markdown }), root)
