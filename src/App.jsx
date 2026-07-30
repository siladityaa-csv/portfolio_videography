import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiPlay, FiMail, FiChevronUp } from 'react-icons/fi';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import Lenis from 'lenis';
import 'swiper/css';
import 'swiper/css/effect-fade';
import { portfolioData, skills, services, processSteps, testimonials } from './data/portfolioData';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import HeroScene from './components/HeroScene';

function App() {
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [cursorActive, setCursorActive] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 1400);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, smoothWheel: true, touchMultiplier: 1.8 });
    let frame = 0;
    const raf = (time) => {
      lenis.raf(time);
      frame = window.requestAnimationFrame(raf);
    };
    frame = window.requestAnimationFrame(raf);

    const onScroll = () => {
      const maxHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(maxHeight > 0 ? window.scrollY / maxHeight : 0);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const onMove = (event) => {
      setCursorPosition({ x: event.clientX, y: event.clientY });
    };
    const onOver = (event) => {
      const target = event.target;
      if (target instanceof HTMLElement && target.closest('a, button, input, textarea, .interactive')) {
        setCursorActive(true);
      }
    };
    const onLeave = () => setCursorActive(false);

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    window.addEventListener('mouseout', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      window.removeEventListener('mouseout', onLeave);
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#04070d] text-white">
      <div className="pointer-events-none fixed inset-0 z-[60] overflow-hidden">
        <div className="absolute left-0 top-0 h-full w-full bg-[radial-gradient(circle_at_center,_rgba(56,189,248,0.08),_transparent_30%)]" />
        <div className="noise-overlay" />
      </div>
      <div className="pointer-events-none fixed inset-0 z-[70]">
        <div
          className={`cursor-glow ${cursorActive ? 'scale-125 opacity-100' : 'opacity-80'}`}
          style={{ transform: `translate(${cursorPosition.x}px, ${cursorPosition.y}px)` }}
        />
      </div>
      <div className="fixed left-0 top-0 z-[90] h-1 w-full bg-white/10">
        <motion.div className="h-full bg-gradient-to-r from-fuchsia-500 via-violet-500 to-cyan-400" style={{ scaleX: scrollProgress, transformOrigin: 'left' }} />
      </div>

      <AnimatePresence>{loading && <LoadingScreen />}</AnimatePresence>

      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/30 backdrop-blur-2xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <a href="#home" className="font-display text-lg tracking-[0.35em] text-white/90">SILADITYA</a>
          <div className="hidden items-center gap-8 text-sm text-white/70 md:flex">
            {['About', 'Skills', 'Work', 'Process', 'Contact'].map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} className="transition hover:text-white">{link}</a>
            ))}
          </div>
        </nav>
      </header>

      <main>
        <section id="home" className="relative overflow-hidden px-6 pb-24 pt-20 lg:px-8 lg:pb-32 lg:pt-28">
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute left-[-10%] top-[-8%] h-72 w-72 rounded-full bg-fuchsia-600/25 blur-3xl" />
            <div className="absolute bottom-[-6%] right-[-8%] h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.14),_transparent_35%)]" />
          </div>

          <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="space-y-8">
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">
                <span className="h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_16px_rgba(34,211,238,0.8)]" />
                Premium motion storytelling for brands, creators, and launches
              </motion.div>

              <div className="space-y-4">
                <h1 className="max-w-4xl font-display text-5xl leading-[0.9] text-white sm:text-6xl lg:text-7xl xl:text-[5.4rem]">
                  Crafting Stories Through Motion
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-white/70">Video Editor • Photo Editor • Content Creator</p>
              </div>

              <div className="flex flex-wrap gap-4">
                <MagneticButton href="#work" className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/20">
                  View Portfolio <FiArrowRight className="transition group-hover:translate-x-1" />
                </MagneticButton>
                <MagneticButton href="#contact" className="rounded-full bg-gradient-to-r from-fuchsia-600 via-violet-600 to-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_40px_rgba(124,58,237,0.35)]">
                  Contact Me
                </MagneticButton>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.1 }} className="relative h-[520px] rounded-[2rem] border border-white/10 bg-white/5 p-4 shadow-[0_0_70px_rgba(124,58,237,0.14)] backdrop-blur-2xl">
              <div className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.16),_transparent_55%)]" />
              <Canvas camera={{ position: [0, 0, 5], fov: 40 }} dpr={[1, 2]}>
                <color attach="background" args={['#04070d']} />
                <ambientLight intensity={0.7} />
                <spotLight position={[8, 8, 8]} intensity={1.2} color="#7c3aed" />
                <spotLight position={[-6, 3, 5]} intensity={1.1} color="#38bdf8" />
                <Environment preset="city" />
                <HeroScene />
              </Canvas>
            </motion.div>
          </div>

          <div className="mx-auto mt-16 flex max-w-7xl items-center justify-between border-t border-white/10 pt-6 text-sm text-white/50">
            <span>Scroll to discover</span>
            <span className="animate-bounce">↓</span>
          </div>
        </section>

        <section id="about" className="px-6 py-24 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.25 }} className="glass-panel overflow-hidden p-4">
              <div className="relative h-[480px] overflow-hidden rounded-[1.6rem] border border-white/10 bg-gradient-to-br from-fuchsia-700/35 via-violet-900/20 to-cyan-700/25">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.2),transparent_30%)]" />
                <div className="absolute bottom-8 left-8 right-8 h-24 rounded-full bg-cyan-400/10 blur-3xl" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-56 w-56 rounded-full border border-white/20 bg-white/10 shadow-[0_0_100px_rgba(124,58,237,0.25)] backdrop-blur-xl" />
                </div>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.25 }} className="flex flex-col justify-center">
              <p className="mb-4 text-sm uppercase tracking-[0.35em] text-cyan-300">About Me</p>
              <h2 className="mb-6 max-w-2xl font-display text-4xl sm:text-5xl">I blend cinematic craft with fast-moving creator intuition.</h2>
              <p className="max-w-2xl text-lg leading-8 text-white/70">Siladitya Jana creates premium edits that feel tactile, elegant, and built for the modern attention economy — from cinematic narrative films to sharp social-first campaigns.</p>
            </motion.div>
          </div>
        </section>

        <section id="skills" className="px-6 py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10">
              <p className="mb-3 text-sm uppercase tracking-[0.35em] text-cyan-300">Skills</p>
              <h2 className="font-display text-3xl sm:text-4xl">A refined toolkit for premium motion work.</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {skills.map((skill, index) => (
                <TiltCard key={skill.name}>
                  <motion.div initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ delay: index * 0.05 }} className="glass-panel relative h-full overflow-hidden p-6">
                    <div className="absolute inset-0 grid-sheen" />
                    <div className="relative flex h-full flex-col">
                      <div className="mb-4 text-3xl">{skill.icon}</div>
                      <h3 className="text-xl font-semibold">{skill.name}</h3>
                      <p className="mt-3 text-sm leading-7 text-white/60">{skill.description}</p>
                    </div>
                  </motion.div>
                </TiltCard>
              ))}
            </div>
          </div>
        </section>

        <section id="work" className="px-6 py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10">
              <p className="mb-3 text-sm uppercase tracking-[0.35em] text-cyan-300">Featured Portfolio</p>
              <h2 className="font-display text-3xl sm:text-4xl">A gallery of immersive, polished edits.</h2>
            </div>
            <div className="grid gap-8 lg:grid-cols-3">
              {portfolioData.map((project, index) => (
                <TiltCard key={project.title}>
                  <motion.article initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ delay: index * 0.08 }} className="glass-panel group overflow-hidden">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img src={project.image} alt={project.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      <button onClick={() => setSelectedProject(project)} className="absolute inset-0 flex items-center justify-center">
                        <div className="rounded-full border border-white/20 bg-white/10 p-4 backdrop-blur-xl transition group-hover:scale-110">
                          <FiPlay className="text-2xl text-white" />
                        </div>
                      </button>
                    </div>
                    <div className="p-6">
                      <div className="mb-3 flex items-center justify-between text-sm text-white/55">
                        <span>{project.category}</span>
                        <span>{project.duration}</span>
                      </div>
                      <h3 className="mb-3 text-2xl font-semibold">{project.title}</h3>
                      <p className="mb-4 text-white/65">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.software.map((item) => (
                          <span key={item} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/70">{item}</span>
                        ))}
                      </div>
                    </div>
                  </motion.article>
                </TiltCard>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} className="glass-panel relative overflow-hidden p-8 lg:p-12">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(124,58,237,0.25),_transparent_40%)]" />
              <div className="relative grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
                <div>
                  <p className="mb-3 text-sm uppercase tracking-[0.35em] text-cyan-300">Featured Sample Video</p>
                  <h2 className="mb-4 font-display text-3xl sm:text-4xl">A premium cinematic showcase for motion-first brands.</h2>
                  <p className="max-w-xl text-lg leading-8 text-white/70">Every beat, transition, and color decision is built to feel elevated, intentional, and cinematic from the very first frame.</p>
                </div>
                <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-black/40 p-4">
                  <img src="https://images.unsplash.com/photo-1517602302552-471fe67acf66?auto=format&fit=crop&w=1400&q=80" alt="Showcase" className="h-[360px] w-full rounded-[1.5rem] object-cover" />
                  <button onClick={() => setSelectedVideo(true)} className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-xl transition hover:scale-110">
                    <FiPlay className="text-3xl text-white" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="services" className="px-6 py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10">
              <p className="mb-3 text-sm uppercase tracking-[0.35em] text-cyan-300">Services</p>
              <h2 className="font-display text-3xl sm:text-4xl">Tailored editing for modern launches and creators.</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {services.map((service, index) => (
                <TiltCard key={service}>
                  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ delay: index * 0.05 }} className="glass-panel p-8">
                    <div className="mb-4 h-2 w-14 rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-400" />
                    <h3 className="text-2xl font-semibold">{service}</h3>
                    <p className="mt-3 text-white/65">Premium pacing, polished transitions, and social-first storytelling for fast-moving audiences.</p>
                  </motion.div>
                </TiltCard>
              ))}
            </div>
          </div>
        </section>

        <section id="process" className="px-6 py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10">
              <p className="mb-3 text-sm uppercase tracking-[0.35em] text-cyan-300">Process</p>
              <h2 className="font-display text-3xl sm:text-4xl">A streamlined path from footage to final delivery.</h2>
            </div>
            <div className="grid gap-6 lg:grid-cols-5">
              {processSteps.map((step, index) => (
                <motion.div key={step} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ delay: index * 0.06 }} className="glass-panel p-6 text-center">
                  <div className="mb-4 text-sm uppercase tracking-[0.35em] text-cyan-300">0{index + 1}</div>
                  <h3 className="text-xl font-semibold">{step}</h3>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10">
              <p className="mb-3 text-sm uppercase tracking-[0.35em] text-cyan-300">Testimonials</p>
              <h2 className="font-display text-3xl sm:text-4xl">Trusted by ambitious brands and creators.</h2>
            </div>
            <Swiper modules={[Autoplay, EffectFade]} effect="fade" autoplay={{ delay: 3600 }} loop className="rounded-[2rem]">
              {testimonials.map((item) => (
                <SwiperSlide key={item.author}>
                  <div className="glass-panel p-8 text-center sm:p-12">
                    <p className="mx-auto max-w-3xl text-2xl leading-10 text-white/80">“{item.quote}”</p>
                    <div className="mt-8 text-lg font-semibold">{item.author}</div>
                    <div className="text-sm uppercase tracking-[0.3em] text-white/45">{item.role}</div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>

        <section id="contact" className="px-6 py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <motion.div initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} className="glass-panel flex items-center justify-center p-8 sm:p-10 lg:p-12">
              <div className="w-full max-w-3xl text-center">
                <p className="mb-3 text-sm uppercase tracking-[0.35em] text-cyan-300">Contact</p>
                <h2 className="mb-4 font-display text-3xl sm:text-4xl">Let’s make something unforgettable.</h2>
                <p className="mx-auto max-w-2xl text-lg leading-8 text-white/70">Available for selective collaborations, campaigns, and premium short-form content.</p>
                <motion.a href="mailto:adityacliphub@gmail.com" whileHover={{ y: -4, scale: 1.01 }} className="group relative mt-8 flex min-h-[220px] w-full items-center justify-center overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 px-6 py-8 text-center backdrop-blur-2xl">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.18),_transparent_55%)]" />
                  <motion.div animate={{ boxShadow: ['0 0 0 rgba(34,211,238,0.0)', '0 0 45px rgba(34,211,238,0.18)', '0 0 0 rgba(34,211,238,0.0)'] }} transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }} className="absolute inset-0 rounded-[2rem] border border-cyan-400/20" />
                  <div className="relative space-y-4">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-cyan-400/30 bg-white/10">
                      <FiMail className="text-2xl text-cyan-300" />
                    </div>
                    <div>
                      <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Email</p>
                      <h3 className="mt-2 text-2xl font-semibold text-white">adityacliphub@gmail.com</h3>
                      <p className="mt-3 text-sm leading-7 text-white/65">For premium edits, campaigns, and cinematic short-form launches.</p>
                    </div>
                  </div>
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 px-6 py-8 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Siladitya Jana. All rights reserved.</p>
          <a href="mailto:adityacliphub@gmail.com" className="transition hover:text-white">Email</a>
        </div>
      </footer>

      <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fixed bottom-6 right-6 z-[80] rounded-full border border-white/10 bg-white/10 p-3 backdrop-blur-xl transition hover:bg-white/20">
        <FiChevronUp className="text-xl" />
      </button>

      <AnimatePresence>
        {selectedProject && <Modal onClose={() => setSelectedProject(null)} project={selectedProject} />}
      </AnimatePresence>
      <AnimatePresence>
        {selectedVideo && <VideoModal onClose={() => setSelectedVideo(null)} />}
      </AnimatePresence>
    </div>
  );
}

function LoadingScreen() {
  return (
    <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-2xl">
      <div className="text-center">
        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6 }} className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-cyan-400/30 bg-white/5" />
        <motion.p initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.15 }} className="font-display text-2xl">Loading Experience</motion.p>
      </div>
    </motion.div>
  );
}

function MagneticButton({ href, className, children }) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const handleMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setOffset({ x: event.clientX - rect.left - rect.width / 2, y: event.clientY - rect.top - rect.height / 2 });
  };

  return (
    <motion.a
      href={href}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.97 }}
      onMouseMove={handleMove}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
      className={className}
      style={{ transform: `translate(${offset.x / 10}px, ${offset.y / 10}px)` }}
    >
      {children}
    </motion.a>
  );
}

function TiltCard({ children }) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const onMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    setRotateX(-(y * 10));
    setRotateY(x * 10);
  };

  return (
    <motion.div
      onMouseMove={onMove}
      onMouseLeave={() => {
        setRotateX(0);
        setRotateY(0);
      }}
      whileHover={{ y: -8, scale: 1.02, rotateX: -2, rotateY: 2 }}
      transition={{ type: 'spring', stiffness: 180, damping: 18 }}
      style={{ transformStyle: 'preserve-3d', rotateX, rotateY }}
    >
      {children}
    </motion.div>
  );
}

function Modal({ project, onClose }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 px-4 py-8 backdrop-blur-xl">
      <motion.div initial={{ y: 24, scale: 0.98 }} animate={{ y: 0, scale: 1 }} exit={{ y: 24, scale: 0.98 }} className="glass-panel relative w-full max-w-4xl overflow-hidden">
        <button onClick={onClose} className="absolute right-4 top-4 z-10 rounded-full border border-white/10 bg-black/40 px-3 py-2 text-sm">Close</button>
        <div className="aspect-video w-full bg-black">
          <iframe className="h-full w-full" src={project.videoUrl} title={project.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
        </div>
        <div className="p-8">
          <h3 className="text-3xl font-semibold">{project.title}</h3>
          <p className="mt-4 text-white/70">{project.description}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {project.software.map((item) => (
              <span key={item} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/70">{item}</span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function VideoModal({ onClose }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[80] flex items-center justify-center bg-black/85 px-4 py-8 backdrop-blur-xl">
      <motion.div initial={{ y: 24, scale: 0.98 }} animate={{ y: 0, scale: 1 }} exit={{ y: 24, scale: 0.98 }} className="glass-panel relative w-full max-w-5xl overflow-hidden">
        <button onClick={onClose} className="absolute right-4 top-4 z-10 rounded-full border border-white/10 bg-black/40 px-3 py-2 text-sm">Close</button>
        <div className="aspect-video w-full bg-black">
          <iframe className="h-full w-full" src="https://www.youtube.com/embed/ScMzIvxBSi4" title="Featured video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default App;
