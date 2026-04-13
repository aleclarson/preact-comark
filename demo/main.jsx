import { render } from 'preact'
import { computed, signal } from '@preact/signals'
import '@picocss/pico/css/pico.min.css'
import { Comark } from 'preact-comark'
import './styles.css'

const scenes = [
  {
    label: 'a',
    render(run) {
      const pass = String(run).padStart(2, '0')
      return `# stream ${pass}

::alert{tone="slate"}
lane ${pass}
::

- cold
- quiet
- repeat`
    },
  },
  {
    label: 'b',
    render(run) {
      const pass = String(run).padStart(2, '0')
      return `::callout
#title
slot ${pass}
#meta
cold queue

delta ${pass}
::`
    },
  },
  {
    label: 'c',
    render(run) {
      const pass = String(run).padStart(2, '0')
      return `::multi-slot-test
**frame ${pass}**

#header
head ${pass}

#footer
tail ${pass}
::

::alert{tone="steel"}
sync ${pass}
::`
    },
  },
]

function renderScene(index, run = 0) {
  return scenes[index].render(run)
}

function Alert({ children, tone = 'slate' }) {
  return (
    <article class={`comark-alert tone-${tone}`}>
      <header>
        <small>{tone}</small>
      </header>
      {children}
    </article>
  )
}

function Callout({ children, slotTitle, slotMeta }) {
  return (
    <article class="comark-callout">
      <header>
        <strong>{slotTitle}</strong>
        <small>{slotMeta}</small>
      </header>
      {children}
    </article>
  )
}

function MultiSlotTest({ children, slotHeader, slotFooter }) {
  return (
    <article class="comark-multi">
      <header>{slotHeader}</header>
      <div>{children}</div>
      <footer>
        <small>{slotFooter}</small>
      </footer>
    </article>
  )
}

const components = {
  alert: Alert,
  Callout,
  'multi-slot-test': MultiSlotTest,
}

const sceneIndex = signal(0)
const runCount = signal(0)
const source = signal(renderScene(0))
const isStreaming = signal(false)
const activeScene = computed(() => scenes[sceneIndex.value])

let streamTimer = 0

function stopStream() {
  if (streamTimer) {
    window.clearInterval(streamTimer)
    streamTimer = 0
  }
  isStreaming.value = false
}

function selectScene(index) {
  stopStream()
  sceneIndex.value = index
  runCount.value = 0
  source.value = renderScene(index)
}

function resetSource() {
  stopStream()
  runCount.value = 0
  source.value = renderScene(sceneIndex.value)
}

function streamScene() {
  stopStream()

  const nextRun = runCount.value + 1
  const target = activeScene.value.render(nextRun)
  const step = Math.max(4, Math.ceil(target.length / 42))

  runCount.value = nextRun
  source.value = ''
  isStreaming.value = true

  let cursor = 0
  streamTimer = window.setInterval(() => {
    cursor = Math.min(target.length, cursor + step)
    source.value = target.slice(0, cursor)

    if (cursor >= target.length) {
      stopStream()
    }
  }, 32)
}

function App() {
  return (
    <main class="container-fluid app">
      <div class="toolbar" role="group">
        {scenes.map((scene, index) => (
          <button
            aria-current={sceneIndex.value === index ? 'true' : 'false'}
            onClick={() => selectScene(index)}
            type="button"
          >
            {scene.label}
          </button>
        ))}
        <button onClick={streamScene} type="button">stream</button>
        <button class="secondary" disabled={!isStreaming.value} onClick={stopStream} type="button">stop</button>
        <button
          class="secondary"
          onClick={resetSource}
          type="button"
        >
          reset
        </button>
      </div>
      <section class="grid frame">
        <article class="panel editor">
          <textarea
            aria-label="markdown"
            onInput={(event) => {
              stopStream()
              source.value = event.currentTarget.value
            }}
            spellCheck={false}
            value={source.value}
          />
        </article>
        <article class="panel preview">
          <Comark
            caret={isStreaming.value ? { class: 'stream-caret' } : false}
            components={components}
            markdown={source.value}
            streaming
          />
        </article>
      </section>
    </main>
  )
}

render(<App />, document.getElementById('app'))
