"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function LinkedInLogo(props) {
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
  const router = useRouter();
  const headerRef = useRef(null);
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const teamRef = useRef(null);
  const featuresRef = useRef(null);

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
      gsap.from(heroRef.current.children, {
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
          if (contentRef.current) {
            gsap.from(contentRef.current.children, {
              y: 50,
              opacity: 0,
              duration: 0.8,
              stagger: 0.2,
            });
          }
        },
      });

      // Team section animation
      ScrollTrigger.create({
        trigger: teamRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.from(teamRef.current.children, {
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
                  We're revolutionizing the way professionals create content for LinkedIn. Our AI-powered tool makes it easy to generate engaging carousels in minutes.
                </p>
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
                <h3 className="text-xl font-semibold mb-4">Our Mission
                </h3>
                <p className="text-[#00000099] mb-6">
                To empower professionals to create impactful content effortlessly, enhancing their LinkedIn presence and engagement.
                </p>
              </div>
              <div className="rounded-2xl border border-[#00000014] bg-[#42b0f9] p-8 backdrop-blur-sm">
                <h3 className="text-xl font-semibold mb-4">Our Vision
                </h3>
                <p className="text-[#00000099] mb-6">
                A world where every professional can easily share their knowledge and insights through visually stunning content.
                </p>
              </div>
              <div className="rounded-2xl border border-[#00000014] bg-[#d0f7ff] p-8 backdrop-blur-sm">
                <h3 className="text-xl font-semibold mb-4">Our Values</h3>
                <p className="text-[#00000099] mb-6">
                Innovation, simplicity, and empowerment guide everything we do at AI Carousel Generator.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section ref={teamRef} className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Tech Stack</h2>
            <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <div className="space-y-2">
                <h3 className="text-xl font-bold">React</h3>
                <p className="text-[#00000099]">Used for building the user interface, allowing for a dynamic and responsive experience.</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Tailwind CSS</h3>
                <p className="text-[#00000099]">Utilized for styling, enabling rapid design and customization of components.</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Gemini</h3>
                <p className="text-[#00000099]">Incorporated for advanced AI functionalities, enhancing content generation capabilities.</p>
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

