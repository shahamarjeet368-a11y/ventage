"use client";

import { useState, useEffect } from "react";
import { 
  Calendar, CheckCircle, Clock, XCircle, Plus, Trash2, Edit3, 
  Sparkles, RefreshCw, Filter, Phone, Mail, User, Shield, Lock, 
  Eye, EyeOff, LogOut, AlertCircle, KeyRound 
} from "lucide-react";
import { fetchAppointments, updateAppointmentStatus, fetchServices, fetchGallery, loginAdmin, verifyAdminSession, logoutAdmin, createService } from "@/lib/api";
import { AppointmentItem, ServiceItem, GalleryItem } from "@/lib/mock-data";

export default function AdminDashboardPage() {
  // Authentication State
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string>("");
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);

  // Dashboard State
  const [activeTab, setActiveTab] = useState<"appointments" | "services" | "gallery">("appointments");
  const [appointments, setAppointments] = useState<AppointmentItem[]>([]);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // New Service Form State
  const [newServiceName, setNewServiceName] = useState("");
  const [newServiceCategory, setNewServiceCategory] = useState("Hair");
  const [newServicePrice, setNewServicePrice] = useState("");
  const [newServiceDuration, setNewServiceDuration] = useState("60 mins");
  const [newServiceDesc, setNewServiceDesc] = useState("");
  const [isAddingService, setIsAddingService] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const authStatus = await verifyAdminSession();
      if (cancelled) return;
      setIsAuth(authStatus);
      if (authStatus) {
        loadDashboardData();
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [statusFilter]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setIsLoggingIn(true);

    try {
      const res = await loginAdmin(username, password);
      if (res.success) {
        setIsAuth(true);
        loadDashboardData();
      } else {
        setLoginError(res.message || "Invalid Admin ID or Password.");
      }
    } catch (err) {
      setLoginError("An unexpected authentication error occurred.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    logoutAdmin();
    setIsAuth(false);
    setUsername("");
    setPassword("");
  };

  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      const apptsData = await fetchAppointments(statusFilter);
      const srvData = await fetchServices();
      const galData = await fetchGallery();
      setAppointments(apptsData);
      setServices(srvData);
      setGallery(galData);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (aptId: string, newStatus: string) => {
    await updateAppointmentStatus(aptId, newStatus);
    loadDashboardData();
  };

  // If user is NOT authenticated, render the Luxury Admin Login Gate
  if (!isAuth) {
    return (
      <div className="pt-28 pb-24 bg-vintage-ivory min-h-screen flex items-center justify-center px-6">
        <div className="w-full max-w-md bg-white border border-vintage-espresso/20 p-8 sm:p-10 shadow-2xl relative">
          
          {/* Brand Header */}
          <div className="text-center space-y-3 mb-8">
            <div className="w-12 h-12 bg-vintage-espresso text-vintage-champagne rounded-full flex items-center justify-center mx-auto border border-vintage-champagne/40">
              <Lock className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.25em] text-vintage-rose">
              Management Authentication
            </span>
            <h1 className="font-serif text-3xl font-normal text-vintage-espresso">
              Vintage Admin Portal
            </h1>
            <p className="font-sans text-xs text-vintage-muted font-light">
              Enter owner credentials to access the appointments & service manager.
            </p>
          </div>

          {/* Login Error Notification */}
          {loginError && (
            <div className="mb-6 p-3.5 bg-rose-50 border border-rose-200 text-rose-800 text-xs font-sans font-medium flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-5 text-left font-sans">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-vintage-espresso mb-1.5 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-vintage-champagne" /> Admin ID / Username
              </label>
              <input
                type="text"
                required
                placeholder="e.g. admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3.5 border border-vintage-espresso/20 bg-vintage-ivory/40 text-vintage-espresso text-sm focus:outline-none focus:border-vintage-rose font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-vintage-espresso mb-1.5 flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5 text-vintage-champagne" /> Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3.5 border border-vintage-espresso/20 bg-vintage-ivory/40 text-vintage-espresso text-sm focus:outline-none focus:border-vintage-rose font-medium pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-vintage-muted hover:text-vintage-espresso"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-4 bg-vintage-espresso text-vintage-ivory text-xs font-sans font-semibold tracking-[0.2em] uppercase border border-vintage-espresso hover:bg-vintage-rose hover:text-vintage-espresso hover:border-vintage-rose transition-all duration-300 shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoggingIn ? "Authenticating..." : "Authenticate & Enter Portal"}
            </button>
          </form>

        </div>
      </div>
    );
  }

  // KPI calculations
  const pendingCount = appointments.filter(a => a.status === "pending").length;
  const confirmedCount = appointments.filter(a => a.status === "confirmed").length;
  const completedCount = appointments.filter(a => a.status === "completed").length;

  return (
    <div className="pt-28 pb-24 bg-vintage-ivory min-h-screen">
      {/* Dashboard Top Header */}
      <div className="bg-vintage-espresso text-vintage-ivory py-12 px-6 md:px-12 border-b border-vintage-champagne/20 mb-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-sans uppercase tracking-[0.25em] text-vintage-champagne mb-1">
              <Shield className="w-4 h-4" /> Authenticated Owner Session
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-normal text-vintage-ivory">
              Vintage Admin Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadDashboardData}
              className="px-4 py-2.5 bg-vintage-ivory/10 border border-vintage-ivory/20 text-vintage-ivory text-xs font-sans font-medium uppercase tracking-wider hover:bg-vintage-rose hover:text-vintage-espresso hover:border-vintage-rose transition-colors flex items-center gap-2"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
              Refresh Data
            </button>

            <button
              onClick={handleLogout}
              className="px-4 py-2.5 bg-rose-900/80 border border-rose-700 text-rose-100 text-xs font-sans font-medium uppercase tracking-wider hover:bg-rose-700 transition-colors flex items-center gap-2"
            >
              <LogOut className="w-3.5 h-3.5" />
              Logout Session
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* KPI Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <div className="bg-white border border-vintage-espresso/10 p-5 shadow-sm">
            <span className="text-[10px] font-sans font-semibold tracking-widest text-vintage-muted uppercase block mb-1">
              Total Appointments
            </span>
            <span className="font-serif text-3xl font-semibold text-vintage-espresso">
              {appointments.length}
            </span>
          </div>

          <div className="bg-amber-50/70 border border-amber-200 p-5 shadow-sm">
            <span className="text-[10px] font-sans font-semibold tracking-widest text-amber-700 uppercase block mb-1">
              Pending Requests
            </span>
            <span className="font-serif text-3xl font-semibold text-amber-800">
              {pendingCount}
            </span>
          </div>

          <div className="bg-emerald-50/70 border border-emerald-200 p-5 shadow-sm">
            <span className="text-[10px] font-sans font-semibold tracking-widest text-emerald-700 uppercase block mb-1">
              Confirmed
            </span>
            <span className="font-serif text-3xl font-semibold text-emerald-800">
              {confirmedCount}
            </span>
          </div>

          <div className="bg-blue-50/70 border border-blue-200 p-5 shadow-sm">
            <span className="text-[10px] font-sans font-semibold tracking-widest text-blue-700 uppercase block mb-1">
              Completed
            </span>
            <span className="font-serif text-3xl font-semibold text-blue-800">
              {completedCount}
            </span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-vintage-espresso/15 mb-8">
          {[
            { id: "appointments", label: "Appointments Manager" },
            { id: "services", label: "Services CRUD Catalog" },
            { id: "gallery", label: "Gallery Portfolio" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-3 font-sans text-xs font-semibold tracking-widest uppercase border-b-2 transition-all ${
                activeTab === tab.id
                  ? "border-vintage-rose text-vintage-rose bg-white/40"
                  : "border-transparent text-vintage-muted hover:text-vintage-espresso"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: Appointments Management */}
        {activeTab === "appointments" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 border border-vintage-espresso/10">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-vintage-champagne" />
                <span className="text-xs font-sans font-medium uppercase tracking-wider text-vintage-espresso">
                  Filter Status:
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {["all", "pending", "confirmed", "completed", "cancelled"].map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-3 py-1.5 text-[11px] font-sans font-medium uppercase tracking-wider border transition-all ${
                      statusFilter === st
                        ? "bg-vintage-espresso text-vintage-ivory border-vintage-espresso"
                        : "bg-vintage-ivory/50 text-vintage-muted border-vintage-espresso/10 hover:border-vintage-rose"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Appointments Table */}
            <div className="bg-white border border-vintage-espresso/15 shadow-sm overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-vintage-espresso text-vintage-ivory text-[11px] font-sans font-semibold tracking-wider uppercase border-b border-vintage-espresso">
                    <th className="p-4">Customer Details</th>
                    <th className="p-4">Service</th>
                    <th className="p-4">Date & Time</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-vintage-espresso/10 text-xs font-sans">
                  {appointments.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-vintage-muted">
                        No appointments found matching current filter.
                      </td>
                    </tr>
                  ) : (
                    appointments.map((apt) => (
                      <tr key={apt.id} className="hover:bg-vintage-ivory/40 transition-colors">
                        <td className="p-4">
                          <strong className="font-serif text-sm font-semibold text-vintage-espresso block">
                            {apt.customer_name}
                          </strong>
                          <span className="text-vintage-muted font-light block flex items-center gap-1 mt-0.5">
                            <Phone className="w-3 h-3 text-vintage-champagne" /> {apt.customer_phone}
                          </span>
                          {apt.customer_email && (
                            <span className="text-[10px] text-vintage-muted block">
                              {apt.customer_email}
                            </span>
                          )}
                        </td>

                        <td className="p-4 font-serif font-medium text-vintage-espresso">
                          {apt.service_name}
                        </td>

                        <td className="p-4 font-sans text-vintage-espresso">
                          <span className="block font-medium">{apt.appointment_date}</span>
                          <span className="text-[11px] text-vintage-muted">{apt.appointment_time}</span>
                        </td>

                        <td className="p-4">
                          <span
                            className={`px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider border rounded-none inline-block ${
                              apt.status === "pending"
                                ? "bg-amber-50 text-amber-800 border-amber-300"
                                : apt.status === "confirmed"
                                ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                                : apt.status === "completed"
                                ? "bg-blue-50 text-blue-800 border-blue-300"
                                : "bg-rose-50 text-rose-800 border-rose-300"
                            }`}
                          >
                            {apt.status}
                          </span>
                        </td>

                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {apt.status !== "confirmed" && (
                              <button
                                onClick={() => handleStatusChange(apt.id, "confirmed")}
                                className="px-2.5 py-1 bg-emerald-700 text-white text-[10px] font-semibold uppercase tracking-wider hover:bg-emerald-800"
                              >
                                Confirm
                              </button>
                            )}

                            {apt.status !== "completed" && (
                              <button
                                onClick={() => handleStatusChange(apt.id, "completed")}
                                className="px-2.5 py-1 bg-blue-700 text-white text-[10px] font-semibold uppercase tracking-wider hover:bg-blue-800"
                              >
                                Complete
                              </button>
                            )}

                            {apt.status !== "cancelled" && (
                              <button
                                onClick={() => handleStatusChange(apt.id, "cancelled")}
                                className="px-2.5 py-1 bg-rose-700 text-white text-[10px] font-semibold uppercase tracking-wider hover:bg-rose-800"
                              >
                                Cancel
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: Services CRUD Catalog */}
        {activeTab === "services" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-4">
              <h3 className="font-serif text-2xl text-vintage-espresso">
                Current Services ({services.length})
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {services.map((srv) => (
                  <div key={srv.id} className="bg-white border border-vintage-espresso/15 p-5 space-y-3">
                    <div className="flex items-start justify-between">
                      <span className="font-serif text-lg font-medium text-vintage-espresso">
                        {srv.name}
                      </span>
                      <span className="text-[10px] uppercase font-sans font-semibold px-2 py-0.5 bg-vintage-ivory border border-vintage-espresso/10">
                        {srv.category}
                      </span>
                    </div>

                    <p className="text-xs font-sans text-vintage-muted font-light line-clamp-2">
                      {srv.description}
                    </p>

                    <div className="flex items-center justify-between pt-2 border-t border-vintage-espresso/10 text-xs">
                      <span className="font-serif font-semibold text-vintage-espresso">{srv.price}</span>
                      <span className="text-vintage-muted">{srv.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Add Form */}
            <div className="lg:col-span-4 bg-white border border-vintage-espresso/15 p-6 space-y-4">
              <h3 className="font-serif text-xl font-medium text-vintage-espresso">
                Add New Service
              </h3>
              
              <div className="space-y-3 text-xs font-sans">
                <div>
                  <label className="block uppercase font-medium text-vintage-muted mb-1">
                    Service Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Silk Press & Shine Spa"
                    value={newServiceName}
                    onChange={(e) => setNewServiceName(e.target.value)}
                    className="w-full p-3 border border-vintage-espresso/20 text-vintage-espresso"
                  />
                </div>

                <div>
                  <label className="block uppercase font-medium text-vintage-muted mb-1">
                    Category
                  </label>
                  <select
                    value={newServiceCategory}
                    onChange={(e) => setNewServiceCategory(e.target.value)}
                    className="w-full p-3 border border-vintage-espresso/20 text-vintage-espresso"
                  >
                    <option value="Hair">Hair</option>
                    <option value="Makeup">Makeup</option>
                    <option value="Nails">Nails</option>
                    <option value="Treatments">Treatments</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block uppercase font-medium text-vintage-muted mb-1">
                      Price
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. ₹2,500"
                      value={newServicePrice}
                      onChange={(e) => setNewServicePrice(e.target.value)}
                      className="w-full p-3 border border-vintage-espresso/20 text-vintage-espresso"
                    />
                  </div>

                  <div>
                    <label className="block uppercase font-medium text-vintage-muted mb-1">
                      Duration
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 60 mins"
                      value={newServiceDuration}
                      onChange={(e) => setNewServiceDuration(e.target.value)}
                      className="w-full p-3 border border-vintage-espresso/20 text-vintage-espresso"
                    />
                  </div>
                </div>

                <div>
                  <label className="block uppercase font-medium text-vintage-muted mb-1">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Short description of the treatment..."
                    value={newServiceDesc}
                    onChange={(e) => setNewServiceDesc(e.target.value)}
                    className="w-full p-3 border border-vintage-espresso/20 text-vintage-espresso"
                  />
                </div>

                <button
                  disabled={isAddingService}
                  onClick={async () => {
                    if (!newServiceName || !newServicePrice) return;
                    setIsAddingService(true);
                    try {
                      const res = await createService({
                        name: newServiceName,
                        category: newServiceCategory,
                        description: newServiceDesc || "Luxury treatment at Vintage Salon.",
                        price: newServicePrice,
                        duration: newServiceDuration,
                      });
                      if (res.success) {
                        setNewServiceName("");
                        setNewServicePrice("");
                        setNewServiceDesc("");
                        await loadDashboardData();
                      }
                    } finally {
                      setIsAddingService(false);
                    }
                  }}
                  className="w-full py-3 bg-vintage-espresso text-vintage-ivory text-xs font-sans font-semibold tracking-widest uppercase hover:bg-vintage-rose hover:text-vintage-espresso transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Plus className="w-4 h-4" /> {isAddingService ? "Saving..." : "Add Service to Catalog"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Gallery Management */}
        {activeTab === "gallery" && (
          <div className="space-y-6">
            <h3 className="font-serif text-2xl text-vintage-espresso">
              Gallery Portfolio Assets ({gallery.length})
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {gallery.map((item) => (
                <div key={item.id} className="bg-white border border-vintage-espresso/15 p-4 space-y-3">
                  <div className="relative w-full h-44 bg-vintage-softIvory">
                    <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <span className="text-[10px] font-sans font-semibold uppercase text-vintage-rose block">
                      {item.category}
                    </span>
                    <h4 className="font-serif text-base font-medium text-vintage-espresso">
                      {item.title}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
