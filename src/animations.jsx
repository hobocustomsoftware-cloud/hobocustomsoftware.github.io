import { useEffect, useMemo, useRef, useState } from 'react'

const prefersReduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/* Fires once when the element scrolls into view */
export function useInView(threshold = 0.15) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          io.disconnect()
        }
      },
      { threshold, rootMargin: '0px 0px -6% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [threshold])

  return [ref, inView]
}

/* Slides in (up / left / right) with a soft fade + blur when scrolled into view */
export function Reveal({ as: Tag = 'div', from = 'up', delay = 0, className = '', children, ...rest }) {
  const [ref, inView] = useInView()
  return (
    <Tag
      ref={ref}
      data-from={from}
      className={`reveal ${inView ? 'in' : ''} ${className}`.trim()}
      style={{ '--d': `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

/* Adds an "in" class to its wrapper when scrolled into view (used for the timeline line) */
export function InViewBox({ className = '', children }) {
  const [ref, inView] = useInView(0.1)
  return (
    <div ref={ref} className={`${className} ${inView ? 'in' : ''}`.trim()}>
      {children}
    </div>
  )
}

/* Number that counts up once visible */
export function CountUp({ value, suffix = '', decimals = 0, duration = 1400 }) {
  const [ref, inView] = useInView(0.6)
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (prefersReduced()) {
      setN(value)
      return
    }
    let raf
    let start
    const tick = (t) => {
      if (start === undefined) start = t
      const p = Math.min((t - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setN(value * eased)
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value, duration])

  return (
    <span ref={ref}>
      {n.toFixed(decimals)}
      {suffix}
    </span>
  )
}

/* Types text out character by character, with a blinking caret */
export function Typewriter({ text, speed = 60, startDelay = 0 }) {
  const [ref, inView] = useInView(0.5)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (prefersReduced()) {
      setCount(text.length)
      return
    }
    let interval
    const timeout = setTimeout(() => {
      let i = 0
      interval = setInterval(() => {
        i += 1
        setCount(i)
        if (i >= text.length) clearInterval(interval)
      }, speed)
    }, startDelay)
    return () => {
      clearTimeout(timeout)
      clearInterval(interval)
    }
  }, [inView, text, speed, startDelay])

  return (
    <span ref={ref}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {text.slice(0, count)}
        <span className="caret" />
      </span>
    </span>
  )
}

/* Thin amber bar at the top showing scroll progress */
export function ScrollProgress() {
  const [p, setP] = useState(0)

  useEffect(() => {
    const update = () => {
      const h = document.documentElement
      const max = h.scrollHeight - h.clientHeight
      setP(max > 0 ? h.scrollTop / max : 0)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return <div className="progress" style={{ transform: `scaleX(${p})` }} aria-hidden="true" />
}

/* Returns the id of the section currently in view (for nav highlight) */
export function useActiveSection(ids) {
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => {
      const line = window.innerHeight * 0.35
      let current = ''
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= line) current = id
      }
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4
      if (atBottom) current = ids[ids.length - 1]
      setActive(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [ids])

  return active
}

/*
  Letter-by-letter text. Each character slides up + fades in with a stagger.
  - text: plain string, OR segments: [{ t: 'text', className: 'hl' }, ...] for styled parts
  - gap: ms between letters, delay: ms before the first letter
*/
export function AnimatedText({
  as: Tag = 'span',
  text,
  segments,
  gap = 20,
  delay = 0,
  className = '',
  ...rest
}) {
  const [ref, inView] = useInView(0.2)

  const { words, plain } = useMemo(() => {
    const segs = segments || [{ t: text || '' }]
    const chars = []
    segs.forEach((seg) => {
      Array.from(seg.t).forEach((ch) => chars.push({ ch, cls: seg.className || '' }))
    })
    // group into words so lines only wrap between words
    const out = []
    let current = []
    chars.forEach((c) => {
      if (c.ch === ' ') {
        if (current.length) out.push(current)
        current = []
      } else {
        current.push(c)
      }
    })
    if (current.length) out.push(current)
    return { words: out, plain: segs.map((x) => x.t).join('') }
  }, [text, segments])

  let idx = 0
  return (
    <Tag
      ref={ref}
      className={`split ${inView ? 'in' : ''} ${className}`.trim()}
      style={{ '--gap': `${gap}ms`, '--start': `${delay}ms` }}
      {...rest}
    >
      <span className="sr-only">{plain}</span>
      <span aria-hidden="true">
        {words.map((word, wi) => (
          <span key={wi}>
            <span className="word">
              {word.map((c, ci) => (
                <span className={`ch ${c.cls}`.trim()} style={{ '--ci': idx++ }} key={ci}>
                  {c.ch}
                </span>
              ))}
            </span>
            {wi < words.length - 1 ? ' ' : ''}
          </span>
        ))}
      </span>
    </Tag>
  )
}
