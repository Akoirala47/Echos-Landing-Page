import { useEffect } from 'react'
import { useTweaks, TweaksPanel, TweakSection, TweakRadio } from './tweaks-panel'

export function PrivacyDiagram() {
  return (
    <svg viewBox="0 0 460 460" width="100%" style={{ display: "block" }} role="img" aria-label="Privacy boundary diagram: audio stays on your Mac, only text leaves">
      <defs>
        <marker id="arrowAmber" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--accent)" />
        </marker>
        <pattern id="stripes" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="6" stroke="var(--border)" strokeWidth="1" />
        </pattern>
      </defs>

      {/* Mac box */}
      <rect x="40" y="200" width="220" height="180" rx="10" fill="var(--panel)" stroke="var(--border)" strokeWidth="1.5" />
      <rect x="40" y="200" width="220" height="28" rx="10" fill="var(--statusbar)" stroke="var(--border)" strokeWidth="1.5" />
      <circle cx="56" cy="214" r="4" fill="#ec6a5e" />
      <circle cx="70" cy="214" r="4" fill="#f4be4f" />
      <circle cx="84" cy="214" r="4" fill="#61c454" />
      <text x="150" y="219" textAnchor="middle" fontSize="10" fill="var(--faint)" fontFamily="JetBrains Mono, monospace">your Mac</text>

      {/* Mic icon */}
      <g transform="translate(72, 252)">
        <rect x="0" y="0" width="22" height="34" rx="11" fill="none" stroke="var(--ink)" strokeWidth="1.5" />
        <path d="M -6 22 Q 11 38 28 22" fill="none" stroke="var(--ink)" strokeWidth="1.5" />
        <line x1="11" y1="40" x2="11" y2="48" stroke="var(--ink)" strokeWidth="1.5" />
        <text x="11" y="62" textAnchor="middle" fontSize="9" fill="var(--muted)" fontFamily="JetBrains Mono, monospace">mic</text>
      </g>

      {/* Audio waveform */}
      <g transform="translate(120, 270)">
        {Array.from({ length: 18 }).map((_, i) => {
          const h = 4 + Math.abs(Math.sin(i * 0.7)) * 16
          return (
            <rect key={i} x={i * 4} y={-h / 2} width="1.5" height={h} fill="var(--recording)">
              <animate attributeName="height" values={`${h};${h * 0.4};${h}`} dur={`${1.5 + (i % 3) * 0.3}s`} repeatCount="indefinite" />
              <animate attributeName="y" values={`${-h / 2};${-h * 0.2};${-h / 2}`} dur={`${1.5 + (i % 3) * 0.3}s`} repeatCount="indefinite" />
            </rect>
          )
        })}
      </g>
      <text x="150" y="312" textAnchor="middle" fontSize="9.5" fill="var(--muted)" fontFamily="JetBrains Mono, monospace">audio · stays local</text>

      {/* Whisper label */}
      <rect x="60" y="328" width="180" height="38" rx="6" fill="var(--bg-2)" stroke="var(--border)" strokeWidth="1" />
      <text x="150" y="345" textAnchor="middle" fontSize="11" fill="var(--ink)" fontFamily="Inter, sans-serif" fontWeight="500">Whisper large-v3</text>
      <text x="150" y="358" textAnchor="middle" fontSize="9" fill="var(--faint)" fontFamily="JetBrains Mono, monospace">on-device · MPS</text>

      {/* Cloud (Google AI) */}
      <g transform="translate(310, 60)">
        <path d="M 30 30 Q 14 30 14 46 Q 0 50 6 64 Q 6 76 22 76 L 92 76 Q 110 76 110 60 Q 118 50 108 38 Q 104 24 88 28 Q 78 14 60 18 Q 38 18 30 30 z"
              fill="var(--panel)" stroke="var(--border)" strokeWidth="1.5" />
        <text x="60" y="50" textAnchor="middle" fontSize="11" fill="var(--ink)" fontFamily="Inter, sans-serif" fontWeight="500">Google AI</text>
        <text x="60" y="64" textAnchor="middle" fontSize="9" fill="var(--faint)" fontFamily="JetBrains Mono, monospace">gemma-4-31b</text>
      </g>

      {/* Text arrow */}
      <g>
        <path d="M 200 200 Q 240 140 320 130" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="3 3" markerEnd="url(#arrowAmber)" />
        <rect x="240" y="155" width="60" height="14" rx="3" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="0.8" />
        <text x="270" y="165" textAnchor="middle" fontSize="9" fill="var(--accent)" fontFamily="JetBrains Mono, monospace">text only</text>
      </g>

      {/* Obsidian vault */}
      <g transform="translate(310, 200)">
        <rect x="0" y="0" width="120" height="160" rx="8" fill="var(--panel)" stroke="var(--border)" strokeWidth="1.5" />
        <text x="60" y="20" textAnchor="middle" fontSize="10" fill="var(--faint)" fontFamily="JetBrains Mono, monospace">Obsidian vault</text>
        {[30, 44, 58, 72, 86, 100].map((y, i) => (
          <line key={i} x1="14" y1={y} x2={i % 2 === 0 ? 96 : 80} y2={y} stroke="var(--border)" strokeWidth="1" />
        ))}
        <line x1="14" y1="118" x2="60" y2="118" stroke="var(--accent)" strokeWidth="1.5" />
        <text x="60" y="148" textAnchor="middle" fontSize="9" fill="var(--muted)" fontFamily="JetBrains Mono, monospace">.md notes</text>
      </g>

      {/* Privacy boundary line */}
      <line x1="280" y1="40" x2="280" y2="420" stroke="var(--accent)" strokeWidth="1" strokeDasharray="2 4" opacity="0.5" />
      <text x="280" y="410" textAnchor="middle" fontSize="9" fill="var(--accent)" fontFamily="JetBrains Mono, monospace" letterSpacing="0.1em">PRIVACY BOUNDARY</text>
    </svg>
  )
}

export function TweaksPanelEchos() {
  const [tweaks, setTweak] = useTweaks({
    theme: "light",
    accent: "amber",
    heroVariant: "app",
  })

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", tweaks.theme)
    const accents = {
      amber:  "#c2410c",
      rose:   "#be185d",
      teal:   "#0e7c66",
      indigo: "#4338ca",
    }
    document.documentElement.style.setProperty("--accent", accents[tweaks.accent] || accents.amber)
  }, [tweaks])

  return (
    <TweaksPanel>
      <TweakSection label="Theme">
        <TweakRadio
          label="Mode"
          value={tweaks.theme}
          onChange={(v) => setTweak("theme", v)}
          options={[{ value: "light", label: "Light" }, { value: "dark", label: "Dark" }]}
        />
        <TweakRadio
          label="Accent"
          value={tweaks.accent}
          onChange={(v) => setTweak("accent", v)}
          options={[
            { value: "amber",  label: "Amber" },
            { value: "rose",   label: "Rose" },
            { value: "teal",   label: "Teal" },
            { value: "indigo", label: "Indigo" },
          ]}
        />
      </TweakSection>
      <TweakSection label="Hero">
        <TweakRadio
          label="Variant"
          value={tweaks.heroVariant}
          onChange={(v) => {
            setTweak("heroVariant", v)
            window.dispatchEvent(new CustomEvent("hero-variant", { detail: v }))
          }}
          options={[
            { value: "app",   label: "App" },
            { value: "graph", label: "Graph" },
          ]}
        />
      </TweakSection>
    </TweaksPanel>
  )
}
