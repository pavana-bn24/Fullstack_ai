import React, { useState, useEffect, useRef } from 'react';
import {
  Bot,
  Smartphone,
  MessageSquare,
  Workflow,
  PhoneCall,
  Rocket,
  ChevronRight
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function PortfolioMatrix() {
  const [activeTab, setActiveTab] = useState('all');
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const gridRef = useRef(null);
  const showcaseRef = useRef(null);

  const buildItems = [
    {
      id: 1,
      category: 'agents',
      title: 'Autonomous AI Agents',
      desc: 'Multi-step autonomous agents capable of research, task execution, and automated workflow orchestration.',
      icon: Bot,
      accent: 'bg-[#2563EB]/10 text-[#2563EB]',
      border: 'border-[#2563EB]/30'
    },
    {
      id: 2,
      category: 'apps',
      title: 'AI Mobile & Web Apps',
      desc: 'Cross-platform native applications with embedded LLM intelligence and real-time database sync.',
      icon: Smartphone,
      accent: 'bg-[#059669]/10 text-[#059669]',
      border: 'border-[#059669]/30'
    },
    {
      id: 3,
      category: 'automation',
      title: 'WhatsApp & CRM Automations',
      desc: '24/7 intelligent conversational bots that capture leads, schedule calls, and handle support tickets automatically.',
      icon: MessageSquare,
      accent: 'bg-[#0F172A]/10 text-[#0F172A]',
      border: 'border-[#0F172A]/30'
    },
    {
      id: 4,
      category: 'automation',
      title: 'Enterprise Business Workflows',
      desc: 'End-to-end automation pipelines replacing manual data entry, invoicing, and cross-platform sync.',
      icon: Workflow,
      accent: 'bg-[#2563EB]/10 text-[#2563EB]',
      border: 'border-[#2563EB]/30'
    },
    {
      id: 5,
      category: 'agents',
      title: 'Conversational Voice AI',
      desc: 'Human-like voice agents for automated outbound customer calling, appointment booking, and triage.',
      icon: PhoneCall,
      accent: 'bg-[#059669]/10 text-[#059669]',
      border: 'border-[#059669]/30'
    },
    {
      id: 6,
      category: 'apps',
      title: 'SaaS Products & AI Wrappers',
      desc: 'Commercial micro-SaaS applications designed for recurring monthly revenue and rapid launch.',
      icon: Rocket,
      accent: 'bg-[#2563EB]/10 text-[#2563EB]',
      border: 'border-[#2563EB]/30'
    }
  ];

  const filteredItems = activeTab === 'all'
    ? buildItems
    : buildItems.filter(item => item.category === activeTab);

  const tabs = [
    { id: 'all', label: 'All Projects' },
    { id: 'agents', label: 'AI Agents & Voice' },
    { id: 'apps', label: 'Apps & SaaS' },
    { id: 'automation', label: 'Workflows & CRM' }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const splitHeading = new SplitText(headingRef.current, { type: 'words, lines' });

      gsap.fromTo(
        splitHeading.words,
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.03,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
            toggleActions: 'restart none restart reset'
          }
        }
      );

      gsap.fromTo(
        gridRef.current?.children || [],
        { opacity: 0, y: 35, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 85%',
            toggleActions: 'restart none restart reset'
          }
        }
      );

      gsap.fromTo(
        showcaseRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: showcaseRef.current,
            start: 'top 85%',
            toggleActions: 'restart none restart reset'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Re-animate grid items on filter tab change
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setTimeout(() => {
      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current.children,
          { opacity: 0, y: 15, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 0.4, stagger: 0.06, ease: 'power2.out' }
        );
      }
    }, 10);
  };

  return (
    <section ref={sectionRef} id="build" className="py-28 md:py-36 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <span className="text-[#2563EB] text-xs font-bold uppercase tracking-wider">Portfolio Matrix</span>
          <h2 ref={headingRef} className="font-jakarta text-3xl sm:text-5xl font-extrabold text-[#0F172A] mt-1">
            Instead of assignments nobody uses... <br className="hidden sm:inline" />
            <span className="text-[#2563EB]">You'll Build:</span>
          </h2>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 shrink-0">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-[#0F172A] text-white shadow-md scale-105'
                  : 'bg-white text-[#475569] hover:bg-[#F1F5F9] border border-[#E2E8F0]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {filteredItems.map(item => {
          const IconComponent = item.icon;
          return (
            <div
              key={item.id}
              className={`bento-card-solid rounded-2xl p-7 border ${item.border} shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group`}
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className={`w-12 h-12 rounded-xl ${item.accent} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded bg-[#FAF9F5] text-[#334155]">
                    VERIFIED OUTPUT
                  </span>
                </div>
                <h3 className="font-jakarta text-xl font-extrabold text-[#0F172A] mb-2">{item.title}</h3>
                <p className="text-sm font-normal text-[#334155] leading-relaxed mb-6">{item.desc}</p>
              </div>

              <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-between text-xs font-bold text-[#2563EB]">
                <span>100-Day Portfolio Item</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </div>
            </div>
          );
        })}
      </div>

      <div ref={showcaseRef} className="rounded-3xl overflow-hidden border border-[#E2E8F0] shadow-xl bg-white p-3">
        <img
          src="/showcase_studio.png"
          alt="Editorial Studio Showcase of AI Agent Products"
          className="w-full h-auto object-cover max-h-[460px] rounded-2xl"
        />
      </div>
    </section>
  );
}
