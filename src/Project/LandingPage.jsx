import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

// ============================================================
// LANDING PAGE — CodeHarbour
// Aesthetic: Deep space / naval command center
// Typography: Clash Display (display) + DM Sans (body)
// Colors: Deep navy #0a0b18, indigo accent, cyan highlight
// ============================================================

const LandingPage = () => {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Load fonts
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Syne:wght@700;800&display=swap";
    document.head.appendChild(link);
  }, []);

  const features = [
    {
      icon: "⬡",
      title: "Project Kanban",
      desc: "Drag-and-drop task boards with real-time status tracking across Todo, In Progress, and Done columns.",
    },
    {
      icon: "◈",
      title: "Team Collaboration",
      desc: "Invite team members via email, assign issues, and manage roles — all within one unified workspace.",
    },
    {
      icon: "◎",
      title: "Issue Tracking",
      desc: "Create, prioritize, and track issues with rich metadata — priority levels, assignees, and status updates.",
    },
    {
      icon: "⟁",
      title: "Project Chat",
      desc: "Built-in per-project chat keeps your team conversations contextual and your inbox clean.",
    },
    {
      icon: "◇",
      title: "Smart Filtering",
      desc: "Filter projects by category and technology tags. Find exactly what you need, instantly.",
    },
    {
      icon: "⬜",
      title: "Persistent State",
      desc: "Your filters, preferences, and project state persist across sessions — pick up exactly where you left off.",
    },
  ];

  const testimonials = [
    {
      name: "Aryan Mehta",
      role: "Full Stack Developer",
      avatar: "A",
      color: "from-violet-600 to-indigo-600",
      text: "CodeHarbour replaced three tools for our team. The issue tracking and chat in one place is a game changer.",
    },
    {
      name: "Priya Sharma",
      role: "Product Manager",
      avatar: "P",
      color: "from-cyan-600 to-blue-600",
      text: "Finally a project tool built for developers. The tag-based filtering saves us hours every sprint.",
    },
    {
      name: "Rahul Gupta",
      role: "Backend Engineer",
      avatar: "R",
      color: "from-emerald-600 to-teal-600",
      text: "Invitation flow is seamless. Onboarded my entire team in under 5 minutes. Clean, fast, reliable.",
    },
  ];

  return (
    <div
      style={{ fontFamily: "'DM Sans', sans-serif" }}
      className="min-h-screen bg-[#070810] text-white overflow-x-hidden"
    >
      {/* ── Ambient background ── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="absolute top-[-20%] left-[10%] w-[600px] h-[600px] rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(circle, #4f46e5 0%, transparent 70%)",
            transform: `translateY(${scrollY * 0.15}px)`,
          }}
        />
        <div
          className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] rounded-full opacity-10"
          style={{
            background:
              "radial-gradient(circle, #06b6d4 0%, transparent 70%)",
            transform: `translateY(${scrollY * -0.1}px)`,
          }}
        />
        <div
          className="absolute bottom-0 left-[30%] w-[800px] h-[300px] opacity-10"
          style={{
            background:
              "radial-gradient(ellipse, #818cf8 0%, transparent 70%)",
          }}
        />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* ── NAVBAR ── */}
      <nav className="relative z-50 flex items-center justify-between px-8 lg:px-20 py-6 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center text-sm font-bold">
            CH
          </div>
          <span
            style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }}
            className="text-xl text-white"
          >
            CodeHarbour
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-gray-400">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#testimonials" className="hover:text-white transition-colors">Testimonials</a>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/login")}
            className="text-sm text-gray-400 hover:text-white transition-colors px-4 py-2"
          >
            Sign In
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="text-sm bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2 rounded-lg transition-colors font-medium"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 text-center pt-20 pb-32">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 border border-indigo-500/30 bg-indigo-500/10 rounded-full px-4 py-1.5 text-xs text-indigo-300 mb-8 animate-fade-in">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
          Project Management for Developers
        </div>

        {/* Headline */}
        <h1
          style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, lineHeight: 1.05 }}
          className="text-5xl md:text-7xl lg:text-8xl text-white max-w-5xl mx-auto mb-6"
        >
          Ship faster.
          <br />
          <span
            style={{
              background: "linear-gradient(135deg, #818cf8 0%, #06b6d4 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Together.
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          CodeHarbour is the all-in-one workspace for dev teams —
          issue tracking, kanban boards, team chat, and project management
          in one seamless platform.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={() => navigate("/signup")}
            className="group relative px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold text-base transition-all duration-200 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5"
          >
            Start for free
            <span className="ml-2 group-hover:translate-x-1 inline-block transition-transform">→</span>
          </button>
          <button
            onClick={() => navigate("/login")}
            className="px-8 py-4 border border-white/10 hover:border-white/20 text-gray-300 hover:text-white rounded-xl font-medium text-base transition-all duration-200 hover:-translate-y-0.5"
          >
            Sign in
          </button>
        </div>

        {/* Hero visual */}
        <div className="mt-20 w-full max-w-4xl mx-auto relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#070810] z-10 pointer-events-none" />
          <div className="border border-white/10 rounded-2xl bg-[#0e0f1f]/80 backdrop-blur-sm p-6 shadow-2xl shadow-indigo-500/10">

            {/* Mock project board */}
            <div className="flex items-center gap-3 mb-5 pb-4 border-b border-white/5">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
              <span className="text-xs text-gray-600 ml-2">CodeHarbour — Dashboard</span>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {["Todo List", "In Progress", "Done"].map((col, ci) => (
                <div key={col} className="bg-[#131525] rounded-xl p-3 border border-white/5">
                  <p className="text-xs font-semibold text-gray-400 mb-3">{col}</p>
                  {[0, 1].map((i) => (
                    <div key={i} className="bg-[#0e0f1f] border border-white/5 rounded-lg p-3 mb-2">
                      <div className={`h-2 rounded-full mb-2 ${
                        ci === 0 ? "bg-gray-700 w-3/4" :
                        ci === 1 ? "bg-indigo-700/60 w-2/3" :
                        "bg-emerald-700/60 w-1/2"
                      }`} />
                      <div className="flex justify-between items-center">
                        <div className={`text-xs px-2 py-0.5 rounded-full border ${
                          i === 0
                            ? "border-red-500/30 text-red-400 bg-red-500/10"
                            : "border-yellow-500/30 text-yellow-400 bg-yellow-500/10"
                        }`}>
                          {i === 0 ? "HIGH" : "MEDIUM"}
                        </div>
                        <div className="w-5 h-5 rounded-full bg-indigo-600 flex items-center justify-center text-xs text-white">
                          {["A", "P", "R"][ci]}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="relative z-10 px-6 lg:px-20 py-32">
        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-widest text-indigo-400 mb-3">Features</p>
            <h2
              style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }}
              className="text-4xl md:text-5xl text-white"
            >
              Everything your team needs
            </h2>
            <p className="text-gray-400 mt-4 max-w-xl mx-auto">
              Built specifically for developer teams who move fast and need tools that keep up.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <div
                key={i}
                className="group border border-white/5 bg-[#0e0f1f]/60 rounded-2xl p-6 hover:border-indigo-500/30 hover:bg-[#0e0f1f] transition-all duration-300 hover:-translate-y-1"
              >
                <div className="text-3xl mb-4 text-indigo-400 group-hover:scale-110 transition-transform duration-300">
                  {f.icon}
                </div>
                <h3
                  style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700 }}
                  className="text-lg text-white mb-2"
                >
                  {f.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="testimonials" className="relative z-10 px-6 lg:px-20 py-32">
        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-widest text-indigo-400 mb-3">Testimonials</p>
            <h2
              style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }}
              className="text-4xl md:text-5xl text-white"
            >
              Loved by dev teams
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="border border-white/5 bg-[#0e0f1f]/60 rounded-2xl p-6 hover:border-white/10 transition-all duration-300"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, si) => (
                    <span key={si} className="text-indigo-400 text-sm">★</span>
                  ))}
                </div>

                <p className="text-gray-300 text-sm leading-relaxed mb-6">
                  "{t.text}"
                </p>

                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-sm font-bold text-white`}>
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="relative z-10 px-6 lg:px-20 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="relative border border-indigo-500/20 rounded-3xl p-12 text-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 via-transparent to-cyan-600/10 pointer-events-none" />
            <h2
              style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }}
              className="text-4xl md:text-5xl text-white mb-4"
            >
              Ready to ship faster?
            </h2>
            <p className="text-gray-400 mb-8 max-w-lg mx-auto">
              Join developer teams already using CodeHarbour to manage projects, track issues, and collaborate seamlessly.
            </p>
            <button
              onClick={() => navigate("/signup")}
              className="px-10 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold text-base transition-all duration-200 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5"
            >
              Get started for free →
            </button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="relative z-10 border-t border-white/5 px-6 lg:px-20 py-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-xs font-bold">
              CH
            </div>
            <span
              style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }}
              className="text-white"
            >
              CodeHarbour
            </span>
          </div>

          <div className="flex items-center gap-8 text-sm text-gray-500">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#testimonials" className="hover:text-white transition-colors">Testimonials</a>
            <span
              onClick={() => navigate("/login")}
              className="cursor-pointer hover:text-white transition-colors"
            >
              Sign In
            </span>
          </div>

          <p className="text-xs text-gray-600">
            © 2026 CodeHarbour. Built for developers.
          </p>
        </div>
      </footer>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease forwards;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;