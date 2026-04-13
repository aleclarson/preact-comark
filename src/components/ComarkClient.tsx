'use client'

import { useEffect, useRef, useState } from 'preact/hooks'
import { parse } from 'comark'
import type { ComarkTree } from 'comark'
import { ComarkRenderer } from './ComarkRenderer'
import type { ComarkProps } from './Comark'

export function ComarkClient({
  children,
  markdown = '',
  options = {},
  plugins = [],
  ...rest
}: ComarkProps) {
  const content = children ? String(children) : markdown

  const [parsed, setParsed] = useState<ComarkTree | null>(null)
  const [error, setError] = useState<unknown>(null)
  const requestId = useRef(0)

  useEffect(() => {
    let active = true
    const currentRequest = ++requestId.current

    setError(null)

    // Re-parse when content changes and keep showing the previous tree
    // until the latest request completes.
    parse(content, { ...options, plugins }).then(
      (nextTree) => {
        if (active && currentRequest === requestId.current) {
          setParsed(nextTree)
        }
      },
      (reason) => {
        if (active && currentRequest === requestId.current) {
          setError(reason)
        }
      },
    )

    return () => {
      active = false
    }
  }, [content])

  if (error) {
    throw error
  }

  if (!parsed) {
    return null
  }

  return (
    <ComarkRenderer
      tree={parsed}
      {...rest}
    />
  )
}
