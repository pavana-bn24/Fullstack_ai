import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

const translations = {
  en: {
    navOpportunity: 'Opportunity',
    navProgram: 'Program',
    navProjects: 'Projects',
    navApply: 'Apply',
    whatsappUs: 'WhatsApp us',
    applyEarlyAccess: 'Apply for early access',
    preBookNow: 'Pre-Book Course (₹999)',
    signUp: 'Sign Up',
    whatsappDiscoveryCall: 'WhatsApp us for a free discovery call',

    btn_free_resources: 'Free Resources',
    btn_find_skill_gap: 'Find Skill Gap',

    heroBadge1Title: '100 days',
    heroBadge1Desc: 'A focused route from first build to a real portfolio.',
    heroBadge2Title: 'Beginner-friendly',
    heroBadge2Desc: 'No prior coding experience required.',
    heroTitle: 'Vibe Code\nYour Future.',
    heroSubhead: 'Become an AI Full-stack Developer in just 100 days.',

    shiftEyebrow: 'The shift',
    shiftTitle: 'The world doesn’t need more coders.',
    shiftPara1: 'It needs AI solution builders. Businesses are rapidly adopting AI, and the people who can identify a problem and build an intelligent solution are becoming indispensable.',
    shiftPara2: 'Traditional programming courses spend months teaching syntax. By the time many students graduate, technology has already changed. You need practical skills for today’s AI-first world.',
    oppEyebrow: 'The opportunity',
    oppTitle: 'AI has changed software development forever.',
    skillAiAgents: 'AI Agents',
    skillBusinessAutomations: 'Business Automations',
    skillWebsites: 'Websites',
    skillMobileApps: 'Mobile Apps',
    skillSaasProducts: 'SaaS Products',
    skillAiWrappers: 'AI Wrappers',
    skillInternalTools: 'Internal Business Tools',
    skillChatbots: 'Chatbots',
    skillVoiceAi: 'Voice AI',
    skillCustomerSupport: 'Customer Support Systems',

    programEyebrow: 'The 100-Day Program',
    programTitle: 'Learn by building real-world AI applications.',
    programSubhead: 'Master AI-assisted coding, web & mobile app creation, voice AI, and business automation workflows.',
    pillar1Title: '01 · Real Projects',
    pillar1Desc: 'Build portfolio-grade software and SaaS products instead of theoretical assignments.',
    pillar2Title: '02 · AI Workflows',
    pillar2Desc: 'Leverage Cursor, Vibe Coding, AI Agents, and LLM APIs to build 10x faster.',
    pillar3Title: '03 · Career Launch',
    pillar3Desc: 'Gain practical experience ready for freelancing, startup launch, or developer jobs.',

    buildEyebrow: 'What you’ll build',
    buildTitle: 'Every project becomes proof of your skills.',
    buildSubhead: 'Instead of completing assignments that nobody uses, you’ll create useful AI products and systems.',
    bigProjectTitle: 'AI websites. AI mobile apps. AI agents.',
    bigProjectDesc: 'Build the kind of products that turn an idea into a useful experience for real people.',
    smallProject1Title: 'Business systems that move work forward.',
    smallProject1Desc: 'WhatsApp automation, CRM automation, business workflows, and marketing systems.',
    smallProject2Title: 'Voice AI and a portfolio that speaks for itself.',
    smallProject2Desc: 'Launch-ready work that demonstrates what you can do.',

    diffEyebrow: 'What makes us different',
    diffTitle: 'Don’t study the future. Build it.',
    diffSubhead: 'The traditional route prepares you for yesterday’s tech stack. InstaSkills prepares you for tomorrow.',
    oldWayLabel: 'TRADITIONAL ROUTE',
    oldWayTitle: 'Studying syntax line by line',
    oldWayItem1: 'Months spent memorizing theory and syntax',
    oldWayItem2: 'Building toy projects that nobody uses',
    oldWayItem3: 'Stuck watching endless video tutorial playlists',
    oldWayItem4: 'Generic certificates without portfolio proof',
    newWayLabel: 'INSTASKILLS ROUTE',
    newWayTitle: 'Building AI solutions from day one',
    newWayItem1: 'Build real-world apps with AI acceleration',
    newWayItem2: 'Ship production websites, mobile apps & agents',
    newWayItem3: 'Master Vibe Coding and modern AI tools',
    newWayItem4: 'Launch-ready portfolio that proves your capability',
    proofTag: '10+ Real AI Projects',

    audienceEyebrow: 'Who this is for',
    audienceTitle: 'For people ready to make the switch.',
    audienceSubhead: 'No computer science degree required. No prior coding experience required. Just curiosity and commitment.',
    audStudents: 'Students',
    audFreshGrads: 'Fresh Graduates',
    audJobSeekers: 'Job Seekers',
    audCareerSwitchers: 'Career Switchers',
    audFreelancers: 'Freelancers',
    audEntrepreneurs: 'Entrepreneurs',
    audProfessionals: 'Working Professionals',

    transEyebrow: 'Your transformation',
    transTitle: 'Not a new title. A new body of work.',
    transSubhead: 'In 100 days, uncertainty gives way to a portfolio you can open, explain, and improve.',
    day1Label: 'Day 01',
    day1Title: 'Before InstaSkills',
    day1Item1: 'Unsure where to start',
    day1Item2: 'No portfolio or real projects',
    day1Item3: 'Fear of coding',
    day100Label: 'Day 100',
    day100Title: 'After InstaSkills',
    day100Item1: 'AI Full-stack Developer',
    day100Item2: 'A real portfolio of AI apps and agents',
    day100Item3: 'Business solutions you can demonstrate',
    day100Item4: 'Ready for jobs, freelancing, or your own idea',

    videoEyebrow: 'Program Showcase',
    videoTitle: 'Watch the InstaSkills Experience',
    videoSubhead: 'See how our 100-day program turns beginners into real-world AI Full-Stack developers.',
    videoCard1Tag: '01 · Production Code',
    videoCard1Title: 'Build & Ship Real Apps',
    videoCard1Desc: 'Live websites, web tools & APIs.',
    videoCard2Tag: '02 · Next-Gen Tooling',
    videoCard2Title: 'AI-Powered Workflows',
    videoCard2Desc: 'Cursor, Vibe Coding & AI Agents.',
    videoCard3Tag: '03 · 100-Day Path',
    videoCard3Title: 'Zero to Launch Ready',
    videoCard3Desc: 'No CS degree or coding background needed.',

    finalEyebrow: 'The next cohort',
    finalTitle: 'The future won’t wait. Neither should you.',
    finalSubhead: 'Become an AI Full-stack Developer. Learn. Build. Launch. Get hired.',

    footerText: 'InstaSkills · AI Full-stack Developer Program',
    copyright: '© 2026',

    modalClose: 'Close',
    modalWaTitle: 'Connect on WhatsApp',
    modalWaDesc: 'Get instant answers about the 100-day program, fees, and upcoming cohorts.',
    modalWaBtn: 'Start WhatsApp Chat',
    modalFormTitle: 'Apply for Early Access',
    modalFormDesc: 'Fill out our quick application form to reserve your spot for the next cohort.',
    modalFormBtn: 'Open Application Form',

    // FreeResourcesModal
    modal_fr_badge: 'FREE AI RESOURCE KIT',
    modal_fr_title: '100-Day AI Full-Stack Resources',
    modal_fr_subtitle: 'Great choice! Here is your complete 100-day AI Full-Stack Development resource kit including course roadmap, AI mentor, video guides, bonus e-books, and registration form:',
    modal_fr_res1_title: '1. Registration Form',
    modal_fr_res1_desc: 'Fill out the registration form so we can customize your learning roadmap.',
    modal_fr_res1_btn: 'Open Registration Form',
    modal_fr_res2_title: '2. Course Roadmap',
    modal_fr_res2_desc: 'Detailed 100-day AI Full-Stack curriculum breakdown & module guide.',
    modal_fr_res2_btn: 'View Roadmap Doc',
    modal_fr_res3_title: '3. AI Mentor Custom GPT',
    modal_fr_res3_desc: 'Access your 24/7 Lifeboat AI Mentor on ChatGPT.',
    modal_fr_res3_btn: 'Launch AI Mentor',
    modal_fr_res4_title: '4. Program Overview Videos',
    modal_fr_res4_desc: 'Watch introduction and project showcase videos.',
    modal_fr_res4_btn1: 'Watch Overview Video 1',
    modal_fr_res4_btn2: 'Watch Overview Video 2',
    modal_fr_res5_title: '5. Bonus E-Books',
    modal_fr_res5_desc: 'Exclusive developer playbooks and growth guides.',
    modal_fr_res5_btn1: 'Download E-Book 1',
    modal_fr_res5_btn2: 'Download E-Book 2',
    modal_fr_footer_note: '💡 Please fill out the registration form above so we can customize your learning roadmap.'
  },
  kn: {
    navOpportunity: 'ಅವಕಾಶ',
    navProgram: 'ಕಾರ್ಯಕ್ರಮ',
    navProjects: 'ಪ್ರಾಜೆಕ್ಟ್‌ಗಳು',
    navApply: 'ಅರ್ಜಿ ಸಲ್ಲಿಸಿ',
    whatsappUs: 'ವಾಟ್ಸಾಪ್ ಮಾಡಿ',
    applyEarlyAccess: 'ಆರಂಭಿಕ ಪ್ರವೇಶಕ್ಕೆ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ',
    preBookNow: 'ಕೋರ್ಸ್ ಮುಂಗಡ ಬುಕಿಂಗ್ (₹999)',
    signUp: 'ಸೈನ್ ಅಪ್',
    whatsappDiscoveryCall: 'ಉಚಿತ ಸಮಾಲೋಚನೆ ಕರೆ',

    btn_free_resources: 'ಉಚಿತ ಸಂಪನ್ಮೂಲಗಳು',
    btn_find_skill_gap: 'ಸ್ಕಿಲ್ ಗ್ಯಾಪ್ ಹುಡುಕಿ',

    heroBadge1Title: '100 ದಿನಗಳು',
    heroBadge1Desc: 'ಮೊದಲ ಬಿಲ್ಡ್‌ನಿಂದ ನಿಜವಾದ ಪೋರ್ಟ್‌ಫೋಲಿಯೊವರೆಗೆ ಗಮನಹರಿಸಿದ ಮಾರ್ಗ.',
    heroBadge2Title: 'ಆರಂಭಿಕರಿಗೆ ಸೂಕ್ತ',
    heroBadge2Desc: 'ಯಾವುದೇ ಕೋಡಿಂಗ್ ಅನುಭವ ಅಗತ್ಯವಿಲ್ಲ.',
    heroTitle: 'ನಿಮ್ಮ ಭವಿಷ್ಯವನ್ನು\nವೈಬ್ ಕೋಡ್ ಮಾಡಿ.',
    heroSubhead: 'ಕೇವಲ 100 ದಿನಗಳಲ್ಲಿ AI ಫುಲ್-ಸ್ಟ್ಯಾಕ್ ಡೆವಲಪರ್ ಆಗಿ.',

    shiftEyebrow: 'ಬದಲಾವಣೆ',
    shiftTitle: 'ಜಗತ್ತಿಗೆ ಹೆಚ್ಚಿನ ಕೋಡರ್‌ಗಳು ಬೇಕಾಗಿಲ್ಲ.',
    shiftPara1: 'ಅದಕ್ಕೆ AI ಪರಿಹಾರ ನಿರ್ಮಾಪಕರು ಬೇಕಾಗಿದ್ದಾರೆ. ವ್ಯವಹಾರಗಳು AI ಅನ್ನು ವೇಗವಾಗಿ ಅಳವಡಿಸಿಕೊಳ್ಳುತ್ತಿವೆ, ಮತ್ತು ಸಮಸ್ಯೆಯನ್ನು ಗುರುತಿಸಿ ಬುದ್ಧಿವಂತ ಪರಿಹಾರ ನಿರ್ಮಿಸುವ ಜನರು ಅತ್ಯಗತ್ಯವಾಗುತ್ತಿದ್ದಾರೆ.',
    shiftPara2: 'ಸಾಂಪ್ರದಾಯಿಕ ಪ್ರೋಗ್ರಾಮಿಂಗ್ ಕೋರ್ಸ್‌ಗಳು ಸಿಂಟ್ಯಾಕ್ಸ್ ಕಲಿಸಲು ತಿಂಗಳುಗಳನ್ನು ವ್ಯಯಿಸುತ್ತವೆ. ವಿದ್ಯಾರ್ಥಿಗಳು ಪದವಿ ಪಡೆಯುವಷ್ಟರಲ್ಲಿ ತಂತ್ರಜ್ಞಾನ ಬದಲಾಗಿರುತ್ತದೆ.',
    oppEyebrow: 'ಅವಕಾಶ',
    oppTitle: 'AI ಸಾಫ್ಟ್‌ವೇರ್ ಅಭಿವೃದ್ಧಿಯನ್ನು ಶಾಶ್ವತವಾಗಿ ಬದಲಾಯಿಸಿದೆ.',
    skillAiAgents: 'AI ಏಜೆಂಟ್‌ಗಳು',
    skillBusinessAutomations: 'ಬಿಸಿನೆಸ್ ಆಟೊಮೇಷನ್‌ಗಳು',
    skillWebsites: 'ವೆಬ್‌ಸೈಟ್‌ಗಳು',
    skillMobileApps: 'ಮೊಬೈಲ್ ಆಪ್‌ಗಳು',
    skillSaasProducts: 'SaaS ಉತ್ಪನ್ನಗಳು',
    skillAiWrappers: 'AI ರ್ಯಾಪರ್‌ಗಳು',
    skillInternalTools: 'ಆಂತರಿಕ ಬಿಸಿನೆಸ್ ಟೂಲ್‌ಗಳು',
    skillChatbots: 'ಚಾಟ್‌ಬಾಟ್‌ಗಳು',
    skillVoiceAi: 'ವಾಯ್ಸ್ AI',
    skillCustomerSupport: 'ಗ್ರಾಹಕ ಬೆಂಬಲ ವ್ಯವಸ್ಥೆಗಳು',

    programEyebrow: '100 ದಿನಗಳ ಕಾರ್ಯಕ್ರಮ',
    programTitle: 'ನಿಜವಾದ AI ಅಪ್ಲಿಕೇಶನ್‌ಗಳನ್ನು ನಿರ್ಮಿಸುವ ಮೂಲಕ ಕಲಿಯಿರಿ.',
    programSubhead: 'AI-ಸಹಾಯದ ಕೋಡಿಂಗ್, ವೆಬ್ ಮತ್ತು ಮೊಬೈಲ್ ಅಪ್ಲಿಕೇಶನ್ ರಚನೆ, ವಾಯ್ಸ್ AI ಮತ್ತು ಬಿಸಿನೆಸ್ ಆಟೊಮೇಷನ್ ಕಲಿಯಿರಿ.',
    pillar1Title: '01 · ನಿಜವಾದ ಪ್ರಾಜೆಕ್ಟ್‌ಗಳು',
    pillar1Desc: 'ಸಿದ್ಧಾಂತದ ಬದಲು ಪೋರ್ಟ್‌ಫೋಲಿಯೊ-ಮಟ್ಟದ ಸಾಫ್ಟ್‌ವೇರ್ ಮತ್ತು SaaS ಉತ್ಪನ್ನಗಳನ್ನು ನಿರ್ಮಿಸಿ.',
    pillar2Title: '02 · AI ವರ್ಕ್‌ಫ್ಲೋಗಳು',
    pillar2Desc: 'Cursor, ವೈಬ್ ಕೋಡಿಂಗ್, AI ಏಜೆಂಟ್‌ಗಳನ್ನು ಬಳಸಿ 10x ವೇಗವಾಗಿ ನಿರ್ಮಿಸಿ.',
    pillar3Title: '03 · ವೃತ್ತಿಜೀವನ ಪ್ರಾರಂಭ',
    pillar3Desc: 'ಫ್ರೀಲ್ಯಾನ್ಸಿಂಗ್, ಸ್ಟಾರ್ಟ್‌ಅಪ್ ಅಥವಾ ಡೆವಲಪರ್ ಉದ್ಯೋಗಗಳಿಗೆ ಸಿದ್ಧರಾಗಿ.',

    buildEyebrow: 'ನೀವು ಏನು ನಿರ್ಮಿಸುವಿರಿ',
    buildTitle: 'ಪ್ರತಿಯೊಂದು ಪ್ರಾಜೆಕ್ಟ್ ನಿಮ್ಮ ಕೌಶಲ್ಯಕ್ಕೆ ಸಾಕ್ಷಿಯಾಗುತ್ತದೆ.',
    buildSubhead: 'ಯಾರೂ ಬಳಸದ ಅಸೈನ್‌ಮೆಂಟ್‌ಗಳನ್ನು ಮಾಡುವ ಬದಲು, ನೀವು ಉಪಯುಕ್ತ AI ಉತ್ಪನ್ನಗಳನ್ನು ಸೃಷ್ಟಿಸುತ್ತೀರಿ.',
    bigProjectTitle: 'AI ವೆಬ್‌ಸೈಟ್‌ಗಳು. AI ಮೊಬೈಲ್ ಆಪ್‌ಗಳು. AI ಏಜೆಂಟ್‌ಗಳು.',
    bigProjectDesc: 'ಕಲ್ಪನೆಯನ್ನು ನಿಜವಾದ ಜನರಿಗೆ ಉಪಯುಕ್ತ ಅನುಭವವಾಗಿ ಮಾರ್ಪಡಿಸುವ ಉತ್ಪನ್ನಗಳನ್ನು ನಿರ್ಮಿಸಿ.',
    smallProject1Title: 'ಕೆಲಸವನ್ನು ಮುನ್ನಡೆಸುವ ಬಿಸಿನೆಸ್ ವ್ಯವಸ್ಥೆಗಳು.',
    smallProject1Desc: 'ವಾಟ್ಸಾಪ್ ಆಟೊಮೇಷನ್, CRM ಆಟೊಮೇಷನ್, ಬಿಸಿನೆಸ್ ವರ್ಕ್‌ಫ್ಲೋಗಳು ಮತ್ತು ಮಾರ್ಕೆಟಿಂಗ್ ವ್ಯವಸ್ಥೆಗಳು.',
    smallProject2Title: 'ವಾಯ್ಸ್ AI ಮತ್ತು ತಾನೇ ಮಾತನಾಡುವ ಪೋರ್ಟ್‌ಫೋಲಿಯೊ.',
    smallProject2Desc: 'ನೀವು ಏನು ಮಾಡಬಲ್ಲಿರಿ ಎಂಬುದನ್ನು ಪ್ರದರ್ಶಿಸುವ ಬಿಡುಗಡೆಗೆ ಸಿದ್ಧವಾಗಿರುವ ಕೆಲಸ.',

    diffEyebrow: 'ನಮ್ಮ ವಿಶೇಷತೆ ಏನು',
    diffTitle: 'ಭವಿಷ್ಯವನ್ನು ಅಧ್ಯಯನ ಮಾಡಬೇಡಿ. ಅದನ್ನು ನಿರ್ಮಿಸಿ.',
    diffSubhead: 'ಸಾಂಪ್ರದಾಯಿಕ ಮಾರ್ಗವು ನಿನ್ನೆಯ ತಂತ್ರಜ್ಞಾನಕ್ಕೆ ಸಿದ್ಧಪಡಿಸುತ್ತದೆ. InstaSkills ನಿಮ್ಮನ್ನು ನಾಳೆಗೆ ಸಿದ್ಧಪಡಿಸುತ್ತದೆ.',
    oldWayLabel: 'ಸಾಂಪ್ರದಾಯಿಕ ವಿಧಾನ',
    oldWayTitle: 'ಸಿಂಟ್ಯಾಕ್ಸ್ ಸಾಲು ಸಾಲಾಗಿ ಓದುವುದು',
    oldWayItem1: 'ಸಿದ್ಧಾಂತ ನೆನಪಿಟ್ಟುಕೊಳ್ಳಲು ತಿಂಗಳುಗಳ ವ್ಯಯ',
    oldWayItem2: 'ಯಾರೂ ಬಳಸದ ಆಟಿಕೆ ಪ್ರಾಜೆಕ್ಟ್‌ಗಳನ್ನು ಮಾಡುವುದು',
    oldWayItem3: 'ಮುಗಿಯದ ವೀಡಿಯೊ ಪಾಠಗಳನ್ನು ವೀಕ್ಷಿಸುತ್ತಿರುವುದು',
    oldWayItem4: 'ಪೋರ್ಟ್‌ಫೋಲಿಯೊ ಇಲ್ಲದ ಸಾಮಾನ್ಯ ಪ್ರಮಾಣಪತ್ರಗಳು',
    newWayLabel: 'INSTASKILLS ವಿಧಾನ',
    newWayTitle: 'ಮೊದಲ ದಿನದಿಂದಲೇ AI ಪರಿಹಾರ ನಿರ್ಮಾಣ',
    newWayItem1: 'AI ಸಹಾಯದೊಂದಿಗೆ ನಿಜವಾದ ಅಪ್ಲಿಕೇಶನ್‌ಗಳ ನಿರ್ಮಾಣ',
    newWayItem2: 'ವೆಬ್‌ಸೈಟ್‌ಗಳು, ಮೊಬೈಲ್ ಆಪ್‌ಗಳು ಮತ್ತು ಏಜೆಂಟ್‌ಗಳ ಬಿಡುಗಡೆ',
    newWayItem3: 'ವೈಬ್ ಕೋಡಿಂಗ್ ಮತ್ತು ಆಧುನಿಕ AI ಪರಿಕರಗಳ ಪ್ರವೀಣತೆ',
    newWayItem4: 'ನಿಮ್ಮ ಕೌಶಲ್ಯವನ್ನು ನಿರೂಪಿಸುವ ಸಿದ್ಧ ಪೋರ್ಟ್‌ಫೋಲಿಯೊ',
    proofTag: '10+ ನಿಜವಾದ AI ಪ್ರಾಜೆಕ್ಟ್‌ಗಳು',

    audienceEyebrow: 'ಇದು ಯಾರಿಗೆ ಸೂಕ್ತ',
    audienceTitle: 'ಬದಲಾವಣೆಗೆ ಸಿದ್ಧರಾಗಿರುವ ಜನರಿಗೆ.',
    audienceSubhead: 'ಯಾವುದೇ ಕಂಪ್ಯೂಟರ್ ಸೈನ್ಸ್ ಡಿಗ್ರಿ ಅಗತ್ಯವಿಲ್ಲ. ಯಾವುದೇ ಕೋಡಿಂಗ್ ಅನುಭವ ಅಗತ್ಯವಿಲ್ಲ. ಜಿಜ್ಞಾಸೆ ಮತ್ತು ಬದ್ಧತೆ ಸಾಕು.',
    audStudents: 'ವಿದ್ಯಾರ್ಥಿಗಳು',
    audFreshGrads: 'ಹೊಸ ಪದವೀಧರರು',
    audJobSeekers: 'ಉದ್ಯೋಗ ಆಕಾಂಕ್ಷಿಗಳು',
    audCareerSwitchers: 'ವೃತ್ತಿ ಬದಲಾಯಿಸುವವರು',
    audFreelancers: 'ಫ್ರೀಲ್ಯಾನ್ಸರ್‌ಗಳು',
    audEntrepreneurs: 'ಉದ್ಯಮಿಗಳು',
    audProfessionals: 'ಉದ್ಯೋಗಿಗಳು',

    transEyebrow: 'ನಿಮ್ಮ ರೂಪಾಂತರ',
    transTitle: 'ಹೊಸ ಹುದ್ದೆಯಲ್ಲ. ಹೊಸ ಸಾಧನೆಯ ಗುಚ್ಛ.',
    transSubhead: '100 ದಿನಗಳಲ್ಲಿ, ಅನಿಶ್ಚಿತತೆಯು ನೀವು ಪ್ರದರ್ಶಿಸಬಹುದಾದ ಪೋರ್ಟ್‌ಫೋಲಿಯೊಗೆ ದಾರಿ ಮಾಡಿಕೊಡುತ್ತದೆ.',
    day1Label: 'ದಿನ 01',
    day1Title: 'InstaSkills ಗಿಂತ ಮೊದಲು',
    day1Item1: 'ಎಲ್ಲಿಂದ ಪ್ರಾರಂಭಿಸಬೇಕೆಂದು ತಿಳಿಯದಿರುವುದು',
    day1Item2: 'ಯಾವುದೇ ಪೋರ್ಟ್‌ಫೋಲಿಯೊ ಅಥವಾ ನಿಜವಾದ ಪ್ರಾಜೆಕ್ಟ್‌ಗಳಿಲ್ಲ',
    day1Item3: 'ಕೋಡಿಂಗ್ ಎಂದರೆ ಭಯ',
    day100Label: 'ದಿನ 100',
    day100Title: 'InstaSkills ನಂತರ',
    day100Item1: 'AI ಫುಲ್-ಸ್ಟ್ಯಾಕ್ ಡೆವಲಪರ್',
    day100Item2: 'AI ಆಪ್‌ಗಳು ಮತ್ತು ಏಜೆಂಟ್‌ಗಳ ನಿಜವಾದ ಪೋರ್ಟ್‌ಫೋಲಿಯೊ',
    day100Item3: 'ಪ್ರದರ್ಶಿಸಬಹುದಾದ ಬಿಸಿನೆಸ್ ಪರಿಹಾರಗಳು',
    day100Item4: 'ಉದ್ಯೋಗ, ಫ್ರೀಲ್ಯಾನ್ಸಿಂಗ್ ಅಥವಾ ಸ್ವಂತ ಕಲ್ಪನೆಗೆ ಸಿದ್ಧ',

    videoEyebrow: 'ಕಾರ್ಯಕ್ರಮದ ಪ್ರದರ್ಶನ',
    videoTitle: 'InstaSkills ಅನುಭವವನ್ನು ವೀಕ್ಷಿಸಿ',
    videoSubhead: 'ನಮ್ಮ 100 ದಿನಗಳ ಕಾರ್ಯಕ್ರಮವು ಆರಂಭಿಕರನ್ನು ನಿಜವಾದ AI ಫುಲ್-ಸ್ಟ್ಯಾಕ್ ಡೆವಲಪರ್‌ಗಳಾಗಿ ಹೇಗೆ ಬದಲಾಯಿಸುತ್ತದೆ ಎಂಬುದನ್ನು ನೋಡಿ.',
    videoCard1Tag: '01 · ಪ್ರೊಡಕ್ಷನ್ ಕೋಡ್',
    videoCard1Title: 'ನಿಜವಾದ ಆಪ್‌ಗಳ ನಿರ್ಮಾಣ & ಬಿಡುಗಡೆ',
    videoCard1Desc: 'ಲೈವ್ ವೆಬ್‌ಸೈಟ್‌ಗಳು, ವೆಬ್ ಪರಿಕರಗಳು ಮತ್ತು APIಗಳು.',
    videoCard2Tag: '02 · ಆಧುನಿಕ ಪರಿಕರಗಳು',
    videoCard2Title: 'AI-ಆಧಾರಿತ ವರ್ಕ್‌ಫ್ಲೋಗಳು',
    videoCard2Desc: 'Cursor, ವೈಬ್ ಕೋಡಿಂಗ್ ಮತ್ತು AI ಏಜೆಂಟ್‌ಗಳು.',
    videoCard3Tag: '03 · 100 ದಿನಗಳ ಮಾರ್ಗ',
    videoCard3Title: 'ಆರಂಭದಿಂದ ಸಿದ್ಧತೆಯವರೆಗೆ',
    videoCard3Desc: 'ಯಾವುದೇ ಕೋಡಿಂಗ್ ಹಿನ್ನೆಲೆ ಅಗತ್ಯವಿಲ್ಲ.',

    finalEyebrow: 'ಮುಂದಿನ ಬ್ಯಾಚ್',
    finalTitle: 'ಭವಿಷ್ಯವು ಕಾಯುವುದಿಲ್ಲ. ನೀವೂ ಕಾಯಬೇಡಿ.',
    finalSubhead: 'AI ಫುಲ್-ಸ್ಟ್ಯಾಕ್ ಡೆವಲಪರ್ ಆಗಿ. ಕಲಿಯಿರಿ. ನಿರ್ಮಿಸಿ. ಬಿಡುಗಡೆ ಮಾಡಿ. ಉದ್ಯೋಗ ಪಡೆಯಿರಿ.',

    footerText: 'InstaSkills · AI ಫುಲ್-ಸ್ಟ್ಯಾಕ್ ಡೆವಲಪರ್ ಪ್ರೋಗ್ರಾಂ',
    copyright: '© 2026',

    modalClose: 'ಮುಚ್ಚಿ',
    modalWaTitle: 'WhatsApp ನಲ್ಲಿ ಸಂಪರ್ಕಿಸಿ',
    modalWaDesc: '100 ದಿನಗಳ ಕಾರ್ಯಕ್ರಮ, ಶುಲ್ಕ ಮತ್ತು ಮುಂಬರುವ ಬ್ಯಾಚ್‌ಗಳ ಕುರಿತು ತಕ್ಷಣದ ಉತ್ತರಗಳನ್ನು ಪಡೆಯಿರಿ.',
    modalWaBtn: 'WhatsApp ಚಾಟ್ ಪ್ರಾರಂಭಿಸಿ',
    modalFormTitle: 'ಆರಂಭಿಕ ಪ್ರವೇಶಕ್ಕಾಗಿ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ',
    modalFormDesc: 'ಮುಂದಿನ ಬ್ಯಾಚ್‌ನಲ್ಲಿ ನಿಮ್ಮ ಸ್ಥಾನವನ್ನು ಕಾಯ್ದಿರಿಸಲು ನಮ್ಮ ತ್ವರಿತ ಅರ್ಜಿ ಫಾರ್ಮ್ ಅನ್ನು ಭರ್ತಿ ಮಾಡಿ.',
    modalFormBtn: 'ಅರ್ಜಿ ಫಾರ್ಮ್ ತೆರೆಯಿರಿ',

    // FreeResourcesModal
    modal_fr_badge: 'ಉಚಿತ AI ಸಂಪನ್ಮೂಲ ಕಿಟ್',
    modal_fr_title: '100-ದಿನಗಳ AI ಫುಲ್-ಸ್ಟ್ಯಾಕ್ ಸಂಪನ್ಮೂಲಗಳು',
    modal_fr_subtitle: 'ಉತ್ತಮ ಆಯ್ಕೆ! ಕೋರ್ಸ್ ರೋಡ್‌ಮ್ಯಾಪ್, AI ಮಾರ್ಗದರ್ಶಿ, ವೀಡಿಯೊ ಮಾರ್ಗದರ್ಶಿಗಳು, ಬೋನಸ್ ಇ-ಪುಸ್ತಕಗಳು ಮತ್ತು ನೋಂದಣಿ ಫಾರ್ಮ್ ಸೇರಿದಂತೆ ನಿಮ್ಮ ಸಂಪೂರ್ಣ 100-ದಿನಗಳ AI ಫುಲ್-ಸ್ಟ್ಯಾಕ್ ಸಂಪನ್ಮೂಲ ಕಿಟ್ ಇಲ್ಲಿದೆ:',
    modal_fr_res1_title: '1. ನೋಂದಣಿ ಫಾರ್ಮ್',
    modal_fr_res1_desc: 'ನಿಮ್ಮ ಕಲಿಕೆಯ ರೋಡ್‌ಮ್ಯಾಪ್ ಅನ್ನು ಸಿದ್ಧಪಡಿಸಲು ನೋಂದಣಿ ಫಾರ್ಮ್ ಭರ್ತಿ ಮಾಡಿ.',
    modal_fr_res1_btn: 'ನೋಂದಣಿ ಫಾರ್ಮ್ ತೆರೆಯಿರಿ',
    modal_fr_res2_title: '2. ಕೋರ್ಸ್ ರೋಡ್‌ಮ್ಯಾಪ್',
    modal_fr_res2_desc: 'ವಿವರವಾದ 100-ದಿನಗಳ AI ಫುಲ್-ಸ್ಟ್ಯಾಕ್ ಪಠ್ಯಕ್ರಮ ಮತ್ತು ಮಾಡ್ಯೂಲ್ ಮಾರ್ಗದರ್ಶಿ.',
    modal_fr_res2_btn: 'ರೋಡ್‌ಮ್ಯಾಪ್ ಡಾಕ್ಯುಮೆಂಟ್ ವೀಕ್ಷಿಸಿ',
    modal_fr_res3_title: '3. AI ಮಾರ್ಗದರ್ಶಿ Custom GPT',
    modal_fr_res3_desc: 'ChatGPT ಯಲ್ಲಿ ನಿಮ್ಮ 24/7 Lifeboat AI ಮಾರ್ಗದರ್ಶಿಯನ್ನು ಬಳಸಿ.',
    modal_fr_res3_btn: 'AI ಮಾರ್ಗದರ್ಶಿ ಪ್ರಾರಂಭಿಸಿ',
    modal_fr_res4_title: '4. ಪ್ರೋಗ್ರಾಂ ಓವರ್‌ವ್ಯೂ ವೀಡಿಯೊಗಳು',
    modal_fr_res4_desc: 'ಪರಿಚಯ ಮತ್ತು ಪ್ರಾಜೆಕ್ಟ್ ಪ್ರದರ್ಶನ ವೀಡಿಯೊಗಳನ್ನು ವೀಕ್ಷಿಸಿ.',
    modal_fr_res4_btn1: 'ಓವರ್‌ವ್ಯೂ ವೀಡಿಯೊ 1 ವೀಕ್ಷಿಸಿ',
    modal_fr_res4_btn2: 'ಓವರ್‌ವ್ಯೂ ವೀಡಿಯೊ 2 ವೀಕ್ಷಿಸಿ',
    modal_fr_res5_title: '5. ಬೋನಸ್ ಇ-ಪುಸ್ತಕಗಳು',
    modal_fr_res5_desc: 'ವಿಶೇಷ ಡೆವಲಪರ್ ಪ್ಲೇಬುಕ್‌ಗಳು ಮತ್ತು ಬೆಳವಣಿಗೆ ಮಾರ್ಗದರ್ಶಿಗಳು.',
    modal_fr_res5_btn1: 'ಇ-ಪುಸ್ತಕ 1 ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ',
    modal_fr_res5_btn2: 'ಇ-ಪುಸ್ತಕ 2 ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ',
    modal_fr_footer_note: '💡 ನಿಮ್ಮ ಕಲಿಕೆಯ ರೋಡ್‌ಮ್ಯಾಪ್ ಅನ್ನು ಸಿದ್ಧಪಡಿಸಲು ದಯವಿಟ್ಟು ಮೇಲಿನ ನೋಂದಣಿ ಫಾರ್ಮ್ ಭರ್ತಿ ಮಾಡಿ.'
  }
};

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    return localStorage.getItem('instaskills_lang') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('instaskills_lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (newLang) => {
    if (newLang === lang) return;
    setLangState(newLang);
    localStorage.setItem('instaskills_lang', newLang);
    document.documentElement.lang = newLang;

    // Refresh ScrollTrigger positions after layout recalculation
    requestAnimationFrame(() => {
      if (window.ScrollTrigger) {
        window.ScrollTrigger.refresh();
      }
    });
  };

  const toggleLanguage = () => {
    setLang(lang === 'en' ? 'kn' : 'en');
  };

  const t = (key) => {
    const dict = translations[lang] || translations.en;
    return dict[key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
