import type { SiteContent } from './content.ts'
import type { PricingPlan } from './types.ts'

type Pricing = SiteContent['pricing']
export function priceNumber(value: number, pricing: Pricing): string {
  return new Intl.NumberFormat(pricing.locale, { maximumFractionDigits: 2 }).format(value)
}
export function priceAmount(value: number, pricing: Pricing): string {
  return new Intl.NumberFormat(pricing.locale, {
    style: 'currency',
    currency: pricing.currencyCode,
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  }).format(value)
}
export function currencySymbol(pricing: Pricing): string {
  return (
    new Intl.NumberFormat(pricing.locale, {
      style: 'currency',
      currency: pricing.currencyCode,
      currencyDisplay: 'narrowSymbol',
    })
      .formatToParts(0)
      .find((part) => part.type === 'currency')?.value || pricing.currencyCode
  )
}
export function billingText(
  plan: PricingPlan,
  yearly: boolean,
  pricing: Pricing,
  selection = false,
): string {
  const free = plan.monthly === 0 && plan.yearly === 0
  if (free) return selection ? pricing.freeSelection : pricing.freeNote
  const template = selection
    ? yearly
      ? pricing.yearlySelection
      : pricing.monthlySelection
    : yearly
      ? pricing.yearlyNote
      : pricing.monthlyNote
  return template.replace(
    '{amount}',
    priceAmount(yearly ? plan.yearly * 12 : plan.monthly, pricing),
  )
}
export function savingsPercent(plans: PricingPlan[]): number {
  return Math.max(
    0,
    ...plans
      .filter((plan) => plan.monthly > 0)
      .map((plan) => Math.round((1 - plan.yearly / plan.monthly) * 100)),
  )
}
