"use client";

import { useState } from "react";

/* ─── Config ─── */
const CONFIG = {
  version: "1.7",
  telegramUrl: "https://t.me/kycflow",
  downloadUrl: "?download=1",
  youtubeId: "aovY4gC81QA",
};

/* ─── SVG Icons (inline) ─── */
const AndroidIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.551 0 .9993.4482.9993.9993.0001.5511-.4483.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993 0 .5511-.4482.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1521-.5676.416.416 0 00-.5676.1521l-2.0223 3.503C15.5902 8.4116 13.8533 8.125 12 8.125s-3.5902.2866-5.1368.8247L4.8409 5.4467a.4161.4161 0 00-.5677-.1521.4157.4157 0 00-.1521.5676l1.9973 3.4592C2.6889 11.1867.3432 14.6589 0 18.761h24c-.3432-4.1021-2.6889-7.5743-6.1185-9.4396"/></svg>
);
const PhoneIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="3"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
);
const WindowsIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.951-1.849"/></svg>
);
const AppleIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8.92-2.85-.9.04-1.99.6-2.64 1.36-.58.67-.99 1.74-.88 2.76 1.01.08 2.02-.52 2.6-1.27z"/></svg>
);

/* ─── Feature Data ─── */
const features = [
  {
    title: "Deepfake AI Face Swap",
    tag: "Real-Time",
    desc: "Create hyper-realistic AI deepfake facial streams and live face swaps that bypass dynamic liveness & blink checks seamlessly.",
    color: "cyan",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#00F5FF]">
        <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
        <circle cx="12" cy="11" r="3"/><path d="M9 16a3.5 3.5 0 0 0 6 0"/>
      </svg>
    ),
  },
  {
    title: "Virtual Camera & OBS / PC Connect",
    tag: "Universal",
    desc: "Connect your PC and OBS Studio via Virtual Camera to bypass live video KYC verification on ANY Android banking or crypto app.",
    color: "purple",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#7C3AED]">
        <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/><circle cx="12" cy="10" r="2.5"/>
      </svg>
    ),
  },
  {
    title: "All Document & Utility Bill Generator",
    tag: "Instant",
    desc: "Generate authentic National IDs, Passports, Driver's Licenses, and Utility Bills (Electricity, Water, Gas, Bank Statements) ready for approval.",
    color: "emerald",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#10B981]">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
      </svg>
    ),
  },
  {
    title: "100% Anti-Detection Engine",
    tag: null,
    desc: "Engineered to bypass Sumsub, Jumio, Onfido, Veriff, Binance, Bybit, Revolut, and all modern biometric security systems.",
    color: "cyan",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#00F5FF]">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/>
      </svg>
    ),
  },
];

const iconBoxColor: Record<string, string> = {
  cyan: "bg-[rgba(0,245,255,0.1)] border-[rgba(0,245,255,0.25)]",
  purple: "bg-[rgba(124,58,237,0.12)] border-[rgba(124,58,237,0.3)]",
  emerald: "bg-[rgba(16,185,129,0.12)] border-[rgba(16,185,129,0.3)]",
};

/* ─── Page ─── */
export default function Home() {
  const [videoPlaying, setVideoPlaying] = useState(false);

  return (
    <main className="max-w-[520px] w-full bg-[rgba(14,10,32,0.85)] backdrop-blur-[28px] border border-[rgba(124,58,237,0.22)] rounded-[28px] p-[36px_28px] text-center relative overflow-hidden shadow-[0_24px_70px_rgba(0,0,0,0.75),0_0_40px_rgba(0,245,255,0.08)] transition-all duration-200 max-[440px]:p-[26px_18px] max-[440px]:rounded-[22px]">
      {/* Top gradient accent line */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#00F5FF] via-[#7C3AED] to-[#00F5FF] bg-[length:200%_100%] animate-[cyberFlow_6s_linear_infinite]" />

      {/* Verified Badge */}
      <div className="inline-flex items-center gap-[7px] bg-[rgba(16,185,129,0.12)] border border-[rgba(16,185,129,0.35)] text-[#10B981] text-[11.5px] font-bold px-[14px] py-[5px] rounded-full uppercase tracking-[0.8px] mb-[22px] shadow-[0_0_16px_rgba(16,185,129,0.2)]">
        <span className="w-[7px] h-[7px] bg-[#10B981] rounded-full inline-block shadow-[0_0_8px_#10B981] animate-[pulseDot_2s_infinite_ease-in-out]" />
        Official Verified App • v{CONFIG.version}
      </div>

      {/* Logo */}
      <div className="relative w-[86px] h-[86px] mx-auto mb-[18px] rounded-[22px] p-[2.5px] bg-gradient-to-br from-[#00F5FF] to-[#7C3AED] shadow-[0_0_25px_rgba(0,245,255,0.25),0_0_45px_rgba(124,58,237,0.35)] flex items-center justify-center">
        <img src="/kyc-flow-logo.png" alt="KYC Flow Logo" className="w-full h-full rounded-[20px] object-cover block bg-[#0b071e]" />
      </div>

      {/* Title */}
      <h1 className="text-[26px] font-extrabold tracking-[-0.5px] mb-[6px] flex items-center justify-center gap-[10px] max-[440px]:text-[22px]">
        KYC Flow
        <span className="text-[12px] font-mono font-bold text-[#00F5FF] bg-[rgba(0,245,255,0.12)] border border-[rgba(0,245,255,0.3)] px-[9px] py-[3px] rounded-[8px] tracking-[0.5px]">v{CONFIG.version}</span>
      </h1>

      {/* Headline */}
      <div className="text-[14px] font-bold text-[#00F5FF] uppercase tracking-[0.5px] mb-[8px] [text-shadow:0_0_12px_rgba(0,245,255,0.4)] max-[440px]:text-[13px]">
        KYC Bypass Tool
      </div>

      {/* Subtitle with device pills */}
      <p className="text-[#94A3B8] text-[13px] leading-[1.6] mb-[22px] px-1 max-[440px]:text-[12.5px] max-[440px]:mb-[18px]">
        Next-Gen Automated KYC Bypass, Real-Time Deepfake AI & Virtual Camera Injection Suite for{" "}
        <span className="inline-flex items-center gap-[5px] whitespace-nowrap align-middle bg-[rgba(14,10,36,0.85)] border border-[rgba(0,245,255,0.22)] rounded-full px-2 py-[2px] ml-[3px]">
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-white"><span className="text-[#00F5FF]"><AndroidIcon /></span>Android</span>
          <span className="text-[rgba(255,255,255,0.25)] text-[9px]">•</span>
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-white"><span className="text-[#00F5FF]"><PhoneIcon /></span>iPhone</span>
          <span className="text-[rgba(255,255,255,0.25)] text-[9px]">•</span>
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-white"><span className="text-[#00F5FF]"><WindowsIcon /></span>PC</span>
          <span className="text-[rgba(255,255,255,0.25)] text-[9px]">•</span>
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-white"><span className="text-[#00F5FF]"><AppleIcon /></span>Mac</span>
        </span>
      </p>

      {/* Download Button */}
      <a href={CONFIG.downloadUrl} className="flex items-center justify-center gap-3 w-full bg-gradient-to-br from-[#00F5FF] to-[#7C3AED] text-white text-[15.5px] font-bold py-4 px-6 rounded-[16px] no-underline transition-all duration-[250ms] shadow-[0_10px_25px_rgba(0,245,255,0.25),0_4px_15px_rgba(124,58,237,0.35)] hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(0,245,255,0.4),0_8px_24px_rgba(124,58,237,0.45)] active:translate-y-0 max-[440px]:py-[14px] max-[440px]:px-5 max-[440px]:text-[14.5px]">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
        Download KYC Flow v{CONFIG.version} APK
      </a>

      {/* Telegram Button */}
      <a href={CONFIG.telegramUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-[9px] w-full bg-[rgba(22,17,49,0.65)] border border-[rgba(0,245,255,0.35)] text-[#00F5FF] text-[13.5px] font-semibold py-[13px] px-5 rounded-[14px] no-underline mt-3 transition-all duration-200 hover:bg-[rgba(0,245,255,0.12)] hover:border-[#00F5FF] hover:shadow-[0_0_18px_rgba(0,245,255,0.2)]">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.19-.08-.05-.19-.02-.27 0-.12.03-1.99 1.27-5.62 3.72-.53.36-1.01.54-1.44.53-.47-.01-1.38-.27-2.06-.49-.83-.27-1.49-.42-1.43-.88.03-.24.38-.49 1.04-.75 4.09-1.78 6.82-2.95 8.19-3.53 3.9-1.63 4.71-1.91 5.24-1.92.12 0 .37.03.54.17.14.12.18.28.2.45-.02.07-.02.2-.04.35z"/></svg>
        Join Telegram & 24/7 Live Support
      </a>

      {/* Video Section */}
      <div className="mt-[24px] pt-[20px] border-t border-[rgba(255,255,255,0.08)] text-left">
        <div className="text-[12px] font-bold uppercase tracking-[0.8px] text-[#94A3B8] mb-3 flex items-center gap-[6px]">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="text-[#00F5FF] shrink-0"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>
          Live Video Demonstration & Proof
        </div>
        <div className="relative w-full pb-[56.25%] h-0 rounded-[16px] overflow-hidden border border-[rgba(0,245,255,0.35)] shadow-[0_10px_30px_rgba(0,0,0,0.6),0_0_25px_rgba(0,245,255,0.18)] bg-black cursor-pointer" onClick={() => setVideoPlaying(true)}>
          {videoPlaying ? (
            <iframe className="absolute inset-0 w-full h-full border-0" src={`https://www.youtube-nocookie.com/embed/${CONFIG.youtubeId}?autoplay=1&rel=0&modestbranding=1`} title="KYC Flow Live Demo" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
          ) : (
            <>
              <img src={`https://img.youtube.com/vi/${CONFIG.youtubeId}/maxresdefault.jpg`} alt="KYC Flow Live Video Proof" className="absolute inset-0 w-full h-full object-cover block transition-all duration-300 hover:scale-[1.02] hover:brightness-[1.06]" loading="lazy" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[3] pointer-events-none transition-all duration-[250ms] [filter:drop-shadow(0_4px_14px_rgba(0,0,0,0.85))]">
                <svg viewBox="0 0 68 48" width="68" height="48"><path d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z" fill="#FF0000"/><path d="M 45,24 27,14 27,34" fill="#FFFFFF"/></svg>
              </div>
            </>
          )}
        </div>
        <div className="text-[11.5px] text-[#94A3B8] mt-[10px] leading-[1.45] text-center flex items-center justify-center gap-[6px]">
          <span className="text-[#10B981] text-[10px] animate-[pulseDot_1.5s_infinite_ease-in-out]">●</span>
          Watch KYC Flow in action with real-time dynamic camera injection.
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-[26px] pt-[22px] border-t border-[rgba(255,255,255,0.08)] text-left">
        <div className="text-[12px] font-bold uppercase tracking-[0.8px] text-[#94A3B8] mb-[14px] flex items-center gap-[6px]">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" className="text-[#00F5FF] shrink-0"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
          Core Bypass Capabilities
        </div>
        <div className="flex flex-col gap-[11px]">
          {features.map((f, i) => (
            <div key={i} className="bg-[rgba(9,6,24,0.7)] border border-[rgba(124,58,237,0.18)] rounded-[14px] p-[12px_14px] flex items-start gap-3 transition-all duration-200 hover:border-[rgba(0,245,255,0.35)] hover:bg-[rgba(14,10,36,0.85)] hover:translate-x-[2px] max-[440px]:p-[10px_12px]">
              <div className={`w-9 h-9 rounded-[10px] border flex items-center justify-center text-[18px] shrink-0 ${iconBoxColor[f.color]}`}>
                {f.icon}
              </div>
              <div className="flex-1">
                <div className="text-[13px] font-bold text-white mb-[2px] flex items-center gap-[6px] max-[440px]:text-[12.5px]">
                  {f.title}
                  {f.tag && <span className="text-[9.5px] px-[6px] py-[1px] rounded bg-[rgba(0,245,255,0.15)] text-[#00F5FF] font-bold uppercase">{f.tag}</span>}
                </div>
                <div className="text-[11.5px] text-[#94A3B8] leading-[1.45] max-[440px]:text-[11px]">{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Specs Bar */}
      <div className="mt-5 pt-4 border-t border-dashed border-[rgba(255,255,255,0.08)] flex justify-around text-center">
        {[
          { label: "Version", value: `v${CONFIG.version}.0`, highlight: true },
          { label: "Platform", value: "All Devices", highlight: true },
          { label: "Protection", value: "Zero-Log / Safe", highlight: false },
          { label: "Activation", value: "Instant", highlight: true },
        ].map((s, i) => (
          <div key={i}>
            <div className="text-[10px] text-[#64748B] uppercase tracking-[0.5px]">{s.label}</div>
            <div className={`text-[12px] font-bold mt-[2px] ${s.highlight ? "text-[#00F5FF]" : "text-[#94A3B8]"}`}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Compatibility Badge */}
      <div className="mt-[14px] flex items-center justify-center gap-[6px] text-[11px] font-semibold text-[#10B981] bg-[rgba(16,185,129,0.08)] border border-[rgba(16,185,129,0.25)] rounded-[10px] py-2 px-3 text-center leading-[1.35]">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" className="text-[#10B981] shrink-0"><polyline points="20 6 9 17 4 12"/></svg>
        Fully compatible with Android, iPhone (iOS), Windows PC & Mac
      </div>
    </main>
  );
}
