"use client";

import { useState, useEffect } from "react";

interface Service {
  id: string;
  name: string;
  description: string | null;
  duration: number;
  price: number | null;
  active: boolean;
}

interface Business {
  currency: string;
}

const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: "$",
  CRC: "₡",
  MXN: "$",
  COP: "$",
  GTQ: "Q",
  HNL: "L",
};

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [business, setBusiness] = useState<Business | null>(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    duration: "30",
    price: "",
  });

  const fetchData = async () => {
    const [servicesRes, businessRes] = await Promise.all([
      fetch("/api/services"),
      fetch("/api/business"),
    ]);
    setServices(await servicesRes.json());
    setBusiness(await businessRes.json());
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const currency = business?.currency || "USD";
  const currencySymbol = CURRENCY_SYMBOLS[currency] || "$";

  const resetForm = () => {
    setForm({ name: "", description: "", duration: "30", price: "" });
    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingId) {
      await fetch("/api/services", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editingId, ...form }),
      });
    } else {
      await fetch("/api/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    }

    resetForm();
    fetchData();
  };

  const handleEdit = (service: Service) => {
    setForm({
      name: service.name,
      description: service.description || "",
      duration: String(service.duration),
      price: service.price ? String(service.price) : "",
    });
    setEditingId(service.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Estás seguro de eliminar este servicio?")) return;
    await fetch("/api/services", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchData();
  };

  const toggleActive = async (service: Service) => {
    await fetch("/api/services", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: service.id, active: !service.active }),
    });
    fetchData();
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
          <h1 className="text-2xl font-bold text-slate-900">🏥 Servicios</h1>
          <p className="text-slate-500 mt-1">
            Configura los servicios que ofreces · Moneda: <strong>{currency}</strong>
          </p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          className="bg-[#25D366] text-white font-semibold px-4 py-2 rounded-lg hover:bg-[#20bd5a] transition text-sm"
        >
          + Nuevo Servicio
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            {editingId ? "Editar Servicio" : "Nuevo Servicio"}
          </h3>
          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Nombre *
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#25D366] text-slate-900"
                placeholder="Consulta General"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Descripción
              </label>
              <input
                type="text"
                value={form.description}
                onChange={(e) =>
                  setForm((f) => ({ ...f, description: e.target.value }))
                }
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#25D366] text-slate-900"
                placeholder="Revisión general con diagnóstico"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Duración (minutos) *
              </label>
              <input
                type="number"
                value={form.duration}
                onChange={(e) =>
                  setForm((f) => ({ ...f, duration: e.target.value }))
                }
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#25D366] text-slate-900"
                placeholder="30"
                min="5"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Precio en {currency} (opcional)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                  {currencySymbol}
                </span>
                <input
                  type="number"
                  value={form.price}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, price: e.target.value }))
                  }
                  className="w-full pl-8 pr-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#25D366] text-slate-900"
                  placeholder="50.00"
                  step="0.01"
                />
              </div>
            </div>
            <div className="md:col-span-2 flex gap-2">
              <button
                type="submit"
                className="bg-[#25D366] text-white font-semibold px-6 py-2 rounded-lg hover:bg-[#20bd5a] transition text-sm"
              >
                {editingId ? "Guardar Cambios" : "Crear Servicio"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="border border-slate-300 text-slate-600 px-6 py-2 rounded-lg hover:bg-slate-50 transition text-sm"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Services List */}
      {services.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <p className="text-4xl mb-4">🏥</p>
          <p className="text-slate-900 font-medium">Aún no tienes servicios</p>
          <p className="text-slate-500 text-sm mt-1">
            Agrega los servicios que ofreces para que tus pacientes puedan
            agendar citas.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left text-xs font-medium text-slate-500 px-6 py-3">
                  Servicio
                </th>
                <th className="text-left text-xs font-medium text-slate-500 px-6 py-3">
                  Duración
                </th>
                <th className="text-left text-xs font-medium text-slate-500 px-6 py-3">
                  Precio ({currency})
                </th>
                <th className="text-left text-xs font-medium text-slate-500 px-6 py-3">
                  Estado
                </th>
                <th className="text-right text-xs font-medium text-slate-500 px-6 py-3">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {services.map((service) => (
                <tr key={service.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-slate-900">
                      {service.name}
                    </p>
                    {service.description && (
                      <p className="text-xs text-slate-500">
                        {service.description}
                      </p>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {service.duration} min
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {service.price
                      ? `${currencySymbol}${service.price.toLocaleString()}`
                      : "—"}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => toggleActive(service)}
                      className={`text-xs px-2 py-1 rounded-full font-medium ${
                        service.active
                          ? "bg-green-100 text-green-700"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {service.active ? "Activo" : "Inactivo"}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      onClick={() => handleEdit(service)}
                      className="text-xs text-slate-500 hover:text-slate-900"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(service.id)}
                      className="text-xs text-red-500 hover:text-red-700"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
