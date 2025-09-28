---
title: **步骤 1: 选择并混合srefs**
description: **步骤 1: 选择并混合srefs**...
author: LuoYuan
date: 2025-04-10
image: https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/Ai_Newsimg_v3_02l1_8e202970-1028-4323-8b14-a77df563577g.jpg
link: 
category: ai-news
tags: []
featured: false
---
在这篇教程中，我们将介绍如何使用Midjourney中的srefs（样式参考）创建不同的图像效果，并通过调整srefs的权重和文本提示来优化结果。

主要内容包括选择合适的srefs、调整sref权重、优化文本提示、以及使用样式参考来进一步提升图像效果。

![img_v3_02l1_8e202970-1028-4323-8b14-a77df563577g](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/Ai_Newsimg_v3_02l1_8e202970-1028-4323-8b14-a77df563577g.jpg)

## **步骤 1: 选择并混合srefs**

1. **选择第一个sref**

- 通过 sref 随机发现一个sref，例如--sref 944260837。
- 这个 sref 明亮且色彩丰富，非常适合希望图像色彩鲜艳的场景。

1. **选择第二个sref**

- 选择一个柔和的sref，例如--sref 3755864991。
- 这个sref在颜色和纹理上类似于铅笔画
- 将这个柔和的sref与之前较强的sref混合，以获得一种“介于两者之间”的效果

![img_v3_02l1_00c9c9f2-a65f-41eb-a4d9-e71fe05e446g](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/Ai_Newsimg_v3_02l1_00c9c9f2-a65f-41eb-a4d9-e71fe05e446g.jpg)



1. **混合效果**

- 将这两个sref混合，得到介于强烈色彩与柔和质感之间的效果。

![img_v3_02l1_6e38bc7a-9130-4369-a172-a6e5a8fdb36g](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/Ai_Newsimg_v3_02l1_6e38bc7a-9130-4369-a172-a6e5a8fdb36g.jpg)

另一个示例

![img_v3_02l1_7be331d7-7821-48b0-bb1d-e6e712624e9g](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/Ai_Newsimg_v3_02l1_7be331d7-7821-48b0-bb1d-e6e712624e9g.jpg)

## **步骤 2: 调整文本提示与sref权重**

1. **调整文本提示**

- 文本提示对最终图像的影响很大。
- 例如，在提示中添加“photo”后，铅笔画的sref效果更为突出。

![img_v3_02l1_9ec2c82e-9c8f-491b-859d-6054877eb34g](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/Ai_Newsimg_v3_02l1_9ec2c82e-9c8f-491b-859d-6054877eb34g.jpg)



1. **调整sref的权重**

- 你可以通过增加或减少sref的权重来控制其在图像中的影响。
- 例如，通过添加“::2”增加了彩色sref的权重（权重增加一倍），但发现效果不佳。

![img_v3_02l1_bd88e3fc-3ae0-4681-8e37-a0bcb26b2ebg](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/Ai_Newsimg_v3_02l1_bd88e3fc-3ae0-4681-8e37-a0bcb26b2ebg.jpg)



- 之后尝试了“::1.5”或“::1.25”，获得更理想的效果。

![img_v3_02l1_31a8af47-e2f6-42bb-a7c4-2700151b561g](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/Ai_Newsimg_v3_02l1_31a8af47-e2f6-42bb-a7c4-2700151b561g.jpg)

![img_v3_02l1_fdee6334-1e40-4bc5-8be7-e573f4b8d63g](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/Ai_Newsimg_v3_02l1_fdee6334-1e40-4bc5-8be7-e573f4b8d63g.jpg)

使用“::1.25”权重，效果与“::1.5”并无太大不同。

## **步骤 3: 使用样式参考优化图像**

![img_v3_02l1_1b963a0b-fe26-4168-83a8-2ae9dde9a14g](https://jsd.onmicrosoft.cn/gh/yy0691/img-bed@main/Blog/Ai_Newsimg_v3_02l1_1b963a0b-fe26-4168-83a8-2ae9dde9a14g.jpg)

- 一旦得到了满意的图像，可以将这些图像添加为样式参考，以进一步优化结果。
- 在这里，添加了一张图像作为样式参考，这些效果不错



**总结**

- 混合不同的srefs可以产生独特的图像效果。
- 调整sref的权重能够精细控制图像的视觉效果。
- 文本提示的选择也会显著影响最终结果，建议从中性提示开始，然后逐步调整。
- 当找到满意的效果后，将其作为样式参考可以进一步优化图像质量。
- 这些方法都不是固定的，可以尽情尝试，看看会得到什么惊喜的结果。

希望这些技巧对你在Midjourney中的创作有所帮助！