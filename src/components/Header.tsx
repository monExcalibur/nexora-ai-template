import { useEffect, useRef, useState } from 'react'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { Brand } from './UI'
import { content, site } from '../config'
import { visibleNavigation } from '../config/actions'
import ActionControl from './ActionControl'

export default function Header({ onExplore }: { onExplore: () => void }) {
  const [open, setOpen] = useState(false)
  const trigger = useRef<HTMLButtonElement>(null)
  const links = visibleNavigation(content.navigation, site)
  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        trigger.current?.focus()
      }
    }
    const onResize = () => {
      if (window.innerWidth >= 780) setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [open])
  return (
    <header
      className="site-header"
      data-compact-cta={
        site.brand.shortName.length + site.brand.suffix.length > 8 ||
        content.headerAction.label.length > 14
          ? 'true'
          : undefined
      }
    >
      <div className="container nav-shell">
        <a href="#home" aria-label={content.common.homeLabel}>
          <Brand />
        </a>
        <nav className="desktop-nav" aria-label={content.common.mainNavigation}>
          {links.map((action) => (
            <ActionControl key={action.label} action={action} icon={false} onDemo={onExplore} />
          ))}
        </nav>
        <ActionControl
          action={content.headerAction}
          className="button nav-cta"
          onDemo={onExplore}
          icon={<ArrowUpRight size={14} aria-hidden="true" />}
        />
        <button
          className="menu-toggle"
          ref={trigger}
          aria-label={open ? content.common.closeNavigation : content.common.openNavigation}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </button>
      </div>
      <nav
        id="mobile-nav"
        hidden={!open}
        className="mobile-nav"
        aria-label={content.common.mobileNavigation}
      >
        {links.map((action) => (
          <ActionControl
            key={action.label}
            action={action}
            onDemo={onExplore}
            onNavigate={() => setOpen(false)}
            icon={<ArrowUpRight size={16} aria-hidden="true" />}
          />
        ))}
        <ActionControl
          action={content.headerAction}
          className="button button-primary"
          onDemo={onExplore}
          onNavigate={() => setOpen(false)}
          icon={<ArrowUpRight size={16} aria-hidden="true" />}
        />
      </nav>
    </header>
  )
}
