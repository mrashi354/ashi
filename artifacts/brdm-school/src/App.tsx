import { Switch, Route } from 'wouter';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ScrollProgress } from './components/ui/ScrollProgress';
import { ScrollToTop } from './components/ui/ScrollToTop';
import { WhatsAppButton } from './components/ui/WhatsAppButton';
import { ChatWidget }    from './components/ui/ChatWidget';

import { HomePage }       from './pages/HomePage';
import { AboutPage }      from './pages/AboutPage';
import { AcademicsPage }  from './pages/AcademicsPage';
import { GalleryPage }    from './pages/GalleryPage';
import { ContactPage }    from './pages/ContactPage';
import { AdmissionsPage } from './pages/AdmissionsPage';
import { PrincipalPage }  from './pages/PrincipalPage';
import { FacultyPage }    from './pages/FacultyPage';
import { CalendarPage }   from './pages/CalendarPage';
import { NewsPage }       from './pages/NewsPage';


function App() {
  return (
    <div className="min-h-screen w-full font-sans text-foreground bg-background selection:bg-primary/20">
      <ScrollProgress />
      <ScrollToTop />
      <Navbar />

      <main>
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
      </main>

      <Footer />
      <WhatsAppButton />
      <ChatWidget />
    </div>
  );
}

export default App;
