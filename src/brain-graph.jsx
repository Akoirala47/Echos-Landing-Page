import { useEffect, useRef, useState } from 'react'

const NODE_DATA = [
  { id: "graphs",       label: "Graph Theory",       group: "math", r: 7 },
  { id: "algos",        label: "Algorithms",          group: "cs",   r: 7 },
  { id: "linalg",       label: "Linear Algebra",      group: "math", r: 6.5 },
  { id: "calc",         label: "Calculus",            group: "math", r: 6 },
  { id: "ml",           label: "Machine Learning",    group: "cs",   r: 6.5 },
  { id: "stats",        label: "Statistics",          group: "math", r: 5.5 },
  { id: "1on1",         label: "Manager 1:1",         group: "work", r: 5 },
  { id: "writing",      label: "Writing",             group: "life", r: 4.5 },
  { id: "dfs",          label: "DFS",                 group: "cs",   r: 3.5 },
  { id: "bfs",          label: "BFS",                 group: "cs",   r: 3.5 },
  { id: "dp",           label: "Dynamic Programming", group: "cs",   r: 4 },
  { id: "greedy",       label: "Greedy",              group: "cs",   r: 3 },
  { id: "topo",         label: "Topological Sort",    group: "cs",   r: 3 },
  { id: "dijkstra",     label: "Dijkstra",            group: "cs",   r: 3 },
  { id: "mst",          label: "MST",                 group: "cs",   r: 2.8 },
  { id: "complexity",   label: "Big-O",               group: "cs",   r: 3.2 },
  { id: "p-np",         label: "P vs NP",             group: "cs",   r: 3 },
  { id: "hashing",      label: "Hashing",             group: "cs",   r: 2.8 },
  { id: "eigen",        label: "Eigenvalues",         group: "math", r: 3.2 },
  { id: "svd",          label: "SVD",                 group: "math", r: 3 },
  { id: "vectors",      label: "Vectors",             group: "math", r: 3 },
  { id: "gradient",     label: "Gradient",            group: "math", r: 3 },
  { id: "integration",  label: "Integration",         group: "math", r: 2.8 },
  { id: "limits",       label: "Limits",              group: "math", r: 2.6 },
  { id: "bayes",        label: "Bayes",               group: "math", r: 2.8 },
  { id: "regression",   label: "Regression",          group: "math", r: 2.8 },
  { id: "nn",           label: "Neural Nets",         group: "cs",   r: 3.5 },
  { id: "transformers", label: "Transformers",        group: "cs",   r: 3.5 },
  { id: "backprop",     label: "Backprop",            group: "cs",   r: 3 },
  { id: "attention",    label: "Attention",           group: "cs",   r: 3 },
  { id: "embeddings",   label: "Embeddings",          group: "cs",   r: 3 },
  { id: "feedback",     label: "Feedback",            group: "work", r: 2.8 },
  { id: "hiring",       label: "Hiring",              group: "work", r: 2.6 },
  { id: "okrs",         label: "OKRs",                group: "work", r: 2.5 },
  { id: "essays",       label: "Essays",              group: "life", r: 2.5 },
  { id: "books",        label: "Books",               group: "life", r: 2.5 },
]

const LINK_DATA = [
  ["graphs", "dfs"], ["graphs", "bfs"], ["graphs", "topo"], ["graphs", "dijkstra"],
  ["graphs", "mst"], ["graphs", "algos"],
  ["algos", "dp"], ["algos", "greedy"], ["algos", "complexity"], ["algos", "p-np"],
  ["algos", "hashing"], ["algos", "dfs"], ["algos", "bfs"],
  ["dfs", "topo"], ["bfs", "dijkstra"], ["dijkstra", "mst"],
  ["linalg", "eigen"], ["linalg", "svd"], ["linalg", "vectors"],
  ["linalg", "ml"], ["eigen", "svd"],
  ["calc", "gradient"], ["calc", "integration"], ["calc", "limits"],
  ["calc", "ml"], ["gradient", "backprop"],
  ["ml", "nn"], ["ml", "transformers"], ["ml", "backprop"],
  ["ml", "attention"], ["ml", "embeddings"], ["ml", "regression"],
  ["nn", "backprop"], ["transformers", "attention"], ["transformers", "embeddings"],
  ["embeddings", "vectors"], ["attention", "vectors"],
  ["stats", "bayes"], ["stats", "regression"], ["stats", "ml"],
  ["1on1", "feedback"], ["1on1", "hiring"], ["1on1", "okrs"],
  ["writing", "essays"], ["writing", "books"],
  ["algos", "ml"],
]

const GROUP_COLOR = {
  math: "#a98d4a",
  cs:   "#c2410c",
  work: "#be185d",
  life: "#76746b",
}

export function BrainGraph() {
  const canvasRef = useRef(null)
  const wrapRef = useRef(null)
  const [tooltip, setTooltip] = useState(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    const ctx = canvas.getContext("2d")

    let W = 0, H = 0
    const dpr = Math.min(2, window.devicePixelRatio || 1)

    const nodes = NODE_DATA.map((n, i) => {
      const a = i / NODE_DATA.length * Math.PI * 2
      return { ...n, x: 0, y: 0, vx: 0, vy: 0, _initA: a }
    })
    const nodeById = Object.fromEntries(nodes.map((n) => [n.id, n]))
    const links = LINK_DATA
      .filter(([a, b]) => nodeById[a] && nodeById[b])
      .map(([a, b]) => ({ source: nodeById[a], target: nodeById[b] }))

    function resize() {
      const rect = wrap.getBoundingClientRect()
      W = rect.width
      H = rect.height
      canvas.width = W * dpr
      canvas.height = H * dpr
      canvas.style.width = W + "px"
      canvas.style.height = H + "px"
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      nodes.forEach((n) => {
        if (n.x === 0 && n.y === 0) {
          const r = Math.min(W, H) * 0.32
          n.x = W / 2 + Math.cos(n._initA) * r * (0.5 + Math.random() * 0.6)
          n.y = H / 2 + Math.sin(n._initA) * r * (0.5 + Math.random() * 0.6)
        }
      })
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(wrap)

    let mouse = { x: -1, y: -1, hover: null, dragging: null }
    function handleMove(e) {
      const r = canvas.getBoundingClientRect()
      mouse.x = e.clientX - r.left
      mouse.y = e.clientY - r.top
      if (mouse.dragging) {
        mouse.dragging.fx = mouse.x
        mouse.dragging.fy = mouse.y
      }
      let hover = null
      let bestDist = 14 * 14
      for (const n of nodes) {
        const dx = n.x - mouse.x, dy = n.y - mouse.y
        const d = dx * dx + dy * dy
        const target = (n.r + 6) * (n.r + 6)
        if (d < target && d < bestDist) { hover = n; bestDist = d }
      }
      mouse.hover = hover
      if (hover) {
        setTooltip({ x: mouse.x, y: mouse.y, label: hover.label })
        canvas.style.cursor = "grab"
      } else {
        setTooltip(null)
        canvas.style.cursor = "default"
      }
    }
    function handleLeave() {
      mouse.x = mouse.y = -1
      mouse.hover = null
      setTooltip(null)
      if (mouse.dragging) {
        mouse.dragging.fx = mouse.dragging.fy = null
        mouse.dragging = null
      }
    }
    function handleDown() {
      if (mouse.hover) {
        mouse.dragging = mouse.hover
        canvas.style.cursor = "grabbing"
      }
    }
    function handleUp() {
      if (mouse.dragging) {
        mouse.dragging.fx = mouse.dragging.fy = null
        mouse.dragging = null
        canvas.style.cursor = mouse.hover ? "grab" : "default"
      }
    }
    canvas.addEventListener("mousemove", handleMove)
    canvas.addEventListener("mouseleave", handleLeave)
    canvas.addEventListener("mousedown", handleDown)
    window.addEventListener("mouseup", handleUp)

    const LINK_DIST = 60
    const LINK_STRENGTH = 0.05
    const CHARGE = -120
    const CENTER_STRENGTH = 0.012
    const DAMPING = 0.85

    let raf
    let lastT = performance.now()
    function tick() {
      const now = performance.now()
      const dt = Math.min(0.05, (now - lastT) / 1000)
      lastT = now

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j]
          let dx = b.x - a.x, dy = b.y - a.y
          let d2 = dx * dx + dy * dy + 1
          let d = Math.sqrt(d2)
          const f = CHARGE / d2
          const fx = (dx / d) * f
          const fy = (dy / d) * f
          a.vx -= fx; a.vy -= fy
          b.vx += fx; b.vy += fy
        }
      }

      for (const link of links) {
        const a = link.source, b = link.target
        let dx = b.x - a.x, dy = b.y - a.y
        let d = Math.sqrt(dx * dx + dy * dy) || 1
        const diff = (d - LINK_DIST) * LINK_STRENGTH
        const fx = (dx / d) * diff
        const fy = (dy / d) * diff
        a.vx += fx; a.vy += fy
        b.vx -= fx; b.vy -= fy
      }

      for (const n of nodes) {
        n.vx += (W / 2 - n.x) * CENTER_STRENGTH
        n.vy += (H / 2 - n.y) * CENTER_STRENGTH
      }

      for (const n of nodes) {
        if (n.fx != null) { n.x = n.fx; n.y = n.fy; n.vx = n.vy = 0; continue }
        n.vx *= DAMPING; n.vy *= DAMPING
        n.x += n.vx
        n.y += n.vy
        const m = 20
        if (n.x < m) { n.x = m; n.vx *= -0.3 }
        if (n.y < m) { n.y = m; n.vy *= -0.3 }
        if (n.x > W - m) { n.x = W - m; n.vx *= -0.3 }
        if (n.y > H - m) { n.y = H - m; n.vy *= -0.3 }
      }

      ctx.clearRect(0, 0, W, H)

      for (const link of links) {
        const a = link.source, b = link.target
        const isHover = mouse.hover && (a === mouse.hover || b === mouse.hover)
        ctx.strokeStyle = isHover ? "rgba(231, 111, 36, 0.75)" : "rgba(231, 111, 36, 0.28)"
        ctx.lineWidth = isHover ? 1.4 : 0.7
        ctx.beginPath()
        ctx.moveTo(a.x, a.y)
        ctx.lineTo(b.x, b.y)
        ctx.stroke()
      }

      for (const n of nodes) {
        const isHover = mouse.hover === n
        const r = n.r + (isHover ? 1.5 : 0)
        ctx.fillStyle = GROUP_COLOR[n.group] || "#a98d4a"
        ctx.beginPath()
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2)
        ctx.fill()
        if (isHover) {
          ctx.strokeStyle = "rgba(29, 28, 25, 0.5)"
          ctx.lineWidth = 1
          ctx.stroke()
        }
      }

      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      canvas.removeEventListener("mousemove", handleMove)
      canvas.removeEventListener("mouseleave", handleLeave)
      canvas.removeEventListener("mousedown", handleDown)
      window.removeEventListener("mouseup", handleUp)
    }
  }, [])

  return (
    <div className="brain-canvas-wrap" ref={wrapRef}>
      <canvas ref={canvasRef}></canvas>
      <div className="brain-overlay">
        <span>brain · view</span>
        <span>247 nodes · 412 edges</span>
      </div>
      {tooltip && (
        <div
          className="brain-tooltip show"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          {tooltip.label}
        </div>
      )}
    </div>
  )
}
