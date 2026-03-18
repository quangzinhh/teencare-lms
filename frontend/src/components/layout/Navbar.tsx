type NavbarProps = {
  title: string
  subtitle?: string
}

export const Navbar = ({ title, subtitle }: NavbarProps) => (
  <header className="navbar">
    <div className="navbar__brand">
      <div>
        <div className="navbar__title">{title}</div>
        {subtitle && <div className="navbar__subtitle">{subtitle}</div>}
      </div>
    </div>
    <div className="navbar__user">Admin</div>
  </header>
)
