import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { NavBarDemo } from './components/NavBarDemo';
import { Header } from './components/ui/header-2';
import { Home } from './pages/Home';
import { ContactPage } from './pages/ContactPage';
import { AboutPage } from './pages/AboutPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';

export default function App() {
  const [heroLoaded, setHeroLoaded] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const showNavBar = !isHomePage || heroLoaded;

  React.useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="w-full min-h-screen relative font-sans selection:bg-pink-500/30">

      {/* Desktop navbar — fixed, fades in after hero loads */}
      {!isMobile && (
        <div
          className="transition-all duration-1000 ease-out fixed top-0 left-0 w-full z-[100] pointer-events-none"
          style={{
            opacity: showNavBar ? 1 : 0,
            transform: showNavBar ? 'translateY(0)' : 'translateY(-24px)',
            transitionDelay: showNavBar && isHomePage ? '3.5s' : '0s'
          }}
        >
          <div className="pointer-events-auto">
            <NavBarDemo />
          </div>
        </div>
      )}

      {/* Mobile navbar — sticky, always visible */}
      {isMobile && (
        <Header />
      )}

      {/* Global Seamless Theme Background */}
      <div className="fixed inset-0 w-full h-full -z-10 bg-white pointer-events-none overflow-hidden flex items-center justify-center">
        <div
          className="w-[120vw] h-[120vw] max-w-[1200px] max-h-[1200px] absolute"
          style={{
            background: 'radial-gradient(circle at center, rgba(160,200,255,0.8) 0%, rgba(220,150,255,0.6) 30%, rgba(255,160,180,0.4) 60%, rgba(255,255,255,0) 100%)',
            filter: 'blur(80px)',
            transform: 'translateY(-10%)'
          }}
        />
      </div>

      <Routes location={location}>
        <Route path="/" element={<Home setHeroLoaded={setHeroLoaded} />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
      </Routes>
    </div>
  );
}
