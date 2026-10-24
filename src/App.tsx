import { useState } from 'react'
import { ArrowDown, ArrowUpRight, Check, CirclePlay, Sparkles } from 'lucide-react'
import Header from './components/Header'
import Dashboard from './components/Dashboard'
import Features, { Benefits, Workflow } from './components/Features'
import Pricing from './components/Pricing'
import FAQ from './components/FAQ'
import DemoDialog from './components/DemoDialog'
import type { DemoSelection } from './components/DemoDialog'
import { Brand, ExploreButton, Lines } from './components/UI'
import ActionControl from './components/ActionControl'
import useReveal from './hooks/useReveal'
import { site, content } from './config'
import { sectionVisible, visibleNavigation } from './config/actions'

export default function App() {
  useReveal()
  const [selection, setSelection] = useState<DemoSelection | null>(null)
  const explore = () => setSelection({ plan: content.demo.tourName })
  const visible = (key: Parameters<typeof sectionVisible>[0]) => sectionVisible(key, site)
  return (
    <>
      <span id="home" className="top-anchor" aria-hidden="true" />
      <a className="skip-link" href="#main">
        {content.common.skipLink}
      </a>
      <Header onExplore={explore} />
      <main id="main">
        {!visible('hero') && <h1 className="sr-only">{site.brand.tagline}</h1>}
        {visible('hero') && (
          <section className="hero-section">
            <div className="hero-light" aria-hidden="true" />
            <div className="container hero-content">
              <ActionControl
                action={content.hero.badge}
                className="release-badge"
                icon={false}
                onDemo={explore}
              >
                {(label) => (
                  <>
                    <span>
                      <Sparkles size={12} aria-hidden="true" /> {label}
                    </span>
                    <ArrowUpRight size={13} aria-hidden="true" />
                  </>
                )}
              </ActionControl>
              <h1>
                <Lines lines={content.hero.headline} />
              </h1>
              <p className="hero-description">
                {content.hero.description[0]}
                <br className="desktop-break" /> {content.hero.description[1]}
              </p>
              <div className="hero-actions">
                <ExploreButton action={content.hero.primaryAction} onClick={explore} />
                <ActionControl
                  action={content.hero.secondaryAction}
                  className="button button-secondary"
                  icon={false}
                  onDemo={explore}
                >
                  {(label) => (
                    <>
                      <CirclePlay size={17} strokeWidth={1.5} aria-hidden="true" />
                      {label}
                    </>
                  )}
                </ActionControl>
              </div>
              <div className="hero-assurances">
                {(site.demoMode ? content.hero.assurances : content.hero.clientAssurances).map(
                  (text) => (
                    <span key={text}>
                      <Check size={12} aria-hidden="true" />
                      {text}
                    </span>
                  ),
                )}
              </div>
              {visible('dashboard') && <Dashboard onExplore={explore} />}
            </div>
          </section>
        )}
        {visible('workStrip') && (
          <div className="container work-strip">
            <span>{content.workStrip.label}</span>
            <div>
              {content.workStrip.audiences.map((text) => (
                <span key={text}>{text}</span>
              ))}
            </div>
            <ActionControl
              action={content.workStrip.action}
              iconOnly
              icon={<ArrowDown size={18} aria-hidden="true" />}
              onDemo={explore}
            />
          </div>
        )}
        {visible('features') && <Features />}
        {visible('workflow') && <Workflow />}
        {visible('benefits') && <Benefits />}
        {visible('pricing') && (
          <Pricing onSelect={(plan, billing) => setSelection({ plan, billing })} />
        )}
        {visible('faq') && <FAQ onExplore={explore} />}
        {visible('finalCta') && (
          <section
            id="final-cta"
            className="final-cta container"
            aria-labelledby="cta-heading"
            data-reveal
          >
            <div className="cta-light" aria-hidden="true" />
            <span className="cta-mark">
              <Sparkles size={27} strokeWidth={1.2} aria-hidden="true" />
            </span>
            <div className="eyebrow">{content.finalCta.label}</div>
            <h2 id="cta-heading">
              <Lines lines={content.finalCta.title} />
            </h2>
            <p>{content.finalCta.description}</p>
            <ExploreButton action={content.finalCta.action} onClick={explore} />
            <span className="cta-note">{content.finalCta.note}</span>
          </section>
        )}
      </main>
      <footer className="container site-footer">
        <div className="footer-main">
          <div>
            <a href="#home" aria-label={content.common.homeLabel}>
              <Brand />
            </a>
            <p>{content.footer.tagline}</p>
          </div>
          <nav aria-label={content.common.footerNavigation}>
            {visibleNavigation(content.footer.links, site).map((action) => (
              <ActionControl key={action.label} action={action} icon={false} onDemo={explore} />
            ))}
            <ActionControl
              action={content.footer.action}
              onDemo={explore}
              className="footer-action"
              icon={<ArrowUpRight size={12} aria-hidden="true" />}
            />
            {site.brand.contactEmail && (
              <ActionControl
                action={{ kind: 'contact', label: content.common.contactLabel }}
                icon={false}
              />
            )}
            {site.brand.socials.map((action) => (
              <ActionControl key={action.href} action={action} icon={false} />
            ))}
          </nav>
        </div>
        <div className="footer-bottom">
          <span>
            {content.footer.copyright}
            {site.demoMode && <span className="demo-indicator">{site.demoLabel}</span>}
          </span>
          <span>{content.footer.details}</span>
          <a href="#home">{content.footer.backToTop}</a>
        </div>
      </footer>
      {site.demoMode && selection && (
        <DemoDialog selection={selection} onClose={() => setSelection(null)} />
      )}
    </>
  )
}
