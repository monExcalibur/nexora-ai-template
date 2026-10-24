import { useId } from 'react'
import type { ReactNode } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { content, site } from '../config'
import { resolveAction } from '../config/actions'
import type { SiteAction } from '../config/types'

/** Preserves presentation classes while making each configured action explicit. */
export default function ActionControl({
  action,
  className = '',
  children,
  icon = <ArrowUpRight size={15} aria-hidden="true" />,
  iconOnly = false,
  onDemo,
  onNavigate,
}: {
  action: SiteAction
  className?: string
  children?: ReactNode | ((label: string) => ReactNode)
  icon?: ReactNode
  iconOnly?: boolean
  onDemo?: () => void
  onNavigate?: () => void
}) {
  const noteId = useId()
  const resolved = resolveAction(action, site)
  const text =
    action.kind === 'demo' && !site.demoMode && action.live ? action.live.label : action.label
  const label = iconOnly ? null : typeof children === 'function' ? children(text) : children || text
  if (resolved.kind === 'demo' && onDemo)
    return (
      <button
        className={className}
        onClick={() => {
          onNavigate?.()
          onDemo()
        }}
        aria-label={iconOnly ? text : undefined}
      >
        {label}
        {icon}
      </button>
    )
  if (resolved.kind === 'link')
    return (
      <a
        className={className}
        href={resolved.href}
        target={resolved.newTab ? '_blank' : undefined}
        rel={resolved.newTab ? 'noopener noreferrer' : undefined}
        aria-label={iconOnly ? text : undefined}
        onClick={onNavigate}
      >
        {label}
        {icon}
      </a>
    )
  return (
    <span className="action-unavailable">
      <button
        className={className}
        disabled
        title={content.common.unavailable}
        aria-describedby={noteId}
        aria-label={iconOnly ? text : undefined}
      >
        {label}
        {icon}
      </button>
      <small id={noteId} className="action-explanation">
        {content.common.unavailable}
      </small>
    </span>
  )
}
