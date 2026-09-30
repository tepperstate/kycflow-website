"use client";

import { useState, useEffect, useCallback } from "react";

/* ─── Config ─── */
const SUPABASE_URL = "https://kpuezdrzzsfhwyjbriop.supabase.co";
const SUPABASE_ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtwdWV6ZHJ6enNmaHd5amJyaW9wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA2NjEyNTIsImV4cCI6MjEwNjIzNzI1Mn0.A4hLURWK6ATZPKdqKsUHooMLvN5T5hdDgW9mtIeFXqA";
const ADMIN_PASSWORD = "kycadmin2025";

type Tab = "proofs" | "notifications" | "referrals" | "promo" | "devices";

/* ─── Supabase helper ─── */
async function sbFetch(path: string, opts?: RequestInit) {
  const res = await fetch(`${SUPABASE_URL}${path}`, {
    ...opts,
    headers: {
      "apikey": SUPABASE_ANON,
      "Authorization": `Bearer ${SUPABASE_ANON}`,
      "Content-Type": "application/json",
      "Prefer": "return=representation",
      ...(opts?.headers ?? {}),
    },
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`${res.status}: ${err}`);
  }
  return res.json();
}

/* ─── Components ─── */
function Badge({ children, color }: { children: React.ReactNode; color: "cyan" | "emerald" | "red" | "yellow" | "purple" }) {
  const map = {
    cyan: "bg-[rgba(0,245,255,0.15)] text-[#00F5FF] border-[rgba(0,245,255,0.3)]",
    emerald: "bg-[rgba(16,185,129,0.15)] text-[#10B981] border-[rgba(16,185,129,0.3)]",
    red: "bg-[rgba(239,68,68,0.15)] text-[#F87171] border-[rgba(239,68,68,0.3)]",
    yellow: "bg-[rgba(234,179,8,0.15)] text-[#FDE047] border-[rgba(234,179,8,0.3)]",
    purple: "bg-[rgba(124,58,237,0.15)] text-[#A78BFA] border-[rgba(124,58,237,0.3)]",
  };
  return (
    <span className={`inline-block text-[10px] font-bold uppercase px-[7px] py-[2px] rounded-[5px] border ${map[color]}`}>
      {children}
    </span>
  );
}

function StatCard({ label, value, color }: { label: string; value: number | string; color: string }) {
  return (
    <div className="bg-[rgba(9,6,24,0.7)] border border-[rgba(124,58,237,0.2)] rounded-[14px] p-4 text-center">
      <div className="text-[28px] font-extrabold" style={{ color }}>{value}</div>
      <div className="text-[11px] text-[#64748B] uppercase tracking-[0.5px] mt-1">{label}</div>
    </div>
  );
}

/* ─── Login Screen ─── */
function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pw === ADMIN_PASSWORD) { onLogin(); }
    else { setErr(true); setTimeout(() => setErr(false), 2000); }
  };

  return (
    <div className="flex items-center justify-center bg-[#070514]"
      style={{
        backgroundImage: "radial-gradient(circle at 20% 20%, rgba(0,245,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(124,58,237,0.14) 0%, transparent 50%)",
        position: "fixed", inset: 0, zIndex: 50,
      }}>
      <div className="w-[340px] bg-[rgba(14,10,32,0.9)] border border-[rgba(124,58,237,0.25)] rounded-[22px] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.7)]">
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#00F5FF] via-[#7C3AED] to-[#00F5FF] rounded-t-[22px]" style={{ position: "relative" }} />
        <div className="text-center mb-7">
          <div className="w-12 h-12 mx-auto mb-4 rounded-[14px] bg-gradient-to-br from-[#00F5FF] to-[#7C3AED] flex items-center justify-center shadow-[0_0_20px_rgba(0,245,255,0.25)]">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          </div>
          <h1 className="text-[20px] font-extrabold text-white">KYC Flow Admin</h1>
          <p className="text-[12px] text-[#64748B] mt-1">Dashboard access</p>
        </div>
        <form onSubmit={submit} className="flex flex-col gap-3">
          <input
            type="password"
            placeholder="Admin password"
            value={pw}
            onChange={e => setPw(e.target.value)}
            className={`w-full bg-[rgba(9,6,24,0.8)] border ${err ? "border-[#F87171]" : "border-[rgba(124,58,237,0.3)]"} rounded-[12px] px-4 py-3 text-white text-[13px] outline-none focus:border-[#00F5FF] transition-colors placeholder:text-[#475569]`}
          />
          {err && <p className="text-[#F87171] text-[11px] text-center">Incorrect password</p>}
          <button type="submit"
            className="w-full bg-gradient-to-br from-[#00F5FF] to-[#7C3AED] text-white font-bold py-3 rounded-[12px] text-[14px] transition-all hover:-translate-y-[1px] shadow-[0_8px_20px_rgba(0,245,255,0.2)]">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

/* ─── Dashboard ─── */
export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [tab, setTab] = useState<Tab>("proofs");
  const [data, setData] = useState<Record<string, unknown[]>>({});
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({ proofs: 0, devices: 0, referrals: 0, promo: 0 });
  const [toast, setToast] = useState<string | null>(null);

  // Notification form
  const [notifTitle, setNotifTitle] = useState("");
  const [notifBody, setNotifBody] = useState("");
  const [notifDevice, setNotifDevice] = useState("");
  // Promo form
  const [promoCode, setPromoCode] = useState("");
  const [promoDiscount, setPromoDiscount] = useState("10");
  const [promoMaxUses, setPromoMaxUses] = useState("100");

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

  const loadTab = useCallback(async (t: Tab) => {
    setLoading(true);
    try {
      const endpointMap: Record<Tab, string> = {
        proofs: "/rest/v1/payment_proofs?order=created_at.desc&limit=50",
        notifications: "/rest/v1/notifications?order=created_at.desc&limit=50",
        referrals: "/rest/v1/referrals?order=total_earnings.desc&limit=50",
        promo: "/rest/v1/promo_codes?order=id.desc",
        devices: "/rest/v1/device_activations?order=last_seen.desc&limit=50",
      };
      const result = await sbFetch(endpointMap[t]);
      setData(prev => ({ ...prev, [t]: result }));
    } catch (e) {
      showToast(`Error: ${(e as Error).message}`);
    }
    setLoading(false);
  }, []);

  const loadStats = useCallback(async () => {
    try {
      const [proofs, devices, referrals, promo] = await Promise.all([
        sbFetch("/rest/v1/payment_proofs?select=id"),
        sbFetch("/rest/v1/device_activations?select=id"),
        sbFetch("/rest/v1/referrals?select=id"),
        sbFetch("/rest/v1/promo_codes?select=id"),
      ]);
      setStats({ proofs: proofs.length, devices: devices.length, referrals: referrals.length, promo: promo.length });
    } catch {}
  }, []);

  useEffect(() => {
    if (authed) { loadStats(); loadTab(tab); }
  }, [authed, loadStats, loadTab, tab]);

  const updateProofStatus = async (id: number, status: string) => {
    try {
      await sbFetch(`/rest/v1/payment_proofs?id=eq.${id}`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
      showToast(`Proof #${id} marked as ${status}`);
      loadTab("proofs");
    } catch (e) { showToast(`Error: ${(e as Error).message}`); }
  };

  const sendNotification = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await sbFetch("/rest/v1/notifications", {
        method: "POST",
        body: JSON.stringify({
          title: notifTitle,
          body: notifBody,
          device_id: notifDevice || null,
          type: "info",
        }),
      });
      showToast("Notification sent!");
      setNotifTitle(""); setNotifBody(""); setNotifDevice("");
      loadTab("notifications");
    } catch (e) { showToast(`Error: ${(e as Error).message}`); }
  };

  const createPromo = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await sbFetch("/rest/v1/promo_codes", {
        method: "POST",
        body: JSON.stringify({
          code: promoCode.toUpperCase(),
          discount_pct: parseFloat(promoDiscount),
          max_uses: parseInt(promoMaxUses),
          active: true,
        }),
      });
      showToast(`Promo code ${promoCode.toUpperCase()} created!`);
      setPromoCode(""); setPromoDiscount("10"); setPromoMaxUses("100");
      loadTab("promo");
    } catch (e) { showToast(`Error: ${(e as Error).message}`); }
  };

  const togglePromo = async (id: number, active: boolean) => {
    await sbFetch(`/rest/v1/promo_codes?id=eq.${id}`, {
      method: "PATCH",
      body: JSON.stringify({ active: !active }),
    });
    showToast(`Promo ${active ? "disabled" : "enabled"}`);
    loadTab("promo");
  };

  if (!authed) return <LoginScreen onLogin={() => setAuthed(true)} />;

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: "proofs", label: "Payment Proofs", icon: "💳" },
    { id: "notifications", label: "Notifications", icon: "🔔" },
    { id: "referrals", label: "Referrals", icon: "🔗" },
    { id: "promo", label: "Promo Codes", icon: "🎟️" },
    { id: "devices", label: "Devices", icon: "📱" },
  ];

  const rows = (data[tab] ?? []) as Record<string, unknown>[];

  return (
    <div className="min-h-screen bg-[#070514] text-white"
      style={{
        backgroundImage: "radial-gradient(circle at 10% 10%, rgba(0,245,255,0.06) 0%, transparent 50%), radial-gradient(circle at 90% 90%, rgba(124,58,237,0.08) 0%, transparent 50%)",
        position: "fixed", inset: 0, overflowY: "auto", zIndex: 50,
        maxWidth: "100vw", width: "100vw",
      }}>

      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-[rgba(14,10,32,0.95)] border border-[rgba(0,245,255,0.4)] text-[#00F5FF] text-[12px] font-semibold px-4 py-3 rounded-[12px] shadow-[0_8px_24px_rgba(0,0,0,0.5)] animate-[fadeInDown_0.2s_ease]">
          {toast}
        </div>
      )}

      {/* Header */}
      <div className="border-b border-[rgba(124,58,237,0.2)] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-[10px] bg-gradient-to-br from-[#00F5FF] to-[#7C3AED] flex items-center justify-center shadow-[0_0_14px_rgba(0,245,255,0.25)]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          </div>
          <div>
            <h1 className="text-[15px] font-extrabold leading-none">KYC Flow Admin</h1>
            <p className="text-[10px] text-[#475569] mt-[2px]">kpuezdrzzsfhwyjbriop.supabase.co</p>
          </div>
        </div>
        <button onClick={() => setAuthed(false)} className="text-[11px] text-[#64748B] hover:text-[#F87171] transition-colors">
          Sign out
        </button>
      </div>

      <div className="max-w-[1100px] mx-auto px-4 py-6">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          <StatCard label="Payment Proofs" value={stats.proofs} color="#00F5FF" />
          <StatCard label="Active Devices" value={stats.devices} color="#7C3AED" />
          <StatCard label="Referrals" value={stats.referrals} color="#10B981" />
          <StatCard label="Promo Codes" value={stats.promo} color="#FDE047" />
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`shrink-0 flex items-center gap-2 px-4 py-2 rounded-[10px] text-[12px] font-semibold transition-all ${
                tab === t.id
                  ? "bg-gradient-to-br from-[#00F5FF] to-[#7C3AED] text-white shadow-[0_4px_14px_rgba(0,245,255,0.2)]"
                  : "bg-[rgba(9,6,24,0.7)] border border-[rgba(124,58,237,0.2)] text-[#94A3B8] hover:border-[rgba(0,245,255,0.3)]"
              }`}>
              {t.icon} {t.label}
            </button>
          ))}
          <button onClick={() => loadTab(tab)}
            className="shrink-0 ml-auto px-3 py-2 rounded-[10px] text-[11px] text-[#64748B] border border-[rgba(124,58,237,0.15)] hover:border-[rgba(0,245,255,0.3)] transition-all">
            ↻ Refresh
          </button>
        </div>

        {/* Send Notification panel */}
        {tab === "notifications" && (
          <form onSubmit={sendNotification} className="bg-[rgba(9,6,24,0.7)] border border-[rgba(124,58,237,0.2)] rounded-[14px] p-5 mb-4 flex gap-3 flex-wrap items-end">
            <div className="flex flex-col gap-1 flex-1 min-w-[160px]">
              <label className="text-[10px] text-[#64748B] uppercase tracking-[0.5px]">Title</label>
              <input value={notifTitle} onChange={e => setNotifTitle(e.target.value)} required placeholder="Notification title"
                className="bg-[rgba(14,10,32,0.9)] border border-[rgba(124,58,237,0.25)] rounded-[9px] px-3 py-2 text-[12px] text-white outline-none focus:border-[#00F5FF] placeholder:text-[#475569]" />
            </div>
            <div className="flex flex-col gap-1 flex-[2] min-w-[200px]">
              <label className="text-[10px] text-[#64748B] uppercase tracking-[0.5px]">Message</label>
              <input value={notifBody} onChange={e => setNotifBody(e.target.value)} required placeholder="Notification body"
                className="bg-[rgba(14,10,32,0.9)] border border-[rgba(124,58,237,0.25)] rounded-[9px] px-3 py-2 text-[12px] text-white outline-none focus:border-[#00F5FF] placeholder:text-[#475569]" />
            </div>
            <div className="flex flex-col gap-1 min-w-[140px]">
              <label className="text-[10px] text-[#64748B] uppercase tracking-[0.5px]">Device ID (blank = broadcast)</label>
              <input value={notifDevice} onChange={e => setNotifDevice(e.target.value)} placeholder="All devices"
                className="bg-[rgba(14,10,32,0.9)] border border-[rgba(124,58,237,0.25)] rounded-[9px] px-3 py-2 text-[12px] text-white outline-none focus:border-[#00F5FF] placeholder:text-[#475569]" />
            </div>
            <button type="submit" className="shrink-0 bg-gradient-to-br from-[#00F5FF] to-[#7C3AED] text-white font-bold text-[12px] px-5 py-2 rounded-[9px] shadow-[0_4px_14px_rgba(0,245,255,0.2)] hover:-translate-y-[1px] transition-all">
              Send
            </button>
          </form>
        )}

        {/* Create Promo panel */}
        {tab === "promo" && (
          <form onSubmit={createPromo} className="bg-[rgba(9,6,24,0.7)] border border-[rgba(124,58,237,0.2)] rounded-[14px] p-5 mb-4 flex gap-3 flex-wrap items-end">
            <div className="flex flex-col gap-1 min-w-[120px]">
              <label className="text-[10px] text-[#64748B] uppercase tracking-[0.5px]">Code</label>
              <input value={promoCode} onChange={e => setPromoCode(e.target.value)} required placeholder="SUMMER25"
                className="bg-[rgba(14,10,32,0.9)] border border-[rgba(124,58,237,0.25)] rounded-[9px] px-3 py-2 text-[12px] text-white outline-none focus:border-[#00F5FF] placeholder:text-[#475569] uppercase" />
            </div>
            <div className="flex flex-col gap-1 min-w-[100px]">
              <label className="text-[10px] text-[#64748B] uppercase tracking-[0.5px]">Discount %</label>
              <input type="number" min="1" max="100" value={promoDiscount} onChange={e => setPromoDiscount(e.target.value)}
                className="bg-[rgba(14,10,32,0.9)] border border-[rgba(124,58,237,0.25)] rounded-[9px] px-3 py-2 text-[12px] text-white outline-none focus:border-[#00F5FF]" />
            </div>
            <div className="flex flex-col gap-1 min-w-[100px]">
              <label className="text-[10px] text-[#64748B] uppercase tracking-[0.5px]">Max Uses</label>
              <input type="number" min="1" value={promoMaxUses} onChange={e => setPromoMaxUses(e.target.value)}
                className="bg-[rgba(14,10,32,0.9)] border border-[rgba(124,58,237,0.25)] rounded-[9px] px-3 py-2 text-[12px] text-white outline-none focus:border-[#00F5FF]" />
            </div>
            <button type="submit" className="shrink-0 bg-gradient-to-br from-[#00F5FF] to-[#7C3AED] text-white font-bold text-[12px] px-5 py-2 rounded-[9px] shadow-[0_4px_14px_rgba(0,245,255,0.2)] hover:-translate-y-[1px] transition-all">
              Create Promo
            </button>
          </form>
        )}

        {/* Table */}
        <div className="bg-[rgba(9,6,24,0.7)] border border-[rgba(124,58,237,0.2)] rounded-[16px] overflow-hidden">
          {loading ? (
            <div className="py-16 text-center text-[#475569] text-[13px]">Loading…</div>
          ) : rows.length === 0 ? (
            <div className="py-16 text-center text-[#475569] text-[13px]">No records found</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-[12px]">
                <thead>
                  <tr className="border-b border-[rgba(124,58,237,0.2)]">
                    {Object.keys(rows[0]).map(k => (
                      <th key={k} className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-[0.5px] text-[#64748B] whitespace-nowrap">
                        {k.replace(/_/g, " ")}
                      </th>
                    ))}
                    {tab === "proofs" && <th className="px-4 py-3 text-[10px] text-[#64748B] uppercase">Actions</th>}
                    {tab === "promo" && <th className="px-4 py-3 text-[10px] text-[#64748B] uppercase">Toggle</th>}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, i) => (
                    <tr key={i} className="border-b border-[rgba(255,255,255,0.04)] hover:bg-[rgba(124,58,237,0.06)] transition-colors">
                      {Object.entries(row).map(([k, v]) => (
                        <td key={k} className="px-4 py-3 text-[#94A3B8] whitespace-nowrap max-w-[200px] overflow-hidden text-ellipsis">
                          {k === "status" ? (
                            <Badge color={v === "pending" ? "yellow" : v === "approved" ? "emerald" : v === "active" ? "cyan" : "red"}>
                              {String(v)}
                            </Badge>
                          ) : k === "is_read" ? (
                            <Badge color={v ? "emerald" : "yellow"}>{v ? "read" : "unread"}</Badge>
                          ) : k === "active" ? (
                            <Badge color={v ? "emerald" : "red"}>{v ? "active" : "disabled"}</Badge>
                          ) : k.endsWith("_at") && v ? (
                            new Date(String(v)).toLocaleString()
                          ) : (
                            String(v ?? "—").slice(0, 60)
                          )}
                        </td>
                      ))}
                      {tab === "proofs" && (
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="flex gap-2">
                            <button onClick={() => updateProofStatus(row.id as number, "approved")}
                              className="text-[10px] font-bold text-[#10B981] border border-[rgba(16,185,129,0.3)] px-2 py-1 rounded-[6px] hover:bg-[rgba(16,185,129,0.1)] transition-colors">
                              Approve
                            </button>
                            <button onClick={() => updateProofStatus(row.id as number, "rejected")}
                              className="text-[10px] font-bold text-[#F87171] border border-[rgba(239,68,68,0.3)] px-2 py-1 rounded-[6px] hover:bg-[rgba(239,68,68,0.1)] transition-colors">
                              Reject
                            </button>
                          </div>
                        </td>
                      )}
                      {tab === "promo" && (
                        <td className="px-4 py-3">
                          <button onClick={() => togglePromo(row.id as number, row.active as boolean)}
                            className={`text-[10px] font-bold px-2 py-1 rounded-[6px] border transition-colors ${
                              row.active
                                ? "text-[#F87171] border-[rgba(239,68,68,0.3)] hover:bg-[rgba(239,68,68,0.1)]"
                                : "text-[#10B981] border-[rgba(16,185,129,0.3)] hover:bg-[rgba(16,185,129,0.1)]"
                            }`}>
                            {row.active ? "Disable" : "Enable"}
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <p className="text-[10px] text-[#334155] text-center mt-4">
          KYC Flow Admin Panel · Project: kpuezdrzzsfhwyjbriop · {rows.length} records
        </p>
      </div>
    </div>
  );
}
