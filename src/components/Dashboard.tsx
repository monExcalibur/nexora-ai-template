import { useState } from 'react'
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  Bell,
  CalendarDays,
  Check,
  ChevronDown,
  CircleCheck,
  Command,
  Folder,
  House,
  LayoutGrid,
  MoreHorizontal,
  Search,
  Settings2,
  Sparkles,
  Users,
  Zap,
} from 'lucide-react'
import { Brand } from './UI'
import { content } from '../config'
import ActionControl from './ActionControl'

const dashboard = content.dashboard
const tasks = dashboard.tasks

export default function Dashboard({ onExplore }: { onExplore: () => void }) {
  const [done, setDone] = useState<string[]>(
    tasks.filter((task) => task.completed).map((task) => task.id),
  )
  return (
    <figure className="dashboard-wrap" id="product" aria-label={dashboard.accessibleName}>
      <div className="dashboard-frame">
        <aside className="dashboard-sidebar" aria-label={dashboard.sidebarLabel}>
          <Brand compact />
          <div className="workspace-name">
            <span className="workspace-icon">{dashboard.workspaceInitial}</span>
            {dashboard.workspaceName}
            <ChevronDown size={11} aria-hidden="true" />
          </div>
          <div className="sidebar-label">{dashboard.workspaceLabel}</div>
          <div className="sidebar-item active">
            <House size={14} aria-hidden="true" />
            {dashboard.sidebar.overview}
          </div>
          <div className="sidebar-item">
            <CircleCheck size={14} aria-hidden="true" />
            {dashboard.sidebar.tasks}
            <span className="sidebar-count">{tasks.length}</span>
          </div>
          <div className="sidebar-item">
            <Folder size={14} aria-hidden="true" />
            {dashboard.sidebar.projects}
          </div>
          <div className="sidebar-item">
            <CalendarDays size={14} aria-hidden="true" />
            {dashboard.sidebar.calendar}
          </div>
          <div className="sidebar-item">
            <Zap size={14} aria-hidden="true" />
            {dashboard.sidebar.automations}
            <span className="tiny-dot" />
          </div>
          <div className="sidebar-item">
            <Users size={14} aria-hidden="true" />
            {dashboard.sidebar.team}
          </div>
          <div className="sidebar-bottom">
            <span className="avatar">{dashboard.user.initials}</span>
            <div>
              {dashboard.user.name}
              <small>{dashboard.user.role}</small>
            </div>
            <Settings2 size={13} aria-hidden="true" />
          </div>
        </aside>
        <div className="dashboard-main">
          <div className="dashboard-top">
            <span>
              <LayoutGrid size={13} aria-hidden="true" />
              <span className="muted">{dashboard.breadcrumb}</span>
              <span className="slash">/</span>
              {dashboard.sidebar.overview}
            </span>
            <div className="dashboard-tools">
              <Search size={14} aria-hidden="true" />
              <span className="command">
                <Command size={10} aria-hidden="true" /> K
              </span>
              <Bell size={14} aria-hidden="true" />
              <span className="avatar small">{dashboard.user.initials}</span>
            </div>
          </div>
          <div className="dashboard-content">
            <div className="dashboard-greeting">
              <div>
                <span className="dashboard-date">{dashboard.date}</span>
                <h2>{dashboard.headline}</h2>
                <p>{dashboard.description}</p>
              </div>
              <span className="live-label">
                <span />
                {dashboard.dataLabel}
              </span>
            </div>
            <div className="metric-grid">
              <div className="metric">
                <span>
                  {dashboard.completed.label} <CircleCheck size={13} aria-hidden="true" />
                </span>
                <strong>
                  {dashboard.completed.baseline + done.length}
                  <small>/ {dashboard.completed.total}</small>
                </strong>
                <div className="metric-foot">
                  <span className="green">
                    <ArrowUpRight size={11} aria-hidden="true" /> {dashboard.completed.note}
                  </span>
                  <div className="metric-bars">
                    {dashboard.completed.bars.map((n, i) => (
                      <i key={i} style={{ height: `${n}%` }} />
                    ))}
                  </div>
                </div>
              </div>
              <div className="metric">
                <span>
                  {dashboard.focus.label} <Activity size={13} aria-hidden="true" />
                </span>
                <strong>
                  {dashboard.focus.value}
                  <small>/ {dashboard.focus.total}</small>
                </strong>
                <div className="metric-foot">
                  <span className="green">{dashboard.focus.note}</span>
                  <svg viewBox="0 0 90 30" className="sparkline" aria-hidden="true">
                    <path d={dashboard.focus.sparkline} />
                  </svg>
                </div>
              </div>
              <div className="metric">
                <span>
                  {dashboard.reclaimed.label} <Zap size={13} aria-hidden="true" />
                </span>
                <strong>
                  {dashboard.reclaimed.value}
                  <small>{dashboard.reclaimed.unit}</small>
                </strong>
                <div className="metric-foot">
                  <span>{dashboard.reclaimed.note}</span>
                  <span className="mini-orb">
                    <Zap size={13} aria-hidden="true" />
                  </span>
                </div>
              </div>
            </div>
            <div className="dashboard-lower">
              <section className="task-panel" aria-labelledby="task-title">
                <div className="panel-heading">
                  <h3 id="task-title">{dashboard.taskTitle}</h3>
                  <span className="ai-badge">
                    <Sparkles size={10} aria-hidden="true" /> {dashboard.organizedLabel}
                  </span>
                </div>
                <div className="task-table-labels">
                  <span>{dashboard.taskColumn}</span>
                  <span>{dashboard.priorityColumn}</span>
                </div>
                {tasks.map((task) => (
                  <label
                    className={`task-row ${done.includes(task.id) ? 'task-complete' : ''}`}
                    key={task.id}
                  >
                    <input
                      type="checkbox"
                      aria-label={task.name}
                      checked={done.includes(task.id)}
                      onChange={() =>
                        setDone((prev) =>
                          prev.includes(task.id)
                            ? prev.filter((item) => item !== task.id)
                            : [...prev, task.id],
                        )
                      }
                    />
                    <span className="task-check" aria-hidden="true">
                      {done.includes(task.id) && <Check size={11} />}
                    </span>
                    <span className="task-copy">
                      <span>{task.name}</span>
                      <small>{task.project}</small>
                    </span>
                    <span className={`priority priority-${task.priority.toLowerCase()}`}>
                      {task.priority === 'auto' && <Zap size={9} aria-hidden="true" />}
                      {dashboard.priorities[task.priority]}
                    </span>
                    <span className="avatar small">{task.avatar}</span>
                  </label>
                ))}
                <div className="task-panel-foot">
                  {dashboard.taskFooter}
                  <MoreHorizontal size={15} aria-hidden="true" />
                </div>
              </section>
              <section className="productivity-panel" aria-labelledby="productivity-title">
                <div className="panel-heading">
                  <h3 id="productivity-title">{dashboard.momentum.title}</h3>
                  <span className="muted">{dashboard.momentum.period}</span>
                </div>
                <div className="chart-total">
                  <strong>
                    {dashboard.momentum.bars.reduce((total, bar) => total + bar.hours, 0)}
                    <span>{dashboard.momentum.unit}</span>
                  </strong>
                  <span className="green">{dashboard.momentum.change}</span>
                </div>
                <div
                  className="bar-chart"
                  role="img"
                  aria-label={`${dashboard.momentum.chartLabel}: ${dashboard.momentum.bars.map((bar) => `${bar.name} ${bar.hours}`).join(', ')} ${dashboard.momentum.fullUnit}`}
                >
                  {dashboard.momentum.bars.map((bar, i) => (
                    <div key={i}>
                      <div
                        className={`bar ${i === dashboard.momentum.highlightedIndex ? 'bar-highlight' : ''}`}
                        style={{ height: `${bar.height}%` }}
                      />
                      <span>{bar.label}</span>
                    </div>
                  ))}
                </div>
                <div className="chart-key">
                  <i />
                  {dashboard.momentum.key}
                  <span>{dashboard.momentum.note}</span>
                </div>
              </section>
            </div>
            <div className="dashboard-bottom">
              <div className="automation-prompt">
                <span className="ai-icon">
                  <Sparkles size={16} aria-hidden="true" />
                </span>
                <div>
                  <strong>{dashboard.automation.title}</strong>
                  <p>{dashboard.automation.description}</p>
                </div>
                <ActionControl
                  action={dashboard.automation.action}
                  className="automation-action"
                  iconOnly
                  onDemo={onExplore}
                  icon={<ArrowRight size={17} aria-hidden="true" />}
                />
              </div>
              <div className="activity-feed">
                <span className="avatar small">{dashboard.activity.initials}</span>
                <p>
                  <strong>{dashboard.activity.name}</strong> {dashboard.activity.action}
                  <small>{dashboard.activity.time}</small>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <figcaption>
        <span className="tiny-dot" /> {dashboard.caption}
      </figcaption>
    </figure>
  )
}
