var META={
home:['Muhammad Arslan | Senior AI Engineer – Generative AI, LLMs, RAG & Voice AI','Senior AI Engineer and team lead specializing in Generative AI, LLMs, RAG, AI agents and real-time voice AI. Open to remote and relocation.'],
experience:['Experience | Muhammad Arslan, Senior AI Engineer','Six years of AI and ML work: Twilio voice agents, enterprise RAG chatbots and team leadership at Blue Cascade.'],
projects:['Projects | TableOS, One System, Skills Stack – Muhammad Arslan','TableOS, One System and Skills Stack: a multi-tenant data platform, an AI reporting assistant and 985 curated AI agent skills.'],
skills:['Skills | LLMs, RAG, Voice AI, FastAPI – Muhammad Arslan','LangChain, LlamaIndex, Qdrant, OpenAI Realtime, Twilio, FastAPI, PostgreSQL, React, GCP and more.'],
research:['Research & Education | Muhammad Arslan','Two peer-reviewed NLP papers (IEEE 2026, CMES 2025) on Urdu RAG and LLM-based clustering, plus education and awards.'],
contact:['Contact | Muhammad Arslan, Senior AI Engineer','Email, phone, LinkedIn and GitHub. Open to remote work and relocation.']};

var JOBS=[
['Feb 2025 – now','Senior AI Engineer, Team Lead','Blue Cascade Software Solutions',[
['Team:','set system architecture, write HLD/LLD documents, run code reviews and mentor engineers. Interviewed 50+ candidates and hired 12.'],
['AI outbound calling:','Twilio on an async FastAPI backend with WebSocket audio streaming, OpenAI Realtime speech-to-text, sentiment analysis and ElevenLabs streaming TTS. n8n drives call states and HubSpot sync. Cut manual follow-up by 70%+.'],
['Mock Mate:','an AI voice interviewer that reads a CV, phones the candidate, scores answers with OpenAI and Qdrant retrieval, and sends HR an evaluation. Cut screening workload by 70%+.'],
['Cascade Voice Intelligence:','a RAG voice bot for the company website with scheduling and CRM logging, tuned for low latency.'],
['Enterprise RAG chatbot:','GPT-4 Turbo over the internal knowledge base using LangChain, LlamaIndex, Qdrant and ChromaDB, with hybrid search, reranking and prompt-injection guardrails. Evaluated on BLEU, ROUGE, accuracy and completeness.']]],
['Oct 2024 – Jan 2025','Machine Learning Engineer','3rd Eye Software',[['','Built ChromaDocBot, a document chatbot on OpenAI embeddings, ChromaDB and GPT-4, and a Whisper + GPT-4 Turbo pipeline that turns live audio into SOAP notes for healthcare.']]],
['Jan 2023 – Jun 2024','Lead Data Analyst','Wasaib Sanwaro (UNDP project)',[['','Led analysis, Power BI monitoring and Global Fund compliance audits for a patient and beneficiary information system.']]],
['2020 – 2022','ML Engineer and Data Scientist, freelance','Fiverr and Mechesol Co.',[['','Data pipelines, retention analysis, Streamlit apps and Power BI dashboards for ForHumans, Urbanmop and Kölle Zoo, plus YOLOv5 object detection in PyTorch.']]],
['2016 – 2020','Earlier roles','',[['','Research Associate at the NBIC Lab, Shandong, China: privacy-preserving machine learning with secure multiparty computation, on a full CSC scholarship.'],['','Network Administrator at Indus Dyeing & Mfg.: company-wide network and servers, and a 120-camera CCTV project.']]]];
var PROJ=[
['96K','lines of TypeScript, replacing Airtable company-wide','TableOS','TypeScript, Fastify, PostgreSQL 16, Redis, BullMQ, WebSockets, React 19, Docker','',[
'Architected and co-built a multi-tenant no-code database platform in a pnpm/Turborepo monorepo, as a modular monolith with separate API, realtime, worker and relay services.',
'Two-way Airtable and HubSpot sync up to 500K records per table, and an automation engine with Gmail and Slack actions.',
'Google OAuth, TOTP MFA, field-level permissions, audit history and undo. Cut full-text search on a 500-field table from 60+ seconds to 1–2 seconds.',
'AI features behind guardrails: a plain-language table builder, an in-app chatbot and AI-generated dashboards.']],
['120+','REST endpoints behind one reporting system','One System','Python, Flask, PostgreSQL, JWT, Socket.IO, OpenAI GPT-4o, HubSpot, Google Ads, React 19, Tailwind CSS','',[
'The company’s central data and reporting platform, used by project managers and leadership.',
'An AI assistant with OpenAI tool calling over live reports. Each user only gets the tools their JWT privileges allow, so the chatbot and the API enforce the same RBAC rules.',
'Automated reports across marketing, Google Ads, AI calls, design and QA with AI summaries, Slack alerts and PDF/CSV export, cutting manual reporting by about 70%.']],
['985','open-source agent skills in 45 plugins','Skills Stack','Python, Claude Code plugin marketplace, GitHub Pages','https://github.com/marslanalvi/SkillsStack',[
'Curated skills from 12 upstream projects into 45 installable Claude Code plugins across 9 categories.',
'Python tooling to classify and de-duplicate skills, attach licenses and attribution, and build a searchable catalog.']]];
var SK=[
['Generative AI and agents','OpenAI GPT-4o and GPT-4 Turbo, Claude, Gemini, Llama (Ollama), LangChain, LangGraph, LlamaIndex, Model Context Protocol, tool calling, Claude Code skills and plugins, fine-tuning, prompt engineering'],
['RAG and evaluation','Qdrant, ChromaDB, embeddings, chunking, hybrid search, reranking, BLEU, ROUGE, guardrails, prompt-injection defense'],
['Voice AI','Twilio, OpenAI Realtime API, Whisper, ElevenLabs, Vapi, WebSocket audio streaming, sentiment analysis'],
['Machine learning','PyTorch, TensorFlow, Hugging Face Transformers, scikit-learn, YOLOv5, NLP'],
['Backend and data','Python (FastAPI, Flask, asyncio, Pydantic), Node.js, TypeScript, Fastify, WebSockets, PostgreSQL, Redis, BullMQ, JWT, OAuth 2.0, RBAC'],
['Frontend','React, TypeScript, Vite, TanStack, Zustand, Tailwind CSS, Recharts'],
['Cloud and DevOps','GCP, AWS (EC2, S3), Docker, GitHub Actions, Turborepo, Playwright, CodeQL, Semgrep'],
['Integrations','HubSpot, Airtable, Gmail, Slack, Google Ads, n8n, Make, Zapier, Power Automate']];

var CH=[
{k:'voice call calling phone twilio outbound elevenlabs realtime whisper speech sentiment hubspot audio streaming',s:'Work · AI outbound calling',a:'I built an outbound AI calling platform on Twilio and an async FastAPI backend: WebSocket audio streaming, OpenAI Realtime speech-to-text, sentiment analysis and ElevenLabs streaming text-to-speech. n8n drives call states and syncs to HubSpot in real time. It cut manual follow-up by 70% or more.'},
{k:'interview interviewer mock mate hiring screening candidate cv hr vapi evaluation',s:'Work · Mock Mate',a:'Mock Mate is an AI voice interviewer. It reads a candidate’s CV, runs a personalized phone interview through Vapi and ElevenLabs, scores the answers with OpenAI and Qdrant retrieval, and sends HR an evaluation. It cut screening workload by 70% or more.'},
{k:'website bot scheduling crm latency cascade intelligence voice rag conversation',s:'Work · Cascade Voice Intelligence',a:'Cascade Voice Intelligence is a RAG voice bot on the company website. It holds two-way conversations, schedules calls and logs to the CRM, and I reduced its response latency with prompt engineering and n8n webhook triggers.'},
{k:'rag retrieval chatbot chatbots langchain llamaindex qdrant chromadb vector embeddings rerank reranking hybrid evaluate evaluation bleu rouge guardrail guardrails injection knowledge',s:'Work · Enterprise RAG chatbot',a:'The enterprise RAG chatbot runs GPT-4 Turbo over the internal knowledge base with LangChain and LlamaIndex on Qdrant and ChromaDB, using hybrid search and reranking. I evaluated it on BLEU, ROUGE, accuracy and completeness, and added prompt-injection and output guardrails.'},
{k:'tableos airtable database platform postgres postgresql redis typescript sync search fast performance multi-tenant monorepo security mfa oauth',s:'Projects · TableOS',a:'TableOS is a multi-tenant, Airtable-class database platform that replaced Airtable company-wide: about 96K lines of TypeScript with two-way Airtable and HubSpot sync, an automation engine and enterprise security. I also cut full-text search on a 500-field table from 60+ seconds to 1–2 seconds.'},
{k:'system reporting dashboard flask rbac jwt assistant tool calling hubspot reports endpoints react privileges',s:'Projects · One System',a:'One System is the company’s central reporting platform: a Flask backend with 120+ REST endpoints and a React dashboard. Its AI assistant uses OpenAI tool calling over live reports, and each user only gets the tools their JWT privileges allow, so the chatbot and the API enforce the same RBAC rules.'},
{k:'skills claude code plugins marketplace mcp open-source opensource github catalog agent agents',s:'Projects · Skills Stack',a:'Skills Stack is an open-source marketplace I curate: 985 AI agent skills from 12 upstream projects, packaged into 45 installable Claude Code plugins across 9 categories, with Python tooling for de-duplication, licenses and a searchable catalog.'},
{k:'team lead leader leadership manage managed mentor hire hired architecture design documents code reviews',s:'Work · Team lead',a:'I lead a team of 6–8 AI engineers. I set system architecture, write HLD and LLD documents, run code reviews and mentor engineers from prototype to production. I’ve interviewed 50+ candidates and hired 12.'},
{k:'paper papers research publication publications ieee cmes urdu nlp clustering low-resource published author',s:'Research',a:'I’ve co-authored two peer-reviewed NLP papers: “UQA-RAG: Enhancing Urdu Question-Answer Retrieval With Semantic Similarity and LLMs” (IEEE, 2026) and “LLM-Based Enhanced Clustering for Low-Resource Language” (CMES, 2025).'},
{k:'education degree university masters scholarship certification certifications study course courses stanford coursera',s:'Education',a:'I’m finishing an MS in Computer Science at the Institute of Southern Punjab (2024–2026) and hold a BS (Hons.) in Telecommunication Systems from Bahauddin Zakariya University. I earned a full China Scholarship Council scholarship in 2019 and completed Stanford and DeepLearning.AI’s Machine Learning Specialization.'},
{k:'remote relocate relocation available open job hire contact email reach location pakistan where based',s:'Contact',a:'I’m based in Pakistan and open to both remote work and relocation. The fastest way to reach me is arslanalvi.ai@gmail.com.'},
{k:'stack languages python typescript react tools cloud gcp aws docker fastapi tech technologies',s:'Skills',a:'My core stack is Python (FastAPI, Flask), TypeScript and Node.js on the backend, React on the frontend, PostgreSQL and Redis for data, and Docker on GCP and AWS. For AI work I use OpenAI, Claude, LangChain, LlamaIndex, Qdrant and ChromaDB.'},
{k:'freelance earlier yolov5 healthcare soap undp analyst power bi data scientist previous experience history',s:'Work · Earlier roles',a:'Before my current role I built ChromaDocBot and a Whisper-based SOAP-notes pipeline for healthcare, led data analysis and Global Fund compliance audits on a UNDP project, and did freelance data science with Power BI, Streamlit and YOLOv5 models.'}];

var ABOUT='I’m Muhammad Arslan, a Senior AI Engineer and team lead based in Pakistan with 6+ years in machine learning. At Blue Cascade I build LLM chatbots, RAG systems, Twilio voice agents and company-wide platforms.';
var GREET='Hi, I’m Muhammad Arslan. This assistant answers in my voice, using only what’s written in my CV. Ask me about my work, projects, research or availability.';
var LEAD=['Sure. ','Good question. ','Happy to share. ','Here’s the short version. ','',''];
var SW='what who how have you your are the an and of to in on for with did do tell me about is any can my it be at has was were this that'.split(' ');
var Q=['What voice AI have you built?','How does your RAG chatbot work?','Tell me about TableOS','Have you led a team?','Any research papers?','Are you open to remote work?'];
function tok(q){return q.toLowerCase().replace(/[^a-z0-9\- ]/g,' ').split(/\s+/).filter(function(w){return w&&SW.indexOf(w)<0})}
function hit(w,x){return w===x||(w.length>=5&&x.length>=5&&w.slice(0,5)===x.slice(0,5))}
function answer(q){var l=q.toLowerCase().trim();
if(/^(hi|hello|hey|salam|assalam[a-z ]*)\b/.test(l))return{t:'Hi! I’m Muhammad Arslan. What would you like to know about my work?'};
if(/(who are you|introduce|yourself|about you|your name)/.test(l))return{t:ABOUT,src:[['About me',100]]};
var t=tok(q),r=CH.map(function(c){var ws=c.k.split(' '),n=0;t.forEach(function(w){if(ws.some(function(x){return hit(w,x)}))n++});return{c:c,n:n}}).filter(function(x){return x.n>0}).sort(function(a,b){return b.n-a.n}).slice(0,3);
if(!r.length)return{t:'That isn’t in my CV, so I won’t guess. You can email me at arslanalvi.ai@gmail.com and ask directly.'};
return{t:LEAD[Math.floor(Math.random()*LEAD.length)]+r[0].c.a,src:r.map(function(x){return[x.c.s,Math.round(Math.min(1,x.n/Math.max(1,t.length))*100)]})}}


export { META, JOBS, PROJ, SK, CH, ABOUT, GREET, LEAD, Q, answer }
