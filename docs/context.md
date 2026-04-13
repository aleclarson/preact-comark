# Overview

`preact-comark` is the Preact UI layer for `comark`. It turns markdown into a Comark tree and renders that tree into native HTML plus user-supplied Preact components.

The library is intentionally small. The main choice is whether parsing happens inside the component (`Comark`) or earlier in your pipeline (`ComarkRenderer`).

# When to Use

- You need markdown rendering inside a Preact application.
- You want markdown blocks like `::alert ... ::` to resolve to Preact components.
- You need incremental rendering for LLM or other streaming text sources.
- You want to standardize component mappings or parse options behind reusable wrappers.

# When Not to Use

- You only need parsing or tree transforms with no Preact rendering. Use `comark` directly.
- You need MDX-style arbitrary JSX execution inside markdown.
- You want a full documentation-site toolchain rather than a rendering primitive.

# Core Abstractions

- `Comark`
  Parses markdown and renders it in one step. Use this first unless parsing already happens elsewhere.
- `ComarkRenderer`
  Renders a precomputed `ComarkTree`. Use this when a server, build step, or API already produced the tree.
- `ComarkClient`
  Client-side parser used for streaming updates. Most apps should reach it through `Comark`.
- `components`
  A tag-to-component map. Resolution checks the original tag name and its PascalCase form, so `::callout` can resolve to either `components.callout` or `components.Callout`.
- Named slots
  Slot sections such as `#title` become props like `slotTitle` on the resolved component. Unslotted body content becomes `children`.
- `componentsManifest`
  Async component lookup for lazily resolved component blocks.
- `defineComarkComponent` and `defineComarkRendererComponent`
  Factory helpers for creating library- or app-specific wrappers with fixed defaults.

# Data Flow / Lifecycle

- `Comark` reads `children` first and falls back to `markdown`.
- Non-streaming `Comark` parsing suspends while the Comark tree is being produced, then renders through `ComarkRenderer`.
- Streaming `Comark` delegates to `ComarkClient`, which reparses on markdown changes and keeps the previous parsed tree visible until the next parse finishes.
- `ComarkRenderer` walks the Comark tree, resolves custom components, converts named slots into props, and renders native tags for everything else.
- `componentsManifest` entries are wrapped in `Suspense` and are expected to resolve to a module whose `default` export is the component.

# Common Tasks -> Recommended APIs

- Render a markdown string inside a Preact component
  Use `Comark`.
- Show live incremental output from an LLM or stream
  Use `Comark` with `streaming` and optionally `caret`.
- Render a tree produced outside the UI layer
  Use `ComarkRenderer`.
- Reuse one set of component mappings or parse defaults across many call sites
  Use `defineComarkComponent` or `defineComarkRendererComponent`.
- Load component blocks on demand
  Use `componentsManifest`.

# Recommended Patterns

- Keep `components`, `options`, and `plugins` stable across renders when possible.
- Use `Comark` as the main entrypoint and drop down to `ComarkRenderer` only when you already have a tree.
- Treat `components` keys as part of your authored markdown contract and keep them consistent across apps and content.
- Use examples in [examples/basic.ts](../examples/basic.ts), [examples/streaming.ts](../examples/streaming.ts), and [examples/components.ts](../examples/components.ts) as the canonical composition patterns.

# Patterns to Avoid

- Recreating `options`, `plugins`, or `components` objects inline every render in a streaming view.
- Writing component-block markdown without matching component registrations.
- Depending on unpublished deep imports from `src/`.
- Treating the demo app as the canonical API reference. The reference surface is source TSDoc plus [dist/index.d.mts](../dist/index.d.mts).

# Invariants and Constraints

- The published package surface is the package root export described by [dist/index.d.mts](../dist/index.d.mts).
- Named slots are passed as `slot<Name>` props with the first letter capitalized.
- Default slot content is passed as `children`.
- Streaming mode optimizes for continuity: the old parsed result stays on screen until the new parse resolves.
- `componentsManifest` must resolve modules with a `default` export.
- Custom component resolution is skipped inside `pre` blocks so code blocks remain literal.

# Error Model

- Parse failures are thrown to the surrounding framework. Provide an error boundary if parse errors should be contained.
- `Comark` and `ComarkClient` do not supply built-in retry or fallback UI beyond Suspense behavior.
- Errors thrown by custom components are surfaced by Preact the same way as any other rendering error.

# Terminology

- Markdown source
  The raw string passed through `markdown` or derived from `children`.
- Comark tree
  The parsed intermediate representation consumed by `ComarkRenderer`.
- Component map
  The `components` object used for tag-to-component resolution.
- Slot
  A named content region authored with markers such as `#title`, exposed as `slotTitle`.
- Streaming
  Repeated client-side reparsing of changing markdown while preserving the previous rendered result between parses.
- Caret
  An optional trailing marker appended to the last text node during streaming renders.

# Non-Goals

- Shipping a docs site, bundler, or syntax-highlighting stack.
- Replacing `comark` as the parsing and tree model owner.
- Executing arbitrary JSX authored inline in markdown.
