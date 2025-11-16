import { lazy, Suspense } from "react";
import Hero from "../components/Hero/Hero";
import Spinner from "../components/Spinner/Spinner";

// Lazy load below-fold sections for better performance
const HotShifts = lazy(() => import("../components/HotShifts/HotShifts"));
const HowItWorks = lazy(() => import("../components/HowItWorks/HowItWorks"));
const SuccessStories = lazy(() => import("../components/SuccessStories/SuccessStories"));
const Cta = lazy(() => import("../components/Cta/Cta"));

const Home = () => {
  return (
    <>
      {/* Above-fold: Load immediately */}
      <Hero />
      
      {/* Below-fold: Lazy load for better initial performance */}
      <Suspense fallback={<div className="h-96 flex items-center justify-center"><Spinner size="lg" /></div>}>
        <HotShifts />
      </Suspense>
      
      <Suspense fallback={<div className="h-96 flex items-center justify-center"><Spinner size="lg" /></div>}>
        <HowItWorks />
      </Suspense>
      
      <Suspense fallback={<div className="h-96 flex items-center justify-center"><Spinner size="lg" /></div>}>
        <SuccessStories />
      </Suspense>
      
      <Suspense fallback={<div className="h-96 flex items-center justify-center"><Spinner size="lg" /></div>}>
        <Cta />
      </Suspense>
    </>
  );
};

export default Home;
