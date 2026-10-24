import { ArrowUpRight, Plus } from 'lucide-react'
import { SectionIntro, Lines } from './UI'
import { content, site } from '../config'
import ActionControl from './ActionControl'

export default function FAQ({ onExplore }: { onExplore: () => void }) {
  const faq = content.faq
  return (
    <section id="faq" className="container section faq-section">
      <div data-reveal>
        <SectionIntro
          label={faq.label}
          title={<Lines lines={faq.title} muted />}
          description={faq.description}
        />
        <ActionControl
          action={faq.action}
          className="text-link"
          onDemo={onExplore}
          icon={<ArrowUpRight size={15} aria-hidden="true" />}
        />
      </div>
      <div className="faq-list">
        {(site.demoMode ? faq.items : faq.clientItems).map(({ question, answer }, index) => (
          <details key={question} name="template-faq">
            <summary>
              <span className="faq-index">{String(index + 1).padStart(2, '0')}</span>
              <span>{question}</span>
              <Plus size={17} className="faq-plus" aria-hidden="true" />
            </summary>
            <div className="faq-answer">
              <p>{answer}</p>
            </div>
          </details>
        ))}
      </div>
    </section>
  )
}
