import { useState, useEffect } from 'react'
import { MockApp } from './app-mockup'
import { BrainGraph } from './brain-graph'
import { PrivacyDiagram, TweaksPanelEchos } from './extras'

const iconImg = '/icon.png'

function FeatureIcon({ kind }) {
  const stroke = "currentColor"
  const sw = 1.6
  const common = { width: 28, height: 28, fill: "none", stroke, strokeWidth: sw, strokeLinecap: "round", strokeLinejoin: "round" }
  if (kind === "mic")   return (<svg {...common} viewBox="0 0 24 24"><rect x="9" y="3" width="6" height="12" rx="3" /><path d="M5 11a7 7 0 0 0 14 0" /><line x1="12" y1="18" x2="12" y2="22" /></svg>)
  if (kind === "notes") return (<svg {...common} viewBox="0 0 24 24"><path d="M5 4h11l3 3v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z" /><line x1="8" y1="10" x2="16" y2="10" /><line x1="8" y1="14" x2="14" y2="14" /><line x1="8" y1="18" x2="12" y2="18" /></svg>)
  if (kind === "graph") return (<svg {...common} viewBox="0 0 24 24"><circle cx="6" cy="6" r="2" /><circle cx="18" cy="6" r="2" /><circle cx="12" cy="14" r="2.5" /><circle cx="5" cy="19" r="1.6" /><circle cx="19" cy="19" r="1.6" /><line x1="7" y1="7" x2="11" y2="13" /><line x1="17" y1="7" x2="13" y2="13" /><line x1="11" y1="15" x2="6" y2="18" /><line x1="13" y1="15" x2="18" y2="18" /></svg>)
  if (kind === "vault") return (<svg {...common} viewBox="0 0 24 24"><path d="M4 6h6l2 2h8v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1z" /></svg>)
  if (kind === "lock")  return (<svg {...common} viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg>)
  if (kind === "spark") return (<svg {...common} viewBox="0 0 24 24"><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8" /></svg>)
  if (kind === "obs")   return (<svg {...common} viewBox="0 0 24 24"><path d="M12 3l8 5v8l-8 5-8-5V8z" /><path d="M12 3v18" /><path d="M4 8l8 5 8-5" /></svg>)
  if (kind === "key")   return (<svg {...common} viewBox="0 0 24 24"><circle cx="8" cy="14" r="3.5" /><line x1="11" y1="13" x2="20" y2="13" /><line x1="17" y1="13" x2="17" y2="16" /><line x1="20" y1="13" x2="20" y2="16" /></svg>)
  if (kind === "cmd")   return (<svg {...common} viewBox="0 0 24 24"><path d="M9 6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3z" /></svg>)
  if (kind === "split") return (<svg {...common} viewBox="0 0 24 24"><rect x="3" y="5" width="8" height="14" rx="1" /><rect x="13" y="5" width="8" height="14" rx="1" /><line x1="7" y1="9" x2="7" y2="9.01" /></svg>)
  return null
}

export default function App() {
  const [heroVariant, setHeroVariant] = useState("app")
  useEffect(() => {
    const h = (e) => setHeroVariant(e.detail)
    window.addEventListener("hero-variant", h)
    return () => window.removeEventListener("hero-variant", h)
  }, [])

  return (
    <>
      <nav className="nav">
        <a className="nav-brand" href="#">
          <img src={iconImg} alt="Echos" />
          <span>Echos</span>
        </a>
        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#brain">Brain View</a>
          <a href="#privacy">Privacy</a>
          <a href="https://github.com/Akoirala47/Echos">GitHub ↗</a>
        </div>
        <a className="nav-cta" href="https://github.com/Akoirala47/Echos/releases">
          Download <span style={{ color: "var(--faint)" }}>·</span> macOS
        </a>
      </nav>

      <section className="hero">
        <div className="hero-badge">
          <span className="dot"></span>
          v2.3.4 · Apple Silicon · macOS 13+
        </div>
        <h1>
          Lecture notes that <em>think</em><br />
          on your Mac, not in the cloud.
        </h1>
        <p className="lede">
          Echos records your lectures and meetings, transcribes them on-device with Whisper large-v3,
          and writes structured Obsidian notes you actually want to read — then links them into a
          living knowledge graph of everything you've ever learned.
        </p>
        <div className="hero-ctas">
          <a className="btn btn-primary" href="https://github.com/Akoirala47/Echos/releases">
            Download for macOS
            <span className="arrow">→</span>
          </a>
          <a className="btn btn-ghost" href="https://github.com/Akoirala47/Echos">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M8 .2A8 8 0 0 0 5.5 15.8c.4.07.55-.17.55-.38v-1.36c-2.23.48-2.7-1.07-2.7-1.07-.36-.93-.9-1.18-.9-1.18-.74-.5.06-.49.06-.49.82.06 1.25.84 1.25.84.73 1.25 1.91.89 2.37.68.07-.53.28-.89.51-1.1-1.78-.2-3.65-.89-3.65-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.13 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.11.16 1.93.08 2.13.51.56.82 1.28.82 2.15 0 3.07-1.87 3.75-3.66 3.95.29.25.54.74.54 1.5v2.22c0 .21.15.46.55.38A8 8 0 0 0 8 .2z" /></svg>
            Star on GitHub
          </a>
        </div>
        <div className="hero-meta">
          <span><span className="check">✓</span> 100% local audio</span>
          <span><span className="check">✓</span> Obsidian-native</span>
          <span><span className="check">✓</span> MIT licensed</span>
        </div>
      </section>

      <div className="window-wrap">
        {heroVariant === "app" ? <MockApp /> : (
          <div className="window">
            <div className="titlebar">
              <div className="tl"><span className="r"></span><span className="y"></span><span className="g"></span></div>
              <div className="tb-title">Echos — Brain View</div>
              <div style={{ width: 60 }}></div>
            </div>
            <div style={{ height: 520 }}>
              <BrainGraph />
            </div>
          </div>
        )}
      </div>

      {/* feature grid */}
      <section className="section" id="features">
        <div className="section-head">
          <div className="label-eyebrow">— What it does</div>
          <h2>A complete pipeline from microphone to wikilink.</h2>
          <p>Six tightly-integrated parts, every one optimized for the way Obsidian people actually work.</p>
        </div>
        <div className="feature-grid">
          <div className="feature">
            <div className="feature-icon"><FeatureIcon kind="mic" /></div>
            <h3>Whisper large-v3, on your Mac</h3>
            <p>Captures system + mic audio and runs the same model OpenAI ships, on-device via PyTorch / MPS. Your audio never crosses the network boundary.</p>
            <div className="meta">whisper-large-v3 · mps</div>
          </div>
          <div className="feature">
            <div className="feature-icon"><FeatureIcon kind="spark" /></div>
            <h3>Notes that draft as you record</h3>
            <p>Every ~3,500 chars of new transcript, Echos streams structured Markdown into the Notes panel. By the time the lecture ends, your notes are basically there.</p>
            <div className="meta">incremental · gemma-4-31b</div>
          </div>
          <div className="feature">
            <div className="feature-icon"><FeatureIcon kind="obs" /></div>
            <h3>Obsidian-native, by design</h3>
            <p>Course-folder mapping, YAML frontmatter, "Open in Obsidian," and a sidebar that mirrors your real vault tree — including nested folders and existing .md files.</p>
            <div className="meta">vault-relative paths</div>
          </div>
          <div className="feature">
            <div className="feature-icon"><FeatureIcon kind="graph" /></div>
            <h3>Brain View knowledge graph</h3>
            <p>WebGL force layout (PIXI + d3-force) over your whole vault. Edges come from wikilinks, fingerprint-concept overlap, and embedding cosine similarity ≥ 0.8.</p>
            <div className="meta">⌘G · webgl</div>
          </div>
          <div className="feature">
            <div className="feature-icon"><FeatureIcon kind="cmd" /></div>
            <h3>Command palette + keyboard-first</h3>
            <p>⇧⌘P jumps to any vault file. ⌘R / ⌘P / ⌘⇧E for record / pause / end-session — separate keys, because slipping a destructive button mid-lecture is unforgivable.</p>
            <div className="meta">⇧⌘P · ⌘G · ⌘R</div>
          </div>
          <div className="feature">
            <div className="feature-icon"><FeatureIcon kind="split" /></div>
            <h3>Split-screen, tear-off tabs</h3>
            <p>Open any note as a Markdown editor tab, drag it out into its own pane, or split the workspace side-by-side. Reference last week's lecture while this week's transcript streams in.</p>
            <div className="meta">SplitTabArea · TabManager</div>
          </div>
        </div>
      </section>

      {/* brain section */}
      <section className="brain-section" id="brain">
        <div className="brain-inner">
          <div>
            <div className="label-eyebrow">— Brain View</div>
            <h2 style={{ fontSize: "clamp(28px, 3.2vw, 38px)", lineHeight: 1.05, letterSpacing: "-0.03em", fontWeight: 600, margin: "12px 0 14px", textWrap: "balance" }}>
              Your vault, as a working memory.
            </h2>
            <p style={{ color: "var(--muted)", fontSize: 15.5, lineHeight: 1.55, margin: 0 }}>
              Every saved note is fingerprinted into concepts and embedded as a 384-dim vector.
              Brain View renders the result as a force-directed graph — wikilinks first, then concept
              overlaps, then semantic neighbors. Click a node to open it.
            </p>
            <div className="legend">
              <div className="legend-row"><span className="legend-swatch" style={{ background: "#c2410c" }}></span> Computer Science · Algorithms</div>
              <div className="legend-row"><span className="legend-swatch" style={{ background: "#a98d4a" }}></span> Math · Linear Algebra · Calc</div>
              <div className="legend-row"><span className="legend-swatch" style={{ background: "#be185d" }}></span> Work · 1:1s · OKRs</div>
              <div className="legend-row"><span className="legend-swatch" style={{ background: "#76746b" }}></span> Personal · Writing</div>
            </div>
            <p className="mono" style={{ fontSize: 11.5, color: "var(--faint)", marginTop: 24, letterSpacing: "0.04em" }}>
              ► drag any node · hover for label
            </p>
          </div>
          <BrainGraph />
        </div>
      </section>

      {/* privacy */}
      <section className="privacy-section" id="privacy">
        <div>
          <div className="label-eyebrow">— Privacy boundary</div>
          <h2 style={{ fontSize: "clamp(32px, 3.6vw, 44px)", lineHeight: 1.05, letterSpacing: "-0.03em", fontWeight: 600, margin: "12px 0 14px", textWrap: "balance" }}>
            Your audio never leaves your laptop.
          </h2>
          <p style={{ color: "var(--muted)", fontSize: 16.5, lineHeight: 1.55, margin: 0 }}>
            Recording, transcription, and indexing all run locally. The only thing that ever crosses the
            network is text — and only when you explicitly ask Echos to draft or regenerate notes.
          </p>
          <div className="privacy-points">
            <div className="privacy-point">
              <div className="num">01</div>
              <div>
                <h4>Audio is processed in-memory</h4>
                <p>Mic stream goes straight into Whisper buffers. No audio is ever written to disk unless you turn that on yourself.</p>
              </div>
            </div>
            <div className="privacy-point">
              <div className="num">02</div>
              <div>
                <h4>Transcripts are yours</h4>
                <p>Live transcript is editable text in the panel — clear it, export it as .txt, or never let it leave the window.</p>
              </div>
            </div>
            <div className="privacy-point">
              <div className="num">03</div>
              <div>
                <h4>Only text crosses to Google AI</h4>
                <p>When you press <span className="mono" style={{ fontSize: 12 }}>Generate Notes</span>, Echos sends transcript text to your configured Gemini / Gemma model — over your own API key, with your own rate limits.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="privacy-diagram">
          <PrivacyDiagram />
        </div>
      </section>

      {/* how it works */}
      <section className="section" style={{ paddingTop: 32 }}>
        <div className="section-head">
          <div className="label-eyebrow">— How it works</div>
          <h2>From "Start Recording" to a linked note in three steps.</h2>
        </div>
        <div className="how-grid">
          <div className="step">
            <div className="step-num">STEP 01</div>
            <h3>Pick a topic, hit ⌘R</h3>
            <p>Choose a course or any folder in your vault. Echos opens the mic stream and starts feeding 6-second audio chunks to Whisper on the MPS device.</p>
          </div>
          <div className="step">
            <div className="step-num">STEP 02</div>
            <h3>Watch notes draft live</h3>
            <p>Pause and resume freely — the same session keeps going. Structured Markdown streams into the Notes panel as enough new transcript accumulates.</p>
          </div>
          <div className="step">
            <div className="step-num">STEP 03</div>
            <h3>End session, save to vault</h3>
            <p>⌘S writes a Markdown note with YAML frontmatter and a concept fingerprint. The watcher picks it up and the new node appears in Brain View next time you open it.</p>
          </div>
        </div>
      </section>

      {/* final cta */}
      <section className="final-cta">
        <div className="label-eyebrow">— Ready when you are</div>
        <h2>Start recording smarter notes today.</h2>
        <p>MIT licensed · Apple Silicon recommended · Bring your own Google AI key</p>
        <div className="hero-ctas">
          <a className="btn btn-primary" href="https://github.com/Akoirala47/Echos/releases">
            Download .dmg
            <span className="arrow">→</span>
          </a>
          <a className="btn btn-ghost" href="https://github.com/Akoirala47/Echos">
            View source
          </a>
        </div>
      </section>

      <footer>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img src={iconImg} alt="" style={{ width: 18, height: 18, borderRadius: 4, opacity: 0.8 }} />
          <span>Echos · Local AI lecture notes for macOS</span>
        </div>
        <div className="footer-links">
          <a href="https://github.com/Akoirala47/Echos">GitHub</a>
          <a href="https://github.com/Akoirala47/Echos/blob/main/README.md">Docs</a>
          <a href="https://github.com/Akoirala47/Echos/releases">Releases</a>
          <a href="https://github.com/Akoirala47/Echos/blob/main/LICENSE">MIT</a>
        </div>
      </footer>

      <TweaksPanelEchos />
    </>
  )
}
