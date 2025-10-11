---
title: "Will updating your AI agents help or hamper their performance? Raindrop's new tool Experiments tells you"
title_zh: ""
description: It seems like almost every week for the last two years since ChatGPT launched, new large language models (LLMs) from rival labs or from OpenAI itself have been released. Enterprises are hard pressed t
summary_zh: ""
author: LuoYuan
date: 2025-10-10
image: "https://images.ctfassets.net/jdtwqhzvc2n1/6wvVdQj4t7NiC0a8xS9bQu/8b37da63cebde173a1c338aeb371eba8/cfr0z3n_sharp_detailed_graphic_novel_style_splash_page_bicolore_b6659495-c268-49de-9a52-76abb547bf5a.png"
link: "https://venturebeat.com/ai/will-updating-your-ai-agents-help-or-hamper-their-performance-raindrops-new"
category: ai-news
tags: ["AI","人工智能","行业动态"]
key_points: []
featured: false
source: VentureBeat AI
---

## Will updating your AI agents help or hamper their performance? Raindrop's new tool Experiments tells you

It seems like almost every week for the last two years since ChatGPT launched, new large language models (LLMs) from rival labs or from OpenAI itself have been released. Enterprises are hard pressed to keep up with the massive pace of change, let alone understand how to adapt to it — which of these new models should they adopt, if any, to power their workflows and the custom AI agents they're building to carry them out? 
Help has arrived: AI applications observability startup Raindrop has launched Experiments, a new analytics feature that the company describes as the first A/B testing suite designed specifically for enterprise AI agents — allowing companies to see and compare how updating agents to new underlying models, or changing their instructions and tool access, will impact their performance with real end users. 
The release extends Raindrop’s existing observability tools, giving developers and teams a way to see how their agents behave and evolve in real-world conditions.
With Experiments, teams can track how changes — such as a new tool, prompt, model update, or full pipeline refactor — affect AI performance across millions of user interactions. The new feature is available now for users on Raindrop’s Pro subscription plan ($350 monthly) at raindrop.ai. 

A Data-Driven Lens on Agent Development
Raindrop co-founder and chief technology officer Ben Hylak noted in a product announcement video (above) that Experiments helps teams see “how literally anything changed,” including tool usage, user intents, and issue rates, and to explore differences by demographic factors such as language. The goal is to make model iteration more transparent and measurable.
The Experiments interface presents results visually, showing when an experiment performs better or worse than its baseline. Increases in negative signals might indicate higher task failure or partial code output, while improvements in positive signals could reflect more complete responses or better user experiences.
By making this data easy to interpret, Raindrop encourages AI teams to approach agent iteration with the same rigor as modern software deployment—tracking outcomes, sharing insights, and addressing regressions before they compound.
Background: From AI Observability to Experimentation
Raindrop’s launch of Experiments builds on the company’s foundation as one of the first AI-native observability platforms, designed to help enterprises monitor and understand how their generative AI systems behave in production. 
As VentureBeat reported earlier this year, the company — originally known as Dawn AI — emerged to address what Hylak, a former Apple human interface designer, called the “black box problem” of AI performance, helping teams catch failures “as they happen and explain to enterprises what went wrong and why." 
At the time, Hylak described how “AI products fail constantly—in ways both hilarious and terrifying,” noting that unlike traditional software, which throws clear exceptions, “AI products fail silently.” Raindrop’s original platform focused on detecting those silent failures by analyzing signals such as user feedback, task failures, refusals, and other conversational anomalies across millions of daily events.
The company’s co-founders—  Hylak, Alexis Gauba, and Zubin Singh Koticha — built Raindrop after encountering firsthand the difficulty of debugging AI systems in production. 
“We started by building AI products, not infrastructure,” Hylak told VentureBeat. “But pretty quickly, we saw that to grow anything serious, we needed tooling to understand AI behavior—and that tooling didn’t exist.”
With Experiments, Raindrop extends that same mission from detecting failures to measuring improvements. The new tool transforms observability data into actionable comparisons, letting enterprises test whether changes to their models, prompts, or pipelines actually make their AI agents better—or just different.
Solving the “Evals Pass, Agents Fail” Problem
Traditional evaluation frameworks, while useful for benchmarking, rarely capture the unpredictable behavior of AI agents operating in dynamic environments. 
As Raindrop co-founder Alexis Gauba explained in her LinkedIn announcement, “Traditional evals don’t really answer this question. They’re great unit tests, but you can’t predict your user’s actions and your agent is running for hours, calling hundreds of tools.”
Gauba said the company consistently heard a common frustration from teams: “Evals pass, agents fail.”
Experiments is meant to close that gap by showing what actually changes when developers ship updates to their systems. 
The tool enables side-by-side comparisons of models, tools, intents, or properties, surfacing measurable differences in behavior and performance.
Designed for Real-World AI Behavior
In the announcement video, Raindrop described Experiments as a way to “compare anything and measure how your agent’s behavior actually changed in production across millions of real interactions.”
The platform helps users spot issues such as task failure spikes, forgetting, or new tools that trigger unexpected errors. 
It can also be used in reverse — starting from a known problem, such as an “agent stuck in a loop,” and tracing back to which model, tool, or flag is driving it. 
From there, developers can dive into detailed traces to find the root cause and ship a fix quickly.
Each experiment provides a visual breakdown of metrics like tool usage frequency, error rates, conversation duration, and response length. 
Users can click on any comparison to access the underlying event data, giving them a clear view of how agent behavior changed over time. Shared links make it easy to collaborate with teammates or report findings.
Integration, Scalability, and Accuracy
According to Hylak, Experiments integrates directly with “the feature flag platforms companies know and love (like Statsig!)” and is designed to work seamlessly with existing telemetry and analytics pipelines. 
For companies without those integrations, it can still compare performance over time—such as yesterday versus today—without additional setup.
Hylak said teams typically need around 2,000 users per day to produce statistically meaningful results. 
To ensure the accuracy of comparisons, Experiments monitors for sample size adequacy and alerts users if a test lacks enough data to draw valid conclusions.
“We obsess over making sure metrics like Task Failure and User Frustration are metrics that you’d wake up an on-call engineer for,” Hylak explained. He added that teams can drill into the specific conversations or events that drive those metrics, ensuring transparency behind every aggregate number.
Security and Data Protection
Raindrop operates as a cloud-hosted platform but also offers on-premise personally identifiable information (PII) redaction for enterprises that need additional control. 
Hylak said the company is SOC 2 compliant and has launched a PII Guard feature that uses AI to automatically remove sensitive information from stored data. “We take protecting customer data very seriously,” he emphasized.
Pricing and Plans
Experiments is part of Raindrop’s Pro plan, which costs $350 per month or $0.0007 per interaction. The Pro tier also includes deep research tools, topic clustering, custom issue tracking, and semantic search capabilities.
Raindrop’s Starter plan — $65 per month or $0.001 per interaction — offers core analytics including issue detection, user feedback signals, Slack alerts, and user tracking. Both plans come with a 14-day free trial.
Larger organizations can opt for an Enterprise plan with custom pricing and advanced features like SSO login, custom alerts, integrations, edge-PII redaction, and priority support.
Continuous Improvement for AI Systems
With Experiments, Raindrop positions itself at the intersection of AI analytics and software observability. Its focus on “measure truth,” as stated in the product video, reflects a broader push within the industry toward accountability and transparency in AI operations.
Rather than relying solely on offline benchmarks, Raindrop’s approach emphasizes real user data and contextual understanding. The company hopes this will allow AI developers to move faster, identify root causes sooner, and ship better-performing models with confidence.



### 📰 原文信息
- **标题**: Will updating your AI agents help or hamper their performance? Raindrop's new tool Experiments tells you
- **来源**: VentureBeat AI
- **链接**: [查看原文](https://venturebeat.com/ai/will-updating-your-ai-agents-help-or-hamper-their-performance-raindrops-new)

---
*本文由AI自动翻译和摘要生成*
