import { FaHome, FaUserMd, FaUserInjured, FaChartBar, FaCog, FaStethoscope } from "react-icons/fa"
import { NavLink } from "react-router"

export default function AdminSidebar() {
  const navItems = [
    { icon: FaHome, label: "Dashboard", path: "/admin/dashboard" },
    { icon: FaUserMd, label: "Doctors", path: "/admin/doctors" },
    { icon: FaUserInjured, label: "Patients", path: "/admin/patients" },
    { icon: FaChartBar, label: "Analytics", path: "/admin/analytics" },
    { icon: FaCog, label: "Settings", path: "/admin/settings" },
  ]

  return (
    <aside className="w-64 bg-card border-r border-border min-h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-2">
          <FaStethoscope className="w-8 h-8 text-accent" />
          <div>
            <div className="font-semibold text-foreground">MediConnect Pro</div>
            <div className="text-xs text-muted-foreground">Admin Panel</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive ? "bg-accent text-white" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`
                }
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <div className="text-xs text-muted-foreground text-center">© 2025 MediConnect Pro</div>
      </div>
    </aside>
  )
}
