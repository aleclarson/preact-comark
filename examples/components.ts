import { createElement, render, type ComponentChildren } from 'preact'
import { Comark } from 'preact-comark'

function Alert({ children, tone = 'slate' }: { children?: ComponentChildren, tone?: string }) {
  return createElement('aside', { 'data-tone': tone }, children)
}

function Callout({
  children,
  slotTitle,
  slotMeta,
}: {
  children?: ComponentChildren
  slotTitle?: ComponentChildren
  slotMeta?: ComponentChildren
}) {
  return createElement(
    'section',
    null,
    createElement('header', null, slotTitle, ' ', slotMeta),
    children,
  )
}

const markdown = `
::alert{tone="steel"}
Custom blocks resolve through the components map.
::

::callout
#title
Named slots
#meta
slotMeta

Default slot content still becomes children.
::
`

const root = document.getElementById('app')

if (!root) {
  throw new Error('Missing #app root')
}

render(
  createElement(Comark, {
    components: {
      alert: Alert,
      Callout,
    },
    markdown,
  }),
  root,
)
