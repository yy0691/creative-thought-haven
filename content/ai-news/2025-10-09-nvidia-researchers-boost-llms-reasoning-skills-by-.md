---
title: "Nvidia researchers boost LLMs reasoning skills by getting them to 'think' during pre-training"
title_zh: ""
description: "Researchers at Nvidia have developed a new technique that flips the script on how large language models (LLMs) learn to reason.  The method, called reinforcement learning pre-training (RLP), integrate"
summary_zh: ""
author: LuoYuan
date: 2025-10-09
image: "https://images.ctfassets.net/jdtwqhzvc2n1/2PTqNZnnwoy3Jnl9Nb0jwP/bceecea29350a1a5646c728208c5baac/nuneybits_Vector_art_of_a_robot_thinking_neon_colors_bc248938-48f9-44e0-8bd0-3a2fd7b9f913.webp"
link: "https://venturebeat.com/ai/nvidia-researchers-boost-llms-reasoning-skills-by-getting-them-to-think"
category: ai-news
tags: ["AI","人工智能","行业动态"]
key_points: []
featured: false
source: VentureBeat AI
---

## Nvidia researchers boost LLMs reasoning skills by getting them to 'think' during pre-training

Researchers at Nvidia have developed a new technique that flips the script on how large language models (LLMs) learn to reason. 
The method, called reinforcement learning pre-training (RLP), integrates RL into the initial training phase rather than saving it for the end.
This approach encourages the model to “think for itself before predicting what comes next, thus teaching an independent thinking behavior earlier in the pretraining,” the researchers state in their paper. 
By learning to reason on plain text without needing external verifiers, models trained with RLP show significant improvements in learning complex reasoning tasks downstream, hinting at a future of more capable and adaptable AI for real-world tasks.
The typical LLM training cycle
Typically, large language models are first pre-trained on vast amounts of text using a "next-token prediction" objective, where they are given a string of text and asked to continuously guess what the next word (or token) will be. In this phase, they learn grammar, facts, and basic associations.
In the later post-training phase, models usually learn complex reasoning abilities such as chain-of-thought (CoT) where a model lays out its reasoning step-by-step. This stage often involves supervised fine-tuning (SFT) or reinforcement learning from human feedback (RLHF), which require specialized, curated datasets.
The paper’s authors argue this sequential process does not match human comprehension, which is “not a linear token-by-token process, but rather a parallel integration of input with prior knowledge.” Existing pre-training methods lack this mechanism, hindering a model's ability to develop deep reasoning from the start.
How reinforcement learning pre-training works
RLP reframes this process by treating CoT generation as an action the model takes before predicting the next token. At each step, the model first generates an internal "thought" or reasoning chain. It then predicts the next word in the text, using the original context augmented with its new thought.
The model receives a reward based on how much its thought improved the accuracy of its prediction compared to a baseline that didn't generate a thought (pure next-token prediction). This reward signal is calculated automatically based on the change in probability, eliminating the need for external verifiers or human-labeled data. 
The reward is positive only when the generated thought helps the model better predict the next token. By rewarding thoughts based on their predictive benefit, RLP effectively teaches the model how to think usefully on the same massive, unstructured datasets used for standard pre-training. 
This continuous feedback loop allows the model to learn when a simple predictive guess is sufficient and when it needs to engage in deeper reasoning. As the researchers put it, “RLP is designed to shape thinking in base models by rewarding only those thoughts that measurably help next-token prediction.”
This foundational approach, however, doesn't make later fine-tuning stages obsolete. According to Bryan Catanzaro, VP of applied deep learning research at Nvidia and a co-author of the paper, RLP is designed to complement, not replace, these crucial steps. "RLP isn’t meant to replace the later post-training stages like supervised fine-tuning or reinforcement learning from human feedback," Catanzaro told VentureBeat. "Those stages remain crucial for refining model behavior... It’s really designed to amplify the effectiveness of those later phases by giving the model a head start."
RLP in action
In experiments with Qwen3-1.7B and Nemotron-Nano-12B, Nvidia’s team tested RLP across a suite of math and science reasoning benchmarks. The results show that models enhanced with RLP consistently outperformed their conventionally trained counterparts, with particularly strong gains in reasoning-heavy tasks. 
For an enterprise, this improved reasoning could translate to more reliable outputs in multi-step workflows like financial analysis or legal document summarization.
"RLP encourages the model during pretraining to think before it predicts, helping the model internalize a more coherent reasoning style," said Catanzaro. "This could help reduce subtle logical errors, especially in longer workflows.” 
While stressing that RLP-trained models will still need the usual guardrails such as verification layers, human oversight, and consistency checks, Catanzaro said that “RLP gives you a stronger baseline."
Importantly, the benefits of RLP compound instead of disappearing during subsequent fine-tuning stages (catastrophic forgetting is a common problem in LLM training, where later training stages cause the model to forget its previously learned skills and knowledge). The RLP-trained model achieved an overall score that was 7-8% higher than baselines after an identical post-training regimen. The researchers conclude that RLP “establishes robust reasoning foundations that are not washed out by downstream alignment but instead compound with post-training.”
The efficiency of the technique is a key finding. On the Qwen3-1.7B model, RLP improved performance by 17% over standard continuous pre-training and also beat a similar technique called Reinforcement Pretraining via prefix-matching rewards (RPT). This advantage held even when the baseline model was trained with 35 times more data to match the computational cost, confirming the gains come from the method itself, not just more processing.
Furthermore, RLP demonstrates impressive scalability and versatility, successfully extracting a reasoning signal from general-purpose web data—not just curated datasets. When applied to the hybrid Mamba-Transformer model Nemotron-Nano-12B, RLP achieved a 35% relative improvement over a heavily trained baseline while using just a tiny fraction of the data.
While these results point toward a more efficient path for building powerful models, Catanzaro frames the innovation as a fundamental shift in the learning process itself, rather than an immediate solution to high training costs. 
"This research is exciting because it offers a shift in how models absorb information during pretraining leading to a smarter learning process," he explained. "It wouldn’t replace large-scale pretraining, but offer another creative method in building the best possible models."
A new foundation for AI training
Ultimately, RLP points toward a future where pre-training is no longer a monolithic process of next-token prediction. Instead, the next generation of models could be built on a hybrid of objectives, creating AI that learns to think more robustly from day one. Catanzaro offers a powerful analogy to frame this shift:
"Next-token prediction teaches a model what the world looks like; reinforcement-style objectives like RLP can teach it how to think about what it’s seeing," he said. "The combination of these two objectives could help models develop deeper, more structured thinking much earlier in training... Tools like RLP can build on top of that foundation, making learning more active, curious, and even more efficient."
There is still a lot to learn about the dynamics of reinforcement learning in the pre-training phase, but what seems clear is that “introducing exploration earlier in training opens a new axis for scaling — not just in size, but in how models learn to reason,” Catanzaro said.



### 📰 原文信息
- **标题**: Nvidia researchers boost LLMs reasoning skills by getting them to 'think' during pre-training
- **来源**: VentureBeat AI
- **链接**: [查看原文](https://venturebeat.com/ai/nvidia-researchers-boost-llms-reasoning-skills-by-getting-them-to-think)

---
*本文由AI自动翻译和摘要生成*
