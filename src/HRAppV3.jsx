import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, PhoneCall, Handshake, Percent, TrendingUp, ChevronLeft, ChevronRight, Star, Crown, Info } from "lucide-react";

/*********************************
 * Springfield Properties Brand  *
 *********************************/
const brand = {
  primaryBlue: "#003366",    // Dark blue, prominent for text and primary elements
  secondaryBlue: "#004D99",  // Slightly lighter blue for accents/fills
  accentRed: "#E30613",      // Vibrant red for highlights and warnings
  textDark: "#1A202C",       // Very dark text for readability
  textMuted: "#718096",      // Muted grey for secondary text
  bgLight: "#F8FAFC",        // Light background for the overall app
  cardBg: "#FFFFFF",         // White background for cards
  borderLight: "#E2E8F0",    // Light grey for borders
  success: "#38A169",        // Green for positive indicators
};

/*****************
 * Demo Data     *
 *****************/
const seed = [
  { id: 1, name: "Ahmed Khan", agentType: "Off-plan Specialist", photo: "https://i.pravatar.cc/200?img=12", revenue: 8400000, deals: 21, calls: 312, conv: 39 },
  { id: 2, name: "Fatima Ali", agentType: "Secondary Market Expert", photo: "https://i.pravatar.cc/200?img=45", revenue: 7300000, deals: 19, calls: 281, conv: 36 },
  { id: 3, name: "Omar Nasser", agentType: "Leasing Agent", photo: "https://i.pravatar.cc/200?img=17", revenue: 6200000, deals: 17, calls: 244, conv: 33 },
  { id: 4, name: "Zara Yusuf", agentType: "Commercial Property Advisor", photo: "https://i.pravatar.cc/200?img=67", revenue: 5200000, deals: 15, calls: 222, conv: 31 },
  { id: 5, name: "Bilal Khan", agentType: "Luxury Property Consultant", photo: "https://i.pravatar.cc/200?img=7", revenue: 4800000, deals: 13, calls: 210, conv: 28 },
  { id: 6, name: "Maryam Al Farsi", agentType: "Off-plan Specialist", photo: "https://i.pravatar.cc/200?img=56", revenue: 4050000, deals: 12, calls: 186, conv: 26 },
  { id: 7, name: "John Park", agentType: "Investment Advisor", photo: "https://i.pravatar.cc/200?img=1", revenue: 3500000, deals: 11, calls: 170, conv: 23 },
  { id: 8, name: "Priya Singh", agentType: "Secondary Market Expert", photo: "https://i.pravatar.cc/200?img=22", revenue: 3200000, deals: 10, calls: 165, conv: 22 },
  { id: 9, name: "Li Wei", agentType: "Leasing Agent", photo: "https://i.pravatar.cc/200?img=3", revenue: 2850000, deals: 9, calls: 150, conv: 20 },
  { id: 10, name: "Hassan Ali", agentType: "Commercial Property Advisor", photo: "https://i.pravatar.cc/200?img=33", revenue: 2500000, deals: 8, calls: 141, conv: 18 },
];

const slides = [
  { key: "revenue", title: "Top Revenue", icon: Trophy, unit: "AED", metric: (r) => r.revenue },
  { key: "deals", title: "Most Deals Closed", icon: Handshake, unit: "deals", metric: (r) => r.deals },
  { key: "calls", title: "Most Calls", icon: PhoneCall, unit: "calls", metric: (r) => r.calls },
  { key: "conv", title: "Best Conversion", icon: Percent, unit: "%", metric: (r) => r.conv },
];

/*****************
 * Small Bits    *
 *****************/
const Header = ({ subtitle }) => (
  <header className="sticky top-0 z-20 border-b" style={{ background: brand.cardBg, borderColor: brand.borderLight }}>
    <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        {/* Simple "SP" logo for brand identity */}
        <div className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg" style={{ background: brand.primaryBlue, color: brand.cardBg }}>SP</div>
        <div>
          <div className="text-xl font-bold" style={{ color: brand.textDark }}>Springfield Leaderboard</div>
          <div className="text-sm" style={{ color: brand.textMuted }}>{subtitle}</div>
        </div>
      </div>
      <div className="flex items-center gap-3 text-base font-medium" style={{ color: brand.secondaryBlue }}>
        <TrendingUp size={20} style={{ color: brand.accentRed }} /> Live Data • Auto-rotating
      </div>
    </div>
  </header>
);

const Avatar = ({ src, name, size = 48 }) => (
  <img src={src} alt={name} width={size} height={size} className="rounded-full object-cover border-2" style={{ borderColor: brand.secondaryBlue }} />
);

const Dot = ({ active }) => (
  <span className="inline-block w-3 h-3 rounded-full mx-1" style={{ background: active ? brand.accentRed : brand.borderLight }} />
);

/*****************
 * Main Screen   *
 *****************/
export default function SpringfieldTVLeaderboard() {
  const [tab, setTab] = useState(0);
  const [rows, setRows] = useState(seed);
  const [focus, setFocus] = useState(null); // agent quick view modal
  const cur = slides[tab];

  // auto rotate every 10s
  useEffect(() => {
    const t = setInterval(() => setTab((i) => (i + 1) % slides.length), 10000);
    return () => clearInterval(t);
  }, []);

  // light live feel - data updates every 5s
  useEffect(() => {
    const t = setInterval(() => {
      setRows((prev) => prev.map((r) => ({
        ...r,
        calls: r.calls + (Math.random() > 0.7 ? Math.floor(Math.random() * 3) : 0), // More realistic small increments
        deals: r.deals + (Math.random() > 0.9 ? 1 : 0), // Less frequent deal closes
        revenue: Math.round(r.revenue * (1 + (Math.random() - 0.5) * 0.005)), // More noticeable revenue fluctuation
      })));
    }, 5000);
    return () => clearInterval(t);
  }, []);

  const sorted = useMemo(() => [...rows].sort((a, b) => cur.metric(b) - cur.metric(a)).slice(0, 10), [rows, cur]);
  const top = sorted[0];

  return (
    <div className="min-h-screen font-sans" style={{ background: brand.bgLight }}>
      <Header subtitle={`${cur.title} • Live Updates`} />

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Slide header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <cur.icon size={30} style={{ color: brand.accentRed }} />
            <h2 className="text-4xl font-extrabold" style={{ color: brand.primaryBlue }}>{cur.title}</h2>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-3 rounded-xl border-2" style={{ borderColor: brand.borderLight, color: brand.primaryBlue }} onClick={() => setTab((t) => (t - 1 + slides.length) % slides.length)}><ChevronLeft size={24} /></button>
            {slides.map((s, i) => (<Dot key={s.key} active={i === tab} />))}
            <button className="p-3 rounded-xl border-2" style={{ borderColor: brand.borderLight, color: brand.primaryBlue }} onClick={() => setTab((t) => (t + 1) % slides.length)}><ChevronRight size={24} /></button>
          </div>
        </div>

        {/* Spotlight top agent */}
        {top && (
          <div className="relative overflow-hidden rounded-3xl border-2 shadow-lg" style={{ borderColor: brand.borderLight, background: brand.cardBg }}>
            <div className="absolute -right-16 -top-16 w-60 h-60 rounded-full" style={{ background: brand.accentRed, opacity: 0.08 }} />
            <div className="grid md:grid-cols-3 gap-0 items-center">
              <div className="p-8 flex items-center justify-center">
                <div className="relative">
                  <div className="absolute -inset-4 rounded-full" style={{ boxShadow: `0 0 0 10px ${brand.bgLight}` }} />
                  <Avatar src={top.photo} name={top.name} size={160} />
                  <div className="absolute -bottom-4 -right-4 w-14 h-14 rounded-full flex items-center justify-center" style={{ background: brand.accentRed, color: brand.cardBg }}>
                    <Crown size={28} />
                  </div>
                </div>
              </div>
              <div className="md:col-span-2 p-8">
                <div className="text-xl font-semibold" style={{ color: brand.textMuted }}>Agent of the Moment</div>
                <div className="text-5xl font-extrabold mt-2" style={{ color: brand.textDark }}>{top.name}</div>
                <div className="text-lg mt-1" style={{ color: brand.secondaryBlue }}>{top.agentType}</div>
                <div className="text-4xl font-bold mt-4" style={{ color: brand.primaryBlue }}>
                  {cur.unit === "AED" ? `AED ${cur.metric(top).toLocaleString()}` : `${cur.metric(top)} ${cur.unit}`}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* List */}
        <AnimatePresence mode="wait">
          <motion.div key={cur.key} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.4 }} className="grid md:grid-cols-2 gap-6">
            {sorted.map((r, i) => (
              <button key={r.id} onClick={() => setFocus(r)} className="text-left p-5 rounded-2xl border-2 bg-white hover:shadow-xl transition-all duration-300 ease-in-out" style={{ borderColor: i < 3 ? brand.accentRed : brand.borderLight }}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar src={r.photo} name={r.name} size={60} />
                    <div>
                      <div className="text-xl font-bold" style={{ color: brand.textDark }}>{i + 1}. {r.name}</div>
                      <div className="text-sm" style={{ color: brand.textMuted }}>{r.agentType}</div>
                    </div>
                  </div>
                  <div className="text-3xl font-extrabold" style={{ color: i < 3 ? brand.accentRed : brand.primaryBlue }}>
                    {cur.unit === "AED" ? r[cur.key].toLocaleString() : r[cur.key]} {cur.unit !== "AED" && cur.unit}
                  </div>
                </div>
                <div className="mt-4 h-3 rounded-full" style={{ background: brand.borderLight }}>
                  <div className="h-full rounded-full" style={{ width: `${Math.max(8, Math.round((cur.metric(r) / cur.metric(sorted[0])) * 100))}%`, background: i < 3 ? brand.accentRed : brand.secondaryBlue }} />
                </div>
              </button>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* footer ticker */}
        <div className="overflow-hidden border-2 rounded-xl mt-8" style={{ borderColor: brand.borderLight, background: brand.cardBg }}>
          <motion.div className="whitespace-nowrap py-3 text-lg font-medium" initial={{ x: "100%" }} animate={{ x: "-100%" }} transition={{ repeat: Infinity, duration: 35, ease: "linear" }} style={{ color: brand.textDark }}>
            <span className="mx-8">🌟 Aim for 2 quality viewings/day •</span>
            <span className="mx-8">📞 Consistent follow-ups close more deals •</span>
            <span className="mx-8">🏆 Top 3 performers earn weekly bonuses •</span>
            <span className="mx-8">Welcome to Springfield Properties — Excellence in Dubai Real Estate! •</span>
          </motion.div>
        </div>
      </main>

      {/* Agent quick view modal */}
      {focus && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center backdrop-blur-sm" onClick={() => setFocus(null)}>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} transition={{ duration: 0.2 }} className="w-[600px] max-w-[94vw] rounded-3xl bg-white border-2 shadow-2xl" style={{ borderColor: brand.borderLight }} onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b flex items-center gap-4" style={{ borderColor: brand.borderLight }}>
              <Avatar src={focus.photo} name={focus.name} size={64} />
              <div>
                <div className="text-xl font-bold" style={{ color: brand.textDark }}>{focus.name}</div>
                <div className="text-base" style={{ color: brand.textMuted }}>{focus.agentType}</div>
              </div>
              <button className="ml-auto p-2 rounded-full hover:bg-gray-100" onClick={() => setFocus(null)}><X size={24} /></button>
            </div>
            <div className="p-6 grid grid-cols-2 gap-4 text-lg">
              <div className="rounded-xl border p-4" style={{ borderColor: brand.borderLight }}>
                <div className="text-sm font-medium" style={{ color: brand.textMuted }}>Revenue</div>
                <div className="text-2xl font-bold" style={{ color: brand.primaryBlue }}>AED {focus.revenue.toLocaleString()}</div>
              </div>
              <div className="rounded-xl border p-4" style={{ borderColor: brand.borderLight }}>
                <div className="text-sm font-medium" style={{ color: brand.textMuted }}>Deals Closed</div>
                <div className="text-2xl font-bold" style={{ color: brand.primaryBlue }}>{focus.deals}</div>
              </div>
              <div className="rounded-xl border p-4" style={{ borderColor: brand.borderLight }}>
                <div className="text-sm font-medium" style={{ color: brand.textMuted }}>Calls Made</div>
                <div className="text-2xl font-bold" style={{ color: brand.primaryBlue }}>{focus.calls}</div>
              </div>
              <div className="rounded-xl border p-4" style={{ borderColor: brand.borderLight }}>
                <div className="text-sm font-medium" style={{ color: brand.textMuted }}>Conversion Rate</div>
                <div className="text-2xl font-bold" style={{ color: brand.primaryBlue }}>{focus.conv}%</div>
              </div>
              <div className="rounded-xl border p-4 col-span-2 bg-blue-50" style={{ borderColor: brand.borderLight }}>
                <div className="text-sm font-medium flex items-center gap-2" style={{ color: brand.primaryBlue }}><Info size={18} /> Motivation Tip</div>
                <div className="text-base mt-2">Keep pushing! Book two extra viewings this week to climb the board and hit your next target.</div>
              </div>
            </div>
            <div className="p-4 border-t flex items-center justify-end gap-2" style={{ borderColor: brand.borderLight }}>
              <button className="px-5 py-2.5 rounded-xl text-base font-medium" style={{ background: brand.primaryBlue, color: brand.cardBg }} onClick={() => setFocus(null)}>Close</button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
