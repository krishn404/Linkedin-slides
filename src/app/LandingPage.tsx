"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function LinkedInLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export default function LandingPage() {
  const headerRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const dashboardRef = useRef<HTMLElement>(null);
  const featuresRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.from(headerRef.current, {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      // Hero section animation
      gsap.from(heroRef.current!.children, {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      });

      // Dashboard animation
      ScrollTrigger.create({
        trigger: dashboardRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.from(dashboardRef.current, {
            y: 50,
            opacity: 0,
            duration: 1,
          });
        },
      });

      // Features animation
      ScrollTrigger.create({
        trigger: featuresRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.from(featuresRef.current!.children, {
            y: 50,
            opacity: 0,
            stagger: 0.2,
            duration: 0.8,
          });
        },
      });

      // CTA section animation
      ScrollTrigger.create({
        trigger: ctaRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.from(ctaRef.current, {
            y: 50,
            opacity: 0,
            duration: 0.8,
          });
        },
      });
    });

    const timer = setInterval(() => {
      setSlideIndex((prevIndex) => (prevIndex + 1) % 4);
    }, 3000); // Change slide every 3 seconds

    return () => {
      ctx.revert(); // Clean up GSAP animations
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-[100dvh] bg-[#F3F2EF] text-[#000000E6]">
      <header ref={headerRef} className="px-4 lg:px-6 h-14 flex items-center z-50 relative">
        <Link href="/" className="flex items-center justify-center">
          <LinkedInLogo className="h-6 w-6" />
          <span className="ml-2 text-lg font-semibold">AI Carousel Generator</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            href="/"
            className="text-sm font-medium px-4 py-2 bg-[#add5fe]  hover:bg-[#D0E8FF] rounded-full transition-colors"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium px-4 py-2 bg-[#add5fe]  hover:bg-[#D0E8FF] rounded-full transition-colors"
          >
            About
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section ref={heroRef} className="w-full min-h-[90vh] flex items-center justify-center relative">
          <div className="container px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto space-y-8">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
                Create Stunning LinkedIn
                <br />
                Carousels with AI
              </h1>
              <p className="text-lg text-[#00000099] max-w-2xl mx-auto">
                Say goodbye to time-consuming carousel creation. Our AI-powered tool helps you generate
                engaging LinkedIn carousels in minutes. Stand out, share knowledge, and boost your engagement.
              </p>
              <div className="flex flex-col gap-4 items-center">
                <Link
                  href="/page"
                  className="inline-flex h-11 items-center justify-center rounded-full bg-[#0A66C2] px-8 text-sm font-medium text-white hover:bg-[#0A66C2]/90 transition-colors"
                >
                  Get Started
                </Link>
                
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-20 flex">
          <div className="container px-4 md:px-6 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Why AI-Powered LinkedIn Carousels?
              </h2>
              <p className="text-[#00000099] max-w-2xl mb-12">
                LinkedIn carousels are a powerful way to share insights and boost engagement. Our AI tool
                makes creating them effortless, allowing you to focus on your message while we handle the design.
              </p>
            </div>
            <div className="md:w-1/2">
              <div className="rounded-2xl border border-[#00000014] bg-[#0A66C2] p-8 backdrop-blur-sm overflow-hidden">
                <div className="h-[400px] flex items-center justify-center">
                  <div className="text-center">
                    <h3 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                      {["Give Prompt", "Generate Slides", "Customize Slides", "Export & Share"][slideIndex]}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section ref={featuresRef} className="w-full py-20 ">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-16">
              Features that set us apart
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-2xl border border-[#00000014] bg-[#d0f7ff] p-8 backdrop-blur-sm">
                <h3 className="text-xl font-semibold mb-4">AI-Powered Content Generation</h3>
                <p className="text-[#00000099] mb-6">
                  Our advanced AI understands your topic and generates
                  compelling content for each slide, saving you hours of work.
                </p>
              </div>
              <div className="rounded-2xl border border-[#00000014] bg-[#42b0f9] p-8 backdrop-blur-sm">
                <h3 className="text-xl font-semibold mb-4">Custom Design Templates</h3>
                <p className="text-[#00000099] mb-6">
                  Choose from a variety of professionally designed templates
                  or let our AI create a custom design that matches your brand.
                </p>
              </div>
              <div className="rounded-2xl border border-[#00000014] bg-[#d0f7ff] p-8 backdrop-blur-sm">
                <h3 className="text-xl font-semibold mb-4">One-Click LinkedIn Sharing</h3>
                <p className="text-[#00000099] mb-6">
                  Seamlessly export your carousel and share it directly
                  to LinkedIn with just one click. It&apos;s that simple!
                </p>
              </div>
            </div>
          </div>
        </section>

        <section ref={ctaRef} className="w-full py-20 ">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to revolutionize your
              <br />
              LinkedIn content?
            </h2>
            <p className="text-[#00000099] mb-8">
              Join thousands of professionals already using our AI to create engaging LinkedIn carousels.
            </p>
            <Link
              href="/page"
              className="inline-flex h-11 items-center justify-center rounded-full bg-[#0A66C2] px-8 text-sm font-medium text-white hover:bg-[#0A66C2]/90 transition-colors"
            >
              Start Creating Now
            </Link>
          </div>
        </section>
      </main>
      <footer className="w-full border-t border-[#00000014] py-6 px-4 md:px-6 bg-[#eff2f3]">
        <div className="container flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <LinkedInLogo className="h-5 w-5" />
            <p className="text-sm text-[#00000099]">
              © 2024 AI Carousel Generator. All rights reserved.
            </p>
          </div>
          <nav className="flex gap-4 sm:gap-6">
            <Link
              href="/privacy"
              className="text-sm text-[#00000099] hover:text-[#000000E6] transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-[#00000099] hover:text-[#000000E6] transition-colors"
            >
              Terms of Use
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}

