import React, { useEffect, useState } from 'react';
import { BookOpen, FileText, ExternalLink, X, Bot, Gift, CheckSquare, Video } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const YoutubeIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

export default function FreeResourcesModal({ onClose }) {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleClose = () => {
    setVisible(false);
    document.body.style.overflow = '';
    setTimeout(() => onClose(), 250);
  };

  const resources = [
    {
      icon: <CheckSquare className="w-5 h-5 text-[#2563EB]" />,
      title: t('modal_fr_res1_title'),
      desc: t('modal_fr_res1_desc'),
      url: "https://docs.google.com/forms/d/e/1FAIpQLSfJMRrVl0Cx0Xcx6FIIfWPEf__Z_ESNqgf5MbmMTJ8edpl0RQ/viewform",
      btnText: t('modal_fr_res1_btn'),
      highlight: true
    },
    {
      icon: <FileText className="w-5 h-5 text-[#2563EB]" />,
      title: t('modal_fr_res2_title'),
      desc: t('modal_fr_res2_desc'),
      url: "https://docs.google.com/document/d/1TlbYf9zKsVuNZJ26zRDzf5qNc9z4ZrHiMdcHpVdVUbY/edit?usp=sharing",
      btnText: t('modal_fr_res2_btn')
    },
    {
      icon: <Bot className="w-5 h-5 text-[#2563EB]" />,
      title: t('modal_fr_res3_title'),
      desc: t('modal_fr_res3_desc'),
      url: "https://chatgpt.com/g/g-69cb541e985c8191bf54e6ec8b34f9a6-lifeboat-ai-digital-marketing-mentor",
      btnText: t('modal_fr_res3_btn')
    },
    {
      icon: <YoutubeIcon className="w-5 h-5 text-[#EF4444]" />,
      title: t('modal_fr_res4_title'),
      desc: t('modal_fr_res4_desc'),
      links: [
        { label: t('modal_fr_res4_btn1'), url: "https://www.youtube.com/watch?v=j7M7keEEXmA" },
        { label: t('modal_fr_res4_btn2'), url: "https://www.youtube.com/watch?v=DpYHA8Yy2Jc" }
      ]
    },
    {
      icon: <Gift className="w-5 h-5 text-[#2563EB]" />,
      title: t('modal_fr_res5_title'),
      desc: t('modal_fr_res5_desc'),
      links: [
        { label: t('modal_fr_res5_btn1'), url: "https://drive.google.com/file/d/1ej7hO1SDqlMkB7vZYhzDAg-8-y-KWcxB/view?usp=sharing" },
        { label: t('modal_fr_res5_btn2'), url: "https://drive.google.com/file/d/14EFTMlJRm_iH2o9Z84hg0GYn-Bwt9kqt/view?usp=sharing" }
      ]
    }
  ];

  return (
    <div
      data-lenis-prevent="true"
      data-lenis-prevent-wheel="true"
      data-lenis-prevent-touch="true"
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0F172A]/70 backdrop-blur-md transition-opacity duration-300 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        data-lenis-prevent="true"
        data-lenis-prevent-wheel="true"
        data-lenis-prevent-touch="true"
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
        className={`bg-[#FFFFFF] rounded-3xl max-w-xl w-full max-h-[88vh] overflow-y-auto p-6 sm:p-8 border border-[#E2E8F0] shadow-2xl relative transition-all duration-300 ${
          visible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-3'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#F1F5F9] border border-[#E2E8F0] text-[#64748B] hover:bg-[#2563EB] hover:text-white flex items-center justify-center transition-colors cursor-pointer z-10"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3.5 mb-4">
          <div className="w-11 h-11 rounded-2xl bg-[#DBEAFE] text-[#2563EB] flex items-center justify-center shrink-0">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold tracking-wider text-[#2563EB] uppercase block">
              {t('modal_fr_badge')}
            </span>
            <h3 className="text-xl font-extrabold text-[#0F172A] m-0 leading-tight">
              {t('modal_fr_title')}
            </h3>
          </div>
        </div>

        <p className="text-xs text-[#64748B] mb-5 leading-relaxed">
          {t('modal_fr_subtitle')}
        </p>

        {/* Resource List */}
        <div className="flex flex-col gap-3">
          {resources.map((res, index) => (
            <div
              key={index}
              className={`rounded-2xl p-4 transition-all ${
                res.highlight
                  ? 'bg-[#EFF6FF] border border-[#BFDBFE]'
                  : 'bg-[#F8FAFC] border border-[#E2E8F0]'
              }`}
            >
              <div className="flex items-center gap-2.5 mb-1.5">
                {res.icon}
                <h4 className="text-sm font-bold text-[#0F172A] m-0">
                  {res.title}
                </h4>
              </div>

              <p className="text-xs text-[#64748B] m-0 mb-3 leading-relaxed">
                {res.desc}
              </p>

              {res.url && (
                <a
                  href={res.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
                    res.highlight
                      ? 'bg-[#2563EB] text-white hover:bg-[#1D4ED8]'
                      : 'bg-[#0F172A] text-white hover:bg-[#2563EB]'
                  }`}
                >
                  <span>{res.btnText}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}

              {res.links && (
                <div className="flex flex-wrap gap-2">
                  {res.links.map((link, lIdx) => (
                    <a
                      key={lIdx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0F172A] text-white text-xs font-bold hover:bg-[#2563EB] transition-colors"
                    >
                      <span>{link.label}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-5 pt-3.5 border-t border-[#E2E8F0] text-xs text-[#2563EB] font-bold text-center leading-normal">
          {t('modal_fr_footer_note')}
        </div>
      </div>
    </div>
  );
}
