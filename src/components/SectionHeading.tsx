export function SectionHeading({ eyebrow, title, children, action }: {
  eyebrow: string; title: string; children?: React.ReactNode; action?: React.ReactNode
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">{eyebrow}</p>
        <h2 className="mt-2 text-3xl font-bold tracking-[-0.03em] sm:text-4xl">{title}</h2>
        {children && <p className="mt-3 text-muted">{children}</p>}
      </div>
      {action}
    </div>
  )
}
