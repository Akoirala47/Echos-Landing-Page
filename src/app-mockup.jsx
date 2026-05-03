import { useState, useEffect, useRef, useCallback } from 'react'

function useWindowWidth() {
  const [width, setWidth] = useState(() => window.innerWidth)
  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])
  return width
}

const TRANSCRIPT_LINES = [
  { t: 0,    text: "Okay so today we're going to talk about depth-first search and how it relates to" },
  { t: 2.0,  text: " topological ordering on a directed acyclic graph." },
  { t: 4.4,  text: " The key insight is that when DFS finishes a node," },
  { t: 6.0,  text: " all of its descendants have already been processed." },
  { t: 8.6,  text: " So if we push nodes onto a stack at finish time," },
  { t: 10.2, text: " popping them off gives a valid topological order." },
  { t: 12.8, text: " Let's look at runtime — it's O of V plus E," },
  { t: 14.4, text: " same as plain DFS, no overhead." },
]

const NOTES_BLOCKS = [
  { delay: 6.5,  type: "h2",   text: "Topological Sort via DFS" },
  { delay: 7.5,  type: "p",    text: "Linear ordering of vertices in a DAG such that for every edge (u → v), u appears before v." },
  { delay: 9.5,  type: "h3",   text: "Algorithm" },
  { delay: 10.5, type: "li",   text: "Run DFS, track finish times" },
  { delay: 11.5, type: "li",   text: "Push each node onto stack at finish" },
  { delay: 12.5, type: "li",   text: "Pop stack → topological order" },
  { delay: 14.0, type: "h3",   text: "Complexity" },
  { delay: 15.0, type: "code", text: "O(V + E)  — same as DFS" },
]

const TOTAL_DURATION = 17

function useAnimationClock(duration, paused) {
  const [t, setT] = useState(0)
  useEffect(() => {
    if (paused) return
    let raf
    let start = performance.now() - t * 1000
    const tick = (now) => {
      const elapsed = ((now - start) / 1000) % duration
      setT(elapsed)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [paused, duration])
  return t
}

function Waveform({ time, recording }) {
  const bars = 60
  const items = []
  for (let i = 0; i < bars; i++) {
    const seed = Math.sin(i * 1.7) * 0.5 + 0.5
    const wave = recording
      ? 0.35 + 0.65 * Math.abs(Math.sin(time * 4 + i * 0.5)) * (0.4 + 0.6 * seed)
      : 0.15 + 0.1 * seed
    const h = Math.max(2, wave * 22)
    const opacity = recording ? (i < (time * 60) % bars ? 0.85 : 0.35) : 0.4
    items.push(
      <span
        key={i}
        style={{
          display: "inline-block",
          width: 1,
          height: h,
          background: "var(--ink)",
          opacity,
          marginRight: 3,
          transition: "height 80ms",
        }}
      />
    )
  }
  return <div style={{ display: "flex", alignItems: "center", flex: 1, height: 24 }}>{items}</div>
}

function NoteBlocks({ visibleNotes }) {
  return (
    <>
      {visibleNotes.map((b, i) => {
        const cls = "fade-in"
        if (b.type === "h2") return <h3 key={i} className={cls} style={{ fontSize: 15, fontWeight: 600, margin: "8px 0 6px", letterSpacing: "-0.01em" }}>{b.text}</h3>
        if (b.type === "h3") return <h4 key={i} className={cls} style={{ fontSize: 12.5, fontWeight: 600, margin: "12px 0 4px", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{b.text}</h4>
        if (b.type === "li") return (
          <div key={i} className={cls} style={{ fontSize: 13, paddingLeft: 16, position: "relative", margin: "3px 0" }}>
            <span style={{ position: "absolute", left: 4, color: "var(--accent)" }}>•</span>{b.text}
          </div>
        )
        if (b.type === "code") return (
          <div key={i} className={cls} style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: 12,
            background: "var(--bg-2)", padding: "8px 10px", borderRadius: 4,
            margin: "8px 0", color: "var(--ink)", border: "1px solid var(--border-soft)",
          }}>{b.text}</div>
        )
        return <p key={i} className={cls} style={{ fontSize: 13, margin: "4px 0", color: "var(--muted)" }}>{b.text}</p>
      })}
      {visibleNotes.length > 0 && (
        <span style={{
          display: "inline-block", width: 6, height: 13,
          background: "var(--accent)", marginTop: 4,
          animation: "pulse-rec 1s ease infinite",
        }}></span>
      )}
    </>
  )
}

export function MockApp() {
  const [paused, setPaused] = useState(false)
  const [activeTab, setActiveTab] = useState("transcript")
  const t = useAnimationClock(TOTAL_DURATION, paused)
  const windowWidth = useWindowWidth()
  const isMobile = windowWidth < 640

  const visibleLines = TRANSCRIPT_LINES.filter((l) => l.t <= t)
  const transcriptText = visibleLines.map((l) => l.text).join("")
  const caret = Math.floor(t * 2) % 2 === 0 ? "▍" : ""
  const visibleNotes = NOTES_BLOCKS.filter((b) => b.delay <= t)
  const mm = String(Math.floor(t / 60)).padStart(2, "0")
  const ss = String(Math.floor(t % 60)).padStart(2, "0")

  const panelHeader = (label, actions) => (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "10px 16px",
      borderBottom: "1px solid var(--border-soft)",
      background: "var(--panel)",
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 10.5, letterSpacing: "0.12em", color: "var(--faint)",
    }}>
      <span>{label}</span>
      <span style={{ display: "flex", gap: 14 }}>{actions}</span>
    </div>
  )

  return (
    <div className="window" role="img" aria-label="Echos app — live recording with streaming transcript and notes">
      <div className="titlebar">
        <div className="tl"><span className="r"></span><span className="y"></span><span className="g"></span></div>
        <div className="tb-title">Echos — CS 374 · Lecture 12</div>
        <div style={{ width: isMobile ? 0 : 60 }}></div>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "180px 1fr",
        minHeight: isMobile ? 320 : 420,
      }}>
        {/* sidebar — hidden on mobile */}
        {!isMobile && (
          <aside style={{
            background: "var(--bg-2)",
            borderRight: "1px solid var(--border)",
            padding: "14px 12px",
            fontSize: 12.5,
            color: "var(--muted)",
          }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.12em", color: "var(--faint)", marginBottom: 8 }}>VAULT</div>
            {[
              { name: "School", expand: true, depth: 0 },
              { name: "CS 374", expand: true, depth: 1 },
              { name: "Lectures", expand: true, depth: 2, active: true },
              { name: "Lecture-11.md", depth: 3, leaf: true },
              { name: "Lecture-12.md", depth: 3, leaf: true, current: true },
              { name: "Assignments", depth: 2 },
              { name: "ECE 220", depth: 1 },
              { name: "Work", depth: 0 },
            ].map((item, i) => (
              <div key={i} style={{
                padding: "3px 6px 3px " + (4 + item.depth * 12) + "px",
                borderRadius: 4,
                background: item.current ? "var(--selected-strong)" : item.active ? "var(--selected)" : "transparent",
                color: item.current ? "var(--accent)" : "var(--ink)",
                fontWeight: item.current ? 500 : 400,
                fontSize: item.leaf ? 12 : 12.5,
                fontFamily: item.leaf ? "'JetBrains Mono', monospace" : "inherit",
                display: "flex", gap: 6, alignItems: "center",
                cursor: "default",
              }}>
                <span style={{ color: "var(--faint)", fontSize: 10 }}>
                  {item.leaf ? "·" : item.expand ? "▾" : "▸"}
                </span>
                <span>{item.name}</span>
              </div>
            ))}
            <div style={{ marginTop: 22, fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.12em", color: "var(--faint)", marginBottom: 8 }}>TOPICS</div>
            {[
              { name: "CS 374", color: "var(--accent)", active: true },
              { name: "Manager 1:1", color: "var(--rose)" },
              { name: "Idea Capture", color: "var(--olive)" },
            ].map((tp, i) => (
              <div key={i} style={{
                padding: "4px 6px", borderRadius: 4,
                background: tp.active ? "var(--selected)" : "transparent",
                fontSize: 12.5, display: "flex", alignItems: "center", gap: 8,
                color: tp.active ? "var(--ink)" : "var(--muted)",
              }}>
                <span style={{ width: 7, height: 7, borderRadius: 999, background: tp.color }}></span>
                {tp.name}
              </div>
            ))}
          </aside>
        )}

        {/* main column */}
        <div style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
          {/* status bar */}
          <div style={{
            display: "flex", alignItems: "center", gap: isMobile ? 8 : 12,
            padding: isMobile ? "8px 12px" : "10px 16px",
            background: "var(--statusbar)",
            borderBottom: "1px solid var(--border-soft)",
            fontSize: isMobile ? 12 : 13,
            overflow: "hidden",
          }}>
            <span style={{
              width: 8, height: 8, flexShrink: 0, borderRadius: 999,
              background: "var(--recording)",
              animation: "pulse-rec 1.4s ease infinite",
            }}></span>
            <strong style={{ fontWeight: 600, whiteSpace: "nowrap" }}>CS 374 · Lecture 12</strong>
            {!isMobile && (
              <span style={{ color: "var(--faint)", fontFamily: "'JetBrains Mono', monospace", fontSize: 11, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                School / CS 374 / Lectures
              </span>
            )}
            <div style={{ flex: 1 }}></div>
            <span className="mono" style={{ fontSize: 11, color: "var(--muted)", whiteSpace: "nowrap" }}>Session 12</span>
          </div>

          {/* record bar */}
          <div style={{
            display: "flex", alignItems: "center", gap: isMobile ? 8 : 12,
            padding: isMobile ? "8px 12px" : "10px 16px",
            background: "var(--panel)",
            borderBottom: "1px solid var(--border-soft)",
          }}>
            <button
              onClick={() => setPaused((p) => !p)}
              style={{
                display: "inline-flex", alignItems: "center", gap: 7,
                padding: isMobile ? "6px 10px" : "7px 14px",
                background: paused ? "var(--ready)" : "var(--paused)",
                color: "white",
                fontSize: isMobile ? 11.5 : 12.5, fontWeight: 500,
                borderRadius: 6,
                transition: "background 120ms",
                whiteSpace: "nowrap",
              }}
            >
              <span style={{ fontSize: 10 }}>{paused ? "▶" : "❚❚"}</span>
              {paused ? "Resume" : "Pause"}
            </button>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--muted)", whiteSpace: "nowrap" }}>
              <span style={{
                width: 6, height: 6, borderRadius: 999,
                background: paused ? "var(--paused)" : "var(--recording)",
                animation: paused ? "none" : "pulse-rec 1.4s ease infinite",
              }}></span>
              {paused ? "Paused" : "Rec"}
            </span>
            <Waveform time={t} recording={!paused} />
            <span className="mono" style={{ fontSize: 12, color: "var(--ink)", minWidth: 40, textAlign: "right" }}>
              {mm}:{ss}
            </span>
          </div>

          {/* mobile tab switcher */}
          {isMobile && (
            <div style={{
              display: "flex",
              borderBottom: "1px solid var(--border-soft)",
              background: "var(--panel)",
            }}>
              {["transcript", "notes"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    flex: 1, padding: "8px 0",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 10, letterSpacing: "0.10em",
                    textTransform: "uppercase",
                    color: activeTab === tab ? "var(--accent)" : "var(--faint)",
                    borderBottom: activeTab === tab ? "2px solid var(--accent)" : "2px solid transparent",
                    background: "transparent",
                    cursor: "pointer",
                  }}
                >
                  {tab === "transcript" ? "Transcript" : "Notes"}
                </button>
              ))}
            </div>
          )}

          {/* panels */}
          {isMobile ? (
            /* mobile: single-panel with tab switcher */
            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
              {activeTab === "transcript" ? (
                <div style={{
                  padding: "14px 16px",
                  fontSize: 13, lineHeight: 1.6, color: "var(--ink)",
                  fontFamily: "'JetBrains Mono', monospace",
                  overflow: "hidden", flex: 1,
                }}>
                  {transcriptText}
                  <span style={{ color: "var(--accent)" }}>{caret}</span>
                </div>
              ) : (
                <div style={{ padding: "14px 16px", flex: 1, overflow: "hidden" }}>
                  <NoteBlocks visibleNotes={visibleNotes} />
                </div>
              )}
            </div>
          ) : (
            /* desktop: side-by-side panels */
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", flex: 1, minHeight: 0 }}>
              {/* transcript */}
              <div style={{ borderRight: "1px solid var(--border-soft)", display: "flex", flexDirection: "column" }}>
                {panelHeader("LIVE TRANSCRIPT", <><span>CLEAR</span><span>EXPORT .TXT</span></>)}
                <div style={{
                  padding: "16px 18px",
                  fontSize: 13.5, lineHeight: 1.6, color: "var(--ink)",
                  fontFamily: "'JetBrains Mono', monospace",
                  overflow: "hidden", flex: 1, minHeight: 220,
                }}>
                  {transcriptText}
                  <span style={{ color: "var(--accent)" }}>{caret}</span>
                </div>
              </div>

              {/* notes */}
              <div style={{ display: "flex", flexDirection: "column" }}>
                {panelHeader("STRUCTURED NOTES", <><span>COPY</span><span style={{ color: "var(--accent)" }}>RAW</span></>)}
                <div style={{ padding: "16px 18px", fontSize: 13.5, lineHeight: 1.5, overflow: "hidden", flex: 1 }}>
                  <NoteBlocks visibleNotes={visibleNotes} />
                </div>
                <div style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "10px 16px",
                  borderTop: "1px solid var(--border-soft)",
                  background: "var(--panel)",
                }}>
                  <button style={{
                    fontSize: 12, padding: "6px 12px",
                    background: "var(--bg-2)", color: "var(--muted)",
                    border: "1px solid var(--border)", borderRadius: 5, cursor: "default",
                  }}>Generate Notes</button>
                  <button style={{
                    fontSize: 12, padding: "6px 12px",
                    background: "var(--panel)", color: "var(--ink)",
                    border: "1px solid var(--border)", borderRadius: 5, cursor: "default",
                  }}>Regenerate…</button>
                  <div style={{ flex: 1 }}></div>
                  <span className="mono" style={{ fontSize: 10.5, color: "var(--faint)" }}>
                    gemma-4-31b · streaming
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* status footer */}
          <div style={{
            display: "flex", alignItems: "center", gap: isMobile ? 8 : 12,
            padding: isMobile ? "6px 12px" : "8px 16px",
            background: "var(--statusbar)",
            borderTop: "1px solid var(--border-soft)",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: isMobile ? 9.5 : 10.5, color: "var(--faint)",
            letterSpacing: "0.04em",
            overflow: "hidden",
          }}>
            <span style={{ color: "var(--ready)", whiteSpace: "nowrap" }}>● MPS</span>
            <span style={{ whiteSpace: "nowrap" }}>whisper-large-v3</span>
            {!isMobile && <><span>·</span><span>vault indexed · 247 notes</span></>}
            <div style={{ flex: 1 }}></div>
            <span style={{ color: "var(--muted)", whiteSpace: "nowrap" }}>End Session</span>
          </div>
        </div>
      </div>
    </div>
  )
}
