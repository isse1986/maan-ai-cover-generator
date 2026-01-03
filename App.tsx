import React from 'react';
import Header from './components/Header';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-brand-primary text-brand-light">
      <Header />
      <main>
        <section className="max-w-6xl mx-auto px-6 py-16 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center">
          <div className="space-y-6">
            <p className="text-brand-highlight text-sm font-semibold tracking-[0.2em] uppercase">2024 Digital Planner</p>
            <h2 className="text-4xl md:text-5xl font-display leading-tight">
              A beautifully structured digital planner built for focused mornings and stress-free nights.
            </h2>
            <p className="text-lg text-brand-text">
              Organize daily priorities, weekly reviews, and long-term goals with curated layouts, calming color palettes, and smart prompts that
              keep you moving forward.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-brand-highlight text-brand-primary font-semibold px-6 py-3 rounded-lg hover:bg-opacity-80 transition">
                Download the Planner
              </button>
              <button className="border border-brand-highlight text-brand-highlight font-semibold px-6 py-3 rounded-lg hover:bg-brand-highlight hover:text-brand-primary transition">
                Preview the Pages
              </button>
            </div>
            <div className="flex flex-wrap gap-6 text-sm text-brand-text">
              <div>
                <p className="text-2xl font-display text-brand-light">65+</p>
                <p>Hyperlinked pages</p>
              </div>
              <div>
                <p className="text-2xl font-display text-brand-light">12</p>
                <p>Monthly dashboards</p>
              </div>
              <div>
                <p className="text-2xl font-display text-brand-light">5</p>
                <p>Color themes</p>
              </div>
            </div>
          </div>
          <div className="bg-brand-secondary rounded-3xl p-8 shadow-xl space-y-6">
            <div className="space-y-2">
              <p className="text-brand-highlight text-xs uppercase tracking-[0.3em]">Today</p>
              <h3 className="text-2xl font-display">Monday Momentum</h3>
            </div>
            <div className="space-y-4">
              {[
                'Top 3 priorities with focus timers',
                'Time-blocked schedule with built-in breaks',
                'Mood & energy tracker',
                'Evening reflection prompts',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-brand-highlight"></span>
                  <p className="text-brand-text">{item}</p>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between rounded-2xl bg-brand-accent/80 p-4">
              <div>
                <p className="text-sm text-brand-light">Next review</p>
                <p className="text-xl font-display">Friday, 5:00 PM</p>
              </div>
              <button className="text-sm font-semibold text-brand-highlight">Open review</button>
            </div>
          </div>
        </section>

        <section id="features" className="bg-brand-secondary/40">
          <div className="max-w-6xl mx-auto px-6 py-16 space-y-10">
            <div className="space-y-3">
              <p className="text-brand-highlight text-sm uppercase tracking-[0.3em]">Features</p>
              <h3 className="text-3xl md:text-4xl font-display">Everything you need to plan with intention.</h3>
              <p className="text-brand-text max-w-3xl">
                Our digital planner blends structure with flexibility so you can personalize your workflow without losing focus.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  title: 'Hyperlinked navigation',
                  description: 'Jump from yearly goals to daily plans in a single tap with intuitive tabs and shortcuts.',
                },
                {
                  title: 'Goal-to-task system',
                  description: 'Connect weekly goals to daily action steps so your priorities stay visible and achievable.',
                },
                {
                  title: 'Gentle habit tracker',
                  description: 'Track up to 10 habits with flexible streaks, reflections, and motivation prompts.',
                },
                {
                  title: 'Mood & energy journal',
                  description: 'Capture daily mood data to spot patterns and build more sustainable routines.',
                },
                {
                  title: 'Weekly review ritual',
                  description: 'Guided review pages help you celebrate wins, reset priorities, and plan ahead.',
                },
                {
                  title: 'Device-ready PDF',
                  description: 'Designed for GoodNotes, Notability, and tablet-friendly note apps.',
                },
              ].map((feature) => (
                <div key={feature.title} className="bg-brand-primary rounded-2xl p-6 shadow-lg">
                  <h4 className="text-xl font-semibold font-display mb-2">{feature.title}</h4>
                  <p className="text-brand-text">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="templates" className="max-w-6xl mx-auto px-6 py-16 space-y-10">
          <div className="space-y-3">
            <p className="text-brand-highlight text-sm uppercase tracking-[0.3em]">Templates</p>
            <h3 className="text-3xl md:text-4xl font-display">Layouts designed for every planning style.</h3>
            <p className="text-brand-text max-w-3xl">
              Mix and match pages to build a planning flow that suits your season of life.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                title: 'Daily Focus',
                details: ['Time blocks', 'Priority list', 'Meal & water log'],
              },
              {
                title: 'Weekly Compass',
                details: ['Weekly goals', 'Habit overview', 'Self-care checklist'],
              },
              {
                title: 'Monthly Reset',
                details: ['Calendar view', 'Budget snapshot', 'Project roadmap'],
              },
              {
                title: 'Vision & Goals',
                details: ['Quarterly goals', 'Milestone tracker', 'Reflection prompts'],
              },
            ].map((template) => (
              <div key={template.title} className="border border-brand-accent rounded-2xl p-6">
                <h4 className="text-2xl font-display mb-3">{template.title}</h4>
                <ul className="space-y-2 text-brand-text">
                  {template.details.map((detail) => (
                    <li key={detail} className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-brand-highlight"></span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section id="pricing" className="bg-brand-secondary/40">
          <div className="max-w-6xl mx-auto px-6 py-16 grid gap-8 lg:grid-cols-2 items-center">
            <div className="space-y-4">
              <p className="text-brand-highlight text-sm uppercase tracking-[0.3em]">Pricing</p>
              <h3 className="text-3xl md:text-4xl font-display">One planner. Unlimited planning.</h3>
              <p className="text-brand-text">
                Pay once and use it all year long across your devices. Includes free future updates.
              </p>
              <ul className="space-y-3 text-brand-text">
                {[
                  'Instant download in PDF + PNG',
                  'Lifetime access and updates',
                  'GoodNotes & Notability ready',
                  'Bonus sticker pack included',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-brand-highlight"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-brand-primary rounded-3xl p-8 shadow-xl space-y-6">
              <div>
                <p className="text-brand-highlight text-sm uppercase tracking-[0.3em]">Complete Bundle</p>
                <h4 className="text-4xl font-display">$24</h4>
                <p className="text-brand-text">Includes 5 color themes + 65 hyperlinked pages</p>
              </div>
              <button className="w-full bg-brand-highlight text-brand-primary font-semibold px-6 py-3 rounded-lg hover:bg-opacity-80 transition">
                Buy Now
              </button>
              <p className="text-xs text-brand-text">Secure checkout. Instant download link delivered by email.</p>
            </div>
          </div>
        </section>

        <section id="faq" className="max-w-6xl mx-auto px-6 py-16 space-y-10">
          <div className="space-y-3">
            <p className="text-brand-highlight text-sm uppercase tracking-[0.3em]">FAQ</p>
            <h3 className="text-3xl md:text-4xl font-display">Questions, answered.</h3>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                question: 'What apps does the planner work with?',
                answer: 'The PDF is optimized for GoodNotes, Notability, Noteshelf, and any annotation app that supports hyperlinks.',
              },
              {
                question: 'Can I use it on multiple devices?',
                answer: 'Yes! Use the planner on all your personal devices including iPad, tablet, and desktop.',
              },
              {
                question: 'How do I get updates?',
                answer: 'We email free update links to customers, and your planner always includes future revisions.',
              },
              {
                question: 'Is this a physical product?',
                answer: 'No, it is a digital download. You can print individual pages if you prefer a physical copy.',
              },
            ].map((item) => (
              <div key={item.question} className="bg-brand-secondary rounded-2xl p-6">
                <h4 className="text-xl font-semibold mb-2">{item.question}</h4>
                <p className="text-brand-text">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-gradient-to-r from-brand-secondary via-brand-primary to-brand-secondary">
          <div className="max-w-5xl mx-auto px-6 py-16 text-center space-y-6">
            <h3 className="text-3xl md:text-4xl font-display">Make planning the calmest part of your day.</h3>
            <p className="text-brand-text">
              Download the Digital Planner and bring clarity to your routines with guided prompts and flexible layouts.
            </p>
            <button className="bg-brand-highlight text-brand-primary font-semibold px-8 py-3 rounded-lg hover:bg-opacity-80 transition">
              Start Planning Today
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;
