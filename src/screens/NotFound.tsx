import { Link } from "react-router-dom";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { Button } from "../components/ui/button";

export function NotFound() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-[70vh] items-center">
        <div className="container-page py-24 text-center">
          <p className="eyebrow mx-auto mb-6">404</p>
          <h1 className="heading-display mx-auto max-w-3xl">
            This page took an early retirement.
          </h1>
          <p className="mx-auto mt-6 max-w-lg text-lead">
            The page you were looking for doesn't exist — or was renamed during
            a portfolio rebalance.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link to="/">
              <Button size="lg">Take me home</Button>
            </Link>
            <Link to="/contact">
              <Button variant="secondary" size="lg">
                Talk to an advisor
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
