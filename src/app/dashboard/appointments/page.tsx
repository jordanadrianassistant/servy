"use client";

import { useState, useEffect } from "react";

interface Appointment {
  id: string;
  customerName: string;
  customerPhone: string;
  startTime: string;
  endTime: string;
  status: string;
  notes: string | null;
  service: { name: string } | null;
}

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [dateFilter, setDateFilter] = useState(
    new Date().toISOString().split("T")[0]
  );

  const fetchAppointments = async () => {
    setLoading(true);
    const res = await fetch(`/api/appointments?date=${dateFilter}`);
    const data = await res.json();
    setAppointments(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchAppointments();
  }, [dateFilter]);

  const updateStatus = async (id: string, status: string) => {
    await fetch("/api/appointments", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    fetchAppointments();
  };

  const statusColors: Record<string, string> = {
    confirmed: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
    completed: "bg-blue-100 text-blue-700",
    "no-show": "bg-slate-100 text-slate-500",
  };

  const statusLabels: Record<string, string> = {
    confirmed: "Confirmada",
    cancelled: "Cancelada",
    completed: "Completada",
    "no-show": "No asistió",
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">📅 Citas</h1>
          <p className="text-slate-500 mt-1">
            Administra las citas de tus pacientes
          </p>
        </div>
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#25D366]"
        />
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <p className="text-slate-400">Cargando...</p>
        </div>
      ) : appointments.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <p className="text-4xl mb-4">📅</p>
          <p className="text-slate-900 font-medium">
            No hay citas para esta fecha
          </p>
          <p className="text-slate-500 text-sm mt-1">
            Las citas agendadas por WhatsApp aparecerán aquí automáticamente.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {appointments.map((apt) => (
            <div
              key={apt.id}
              className="bg-white rounded-xl border border-slate-200 p-5 flex items-center gap-6"
            >
              <div className="text-center min-w-[60px]">
                <p className="text-lg font-bold text-slate-900">
                  {new Date(apt.startTime).toLocaleTimeString("es", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
                <p className="text-xs text-slate-400">
                  {new Date(apt.endTime).toLocaleTimeString("es", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>

              <div className="flex-1">
                <p className="text-sm font-medium text-slate-900">
                  {apt.customerName}
                </p>
                <p className="text-xs text-slate-500">
                  {apt.customerPhone} ·{" "}
                  {apt.service?.name || "Sin servicio asignado"}
                </p>
                {apt.notes && (
                  <p className="text-xs text-slate-400 mt-1">{apt.notes}</p>
                )}
              </div>

              <span
                className={`text-xs px-2 py-1 rounded-full font-medium ${
                  statusColors[apt.status] || "bg-slate-100 text-slate-500"
                }`}
              >
                {statusLabels[apt.status] || apt.status}
              </span>

              <div className="flex gap-1">
                {apt.status === "confirmed" && (
                  <>
                    <button
                      onClick={() => updateStatus(apt.id, "completed")}
                      className="text-xs text-blue-600 hover:text-blue-800 px-2 py-1"
                    >
                      Completar
                    </button>
                    <button
                      onClick={() => updateStatus(apt.id, "no-show")}
                      className="text-xs text-slate-500 hover:text-slate-700 px-2 py-1"
                    >
                      No asistió
                    </button>
                    <button
                      onClick={() => updateStatus(apt.id, "cancelled")}
                      className="text-xs text-red-500 hover:text-red-700 px-2 py-1"
                    >
                      Cancelar
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
