'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Editor from '@/components/editor'
import { DocumentProvider } from '@/lib/providers/document-provider'
import { ArrowRight, CheckCircle, Layout, Share2, Star } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const [isEditorVisible, setEditorVisible] = useState(false)
  const sectionRefs = useRef([])

  useEffect(() => {
    sectionRefs.current.forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    })
  }, [])

  const handleStartNow = () => {
    setEditorVisible(true)
  }

  if (isEditorVisible) {
    return (
      <DocumentProvider>
        <Editor />
      </DocumentProvider>
    )
  }

  return (
    <main className="flex-1 min-h-screen flex flex-col justify-stretch bg-gradient-to-r from-[#f0f4f8] to-[#e8f3fc] text-[#2c3e50]">
      <header className="fixed w-full z-10 bg-white border-b border-[#e1e8ed] py-4 shadow-lg">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#3498db]">LinkedIn Slides Generator</h1>
          <button
            onClick={handleStartNow}
            className="bg-[#3498db] text-white font-semibold py-3 px-6 rounded-md hover:bg-[#2980b9] transition duration-300 transform hover:scale-105"
          >
            Start Creating
          </button>
        </div>
      </header>

      <section ref={(el) => (sectionRefs.current[0] = el)} className="pt-32 pb-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-extrabold mb-6 text-[#2c3e50]">Create Impactful LinkedIn Slides</h2>
          <p className="text-xl mb-8 text-[#34495e] max-w-2xl mx-auto">
            Elevate your professional presence with stunning presentations designed to captivate your LinkedIn audience.
          </p>
          <button
            onClick={handleStartNow}
            className="bg-[#3498db] text-white font-semibold py-4 px-10 rounded-md hover:bg-[#2980b9] transition duration-300 transform hover:scale-105 flex items-center justify-center mx-auto"
          >
            Get Started <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </section>

      <section ref={(el) => (sectionRefs.current[1] = el)} className="py-20">
        <div className="container mx-auto px-4">
          <h3 className="text-4xl font-bold mb-12 text-center text-[#2c3e50]">Why Choose Our Platform?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <FeatureCard
              icon={<Layout className="h-8 w-8 text-[#3498db]" />}
              title="Professional Templates"
              description="Access a wide range of LinkedIn-optimized templates designed to make your content stand out."
            />
            <FeatureCard
              icon={<Star className="h-8 w-8 text-[#3498db]" />}
              title="Easy Customization"
              description="Personalize your slides effortlessly with our intuitive drag-and-drop interface."
            />
            <FeatureCard
              icon={<Share2 className="h-8 w-8 text-[#3498db]" />}
              title="One-Click Sharing"
              description="Share your polished presentations directly to LinkedIn with just a single click."
            />
          </div>
        </div>
      </section>

      <section ref={(el) => (sectionRefs.current[2] = el)} className="py-20">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold mb-12 text-center text-[#2c3e50]">How It Works</h3>
          <div className="flex flex-col md:flex-row justify-center items-start space-y-8 md:space-y-0 md:space-x-8">
            <Step
              number={1}
              title="Choose a Template"
              description="Browse our collection of professionally designed templates tailored for LinkedIn."
            />
            <Step
              number={2}
              title="Customize Content"
              description="Add your own text, images, and branding to make the slides uniquely yours."
            />
            <Step
              number={3}
              title="Share on LinkedIn"
              description="Publish your slides directly to LinkedIn and watch your engagement soar."
            />
          </div>
        </div>
      </section>


      <section ref={(el) => (sectionRefs.current[4] = el)} className="py-20  text-[#25415c]">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-6">Ready to Elevate Your LinkedIn Presence?</h3>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who are already creating stunning LinkedIn slides with our platform.
          </p>
          <button
            onClick={handleStartNow}
            className="bg-[#287DB5] text-white font-semibold py-3 px-8 rounded-md hover:bg-[#0080ff] transition duration-300 transform hover:scale-105"
          >
            Start Creating Now
          </button>
        </div>
      </section>

      <footer className="bg-[#2c3e50] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">LinkedIn Slides Generator</h4>
              <p className="text-sm text-[#bdc3c7]">Empowering professionals to create impactful LinkedIn content.</p>
            </div>
           
          </div>
          <div className="mt-8 pt-8 border-t border-[#34495e] text-center">
            <p className="text-sm text-[#bdc3c7]">&copy; 2024 LinkedIn Slides Generator. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition duration-300 transform hover:scale-105">
      <div className="flex items-center mb-4">
        {icon}
        <h4 className="text-xl font-semibold ml-4 text-[#2c3e50]">{title}</h4>
      </div>
      <p className="text-[#34495e]">{description}</p>
    </div>
  )
}

function Step({ number, title, description }) {
  return (
    <div className="flex flex-col items-center text-center max-w-xs group">
      <div className="bg-[#3498db] text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl mb-4 transition duration-300 group-hover:bg-[#2980b9] group-hover:scale-110">
        {number}
      </div>
      <h4 className="text-xl font-semibold mb-2 text-[#2c3e50] group-hover:text-[#3498db] transition duration-300">{title}</h4>
      <p className="text-[#34495e]">{description}</p>
    </div>
  )
}
