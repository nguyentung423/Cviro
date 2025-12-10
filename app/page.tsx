"use client";

import { lazy, Suspense } from "react";
import Hero from "@/components/Hero/Hero";
import Spinner from "@/components/Spinner/Spinner";
import PostAuthRedirect from "@/components/PostAuthRedirect";

const HowItWorks = lazy(() => import("@/components/HowItWorks/HowItWorks"));
const Cta = lazy(() => import("@/components/Cta/Cta"));

export default function Home() {
  return (
    <>
      <PostAuthRedirect />
      <Hero />

      <Suspense
        fallback={
          <div className="h-96 flex items-center justify-center">
            <Spinner size="lg" />
          </div>
        }
      >
        <HowItWorks />
      </Suspense>

      <Suspense
        fallback={
          <div className="h-96 flex items-center justify-center">
            <Spinner size="lg" />
          </div>
        }
      >
        <Cta />
      </Suspense>
    </>
  );
}
