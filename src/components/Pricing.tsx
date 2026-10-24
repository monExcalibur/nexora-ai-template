import { useState } from 'react'
import type { CSSProperties } from 'react'
import { Check, Sparkles } from 'lucide-react'
import { SectionIntro, Lines, ExploreButton } from './UI'
import { content, site } from '../config'
import {
  billingText,
  currencySymbol,
  priceAmount,
  priceNumber,
  savingsPercent,
} from '../config/pricing'

export default function Pricing({
  onSelect,
}: {
  onSelect: (plan: string, billing: string) => void
}) {
  const [yearly, setYearly] = useState(false)
  const pricing = content.pricing
  const saving = savingsPercent(pricing.plans)
  return (
    <section id="pricing" className="container section pricing-section">
      <div data-reveal>
        <SectionIntro
          center
          label={pricing.label}
          title={<Lines lines={pricing.title} muted />}
          description={pricing.description}
        />
      </div>
      <div className="billing-switch" role="group" aria-label={pricing.periodLabel}>
        <button aria-pressed={!yearly} onClick={() => setYearly(false)}>
          {pricing.monthlyLabel}
        </button>
        <button aria-pressed={yearly} onClick={() => setYearly(true)}>
          {pricing.yearlyLabel}{' '}
          {saving > 0 && <span>{pricing.savingsLabel.replace('{percent}', String(saving))}</span>}
        </button>
      </div>
      <p className="sr-only" role="status">
        {yearly ? pricing.yearlyAnnouncement : pricing.monthlyAnnouncement}{' '}
        {pricing.plans
          .map(
            (plan) =>
              `${plan.name}: ${priceAmount(yearly ? plan.yearly : plan.monthly, pricing)} ${pricing.period}; ${billingText(plan, yearly, pricing)}.`,
          )
          .join(' ')}
      </p>
      <div
        className="pricing-grid"
        data-multiple-rows={pricing.plans.length > 3 ? 'true' : undefined}
        style={{ '--plan-count': Math.min(pricing.plans.length, 3) } as CSSProperties}
      >
        {pricing.plans.map((plan) => (
          <article
            key={plan.id}
            className={`pricing-card ${plan.recommended ? 'recommended' : ''}`}
          >
            {plan.recommended && (
              <div className="recommended-label">
                <Sparkles size={12} aria-hidden="true" /> {pricing.recommendedLabel}
              </div>
            )}
            <h3>{plan.name}</h3>
            <p className="plan-description">{plan.description}</p>
            <div className="price">
              <span className="currency">{currencySymbol(pricing)}</span>
              <strong>{priceNumber(yearly ? plan.yearly : plan.monthly, pricing)}</strong>
              <span>{pricing.period}</span>
            </div>
            <p className="billing-note">{billingText(plan, yearly, pricing)}</p>
            <ExploreButton
              action={plan.action}
              secondary={!plan.recommended}
              onClick={() => onSelect(plan.name, billingText(plan, yearly, pricing, true))}
            />
            <div className="plan-divider" />
            <span className="included-label">{pricing.includedLabel}</span>
            <ul>
              {plan.features.map((feature) => (
                <li key={feature}>
                  <Check size={14} aria-hidden="true" />
                  {feature}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <p className="pricing-disclaimer">
        {site.demoMode ? pricing.disclaimer : pricing.clientDisclaimer}
      </p>
    </section>
  )
}
