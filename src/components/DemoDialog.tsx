import { useEffect, useRef, useState } from 'react'
import {
  ArrowRight,
  Check,
  CircleCheck,
  FileCheck2,
  MessageSquare,
  RotateCcw,
  Sparkles,
  X,
} from 'lucide-react'

import { content } from '../config'

const demo = content.demo

export type DemoSelection = { plan: string; billing?: string }

export default function DemoDialog({
  selection,
  onClose,
}: {
  selection: DemoSelection
  onClose: () => void
}) {
  const dialog = useRef<HTMLDialogElement>(null)
  const [ran, setRan] = useState(false)
  useEffect(() => {
    const node = dialog.current
    const previousFocus = document.activeElement
    const previousOverflow = document.body.style.overflow
    node?.showModal()
    document.body.style.overflow = 'hidden'
    return () => {
      node?.close()
      document.body.style.overflow = previousOverflow
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) previousFocus.focus()
    }
  }, [])
  return (
    <dialog
      ref={dialog}
      className="demo-dialog"
      aria-labelledby="demo-title"
      aria-describedby="demo-description"
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
      onKeyDown={(event) => {
        if (event.key !== 'Tab') return
        const buttons =
          event.currentTarget.querySelectorAll<HTMLButtonElement>('button:not([disabled])')
        const first = buttons.item(0)
        const last = buttons.item(buttons.length - 1)
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last?.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first?.focus()
        }
      }}
    >
      <div className="dialog-inner">
        <div className="dialog-top">
          <span className="ai-badge">
            <Sparkles size={12} aria-hidden="true" />
            {demo.badge}
          </span>
          <button className="icon-button" aria-label={demo.closeLabel} onClick={onClose}>
            <X size={20} aria-hidden="true" />
          </button>
        </div>
        <span className="dialog-symbol">
          <Sparkles size={27} strokeWidth={1.4} aria-hidden="true" />
        </span>
        <h2 id="demo-title">{demo.title}</h2>
        <p id="demo-description">{demo.description}</p>
        <div className="demo-selection">
          <span>
            {selection.plan === demo.tourName
              ? demo.tourSelection
              : demo.planSelection.replace('{plan}', selection.plan)}
          </span>
          <strong>{selection.billing || demo.workspace}</strong>
        </div>
        <ol className="demo-flow">
          {demo.steps.map((step, index) => {
            const Icon = [FileCheck2, Sparkles, MessageSquare][index % 3]
            return (
              <li key={`${index}-${step.title}`}>
                <span className="demo-step-icon">
                  <Icon size={18} aria-hidden="true" />
                </span>
                <div>
                  <strong>{step.title}</strong>
                  <p>{step.description}</p>
                </div>
                {(ran || index === 0) && (
                  <Check size={16} className={ran ? 'green' : 'muted'} aria-hidden="true" />
                )}
              </li>
            )
          })}
        </ol>
        <div className="demo-result" role="status">
          {ran ? (
            <>
              <span className="green flex items-center gap-2">
                <CircleCheck size={15} aria-hidden="true" />
                {demo.resultTitle}
              </span>
              <p>{demo.result}</p>
              <small>{demo.resultNote}</small>
            </>
          ) : (
            <p>{demo.initialNote}</p>
          )}
        </div>
        <button className="button button-primary w-full" onClick={() => setRan(!ran)}>
          {ran ? (
            <>
              <RotateCcw size={15} aria-hidden="true" />
              {demo.resetLabel}
            </>
          ) : (
            <>
              {demo.runLabel}
              <ArrowRight size={15} aria-hidden="true" />
            </>
          )}
        </button>
        <p className="demo-note">{demo.disclaimer}</p>
      </div>
    </dialog>
  )
}
