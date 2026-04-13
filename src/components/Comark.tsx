import type { ComponentChildren, ComponentType } from 'preact'
import { Suspense } from 'preact/compat'
import { parse } from 'comark'
import type { ComarkTree, ComponentManifest, ParseOptions } from 'comark'
import { ComarkRenderer } from './ComarkRenderer'
import { ComarkClient } from './ComarkClient'

type ComarkOptions = Omit<ParseOptions, 'plugins'>
type ComarkPlugins = NonNullable<ParseOptions['plugins']>

export interface ComarkProps {
  /**
   * The children content to parse and render
   */
  children?: ComponentChildren

  /**
   * The markdown content to parse and render
   */
  markdown?: string

  /**
   * Parser options (excluding plugins)
   */
  options?: ComarkOptions

  /**
   * Additional plugins to use
   */
  plugins?: ParseOptions['plugins']

  /**
   * Custom component mappings for element tags
   * Key: tag name (e.g., 'h1', 'p', 'MyComponent')
   * Value: Preact component
   */
  components?: Record<string, ComponentType<any>>

  /**
   * Dynamic component resolver function
   * Used to resolve components that aren't in the components map
   */
  componentsManifest?: ComponentManifest

  /**
   * Enable streaming mode — delegates to ComarkClient for client-side re-rendering
   * when the markdown prop changes. Use this for LLM streaming output.
   */
  streaming?: boolean

  /**
   * If caret is true, a caret will be appended to the last text node in the tree
   * If caret is an object, it will be appended to the last text node in the tree with the given class
   */
  caret?: boolean | { class: string }

  /**
   * Additional className for the wrapper div
   */
  className?: string
}

/**
 * Comark component
 *
 * Async server component that parses markdown on the server and renders it.
 * When `streaming` is true, delegates to ComarkClient for client-side re-rendering.
 *
 * @example
 * ```tsx
 * import { Comark } from 'preact-comark'
 * import CustomHeading from './CustomHeading'
 *
 * const customComponents = {
 *   h1: CustomHeading,
 *   alert: AlertComponent,
 * }
 *
 * export default function App() {
 *   const content = `
 *     # Hello World
 *
 *     This is a **markdown** document with *Comark* components.
 *
 *     ::alert{type="info"}
 *     This is an alert component
 *     ::
 *   `
 *
 *   return <Comark markdown={content} components={customComponents} />
 * }
 * ```
 */
const EMPTY_OPTIONS: ComarkOptions = {}
const EMPTY_PLUGINS: ComarkPlugins = []

interface ParseRecord {
  error?: unknown
  promise?: Promise<void>
  tree?: ComarkTree
}

const parseCache = new Map<string, WeakMap<ComarkOptions, WeakMap<ComarkPlugins, ParseRecord>>>()

function getParseRecord(source: string, options: ComarkOptions, plugins: ComarkPlugins): ParseRecord {
  let optionsCache = parseCache.get(source)
  if (!optionsCache) {
    optionsCache = new WeakMap()
    parseCache.set(source, optionsCache)
  }

  let pluginsCache = optionsCache.get(options)
  if (!pluginsCache) {
    pluginsCache = new WeakMap()
    optionsCache.set(options, pluginsCache)
  }

  let record = pluginsCache.get(plugins)
  if (!record) {
    record = {}
    pluginsCache.set(plugins, record)
  }

  return record
}

function readParsedTree(source: string, options: ComarkOptions, plugins: ComarkPlugins): ComarkTree {
  const record = getParseRecord(source, options, plugins)

  if (record.tree) {
    return record.tree
  }

  if (record.error) {
    throw record.error
  }

  if (!record.promise) {
    record.promise = parse(source, { ...options, plugins }).then(
      (tree) => {
        record.tree = tree
      },
      (error) => {
        record.error = error
      },
    )
  }

  throw record.promise
}

interface ResolvedComarkProps extends Omit<ComarkProps, 'children' | 'markdown' | 'streaming' | 'options' | 'plugins'> {
  options: ComarkOptions
  plugins: ComarkPlugins
  source: string
}

function ResolvedComark({
  source,
  options,
  plugins,
  components: customComponents = {},
  componentsManifest,
  caret = false,
  className,
}: ResolvedComarkProps) {
  const parsed = readParsedTree(source, options, plugins)

  return (
    <ComarkRenderer
      tree={parsed}
      components={customComponents}
      componentsManifest={componentsManifest}
      className={className}
      caret={caret}
    />
  )
}

export function Comark({
  children,
  markdown = '',
  options = EMPTY_OPTIONS,
  plugins = EMPTY_PLUGINS,
  components: customComponents = {},
  componentsManifest,
  streaming = false,
  caret = false,
  className,
}: ComarkProps) {
  const source = children ? String(children) : markdown

  if (streaming) {
    return (
      <ComarkClient
        markdown={source}
        options={options}
        plugins={plugins}
        components={customComponents}
        componentsManifest={componentsManifest}
        streaming={streaming}
        caret={caret}
        className={className}
      />
    )
  }

  return (
    <Suspense fallback={null}>
      <ResolvedComark
        source={source}
        options={options}
        plugins={plugins}
        components={customComponents}
        componentsManifest={componentsManifest}
        className={className}
        caret={caret}
      />
    </Suspense>
  )
}
