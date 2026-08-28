import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpenCheck, CheckCircle2, Gamepad2, GraduationCap, Home, Users } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CityZoneMap, GamePortals, HeroRepairDemo, PlayerDock } from "@/components/home/CityLobby";
import { JsonLd } from "@/components/JsonLd";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { absoluteUrl, createPageMetadata, defaultDescription, defaultTitle, siteName } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({ title: defaultTitle, description: defaultDescription, path: "/" });

const skills = [
  ["Sentence beginnings", "Start every sentence with a capital letter."],
  ["People and places", "Capitalize names, cities, states, and countries."],
  ["Days and months", "Use capitals for Monday, January, and other calendar names."],
  ["Holidays", "Recognize special names such as Thanksgiving and Labor Day."],
  ["Titles and names", "Use a capital in Professor Lee, but not the professor."],
  ["Unnecessary capitals", "Keep common nouns lowercase when no special name is used."],
];

const faqs = [
  ["What is capitalization?", "Capitalization means using an uppercase letter where English rules require one, such as at the beginning of a sentence or in a person's name."],
  ["What words should always be capitalized?", "Sentence beginnings, the pronoun I, names of people and places, days, months, holidays, languages, nationalities, and titles used directly before names commonly need capital letters."],
  ["Are these capitalization games free?", "Yes. Every Majuscape game is free to play in a web browser, with no download, payment, or student account required."],
  ["What grade learns capitalization?", "Students begin learning basic capitalization in early elementary school and keep practicing more detailed proper noun and title rules through Grades 2-5."],
  ["Can teachers use Majuscape in class?", "Yes. The short rounds work well for classroom warm-ups, independent stations, small-group practice, homework, and homeschool lessons."],
];

export default function HomePage() {
  const pageUrl = absoluteUrl("/");
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebSite", "@id": `${pageUrl}#website`, url: pageUrl, name: siteName, description: defaultDescription, inLanguage: "en-US" },
      { "@type": "WebPage", "@id": `${pageUrl}#webpage`, url: pageUrl, name: defaultTitle, description: defaultDescription, isPartOf: { "@id": `${pageUrl}#website` }, inLanguage: "en-US" },
      { "@type": ["WebApplication", "LearningResource"], "@id": `${pageUrl}#games`, name: "Majuscape Capitalization Games", url: pageUrl, description: defaultDescription, applicationCategory: "EducationalApplication", operatingSystem: "Any", educationalUse: "Practice", learningResourceType: "Interactive game", typicalAgeRange: "7-11", inLanguage: "en-US", isAccessibleForFree: true, offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } },
      { "@type": "FAQPage", "@id": `${pageUrl}#faq-schema`, mainEntity: faqs.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) },
    ],
  };

  return (
    <>
      <SiteHeader />
      <main>
        <section className="city-hero" aria-labelledby="hero-heading">
          <div className="city-skyline" aria-hidden="true"><span /><span /><span /><span /><span /><span /><i /></div>
          <div className="hero-inner">
            <div className="hero-copy">
              <p className="city-alert"><i /> CAPITALIZATION GLITCH DETECTED</p>
              <h1 id="hero-heading">Capitalization Games for Kids</h1>
              <p>Practice capitalization rules through fast, interactive grammar games. Repair words, sort rule cargo, and power up Majuscape City.</p>
              <div className="hero-actions">
                <Link href="/games/capitalization-repair" className="game-button game-button-primary"><Gamepad2 aria-hidden="true" /> Play now</Link>
                <Link href="#games" className="game-button game-button-secondary">Choose a game <ArrowRight aria-hidden="true" /></Link>
              </div>
              <div className="hero-trust"><span><CheckCircle2 aria-hidden="true" /> Free</span><span><CheckCircle2 aria-hidden="true" /> No signup</span><span><CheckCircle2 aria-hidden="true" /> Grades 2-5</span></div>
            </div>
            <HeroRepairDemo />
          </div>
        </section>

        <section className="lobby-band" id="games" aria-labelledby="games-heading">
          <div className="section-shell">
            <PlayerDock />
            <div className="section-heading game-world-heading">
              <p>MAJUSCAPE CITY GAME MAP</p>
              <h2 id="games-heading">Choose your repair mission</h2>
              <span>Three games. Three different capitalization skills.</span>
            </div>
            <div className="learning-route" aria-label="Learning path">
              <span><b>1</b> Learn to notice</span><i /><span><b>2</b> Learn the rule</span><i /><span><b>3</b> Apply it fast</span>
            </div>
            <GamePortals />
          </div>
        </section>

        <section className="zones-band" aria-labelledby="zones-heading">
          <div className="section-shell zones-layout">
            <div className="section-heading left-heading">
              <p>CITY PROGRESSION</p>
              <h2 id="zones-heading">Restore seven skill zones</h2>
              <span>Earn XP and stars as you practice. Progress stays in this browser, so no student account is needed.</span>
            </div>
            <CityZoneMap />
          </div>
        </section>

        <section className="content-band" aria-labelledby="about-games-heading">
          <div className="content-shell">
            <div className="content-intro">
              <div className="content-icon"><BookOpenCheck aria-hidden="true" /></div>
              <p>CAPITALIZATION PRACTICE THAT PLAYS LIKE A GAME</p>
              <h2 id="about-games-heading">What are capitalization games?</h2>
              <span>Capitalization games help students decide when a word should or should not begin with an uppercase letter. Majuscape puts those decisions inside complete sentences, gives rule-based feedback, and lets learners correct the text themselves.</span>
              <Link href="/capitalization-rules-for-kids" className="content-guide-link">Read the capitalization rules for kids <ArrowRight aria-hidden="true" /></Link>
            </div>
            <div className="skill-list" aria-label="Capitalization skills">
              {skills.map(([title, text], index) => <article key={title}><b>{String(index + 1).padStart(2, "0")}</b><div><h3>{title}</h3><p>{text}</p></div></article>)}
            </div>
          </div>
        </section>

        <section className="audience-band" aria-labelledby="audience-heading">
          <div className="section-shell audience-layout">
            <div>
              <p className="section-kicker">BUILT FOR REAL PRACTICE</p>
              <h2 id="audience-heading">For elementary learners and the adults who help them</h2>
              <p>Majuscape is designed primarily for Grades 2-5. Rounds are short enough for a classroom warm-up and focused enough for independent or homeschool capitalization practice.</p>
              <div className="audience-tags"><span><GraduationCap aria-hidden="true" /> Students</span><span><Users aria-hidden="true" /> Teachers & families</span><span><Home aria-hidden="true" /> Classroom or home</span></div>
            </div>
            <div className="teacher-console">
              <span>TEACHER READOUT</span>
              <strong>Every mistake explains the rule.</strong>
              <p>Students see why Monday needs a capital or why teacher stays lowercase, not just a red &quot;wrong&quot; message.</p>
              <Link href="/games/capitalization-repair">Try the repair workshop <ArrowRight aria-hidden="true" /></Link>
            </div>
          </div>
        </section>

        <section className="faq-band" id="faq" aria-labelledby="faq-heading">
          <div className="content-shell faq-layout">
            <div className="section-heading left-heading"><p>CONTROL ROOM FAQ</p><h2 id="faq-heading">Capitalization questions, answered</h2><span>Quick guidance for students, teachers, parents, and homeschool families.</span></div>
            <Accordion type="single" collapsible className="faq-console">
              {faqs.map(([question, answer], index) => <AccordionItem key={question} value={`faq-${index}`}><AccordionTrigger>{question}</AccordionTrigger><AccordionContent>{answer}</AccordionContent></AccordionItem>)}
            </Accordion>
          </div>
        </section>
      </main>
      <SiteFooter />
      <JsonLd data={jsonLd} />
    </>
  );
}
