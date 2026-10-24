import { Fragment } from 'react'
import type { CSSProperties } from 'react'
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  FileText,
  GitBranch,
  Link2,
  MessageSquare,
  Plus,
  Sparkles,
  Zap,
} from 'lucide-react'
import { SectionIntro, Lines } from './UI'
import { content } from '../config'
import type { FeatureLayout } from '../config/types'

function FeatureArtwork({ layout }: { layout: FeatureLayout }) {
  const artwork = content.features.artwork
  switch (layout) {
    case 'priorities':
      return (
        <div className="priority-illustration" aria-hidden="true">
          <div className="mini-ui-title">
            <Sparkles size={12} />
            {artwork.priorities.label}
            <span>{artwork.priorities.byline}</span>
          </div>
          {artwork.priorities.rows.map((row, index) => (
            <div
              key={`${index}-${row.title}`}
              className={`priority-sample ${index > 1 ? 'faded' : ''}`}
            >
              <span className="rank">{String(index + 1).padStart(2, '0')}</span>
              <span>
                {row.title}
                <small>{row.description}</small>
              </span>
              {row.badge ? (
                <span className="tag-violet">{row.badge}</span>
              ) : index === 1 ? (
                <ArrowUpRight size={14} />
              ) : (
                <span className="mini-checkbox" />
              )}
            </div>
          ))}
        </div>
      )
    case 'automation': {
      const icons = [Check, Sparkles, MessageSquare]
      return (
        <div className="workflow-illustration" aria-hidden="true">
          {artwork.automation.map((node, index) => {
            const Icon = icons[index % icons.length]
            return (
              <Fragment key={`${index}-${node.title}`}>
                {index > 0 && (
                  <div className="workflow-connector">
                    <span />
                  </div>
                )}
                <div className={`workflow-node ${index === 1 ? 'violet' : ''}`}>
                  <span className="node-icon">
                    <Icon size={14} />
                  </span>
                  {node.title}
                  {node.label ? (
                    <span className="node-label">{node.label}</span>
                  ) : (
                    <Check size={13} className="green" />
                  )}
                </div>
              </Fragment>
            )
          })}
        </div>
      )
    }
    case 'collaboration':
      return (
        <div className="small-illustration collaboration-art" aria-hidden="true">
          <div className="comment-bubble">
            <span className="avatar">{artwork.collaboration.avatar}</span>
            <span>
              {artwork.collaboration.comment}
              <i>{artwork.collaboration.attribution}</i>
            </span>
          </div>
          <div className="collab-avatars">
            {artwork.collaboration.avatars.map((initials, index) => (
              <span className="avatar" key={`${index}-${initials}`}>
                {initials}
              </span>
            ))}
            <span className="avatar plus">
              <Plus size={12} />
            </span>
            <span>{artwork.collaboration.caption}</span>
          </div>
        </div>
      )
    case 'schedule':
      return (
        <div className="small-illustration schedule-art" aria-hidden="true">
          <div className="calendar-days">
            {artwork.schedule.days.map((day, index) => (
              <span
                key={`${index}-${day.day}`}
                className={day.day === artwork.schedule.selectedDay ? 'selected' : ''}
              >
                {day.label}
                <b>{day.day}</b>
              </span>
            ))}
          </div>
          <div className="calendar-event">
            <span />
            {artwork.schedule.event}
            <small>{artwork.schedule.time}</small>
          </div>
        </div>
      )
    case 'insights':
      return (
        <div className="small-illustration insights-art" aria-hidden="true">
          <div className="insights-label">
            <span>{artwork.insights.label}</span>
            <span>↗</span>
          </div>
          <div className="insight-bars">
            {artwork.insights.bars.map((height, index) => (
              <span key={index} style={{ height: `${height / 1.2}px` }} />
            ))}
          </div>
        </div>
      )
    case 'connections':
      return (
        <div className="small-illustration connections-art" aria-hidden="true">
          <span className="connection-item">
            <FileText size={19} />
          </span>
          <span className="connection-line" />
          <span className="connection-hub">
            <Link2 size={23} />
          </span>
          <span className="connection-line" />
          <span className="connection-item">
            <MessageSquare size={19} />
          </span>
          <span className="connection-note">{artwork.connections.caption}</span>
        </div>
      )
  }
}

export default function Features() {
  const features = content.features
  return (
    <section
      id="features"
      className="container section features-section"
      aria-labelledby="features-heading"
    >
      <div className="section-top" data-reveal>
        <SectionIntro
          label={features.label}
          title={
            <span id="features-heading">
              <Lines lines={features.title} muted />
            </span>
          }
        />
        <p className="section-copy">
          {features.description[0]}
          <br className="desktop-break" /> {features.description[1]}
        </p>
      </div>
      <div className="feature-grid">
        {features.items.map((feature, index) => {
          const large = feature.layout === 'priorities' || feature.layout === 'automation'
          const Icon = feature.layout === 'priorities' ? Sparkles : GitBranch
          const caption = `${String(index + 1).padStart(2, '0')} / ${feature.caption}`
          return (
            <article
              key={feature.id}
              className={
                large
                  ? `feature-card ${feature.layout === 'priorities' ? 'feature-priorities' : 'feature-workflows'}`
                  : 'feature-small'
              }
              data-reveal
            >
              {large ? (
                <>
                  <div className="feature-text">
                    <span className="feature-icon">
                      <Icon size={19} aria-hidden="true" />
                    </span>
                    <h3>
                      <Lines lines={feature.title} />
                    </h3>
                    <p>{feature.description}</p>
                  </div>
                  <FeatureArtwork layout={feature.layout} />
                  <div className="feature-caption">
                    <span>{caption}</span>
                    <ArrowUpRight size={15} aria-hidden="true" />
                  </div>
                </>
              ) : (
                <>
                  <FeatureArtwork layout={feature.layout} />
                  <h3>
                    <Lines lines={feature.title} />
                  </h3>
                  <p>{feature.description}</p>
                  <span className="small-feature-label">{caption}</span>
                </>
              )}
            </article>
          )
        })}
      </div>
      <p className="integration-note">
        <Zap size={12} aria-hidden="true" />
        {features.disclaimer}
      </p>
    </section>
  )
}

export function Workflow() {
  const workflow = content.workflow
  const icons = { link: Link2, branch: GitBranch, sparkles: Sparkles }
  return (
    <section id="how-it-works" className="workflow-section section">
      <div className="container">
        <div data-reveal>
          <SectionIntro
            center
            label={workflow.label}
            title={<Lines lines={workflow.title} muted />}
            description={workflow.description}
          />
        </div>
        <div
          className="steps-grid"
          style={{ '--workflow-count': Math.min(workflow.steps.length, 3) } as CSSProperties}
        >
          {workflow.steps.map((step, index) => {
            const Icon = icons[step.icon]
            return (
              <article key={step.id} data-reveal>
                <div className="step-visual">
                  <span className="step-number">{String(index + 1).padStart(2, '0')}</span>
                  <div className="step-symbol">
                    <Icon size={26} strokeWidth={1.3} aria-hidden="true" />
                  </div>
                  <ArrowRight size={18} className="step-arrow" aria-hidden="true" />
                </div>
                <span className="eyebrow">{step.subtitle}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export function Benefits() {
  const benefits = content.benefits
  return (
    <section
      id="benefits"
      className="container benefits-section"
      style={{ '--benefit-count': Math.min(benefits.items.length, 3) } as CSSProperties}
      aria-labelledby="benefits-heading"
      data-reveal
    >
      <div>
        <div className="eyebrow">{benefits.label}</div>
        <h2 id="benefits-heading">
          <Lines lines={benefits.title} />
        </h2>
        <p>{benefits.description}</p>
      </div>
      {benefits.items.map((item, index) => (
        <div className="benefit-stat" key={`${index}-${item.description}`}>
          <strong>
            {item.value}
            {item.suffix && <span>{item.suffix}</span>}
          </strong>
          <p>{item.description}</p>
        </div>
      ))}
      <small>{benefits.disclaimer}</small>
    </section>
  )
}
