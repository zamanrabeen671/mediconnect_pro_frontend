import { useEffect, useMemo } from "react"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { getTopMedicines, getAppointmentsOverview, getPopularSpecializations } from "../../store/API/adminApi"

export default function AdminAnalytics() {
  const dispatch = useAppDispatch()
  const topMedicines = useAppSelector((s) => s.admin.topMedicineList)
  const appointmentOverview = useAppSelector((s) => s.admin.appointmentOverview)
  const popularSpecializations = useAppSelector((s) => s.admin.popularSpecializations)

  useEffect(() => {
    dispatch(getTopMedicines(10))
    dispatch(getAppointmentsOverview(7))
    dispatch(getPopularSpecializations(10))
  }, [dispatch])

  const maxAppointment = useMemo(() => {
    if (!appointmentOverview || !appointmentOverview.length) return 1
    return Math.max(...appointmentOverview.map((d) => d.count, 1))
  }, [appointmentOverview])

  const maxSpec = useMemo(() => {
    if (!popularSpecializations || !popularSpecializations.length) return 1
    return Math.max(...popularSpecializations.map((s) => s.count, 1))
  }, [popularSpecializations])

  return (
    <div className="flex min-h-screen bg-background">
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Analytics Dashboard</h1>
            <p className="text-muted-foreground">Monitor platform performance and metrics</p>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Appointments Chart */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Appointments Overview</h3>
              <div className="h-64 flex items-end justify-between gap-2">
                {appointmentOverview && appointmentOverview.length ? (
                  appointmentOverview.map((d) => (
                    <div key={d.date} className="flex-1 flex flex-col items-center gap-2">
                      <div
                        className="w-full bg-accent rounded-t-lg transition-all hover:bg-accent/80"
                        style={{ height: `${Math.round((d.count / Math.max(maxAppointment, 1)) * 100)}%` }}
                      />
                      <span className="text-xs text-muted-foreground">{new Date(d.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-muted-foreground">No appointment data.</div>
                )}
              </div>
            </div>

            {/* Specializations Distribution */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Popular Specializations</h3>
              <div className="space-y-4">
                {popularSpecializations && popularSpecializations.length ? (
                  popularSpecializations.map((spec: any, index: number) => (
                    <div key={index}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-foreground font-medium">{spec.specialization || 'Unknown'}</span>
                        <span className="text-muted-foreground">{spec.count} doctors</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-accent h-2 rounded-full transition-all"
                          style={{ width: `${Math.round((spec.count / Math.max(maxSpec, 1)) * 100)}%` }}
                        />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-muted-foreground">No specialization data.</div>
                )}
              </div>
            </div>
          </div>

          {/* Top Medicines */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Top Medicines</h3>
            <div className="space-y-3">
              {topMedicines && topMedicines.length ? (
                topMedicines.map((row: any, idx: number) => {
                  // backend returns { medicine: {...}, used }
                  const med = row.medicine ?? row[0] ?? row
                  const used = row.used ?? row[1] ?? 0
                  return (
                    <div key={idx} className="flex items-center justify-between p-3 border border-border rounded-lg">
                      <div>
                        <div className="font-medium text-foreground">{med.name}</div>
                        <div className="text-sm text-muted-foreground">{med.strength || ''} {med.form ? `• ${med.form}` : ''}</div>
                      </div>
                      <div className="text-sm text-muted-foreground">{used} uses</div>
                    </div>
                  )
                })
              ) : (
                <div className="text-sm text-muted-foreground">No data available.</div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
