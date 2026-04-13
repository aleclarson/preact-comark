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

- Concepts and API selection: [docs/context.md](./docs/context.md)
- Runnable usage patterns: [examples/basic.ts](./examples/basic.ts), [examples/streaming.ts](./examples/streaming.ts), [examples/components.ts](./examples/components.ts)
- Exact exported signatures: [dist/index.d.mts](./dist/index.d.mts)
- Interactive demo: [demo/main.jsx](./demo/main.jsx)
