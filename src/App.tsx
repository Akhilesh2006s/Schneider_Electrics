import { EventDescription } from "./components/EventDescription";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { RegistrationForm } from "./components/RegistrationForm";

export default function App() {
  return (
    <>
      <Header />
      <Hero />
      <main className="page-main">
        <div className="content">
          <EventDescription />
          <RegistrationForm />
        </div>
      </main>
    </>
  );
}
