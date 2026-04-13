# preact-comark

## Purpose

Render [Comark](https://github.com/comarkdown/comark) markdown in Preact, with support for custom components, named slots, and incremental streaming updates.

## Installation

```bash
pnpm add preact preact-comark
```

## Quick Example

```tsx
import { Comark } from 'preact-comark'

const markdown = `
# Hello

- markdown
- components
- streaming
`

export function App() {
  return <Comark markdown={markdown} />
}
```

## Documentation Map

- Concepts and API selection: [docs/context.md](/Users/alec/dev/alloc/preact-comark/docs/context.md)
- Runnable usage patterns: [examples/basic.ts](/Users/alec/dev/alloc/preact-comark/examples/basic.ts), [examples/streaming.ts](/Users/alec/dev/alloc/preact-comark/examples/streaming.ts), [examples/components.ts](/Users/alec/dev/alloc/preact-comark/examples/components.ts)
- Exact exported signatures: [dist/index.d.mts](/Users/alec/dev/alloc/preact-comark/dist/index.d.mts)
- Interactive demo: [demo/main.jsx](/Users/alec/dev/alloc/preact-comark/demo/main.jsx)
