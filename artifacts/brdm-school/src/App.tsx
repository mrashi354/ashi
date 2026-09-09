import { lazy, Suspense } from 'react';
import { Switch, Route } from 'wouter';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ScrollProgress } from './components/ui/ScrollProgress';
import { ScrollToTop } from './components/ui/ScrollToTop';
import { WhatsAppButton } from './components/ui/WhatsAppButton';
import { ChatWidget }    from './components/ui/ChatWidget';
import { PageSEO }      from './components/ui/PageSEO';

// Route-level code splitting: each page loads on demand (smaller initial bundle)
const HomePage       = lazy(() => import('./pages/HomePage').then((m) => ({ default: m.HomePage })));
const AboutPage      = lazy(() => import('./pages/AboutPage').then((m) => ({ default: m.AboutPage })));
const AcademicsPage  = lazy(() => import('./pages/AcademicsPage').then((m) => ({ default: m.AcademicsPage })));
const GalleryPage    = lazy(() => import('./pages/GalleryPage').then((m) => ({ default: m.GalleryPage })));
const ContactPage    = lazy(() => import('./pages/ContactPage').then((m) => ({ default: m.ContactPage })));
const AdmissionsPage = lazy(() => import('./pages/AdmissionsPage').then((m) => ({ default: m.AdmissionsPage })));
const PrincipalPage  = lazy(() => import('./pages/PrincipalPage').then((m) => ({ default: m.PrincipalPage })));
const FacultyPage    = lazy(() => import('./pages/FacultyPage').then((m) => ({ default: m.FacultyPage })));
const CalendarPage   = lazy(() => import('./pages/CalendarPage').then((m) => ({ default: m.CalendarPage })));
const NewsPage       = lazy(() => import('./pages/NewsPage').then((m) => ({ default: m.NewsPage })));

function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center" role="status" aria-label="Loading page">
      <div className="w-10 h-10 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
    </div>
  );
}

function App() {
  return (
    <div className="min-h-screen w-full font-sans text-foreground bg-background selection:bg-primary/20">
      <PageSEO />
      <ScrollProgress />
      <ScrollToTop />
      <Navbar />

      <main>
        <Suspense fallback={<PageLoader />}>
          <Switch>
            <Route path="/"           component={HomePage}       />
            <Route path="/about"      component={AboutPage}      />
            <Route path="/principal"  component={PrincipalPage}  />
            <Route path="/faculty"    component={FacultyPage}    />
            <Route path="/academics"  component={AcademicsPage}  />
            <Route path="/calendar"   component={CalendarPage}   />
            <Route path="/news"       component={NewsPage}       />
            <Route path="/gallery"    component={GalleryPage}    />
            <Route path="/contact"    component={ContactPage}    />
            <Route path="/admissions" component={AdmissionsPage} />
            <Route component={HomePage} />
          </Switch>
        </Suspense>
      </main>

      <Footer />
      <WhatsAppButton />
      <ChatWidget />
    </div>
  );
}

export default App;
