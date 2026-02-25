"use client";

import { useState, useEffect } from "react";

const DAYS = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
];

interface AvailabilityDay {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  active: boolean;
}

export default function AvailabilityPage() {
  const [schedule, setSchedule] = useState<AvailabilityDay[]>(
    Array.from({ length: 7 }, (_, i) => ({
      dayOfWeek: i,
      startTime: "09:00",
      endTime: "17:00",
      active: i >= 1 && i <= 5, // Mon-Fri active by default
    }))
  );
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/availability")
      .then((r) => r.json())
      .then((data: AvailabilityDay[]) => {
        if (data.length > 0) {
          setSchedule((prev) =>
            prev.map((day) => {
              const existing = data.find(
                (d: AvailabilityDay) => d.dayOfWeek === day.dayOfWeek
              );
              return existing
                ? { ...day, ...existing }
                : day;
            })
          );
        }
        setLoading(false);
      });
  }, []);

  const updateDay = (
    dayOfWeek: number,
    field: keyof AvailabilityDay,
    value: string | boolean
  ) => {
    setSchedule((prev) =>
      prev.map((d) =>
        d.dayOfWeek === dayOfWeek ? { ...d, [field]: value } : d
      )
    );
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    await fetch("/api/availability", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ schedule }),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-slate-400">Cargando...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">🕐 Horario</h1>
          <p className="text-slate-500 mt-1">
            Define tus días y horas de atención
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-[#25D366] text-white font-semibold px-6 py-2 rounded-lg hover:bg-[#20bd5a] transition text-sm disabled:opacity-50"
        >
          {saving ? "Guardando..." : saved ? "✓ Guardado" : "Guardar Cambios"}
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="divide-y divide-slate-100">
          {schedule.map((day) => (
            <div
              key={day.dayOfWeek}
              className={`flex items-center gap-6 px-6 py-4 ${
                !day.active ? "opacity-50" : ""
              }`}
            >
              <div className="w-32">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={day.active}
                    onChange={(e) =>
                      updateDay(day.dayOfWeek, "active", e.target.checked)
                    }
                    className="w-4 h-4 rounded border-slate-300 text-[#25D366] focus:ring-[#25D366]"
                  />
                  <span className="text-sm font-medium text-slate-900">
                    {DAYS[day.dayOfWeek]}
                  </span>
                </label>
              </div>

              {day.active ? (
                <div className="flex items-center gap-3">
                  <input
                    type="time"
                    value={day.startTime}
                    onChange={(e) =>
                      updateDay(day.dayOfWeek, "startTime", e.target.value)
                    }
                    className="px-3 py-1.5 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#25D366]"
                  />
                  <span className="text-slate-400">a</span>
                  <input
                    type="time"
                    value={day.endTime}
                    onChange={(e) =>
                      updateDay(day.dayOfWeek, "endTime", e.target.value)
                    }
                    className="px-3 py-1.5 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#25D366]"
                  />
                </div>
              ) : (
                <span className="text-sm text-slate-400">Cerrado</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
