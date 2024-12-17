"use client";

import { useEffect, useRef } from "react";
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

export default function AboutPage() {
  const headerRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLElement>(null);
  const teamRef = useRef<HTMLElement>(null);

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

      // Content animation
      ScrollTrigger.create({
        trigger: contentRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.from(contentRef.current!.children, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
          });
        },
      });

      // Team section animation
      ScrollTrigger.create({
        trigger: teamRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.from(teamRef.current!.children, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
          });
        },
      });
    });

    return () => ctx.revert(); // Clean up GSAP animations
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
            className="text-sm font-medium px-4 py-2 bg-[#EEF3F8] hover:bg-[#D0E8FF] rounded-full transition-colors"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium px-4 py-2 bg-[#EEF3F8] hover:bg-[#D0E8FF] rounded-full transition-colors"
          >
            About
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section ref={heroRef} className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  About AI Carousel Generator
                </h1>
                <p className="mx-auto max-w-[700px] text-[#00000099] md:text-xl">
                  We&apos;re revolutionizing the way professionals create content for LinkedIn. Our AI-powered tool makes it easy to generate engaging carousels in minutes.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section ref={contentRef} className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">Our Mission</h2>
                <p className="text-[#00000099]">
                  To empower professionals to create impactful content effortlessly, enhancing their LinkedIn presence and engagement.
                </p>
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">Our Vision</h2>
                <p className="text-[#00000099]">
                  A world where every professional can easily share their knowledge and insights through visually stunning content.
                </p>
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">Our Values</h2>
                <p className="text-[#00000099]">
                  Innovation, simplicity, and empowerment guide everything we do at AI Carousel Generator.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section ref={teamRef} className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Team</h2>
            <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <div className="space-y-2">
                <h3 className="text-xl font-bold">John Doe</h3>
                <p className="text-[#00000099]">Founder & CEO</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Jane Smith</h3>
                <p className="text-[#00000099]">CTO</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Mike Johnson</h3>
                <p className="text-[#00000099]">Head of AI</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t border-[#00000014] py-6 px-4 md:px-6 bg-[#F3F2EF]">
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

