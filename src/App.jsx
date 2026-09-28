import {
  Reveal,
  AnimatedText,
  InViewBox,
  CountUp,
  Typewriter,
  ScrollProgress,
  useActiveSection,
} from './animations.jsx'

const NAV_IDS = ['about', 'skills', 'experience', 'projects', 'contact']

export default function App() {
  return (
    <>
      <div className="ambient" aria-hidden="true">
        <span className="blob blob-a" />
        <span className="blob blob-b" />
      </div>
      <ScrollProgress />
      <TopBar />
      <main className="wrap">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
      </main>
      <Contact />
      <Footer />
    </>
  )
}

function SectionHead({ eyebrow, title }) {
  return (
    <>
      <AnimatedText as="p" className="section-eyebrow" text={eyebrow} gap={35} />
      <AnimatedText as="h2" className="section-title" text={title} gap={38} delay={300} />
    </>
  )
}

function TopBar() {
  const active = useActiveSection(NAV_IDS)
  const links = [
    ['about', 'About'],
    ['skills', 'Skills'],
    ['experience', 'Experience'],
    ['projects', 'Projects'],
    ['contact', 'Contact'],
  ]

  return (
    <header className="topbar">
      <div className="topbar-inner">
        <a href="#top" className="brand">
          <span className="brand-dot" />
          tinhtoonaing.dev
        </a>
        <nav className="navlinks-mobile-hide">
          <ul className="navlinks">
            {links.map(([id, label]) => (
              <li key={id}>
                <a href={`#${id}`} className={active === id ? 'active' : ''}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

function Hero() {
  const metrics = [
    { value: 5, suffix: '+', label: 'Years experience' },
    { value: 20, suffix: '+', label: 'Projects shipped' },
    { value: 3, suffix: '', label: 'Companies' },
    { value: 99.9, suffix: '%', decimals: 1, label: 'Uptime shipped' },
  ]

  return (
    <section id="top" className="hero">
      <span className="status-pill rise" style={{ '--d': '0ms' }}>
        <span className="pulse" />
        OPEN TO NEW ROLES
      </span>

      <h1 className="rise" style={{ '--d': '80ms' }}>
        <Typewriter text="Tin Htoo Naing" speed={75} startDelay={450} />
      </h1>
      <AnimatedText
        as="p"
        className="role"
        gap={11}
        delay={1400}
        segments={[
          { t: 'Senior Full Stack Web Developer', className: 'hl' },
          { t: ' building fast, reliable web applications — from backend APIs to the pixels people actually click on.' },
        ]}
      />

      <div className="hero-actions rise" style={{ '--d': '2000ms' }}>
        <a className="btn btn-primary" href="#projects">View projects</a>
        <a className="btn btn-ghost" href="/resume.pdf" target="_blank" rel="noreferrer">Download resume</a>
      </div>

      <div className="metrics rise" style={{ '--d': '2250ms' }}>
        {metrics.map((m) => (
          <div className="metric" key={m.label}>
            <span className="num">
              <CountUp value={m.value} suffix={m.suffix} decimals={m.decimals || 0} />
            </span>
            <span className="label">{m.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

function About() {
  const rows = [
    ['name', 'Tin Htoo Naing'],
    ['role', 'Senior Full Stack Web Developer'],
    ['location', 'Yangon, Myanmar'],
    ['availability', 'Open to work'],
    ['timezone', 'GMT+6:30'],
  ]

  return (
    <section id="about" className="section">
      <SectionHead eyebrow="// about" title="Who's building this" />
      <div className="about-grid">
        <div className="about-text">
          <AnimatedText
            as="p"
            gap={7}
            delay={500}
            text="I'm a software engineer based in Yangon, Myanmar, focused on building web products that stay fast and dependable under real-world load. Over the past five years I've worked across the stack — designing APIs, shaping databases, and building the interfaces people spend their day in."
          />
          <AnimatedText
            as="p"
            gap={7}
            delay={2400}
            text="I care most about the boring parts other people skip: error states, loading states, the thing that breaks at 2am. Good software is mostly good judgment about what to build and what to leave alone."
          />
        </div>
        <Reveal from="right" delay={300}>
          <div className="config-card">
            {rows.map(([key, val], i) => (
              <div className="config-row" style={{ '--i': i }} key={key}>
                <span className="config-key">{key}</span>
                <span className="config-val">{val}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Skills() {
  const groups = [
    {
      label: '// languages',
      items: ['HTML/HTML5', 'CSS/CSS3', 'JavaScript', 'PHP', 'Python', 'SQL'],
    },
    {
      label: '// frameworks & libraries',
      items: ['React', 'React Native Expo', 'Vue.js', 'Flutter', 'Tailwind CSS', 'Bootstrap', 'Laravel', 'Django', 'Django Rest Framework'],
    },
    {
      label: '// infrastructure & tools',
      items: ['MySQL', 'SQLite', 'PostgreSQL', 'Docker', 'Git'],
    },
    {
      label: '// infrastructure & tools',
      items: ['Adobe Photoshop', 'Illustrator', 'Indesign', 'Premiere Pro', 'After Effect', 'figma'],
    },
  ]

  return (
    <section id="skills" className="section">
      <SectionHead eyebrow="// stack" title="What I work with" />
      <div className="skills-grid">
        {groups.map((g, gi) => (
          <Reveal delay={gi * 120} key={g.label}>
            <div className="skill-panel">
              <p className="skill-comment">{g.label}</p>
              <div className="chip-row">
                {g.items.map((item, i) => (
                  <span className="chip" style={{ '--i': i }} key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Experience() {
  const jobs = [
    {
      period: '2023 — Present',
      role: 'Senior Software Engineer',
      company: 'Company Name',
      points: [
        'Led migration of a monolith to a service-based architecture, cutting deploy time from 40 minutes to 6.',
        'Built an internal analytics dashboard used by 8 teams to track product metrics.',
      ],
    },
    {
      period: '2021 — 2023',
      role: 'Software Engineer',
      company: 'Company Name',
      points: [
        'Shipped the payments flow for a consumer app handling ~10k transactions per day.',
        'Reduced API p95 latency by 45% through query optimization and caching.',
      ],
    },
    {
      period: '2020 — 2021',
      role: 'Junior Developer',
      company: 'Company Name',
      points: [
        'Built and maintained internal tooling used across the engineering org.',
      ],
    },
  ]

  return (
    <section id="experience" className="section">
      <SectionHead eyebrow="// experience" title="Where I've worked" />
      <InViewBox className="log">
        {jobs.map((job, i) => (
          <Reveal
            from="left"
            className={`log-entry ${i === 0 ? 'log-current' : ''}`}
            delay={i * 140}
            key={job.role + job.period}
          >
            <p className="log-meta">{job.period}</p>
            <h3 className="log-role">{job.role}</h3>
            <p className="log-company">{job.company}</p>
            <ul>
              {job.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </Reveal>
        ))}
      </InViewBox>
    </section>
  )
}

function Projects() {
  const projects = [
    {
      status: 'deployed',
      title: 'Project One',
      description: 'One-line summary of what this project does and who it is for.',
      tags: ['React', 'Node.js', 'PostgreSQL'],
      live: '#',
      repo: '#',
    },
    {
      status: 'deployed',
      title: 'Project Two',
      description: 'One-line summary of what this project does and who it is for.',
      tags: ['Next.js', 'Tailwind', 'Stripe'],
      live: '#',
      repo: '#',
    },
    {
      status: 'archived',
      title: 'Project Three',
      description: 'One-line summary of what this project does and who it is for.',
      tags: ['Python', 'FastAPI'],
      live: null,
      repo: '#',
    },
    {
      status: 'deployed',
      title: 'Project Four',
      description: 'One-line summary of what this project does and who it is for.',
      tags: ['Go', 'Docker', 'AWS'],
      live: '#',
      repo: '#',
    },
  ]

  return (
    <section id="projects" className="section">
      <SectionHead eyebrow="// projects" title="Things I've built" />
      <div className="projects-grid">
        {projects.map((p, i) => (
          <Reveal from={i % 2 === 0 ? 'left' : 'right'} delay={(i % 2) * 120} key={p.title}>
            <div className="project-card">
              <span className={`badge ${p.status === 'deployed' ? 'badge-deployed' : 'badge-archived'}`}>
                {p.status}
              </span>
              <h3>{p.title}</h3>
              <p>{p.description}</p>
              <div className="project-tags">
                {p.tags.map((t) => (
                  <span className="tag" key={t}>{t}</span>
                ))}
              </div>
              <div className="project-links">
                {p.live && <a href={p.live} target="_blank" rel="noreferrer">Live →</a>}
                <a href={p.repo} target="_blank" rel="noreferrer">Code →</a>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" className="contact wrap">
      <p className="terminal-line">
        <span className="prompt">$</span> <Typewriter text="whoami --contact" speed={70} />
      </p>
      <AnimatedText as="h2" text="Let's build something." gap={45} delay={600} />
      <div className="contact-links">
        <Reveal delay={1500}>
          <a className="btn btn-primary" href="tel:+959757393574">Call — 09757393574</a>
        </Reveal>
        <Reveal delay={1650}>
          <a className="btn btn-ghost" href="viber://chat?number=%2B959964851547" target="_blank" rel="noreferrer">Viber — 09964851547</a>
        </Reveal>
        <Reveal delay={1800}>
          <a className="btn btn-ghost" href="https://t.me/htoomyateain7" target="_blank" rel="noreferrer">Telegram — @htoomyateain7</a>
        </Reveal>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer>
      © {new Date().getFullYear()} Tin Htoo Naing — built with React, deployed on GitHub Pages.
    </footer>
  )
}
