import { FaHome, FaUserMd, FaUserInjured, FaChartBar, FaCog } from "react-icons/fa"
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
      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive ? "bg-accent text-blue-600 border-2 border-blue-100" : "text-muted-foreground hover:bg-muted hover:text-foreground"
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
    </aside>
  )
}
