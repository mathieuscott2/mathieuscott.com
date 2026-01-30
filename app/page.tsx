export default function Home() {
  return (
    <main className="portfolio-page">
      {/* Navigation */}
      <nav className="nav-fixed">
        <div className="nav-container">
          <div className="logo">AI_LAB</div>
          <ul className="nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#philosophy">Philosophy</a></li>
            <li><a href="#protected" className="protected">█ Mil-Tech</a></li>
          </ul>
        </div>
      </nav>

      <div className="container">
        {/* Hero Section */}
        <section id="home" className="hero">
          <div className="hero-tag">PRODUCT × ADTECH × AI</div>
          <h1>BUILDING<br/>THE FUTURE<br/>OF PRODUCT</h1>
          <p className="hero-subtitle">CODE. TEST. SHIP<span className="cursor-blink"></span></p>
          <p className="hero-description">
            AI fundamentally transforms product management. PMs are no longer just strategists—they&apos;re builders. I prototype end-to-end solutions, test with real markets, and iterate at machine speed. This is the lab where product vision becomes executable reality.
          </p>
        </section>

        <div className="deco-line"></div>

        {/* Philosophy Section */}
        <section id="philosophy" className="philosophy">
          <h2>THE NEW PARADIGM</h2>
          <p>
            Product management stopped at specs. AI changes that. I build prototypes, validate assumptions, and ship products—all without waiting for engineering sprints. This isn&apos;t about replacing teams. It&apos;s about empowering PMs to move at the speed of thought. The PM who can code wins. The PM who can prototype with AI dominates.
          </p>
        </section>

        {/* Projects Section */}
        <h2 className="section-title" id="projects">PROJECTS</h2>
        <div className="projects-grid">
          <div className="project-card">
            <div className="project-icon">▓</div>
            <h3>SMART SPORTS CALENDAR</h3>
            <span className="project-tag">ChatGPT Integration</span>
            <p className="project-description">
              Intelligent calendar system that ingests live sports events and uses ChatGPT to automatically categorize them into actionable buying opportunities.
            </p>
            <div className="project-tech">
              <span className="tech-badge">GPT-4</span>
              <span className="tech-badge">Real-time</span>
              <span className="tech-badge">AdTech</span>
            </div>
          </div>

          <div className="project-card">
            <div className="project-icon">▓</div>
            <h3>ML-FIRST FORECASTER</h3>
            <span className="project-tag">Pure ML Approach</span>
            <p className="project-description">
              Revolutionary forecasting tool that relies exclusively on pacing documents and machine learning. The pacing doc becomes the single source of truth.
            </p>
            <div className="project-tech">
              <span className="tech-badge">ML Models</span>
              <span className="tech-badge">Predictive</span>
              <span className="tech-badge">AdOps</span>
            </div>
          </div>

          <div className="project-card">
            <div className="project-icon">▓</div>
            <h3>GENAI VIDEO MAKER</h3>
            <span className="project-tag">Generative AI</span>
            <p className="project-description">
              Advertising video creation platform powered by generative AI. Transform campaign briefs into production-ready video ads in minutes.
            </p>
            <div className="project-tech">
              <span className="tech-badge">Stable Diffusion</span>
              <span className="tech-badge">LLMs</span>
              <span className="tech-badge">Video Gen</span>
            </div>
          </div>
        </div>

        <div className="deco-line"></div>

        {/* Protected Section */}
        <section id="protected" className="protected-section">
          <h2>DRONES & MILITARY TECH</h2>
          <p>CLASSIFIED WORK IN DRONE TECHNOLOGY AND MILITARY APPLICATIONS</p>
          <button className="access-button">█ REQUEST ACCESS █</button>
        </section>
      </div>

      {/* Footer */}
      <footer>
        <div className="footer-content">
          <div className="footer-links">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="mailto:contact@mathieuscott.com">Email</a>
          </div>
          <p>█ AI × CODE × VISION | 2026 █</p>
        </div>
      </footer>
    </main>
  );
}