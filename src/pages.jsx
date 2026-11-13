import { Fragment } from "react";
import { Link } from "react-router-dom";
import Stage from "./Stage.jsx";
import Bot from "./Bot.jsx";
import { JOBS, PROJ, SK } from "./data.js";
import BrainStage from "./BrainStage.jsx";

function Page({ title, children }) {
  return (
    <section className="pg">
      <div className="w">
        <h1 className="ph">{title}</h1>
        {children}
      </div>
    </section>
  );
}

export function Home() {
  return (
    <>
      <div className="w hero">
        <h1>
          Muhammad
          <br />
          Arslan
        </h1>
        <div className="row">
          <div>
            <p className="role">
              Senior AI Engineer who builds voice agents, RAG systems and the
              platforms around them.
            </p>
            <p>
              I lead 6–8 AI engineers at Blue Cascade and ship LLM chatbots,
              Twilio voice agents and company-wide platforms. Each cut manual
              work by about 70%.
            </p>
            <div className="btns">
              <Link className="btn main" to="/projects">
                See projects
              </Link>
              <Link className="btn" to="/contact">
                Get in touch
              </Link>
            </div>
          </div>
          <Stage />
        </div>
      </div>
      <section className="tintbg">
        <div className="w">
          <h2>Talk to me.</h2>
          <p>
            Ask my assistant about my work. It answers in my voice, from my CV.
          </p>
          <Bot />
        </div>
      </section>
    </>
  );
}

export function Experience() {
  return (
    <Page title="Experience">
      {JOBS.map((j) => (
        <article className="job" key={j[1]}>
          <div className="when">{j[0]}</div>
          <div>
            <h3>{j[1]}</h3>
            {j[2] && <p>{j[2]}</p>}
            <ul>
              {j[3].map((b, i) => (
                <li key={i}>
                  {b[0] && <b>{b[0]} </b>}
                  {b[1]}
                </li>
              ))}
            </ul>
          </div>
        </article>
      ))}
    </Page>
  );
}

export function Projects() {
  return (
    <Page title="Projects">
      {PROJ.map((p) => (
        <article className="pr" key={p[2]}>
          <div className="big">
            <b>{p[0]}</b>
            <span>{p[1]}</span>
          </div>
          <div>
            <h3>
              {p[4] ? (
                <a href={p[4]} rel="noopener">
                  {p[2]}
                </a>
              ) : (
                p[2]
              )}
            </h3>
            <p className="tech">{p[3]}</p>
            <ul>
              {p[5].map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </div>
        </article>
      ))}
    </Page>
  );
}

export function Skills() {
  return (
    <Page title="Skills">
      <div className="skills-wrap">
        <dl className="skills-list">
          {SK.map((s) => (
            <Fragment key={s[0]}>
              <dt>{s[0]}</dt>
              <dd>{s[1]}</dd>
            </Fragment>
          ))}
        </dl>
        <BrainStage />
      </div>
    </Page>
  );
}

export function Research() {
  return (
    <Page title="Research and education">
      <div className="two">
        <div>
          <h2>Publications</h2>
          <p>
            <b>
              UQA-RAG: Enhancing Urdu Question-Answer Retrieval With Semantic
              Similarity and LLMs.
            </b>{" "}
            IEEE, 2026.
          </p>
          <p>
            <b>
              LLM-Based Enhanced Clustering for Low-Resource Language: An
              Empirical Study.
            </b>{" "}
            Computer Modeling in Engineering &amp; Sciences (CMES), 2025.
          </p>
        </div>
        <div>
          <h2>Education</h2>
          <p>
            <b>MS in Computer Science</b>, Institute of Southern Punjab, Multan,
            2024–2026.
          </p>
          <p>
            <b>BS (Hons.) in Telecommunication Systems</b>, Bahauddin Zakariya
            University, Multan, 2012–2016.
          </p>
          <p>
            Machine Learning Specialization (Stanford and DeepLearning.AI),
            Neural Networks and Deep Learning, Machine Learning with Python
            (IBM). China Scholarship Council full scholarship, 2019. Languages:
            Urdu (native), English and Chinese (fluent).
          </p>
        </div>
      </div>
    </Page>
  );
}

const LINKS = [
  ["Email", "arslanalvi.ai@gmail.com", "mailto:arslanalvi.ai@gmail.com"],
  ["Phone", "+92 335 5503111", "tel:+923355503111"],
  [
    "LinkedIn",
    "linkedin.com/in/marslanalvi",
    "https://www.linkedin.com/in/marslanalvi",
  ],
  ["GitHub", "github.com/marslanalvi", "https://github.com/marslanalvi"],
];

export function Contact() {
  return (
    <Page title="Let’s talk.">
      <p>
        I’m based in Pakistan and open to remote work and relocation. I’m
        interested in LLM, RAG, agent and voice AI engineering roles, and in
        consulting on production AI systems.
      </p>
      <div className="clist">
        {LINKS.map(([k, v, href]) => (
          <a key={k} href={href} rel="me noopener">
            <span>{k}</span>
            <span>{v}</span>
          </a>
        ))}
      </div>
    </Page>
  );
}
