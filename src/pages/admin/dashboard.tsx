import { FaUserMd, FaUserInjured, FaCheckCircle, FaClock } from "react-icons/fa"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { getDashboardCounts, getPendingDoctors, getTopDoctors, updateDoctorStatus } from "../../store/API/adminApi"

export default function AdminDashboard() {
  const dispatch = useAppDispatch()
  const stats = useAppSelector((s) => s.admin.stats)
  const pending = useAppSelector((s) => s.admin.pendingDoctors)
  const topDoctors = useAppSelector((s) => s.admin.approvedDoctors)

  useEffect(() => {
    dispatch(getDashboardCounts())
    dispatch(getPendingDoctors())
    dispatch(getTopDoctors(5))
  }, [dispatch])

  const handleApprove = (id: number) => {
    dispatch(updateDoctorStatus({ doctorId: id, status: "approved" }))
  }

  const handleReject = (id: number) => {
    dispatch(updateDoctorStatus({ doctorId: id, status: "rejected" }))
  }

  return (
    <div className="flex min-h-screen bg-background">
      <div className="flex-1 flex flex-col">
        <div className="flex-1 px-8 py-8 overflow-auto">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage doctors, patients, and platform overview</p>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <FaUserMd className="w-6 h-6 text-accent" />
                </div>
              </div>
              <div className="text-3xl font-bold text-foreground mb-1">{stats.totalDoctors}</div>
              <div className="text-sm text-muted-foreground">Total Doctors</div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                  <FaUserInjured className="w-6 h-6 text-success" />
                </div>
              </div>
              <div className="text-3xl font-bold text-foreground mb-1">{stats.totalPatients}</div>
              <div className="text-sm text-muted-foreground">Total Patients</div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                  <FaClock className="w-6 h-6 text-warning" />
                </div>
              </div>
              <div className="text-3xl font-bold text-foreground mb-1">{stats.pendingApprovals}</div>
              <div className="text-sm text-muted-foreground">Pending Approvals</div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                  <FaCheckCircle className="w-6 h-6 text-success" />
                </div>
              </div>
              <div className="text-3xl font-bold text-foreground mb-1">{stats.totalAppointments}</div>
              <div className="text-sm text-muted-foreground">Total Appointments</div>
            </div>
          </div>

          {/* Pending Doctor Approvals */}
          <div className="bg-card border border-border rounded-xl p-6 mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">Pending Doctor Approvals</h2>
            <div className="space-y-4">
              {pending && pending.length ? (
                pending.map((d: any) => (
                  <div key={d.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                        <FaUserMd className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <div className="font-medium text-foreground">{d.full_name}</div>
                        <div className="text-sm text-muted-foreground">{d.specialization} • BMDC: {d.bmdc_number}</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => handleApprove(d.id)} className="px-4 py-2 bg-success text-white rounded-lg hover:bg-success/90 transition-colors text-sm">
                        Approve
                      </button>
                      <button onClick={() => handleReject(d.id)} className="px-4 py-2 bg-destructive text-white rounded-lg hover:bg-destructive/90 transition-colors text-sm">
                        Reject
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-sm text-muted-foreground">No pending doctors.</div>
              )}
            </div>
          </div>

          {/* Top Doctors (analytics snippet) */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">Top Doctors (by completed appointments)</h2>
            <div className="space-y-2">
              {topDoctors && topDoctors.length ? (
                topDoctors.map((row: any, i: number) => {
                  const doc = row.doctor || row[0] || row; // support different shapes
                  const completed = row.completed ?? row[1] ?? 0
                  return (
                    <div key={i} className="flex items-center justify-between p-3 border border-border rounded-lg">
                      <div>
                        <div className="font-medium text-foreground">{doc.full_name || doc.name}</div>
                        <div className="text-sm text-muted-foreground">{doc.specialization || ''}</div>
                      </div>
                      <div className="text-sm text-muted-foreground">{completed} completed</div>
                    </div>
                  )
                })
              ) : (
                <div className="text-sm text-muted-foreground">No data.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
