---
title: "Together AI's ATLAS adaptive speculator delivers 400% inference speedup by learning from workloads in real-time"
title_zh: ""
description: "Enterprises expanding AI deployments are hitting an invisible performance wall. The culprit? Static speculators that can't keep up with shifting workloads. Speculators are smaller AI models that work "
summary_zh: ""
author: LuoYuan
date: 2025-10-10
image: "https://images.ctfassets.net/jdtwqhzvc2n1/QKYmkzNToGEJHgfWYSkzb/8dca1ce8a9cecbd949cb5dabb0e4a54b/ATLAS-ai-inference-smk.jpg"
link: "https://venturebeat.com/ai/together-ais-atlas-adaptive-speculator-delivers-400-inference-speedup-by"
category: ai-news
tags: ["AI","人工智能","行业动态"]
key_points: []
featured: false
source: VentureBeat AI
---

## Together AI's ATLAS adaptive speculator delivers 400% inference speedup by learning from workloads in real-time

Enterprises expanding AI deployments are hitting an invisible performance wall. The culprit? Static speculators that can't keep up with shifting workloads.
Speculators are smaller AI models that work alongside large language models during inference. They draft multiple tokens ahead, which the main model then verifies in parallel. This technique (called speculative decoding) has become essential for enterprises trying to reduce inference costs and latency. Instead of generating tokens one at a time, the system can accept multiple tokens at once, dramatically improving throughput.
Together AI today announced research and a new system called ATLAS (AdapTive-LeArning Speculator System) that aims to help enterprises overcome the challenge of static speculators. The technique provides a self-learning inference optimization capability that can help to deliver up to 400% faster inference performance than a baseline level of performance available in existing inference technologies such as vLLM.. The system addresses a critical problem: as AI workloads evolve, inference speeds degrade, even with specialized speculators in place.
The company which got its start in 2023, has been focused on optimizing inference on its enterprise AI platform. Earlier this year the company raised $305 million as customer adoption and demand has grown.
"Companies we work with generally, as they scale up, they see shifting workloads, and then they don't see as much speedup from speculative execution as before," Tri Dao, chief scientist at Together AI, told VentureBeat in an exclusive interview. "These speculators generally don't work well when their workload domain starts to shift."
The workload drift problem no one talks about
Most speculators in production today are "static" models. They're trained once on a fixed dataset representing expected workloads, then deployed without any ability to adapt. Companies like Meta and Mistral ship pre-trained speculators alongside their main models. Inference platforms like vLLM use these static speculators to boost throughput without changing output quality.
But there's a catch. When an enterprise's AI usage evolves the static speculator's accuracy plummets.
"If you're a company producing coding agents, and most of your developers have been writing in Python, all of a sudden some of them switch to writing Rust or C, then you see the speed starts to go down," Dao explained. "The speculator has a mismatch between what it was trained on versus what the actual workload is."
This workload drift represents a hidden tax on scaling AI. Enterprises either accept degraded performance or invest in retraining custom speculators. That process captures only a snapshot in time and quickly becomes outdated.
How adaptive speculators work: A dual-model approach
ATLAS uses a dual-speculator architecture that combines stability with adaptation:
The static speculator - A heavyweight model trained on broad data provides consistent baseline performance. It serves as a "speed floor."
The adaptive speculator - A lightweight model learns continuously from live traffic. It specializes on-the-fly to emerging domains and usage patterns.
The confidence-aware controller - An orchestration layer dynamically chooses which speculator to use. It adjusts the speculation "lookahead" based on confidence scores.
"Before the adaptive speculator learns anything, we still have the static speculator to help provide the speed boost in the beginning," Ben Athiwaratkun, staff AI scientist at Together AI explained to VentureBeat. "Once the adaptive speculator becomes more confident, then the speed grows over time."
The technical innovation lies in balancing acceptance rate (how often the target model agrees with drafted tokens) and draft latency. As the adaptive model learns from traffic patterns, the controller relies more on the lightweight speculator and extends lookahead. This compounds performance gains.
Users don't need to tune any parameters. "On the user side, users don't have to turn any knobs," Dao said. "On our side, we have turned these knobs for users to adjust in a configuration that gets good speedup."
Performance that rivals custom silicon
Together AI's testing shows ATLAS reaching 500 tokens per second on DeepSeek-V3.1 when fully adapted. More impressively, those numbers on Nvidia B200 GPUs match or exceed specialized inference chips like Groq's custom hardware.
"The software and algorithmic improvement is able to close the gap with really specialized hardware," Dao said. "We were seeing 500 tokens per second on these huge models that are even faster than some of the customized chips."
The 400% speedup that the company claims for inference represents the cumulative effect of Together's Turbo optimization suite. FP4 quantization delivers 80% speedup over FP8 baseline. The static Turbo Speculator adds another 80-100% gain. The adaptive system layers on top. Each optimization compounds the benefits of the others.
Compared to standard inference engines like vLLM or Nvidia's TensorRT-LLM, the improvement is substantial. Together AI benchmarks against the stronger baseline between the two for each workload before applying speculative optimizations.
The memory-compute tradeoff explained
The performance gains stem from exploiting a fundamental inefficiency in modern inference: wasted compute capacity.
Dao explained that typically during inference, much of the compute power is not fully utilized.
"During inference, which is actually the dominant workload nowadays, you're mostly using the memory subsystem," he said.
Speculative decoding trades idle compute for reduced memory access. When a model generates one token at a time, it's memory-bound. The GPU sits idle while waiting for memory. But when the speculator proposes five tokens and the target model verifies them simultaneously, compute utilization spikes while memory access remains roughly constant.
"The total amount of compute to generate five tokens is the same, but you only had to access memory once, instead of five times," Dao said.
Think of it as intelligent caching for AI
For infrastructure teams familiar with traditional database optimization, adaptive speculators function like an intelligent caching layer, but with a crucial difference.
Traditional caching systems like Redis or memcached require exact matches. You store the exact same query result and retrieve it when that specific query runs again. Adaptive speculators work differently.
"You can view it as an intelligent way of caching, not storing exactly, but figuring out some patterns that you see," Dao explained. "Broadly, we're observing that you're working with similar code, or working with similar, you know, controlling compute in a similar way. We can then predict what the big model is going to say. We just get better and better at predicting that."
Rather than storing exact responses, the system learns patterns in how the model generates tokens. It recognizes that if you're editing Python files in a specific codebase, certain token sequences become more likely. The speculator adapts to those patterns, improving its predictions over time without requiring identical inputs.
Use cases: RL training and evolving workloads
Two enterprise scenarios particularly benefit from adaptive speculators:
Reinforcement learning training: Static speculators quickly fall out of alignment as the policy evolves during training. ATLAS adapts continuously to the shifting policy distribution.
Evolving workloads: As enterprises discover new AI use cases, workload composition shifts. "Maybe they started using AI for chatbots, but then they realized, hey, it can write code, so they start shifting to code," Dao said. "Or they realize these AIs can actually call tools and control computers and do accounting and things like that."
In a vibe-coding session, the adaptive system can specialize for the specific codebase being edited. These are files not seen during training. This further increases acceptance rates and decoding speed.
What it means for enterprises and the inference ecosystem
ATLAS is available now on Together AI's dedicated endpoints as part of the platform at no additional cost. The company's 800,000-plus developers (up from 450,000 in February) have access to the optimization.
But the broader implications extend beyond one vendor's product. The shift from static to adaptive optimization represents a fundamental rethinking of how inference platforms should work. As enterprises deploy AI across multiple domains, the industry will need to move beyond one-time trained models toward systems that learn and improve continuously.
Together AI has historically released some of its research techniques as open source and collaborated with projects like vLLM. While the fully integrated ATLAS system is proprietary, some of the underlying techniques may eventually influence the broader inference ecosystem. 
For enterprises looking to lead in AI, the message is clear: adaptive algorithms on commodity hardware can match custom silicon at a fraction of the cost. As this approach matures across the industry, software optimization increasingly trumps specialized hardware.



### 📰 原文信息
- **标题**: Together AI's ATLAS adaptive speculator delivers 400% inference speedup by learning from workloads in real-time
- **来源**: VentureBeat AI
- **链接**: [查看原文](https://venturebeat.com/ai/together-ais-atlas-adaptive-speculator-delivers-400-inference-speedup-by)

---
*本文由AI自动翻译和摘要生成*
