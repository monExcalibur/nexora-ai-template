import { Fragment } from 'react'
import { Sparkles } from 'lucide-react'
import type { ReactNode } from 'react'
import { site, content } from '../config'
import { assetUrl } from '../config/assets'
import ActionControl from './ActionControl'
import type { SiteAction } from '../config/types'

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`brand ${compact ? 'brand-compact' : ''}`}>
      {site.brand.logo.src ? (
        <img
          className="brand-mark brand-logo"
          src={assetUrl(site.brand.logo.src, import.meta.env.BASE_URL)}
          alt={site.brand.logo.alt}
          width="28"
          height="30"
        />
      ) : (
        <svg
          className="brand-mark"
          width="28"
          height="30"
          viewBox="0 0 28 30"
          fill="none"
          aria-hidden="true"
        >
          <path d="M3 23V7l6-3v12L19 4l6 3v16l-6 3V14L9 26z" fill="currentColor" />
        </svg>
      )}
      <span>
        {site.brand.shortName}
        <span className="brand-ai">{site.brand.suffix}</span>
      </span>
    </span>
  )
}

export function Lines({ lines, muted = false }: { lines: string[]; muted?: boolean }) {
  return (
    <>
      {lines.map((line, index) => (
        <Fragment key={`${index}-${line}`}>
          {index > 0 && <br />}
          {index === 0 ? line : <span className={muted ? 'muted' : undefined}>{line}</span>}
        </Fragment>
      ))}
    </>
  )
}

export function ExploreButton({
  action = content.hero.primaryAction,
  children,
  onClick,
  secondary = false,
  className = '',
}: {
  action?: SiteAction
  children?: ReactNode
  onClick: () => void
  secondary?: boolean
  className?: string
}) {
  return (
    <ActionControl
      action={action}
      className={`button ${secondary ? 'button-secondary' : 'button-primary'} ${className}`}
      onDemo={onClick}
    >
      {children}
    </ActionControl>
  )
}

export function SectionIntro({
  label,
  title,
  description,
  center = false,
}: {
  label: string
  title: ReactNode
  description?: string
  center?: boolean
}) {
  return (
    <div className={`section-intro ${center ? 'text-center mx-auto' : ''}`}>
      <div className="eyebrow flex items-center gap-2 justify-start">
        <Sparkles size={12} aria-hidden="true" />
        {label}
      </div>
      <h2 className="section-heading">{title}</h2>
      {description && <p className="section-copy">{description}</p>}
    </div>
  )
}
