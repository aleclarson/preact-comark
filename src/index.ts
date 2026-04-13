import { createElement, type ComponentType, type FunctionComponent } from 'preact'
import { Comark } from './components/Comark'
import { ComarkRenderer } from './components/ComarkRenderer'
import type { ComarkProps } from './components/Comark'
import type { ComarkRendererProps } from './components/ComarkRenderer'
import type { ParseOptions } from 'comark'

export { ComarkRenderer } from './components/ComarkRenderer'
export { ComarkClient } from './components/ComarkClient'
export { Comark }
export type * from 'comark'

interface DefineComarkComponentOptions extends ParseOptions {
  /** Extend an existing defined component — inherits its plugins and components. */
  extends?: FunctionComponent<ComarkProps>
  /** Display name shown in Preact DevTools. */
  name?: string
  components?: Record<string, ComponentType<any>>
  /**
   * Additional classes for the wrapper div
   */
  className?: string
}

/**
 * Create a pre-configured Comark component with default options, plugins, and components.
 *
 * Use `extends` to inherit configuration from another defined component.
 *
 * @example
 * ```tsx
 * import type { ComponentChildren } from 'preact'
 * import { defineComarkComponent } from 'preact-comark'
 *
 * function Alert({ children }: { children?: ComponentChildren }) {
 *   return <aside>{children}</aside>
 * }
 *
 * export const ArticleComark = defineComarkComponent({
 *   name: 'ArticleComark',
 *   className: 'article-markdown',
 *   components: { alert: Alert },
 * })
 *
 * // <ArticleComark markdown={'::alert\nHello\n::'} />
 * ```
 */
export function defineComarkComponent(config: DefineComarkComponentOptions = {}) {
  const { name, components: configComponents = {}, className: configClassName, extends: BaseComponent, ...parseOptions } = config

  const ComarkComponent: FunctionComponent<ComarkProps> = (props) => {
    const mergedOptions: Omit<ParseOptions, 'plugins'> = {
      ...parseOptions,
      ...props.options,
    }

    const mergedPlugins = [
      ...(config.plugins || []),
      ...(props.plugins || []),
    ]

    const mergedComponents = {
      ...configComponents,
      ...props.components,
    }

    const mergedClassName = [configClassName, props.className].filter(Boolean).join(' ') || undefined

    return createElement(BaseComponent ?? Comark, {
      ...props,
      options: mergedOptions,
      plugins: mergedPlugins,
      components: mergedComponents,
      className: mergedClassName,
    })
  }

  ComarkComponent.displayName = name || 'ComarkComponent'

  return ComarkComponent
}

interface DefineComarkRendererOptions {
  /** Extend an existing defined renderer — inherits its component mappings. */
  extends?: FunctionComponent<ComarkRendererProps>
  /** Display name shown in Preact DevTools. */
  name?: string
  components?: Record<string, ComponentType<any>>
  /**
   * Additional classes for the wrapper div
   */
  className?: string
}

/**
 * Create a pre-configured ComarkRenderer component with default component mappings.
 *
 * Use this when parsing happens separately (server, build step, API) and you want
 * a reusable renderer with baked-in component mappings.
 *
 * Use `extends` to inherit mappings from another defined renderer.
 *
 * @example
 * ```tsx
 * import type { ComponentChildren } from 'preact'
 * import { defineComarkRendererComponent } from 'preact-comark'
 * import type { ComarkTree } from 'preact-comark'
 *
 * function Alert({ children }: { children?: ComponentChildren }) {
 *   return <aside>{children}</aside>
 * }
 *
 * const ArticleRenderer = defineComarkRendererComponent({
 *   name: 'ArticleRenderer',
 *   components: { alert: Alert },
 * })
 *
 * export function Preview({ tree }: { tree: ComarkTree }) {
 *   return <ArticleRenderer tree={tree} />
 * }
 * ```
 */
export function defineComarkRendererComponent(config: DefineComarkRendererOptions = {}) {
  const { name, components: configComponents = {}, className: configClassName, extends: BaseComponent } = config

  const RendererComponent: FunctionComponent<ComarkRendererProps> = (props) => {
    const mergedComponents = {
      ...configComponents,
      ...props.components,
    }

    const mergedClassName = [configClassName, props.className].filter(Boolean).join(' ') || undefined

    return createElement(BaseComponent ?? ComarkRenderer, {
      ...props,
      components: mergedComponents,
      className: mergedClassName,
    })
  }

  RendererComponent.displayName = name || 'ComarkRendererComponent'

  return RendererComponent
}
