import { createElement, render } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import { Comark } from 'preact-comark'

const chunks = [
  '# Stream\n\n',
  'A new line arrives.\n\n',
  '- chunk one\n',
  '- chunk two\n',
  '`done`\n',
]

function StreamingExample() {
  const [markdown, setMarkdown] = useState('')

  useEffect(() => {
    let index = 0
    const timer = window.setInterval(() => {
      index += 1
      setMarkdown(chunks.slice(0, index).join(''))

      if (index >= chunks.length) {
        window.clearInterval(timer)
      }
    }, 150)

    return () => {
      window.clearInterval(timer)
    }
  }, [])

  return createElement(Comark, {
    caret: { class: 'stream-caret' },
    markdown,
    streaming: true,
  })
}

const root = document.getElementById('app')

if (!root) {
  throw new Error('Missing #app root')
}

render(createElement(StreamingExample, null), root)
