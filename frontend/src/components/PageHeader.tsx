type PageHeaderProps = {
  title: string
  subtitle?: string
}

export const PageHeader = ({ title, subtitle }: PageHeaderProps) => (
  <header className="card">
    <h1 className="section-title">{title}</h1>
    {subtitle && <p className="helper">{subtitle}</p>}
  </header>
)
