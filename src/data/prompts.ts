export interface Prompt {
  id: string
  title: string
  prompt: string
  category: Category
  tags: string[]
}

export type Category = 'coding' | 'writing' | 'marketing' | 'research' | 'image-gen' | 'productivity'

export const CATEGORY_META: Record<Category, { label: string; color: string; emoji: string }> = {
  coding: { label: 'Coding', color: 'text-accent-cyan', emoji: '💻' },
  writing: { label: 'Writing', color: 'text-accent-purple', emoji: '✍️' },
  marketing: { label: 'Marketing', color: 'text-accent-orange', emoji: '📣' },
  research: { label: 'Research', color: 'text-status-info', emoji: '🔬' },
  'image-gen': { label: 'Image Generation', color: 'text-status-ok', emoji: '🎨' },
  productivity: { label: 'Productivity', color: 'text-status-warn', emoji: '⚡' },
}

export const PROMPTS: Prompt[] = [
  // === CODING ===
  {
    id: 'code-review',
    title: 'Senior Code Reviewer',
    prompt: `Act as a senior software engineer doing a code review. Analyze the following code for:
1. Bugs and potential runtime errors
2. Security vulnerabilities (OWASP Top 10)
3. Performance issues and optimization opportunities
4. Code style and best practices violations
5. Missing edge cases and error handling

For each issue found, explain WHY it's a problem and provide a corrected code snippet. Rate the overall code quality 1-10.

Code to review:
\`\`\`
[PASTE CODE HERE]
\`\`\``,
    category: 'coding',
    tags: ['review', 'debugging', 'security', 'best-practices'],
  },
  {
    id: 'react-component',
    title: 'React Component Generator',
    prompt: `Create a production-ready React component with TypeScript. Requirements:
- Component name: [NAME]
- Purpose: [DESCRIBE WHAT IT DOES]
- Use React hooks (useState, useEffect, useMemo as needed)
- Include TypeScript interfaces for all props
- Use Tailwind CSS for styling
- Make it accessible (ARIA labels, keyboard navigation)
- Include error boundaries where appropriate
- Add JSDoc comments for the component and complex functions

Output the complete component file ready to use.`,
    category: 'coding',
    tags: ['react', 'typescript', 'component', 'tailwind'],
  },
  {
    id: 'api-design',
    title: 'REST API Designer',
    prompt: `Design a RESTful API for [DESCRIBE YOUR APPLICATION]. Include:
1. All endpoints (method, path, description)
2. Request/response schemas (JSON)
3. Authentication strategy (JWT, API keys, OAuth)
4. Error response format
5. Pagination strategy
6. Rate limiting recommendations
7. OpenAPI/Swagger snippet for the main endpoints

Follow REST best practices: proper HTTP methods, status codes, resource naming.`,
    category: 'coding',
    tags: ['api', 'rest', 'design', 'backend'],
  },
  {
    id: 'debug-detective',
    title: 'Debug Detective',
    prompt: `I have a bug in my code. Help me systematically debug it.

**Language/Framework**: [e.g., TypeScript/React]
**Expected behavior**: [What should happen]
**Actual behavior**: [What actually happens]
**Error message** (if any): [Paste error]
**Relevant code**:
\`\`\`
[PASTE CODE]
\`\`\`

Walk me through:
1. What the error likely means
2. The most probable root causes (ranked by likelihood)
3. Step-by-step debugging approach
4. The fix with explanation
5. How to prevent this type of bug in the future`,
    category: 'coding',
    tags: ['debugging', 'troubleshooting', 'errors'],
  },
  {
    id: 'unit-tests',
    title: 'Test Suite Generator',
    prompt: `Write comprehensive unit tests for the following code. Use [Jest/Vitest/pytest].

Requirements:
- Test all public functions/methods
- Include happy path, edge cases, and error cases
- Use descriptive test names following "should [expected behavior] when [condition]"
- Mock external dependencies
- Aim for >90% code coverage
- Include setup/teardown if needed

Code to test:
\`\`\`
[PASTE CODE]
\`\`\``,
    category: 'coding',
    tags: ['testing', 'unit-tests', 'jest', 'vitest'],
  },

  // === WRITING ===
  {
    id: 'blog-post',
    title: 'Technical Blog Post Writer',
    prompt: `Write a comprehensive technical blog post about [TOPIC].

Structure:
1. **Hook** — Start with a compelling problem or statistic
2. **Context** — Why this matters to developers right now
3. **Main content** — Clear explanation with code examples
4. **Practical examples** — Real-world use cases
5. **Common pitfalls** — What to watch out for
6. **Conclusion** — Key takeaways and next steps

Tone: Professional but conversational. Like explaining to a smart colleague.
Length: 1500-2000 words.
Include: Code snippets, bullet points, and a TL;DR at the top.`,
    category: 'writing',
    tags: ['blog', 'technical-writing', 'content'],
  },
  {
    id: 'readme-generator',
    title: 'README.md Generator',
    prompt: `Create a professional README.md for my project:

**Project name**: [NAME]
**Description**: [WHAT IT DOES]
**Tech stack**: [LANGUAGES/FRAMEWORKS]
**Key features**: [LIST FEATURES]

Include these sections with proper Markdown:
- Badges (build status, license, version)
- Description with screenshot placeholder
- Features list
- Quick Start (install, configure, run)
- API documentation (if applicable)
- Configuration options
- Contributing guidelines
- License
- Acknowledgments`,
    category: 'writing',
    tags: ['readme', 'documentation', 'github', 'markdown'],
  },
  {
    id: 'email-drafter',
    title: 'Professional Email Drafter',
    prompt: `Draft a professional email for the following situation:

**Context**: [DESCRIBE THE SITUATION]
**Recipient**: [WHO — colleague, client, manager, etc.]
**Goal**: [WHAT YOU WANT TO ACHIEVE]
**Tone**: [formal/friendly/assertive/diplomatic]

Requirements:
- Clear subject line
- Concise opening that states the purpose
- Body with key points (use bullets if multiple items)
- Clear call-to-action
- Professional closing
- Keep under 200 words unless the topic requires more`,
    category: 'writing',
    tags: ['email', 'professional', 'communication'],
  },

  // === MARKETING ===
  {
    id: 'landing-page-copy',
    title: 'Landing Page Copy',
    prompt: `Write high-converting landing page copy for:

**Product**: [NAME AND DESCRIPTION]
**Target audience**: [WHO]
**Key benefit**: [MAIN VALUE PROPOSITION]
**Competitors**: [WHO ARE WE BETTER THAN]

Include:
1. **Hero headline** — Stop-scrolling attention grabber (under 10 words)
2. **Subheadline** — Expand on the benefit (1-2 sentences)
3. **3 Feature blocks** — Icon + headline + 2-sentence description each
4. **Social proof section** — 3 testimonial templates
5. **FAQ section** — 5 common objections answered
6. **CTA section** — Compelling call-to-action with urgency
7. **Footer tagline** — Memorable closer`,
    category: 'marketing',
    tags: ['copywriting', 'landing-page', 'conversion'],
  },
  {
    id: 'social-media-calendar',
    title: 'Social Media Content Calendar',
    prompt: `Create a 2-week social media content calendar for [BRAND/PRODUCT].

**Platform**: [Twitter/LinkedIn/Instagram]
**Audience**: [DESCRIBE TARGET AUDIENCE]
**Goals**: [awareness/engagement/leads/sales]
**Brand voice**: [professional/casual/humorous/inspirational]

For each post, include:
- Day and optimal posting time
- Post text (platform-appropriate length)
- Hashtag suggestions (5-8 per post)
- Content type (text/image/poll/thread/reel)
- Engagement hook (question, CTA, etc.)

Mix content types: 40% educational, 30% engaging, 20% promotional, 10% personal.`,
    category: 'marketing',
    tags: ['social-media', 'content-calendar', 'engagement'],
  },
  {
    id: 'product-hunt-launch',
    title: 'Product Hunt Launch Kit',
    prompt: `Create a complete Product Hunt launch kit for:

**Product**: [NAME]
**One-liner**: [WHAT IT DOES IN ONE SENTENCE]
**URL**: [WEBSITE]

Generate:
1. **Tagline** (60 chars max) — catchy, clear, benefit-focused
2. **Description** (260 chars) — expand on the tagline
3. **First comment** — personal story, why you built it, what makes it special
4. **Maker bio** — short, credible, personable
5. **5 launch day tweets** — for sharing and building momentum
6. **Hunter outreach email** — to convince a top hunter to hunt your product`,
    category: 'marketing',
    tags: ['product-hunt', 'launch', 'startup'],
  },

  // === RESEARCH ===
  {
    id: 'competitor-analysis',
    title: 'Competitor Deep Dive',
    prompt: `Conduct a thorough competitor analysis for [YOUR PRODUCT/IDEA] against these competitors: [LIST COMPETITORS].

Analyze each competitor on:
1. **Core offering** — What exactly do they do?
2. **Pricing model** — Free tier? Pro tier? Enterprise?
3. **Target audience** — Who are they built for?
4. **Strengths** — What do they do exceptionally well?
5. **Weaknesses** — Where do they fall short?
6. **Tech stack** (if known) — What are they built with?
7. **Market positioning** — Premium? Budget? Niche?

Then provide:
- **Gap analysis** — What needs are NOT being met?
- **Differentiation opportunities** — How to stand out
- **Recommended positioning** — Where to compete and where to avoid`,
    category: 'research',
    tags: ['competitor', 'analysis', 'market-research', 'strategy'],
  },
  {
    id: 'tech-explainer',
    title: 'Technology Deep Dive',
    prompt: `Give me a comprehensive deep dive on [TECHNOLOGY/CONCEPT].

Cover:
1. **What it is** — Clear, jargon-free explanation
2. **How it works** — Technical explanation with diagrams (ASCII)
3. **History** — When was it created and why?
4. **Use cases** — Top 5 real-world applications
5. **Pros and cons** — Honest assessment
6. **Comparison** — How does it compare to alternatives?
7. **Getting started** — Quickstart guide with code examples
8. **Resources** — Best tutorials, docs, and communities

Target audience: Experienced developer who is new to THIS specific technology.`,
    category: 'research',
    tags: ['learning', 'technology', 'deep-dive', 'education'],
  },
  {
    id: 'trend-analysis',
    title: 'Tech Trend Analyzer',
    prompt: `Analyze the current state and future trajectory of [TECHNOLOGY/TREND].

Cover:
1. **Current adoption** — Who's using it? Market size?
2. **Key players** — Companies and projects driving adoption
3. **Technical maturity** — Where on the hype cycle?
4. **Developer sentiment** — Community activity, Stack Overflow trends
5. **Business impact** — Real ROI stories
6. **Risks** — What could go wrong?
7. **Timeline** — When will it go mainstream (or die)?
8. **Actionable advice** — Should I invest time learning this? Building with this?

Be objective. Include data points and sources where possible.`,
    category: 'research',
    tags: ['trends', 'analysis', 'future', 'strategy'],
  },

  // === IMAGE GENERATION ===
  {
    id: 'product-mockup',
    title: 'Product Mockup Prompt',
    prompt: `Create a photorealistic product mockup:

Product: [DESCRIBE YOUR PRODUCT]
Style: Modern, clean, professional product photography
Setting: [minimalist studio / lifestyle context / floating on gradient]
Lighting: Soft studio lighting with subtle reflections
Camera: Shot with a 85mm lens, shallow depth of field, f/2.8
Colors: [SPECIFY COLOR SCHEME]
Additional: Include subtle drop shadow, no text overlay, 4K resolution

Generate in 16:9 landscape format suitable for a website hero section.`,
    category: 'image-gen',
    tags: ['product', 'mockup', 'photography', 'hero-image'],
  },
  {
    id: 'logo-design',
    title: 'Logo Design Prompt',
    prompt: `Design a modern, minimalist logo for:

**Brand**: [NAME]
**Industry**: [WHAT THEY DO]
**Style**: Clean, geometric, modern, scalable
**Colors**: [SPECIFY OR "suggest a palette"]
**Must include**: Icon/symbol that represents [CORE CONCEPT]
**Avoid**: Clip art, overly complex details, gradients that won't print well

Technical: Vector-style, works at 16x16 favicon and 1000x1000, works on light and dark backgrounds. Single color version must also work.`,
    category: 'image-gen',
    tags: ['logo', 'branding', 'design', 'minimalist'],
  },
  {
    id: 'social-banner',
    title: 'Social Media Banner Prompt',
    prompt: `Create a professional social media banner/cover image:

**Platform**: [Twitter/LinkedIn/YouTube]
**Brand**: [YOUR BRAND]
**Dimensions**: [1500x500 Twitter / 1584x396 LinkedIn / 2560x1440 YouTube]
**Style**: Modern, tech-forward, dark theme with neon accent colors
**Elements**: Abstract geometric shapes, subtle grid pattern, code-like elements
**Text to include**: [YOUR TAGLINE — keep it short]
**Colors**: [SPECIFY BRAND COLORS]
**Mood**: Professional, innovative, trustworthy`,
    category: 'image-gen',
    tags: ['social-media', 'banner', 'cover', 'branding'],
  },

  // === PRODUCTIVITY ===
  {
    id: 'project-planner',
    title: 'Project Plan Generator',
    prompt: `Create a detailed project plan for: [DESCRIBE YOUR PROJECT]

**Timeline**: [TOTAL WEEKS/MONTHS]
**Team size**: [NUMBER OF PEOPLE]
**Budget**: [AMOUNT OR "not a constraint"]

Generate:
1. **Project phases** with milestones and deadlines
2. **Task breakdown** per phase (with effort estimates in hours)
3. **Dependencies** between tasks
4. **Risk assessment** — Top 5 risks with mitigation strategies
5. **Resource allocation** — Who does what
6. **Definition of done** for each phase
7. **Communication plan** — Standup frequency, reporting cadence

Output as a structured Markdown document I can paste into my project management tool.`,
    category: 'productivity',
    tags: ['project-management', 'planning', 'agile'],
  },
  {
    id: 'meeting-notes',
    title: 'Meeting Notes to Action Items',
    prompt: `Transform these raw meeting notes into structured action items:

**Meeting notes**:
[PASTE RAW NOTES HERE]

Output format:
1. **Meeting Summary** (3-4 sentences)
2. **Key Decisions Made** (bullet points)
3. **Action Items** — table format:
   | # | Action | Owner | Deadline | Priority |
4. **Open Questions** requiring follow-up
5. **Next Meeting** — suggested agenda based on open items

Be specific with action items. "Look into X" should become "Research X and present 3 options by [date]".`,
    category: 'productivity',
    tags: ['meetings', 'action-items', 'organization'],
  },
  {
    id: 'daily-standup',
    title: 'Daily Standup Formatter',
    prompt: `Help me prepare a concise daily standup update:

**What I worked on yesterday**: [RAW NOTES]
**What I'm doing today**: [PLANS]
**Any blockers**: [ISSUES OR "none"]

Format it as:
✅ **Yesterday**: [2-3 bullet points, past tense, specific outcomes]
🎯 **Today**: [2-3 bullet points, clear deliverables]
🚫 **Blockers**: [Brief, actionable, with proposed solutions]

Keep each point under 15 words. Be specific about outcomes, not activities.
"Worked on the API" → "Shipped user auth endpoint, 3 tests passing"`,
    category: 'productivity',
    tags: ['standup', 'agile', 'daily-update'],
  },
]
