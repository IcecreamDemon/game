# 《十二神相录》Demo 美术资产提示词库

**用途**：为 Godot Demo 生成角色、场景、UI 和特效参考图。  
**范围**：只覆盖当前六节点纵向切片，不生成其他生肖或完整四大区域。  
**重要原则**：先生成风格锁定图，再做分件与序列；不要让模型把设定文字画进资产。

---

## 1. 统一风格前缀

每次生成都把这组内容放在提示词最前面。

```text
Use case: stylized-concept
Asset type: production concept art for a 2D side-view action game

Project style:
Chinese ink-wash painting combined with rough paper-cut puppet animation and dark folk mythology.
Visible layered paper fibers, dry brush edges, ink bleed, torn paper silhouettes, stamped vermilion seals, restrained old-gold accents.
Characters are complete beastfolk with roughly 3.5 to 4 heads proportion, angular adult faces, exaggerated jointed limbs, serious and worn expressions.
Orthographic side-view design, facing right unless specified.
Strong readable silhouette, clear separated limbs, practical costume layers, historically grounded rural labor clothing.
Dark, severe, tragic atmosphere. No cute mascot styling, no chibi proportions, no glossy mobile-game rendering.

Palette:
paper beige #E7E0D0, ink black #14171A, vermilion #B7352A, jade #4C8B84, old gold #B58A3C.

Constraints:
No text, no logos, no watermark, no UI labels.
No generic xianxia glamour, no floating sparkles, no ornate luxury fashion.
No gradients unless requested.
Keep the character anatomy and costume consistent with previous approved sheets.
```

## 2. 通用负面提示

```text
Negative prompt:
text, Chinese characters, English letters, logo, watermark, signature,
chibi, cute mascot, baby proportions, oversized eyes, anime school uniform,
photorealistic human face, 3D render, glossy plastic, neon lighting,
glowing magical aura everywhere, floating particles everywhere,
generic xianxia prince, generic wuxia poster, mobile-game icon style,
extra limbs, fused hands, broken anatomy, inconsistent weapon length,
busy background behind transparent asset, cast shadow, floor reflection
```

## 3. 透明素材生成规范

角色分件、道具和特效优先使用以下方式：

```text
Create the subject on a perfectly flat solid #00ff00 chroma-key background for background removal.
The background must be one uniform color with no shadows, gradients, texture, reflections, floor plane, or lighting variation.
Keep the subject fully separated from the background with crisp edges and generous padding.
Do not use #00ff00 anywhere in the subject.
No cast shadow, no contact shadow, no reflection, no watermark, and no text.
```

生成后需要使用去底工具清理，并检查：

- 四角必须完全透明。
- 主体边缘无明显绿色残边。
- 武器、尾巴、围巾不能与身体粘连。
- 分件中心点和尺寸保持一致。

---

## 4. 风格锁定图

### 4.1 首张风格确认图

**用途**：在制作全部资产前确认材质、比例、颜色和 HUD 方向。

```text
Use case: stylized-concept
Asset type: style-lock key frame for a 2D side-view action game demo

Primary request:
A tense confrontation between a lean rat resistance fighter and a tall celestial gate guardian in a drought-stricken village shrine.

Composition/framing:
16:9 horizontal composition.
The rat fighter occupies the lower-left third in a low agile stance.
The guardian occupies the right third with a long polearm and heavy layered armor.
The center contains a cracked stone well with burning incense and scattered prayer slips.
Keep the upper-left area visually quiet enough for a title and menu overlay.

Environment:
ruined paper shrine, dry fields, ink-black clouds, rain streaks, burnt incense ash, torn red seals.

Style/medium:
ink wash, rough paper-cut silhouettes, layered fibrous paper, dry brush, hand-stamped vermilion marks.

Lighting/mood:
overcast gray light, hot ember accents, oppressive and tragic.

Constraints:
No text, no logos, no menu buttons, no watermark.
Weapons and feet must remain readable.
```

### 4.2 角色比例参考板

```text
Use case: stylized-concept
Asset type: character proportion reference sheet

Primary request:
Show the same rat fighter in neutral standing pose, low combat stance, and injured stance.

Composition/framing:
Three full-body views on one clean paper background, equal scale, shared foot baseline.
Side view facing right.

Subject:
lean rat beastfolk, 3.5 to 4 heads tall, long tail, torn scarf, short blade, worn rural fighter clothes.

Constraints:
No text labels, no background scenery, no alternative costumes, no dramatic perspective.
The three poses must share identical anatomy, costume and weapon proportions.
```

---

## 5. 鼠光角色资产

### 5.1 鼠光角色分层参考

**交付目标**：先做视觉参考，再由人工或图像编辑拆成 Godot 可动分件。

```text
Use case: stylized-concept
Asset type: layered character construction sheet for a 2D paper-cut puppet rig

Primary request:
Design the rat fighter as separated production parts on a neutral paper background.

Required parts:
head with visible rat ears and severe adult expression,
neck scarf section A,
neck scarf section B,
torso,
upper arm L,
forearm L,
hand L,
upper arm R,
forearm R,
hand R,
hip cloth,
thigh L,
shin L,
foot L,
thigh R,
shin R,
foot R,
tail root,
tail middle,
tail tip,
short broken blade,
long guard spear.

Composition/framing:
Arrange every part separately in a clean grid with generous empty space.
All parts use the same scale and side-view angle.
No overlap between parts.

Style:
jointed paper-cut puppet, dark ink silhouette, thin dry-brush texture, worn scarf edges, no cute expression.

Constraints:
No skeleton diagram, no text labels, no background scene, no unnecessary accessories.
Hands must be designed to grip both weapons.
```

### 5.2 鼠光状态参考组

```text
Use case: stylized-concept
Asset type: animation pose reference sheet

Primary request:
Create a side-view pose sheet for the rat fighter.

Poses:
idle breathing, two running poses, jump rise, fall, dodge, guard, perfect parry, light slash, upward slash, heavy finisher, spear thrust, weapon-switch strike, hit reaction, burrow entry, burrow emergence.

Composition/framing:
Black silhouette thumbnails on a pale paper background, one row per action family, consistent scale and facing right.

Constraints:
No text, no scenery, no motion blur, no final rendering.
Poses must communicate direction, weight and attack range.
```

### 5.3 鼠光透明分件主提示词

```text
Use case: stylized-concept
Asset type: transparent game character part

Primary request:
A single side-view paper-cut puppet part of the rat fighter: [填写部件名称].

Subject details:
matching the approved rat fighter model sheet, dark ink silhouette, worn paper fibers, restrained jade and vermilion accents.

Composition/framing:
One isolated part, facing right, centered, generous padding.

Backdrop:
perfectly flat #00ff00 chroma-key background.

Constraints:
No text, no shadow, no background texture, no extra limbs.
Preserve the exact approved joint shape and scale.
```

### 5.4 短刃与长枪透明素材

```text
Use case: stylized-concept
Asset type: transparent weapon asset

Primary request:
Two separate side-view weapons for a paper-cut action game:
1. a chipped short blade with a simple cloth-wrapped handle,
2. a long guard spear with a narrow leaf-shaped tip and worn red tassel.

Composition/framing:
Both weapons horizontal, tips pointing right, equal display scale, wide spacing.

Backdrop:
flat #00ff00 chroma-key background.

Constraints:
No hands, no character, no motion trail, no text.
Silhouettes must remain readable at small gameplay size.
```

---

## 6. 三种人形敌人

### 6.1 天兵

```text
Use case: stylized-concept
Asset type: enemy character model sheet for a 2D side-view action game

Primary request:
An ordinary celestial soldier, not a mindless puppet: a living humanoid spirit in layered armor, tired but disciplined.

Composition/framing:
Full-body side view facing left, neutral stance and attack stance, same scale and foot baseline.

Weapon:
standard spear or halberd with a simple silhouette.

Style:
ink-wash armor plates, paper-cut joints, faded blue-gray cloth, restrained old-gold edges, worn face and practical posture.

Constraints:
No oversized shoulder ornaments, no glowing wings, no text, no background.
Readable as the balanced basic enemy.
```

### 6.2 镇守

```text
Use case: stylized-concept
Asset type: enemy character model sheet for a 2D side-view action game

Primary request:
A heavy celestial gate guardian built around a broad shield and short crushing weapon.

Composition/framing:
Full-body side view facing left, shield-forward guard pose and heavy overhead attack pose, same scale and foot baseline.

Style:
wide silhouette, thick ink outlines, layered cracked lamellar armor, soot and dried red seals.

Constraints:
No text, no background, no glowing magical effects.
Shield must be visibly larger than the torso.
The silhouette must be unmistakably heavier than the basic soldier.
```

### 6.3 法吏

```text
Use case: stylized-concept
Asset type: enemy character model sheet for a 2D side-view action game

Primary request:
A tall, thin celestial clerk-officer who fights at range using floating sealed documents and a narrow ceremonial weapon.

Composition/framing:
Full-body side view facing left, casting stance and retreat stance, same scale and foot baseline.

Style:
long paper-cut robe, severe narrow face, ink-stained sleeves, jade seal accessories, a few rigid floating documents.

Constraints:
No text on the documents, no busy particles, no background.
Keep hands and casting gesture readable.
Silhouette must be narrower and taller than the basic soldier.
```

### 6.4 敌人分层参考

```text
Use case: stylized-concept
Asset type: layered enemy puppet construction sheet

Primary request:
Separate the approved [天兵/镇守/法吏] into paper-cut production parts.

Required parts:
head, torso, upper arms, forearms, hands, thighs, shins, feet,
front armor panel, back cloth panel, primary weapon, secondary shield or document.

Constraints:
No text, no overlapping parts, no alternative costume.
Use identical body scale across all variants.
```

---

## 7. 旧我与许安

### 7.1 旧我角色混合

```text
Use case: stylized-concept
Asset type: special enemy character design

Primary request:
The rat fighter’s silhouette and combat clothing, but the body subtly belongs to a young human farmer named Xu An.
The face is mostly hidden or distorted during combat, with human skin, human fingers and a human breathing posture breaking through the rat silhouette.

Composition/framing:
Full-body side view facing left, neutral combat stance.

Style:
ink-black paper-cut silhouette, unstable paper layers, one restrained skin-tone patch, vermilion seal marks resembling a prison record.

Constraints:
Do not reveal a complete human face yet in this version.
No text, no background, no excessive horror gore.
The design must still share the player's exact body proportions.
```

### 7.2 许安面孔揭示素材

```text
Use case: stylized-concept
Asset type: transparent face and identity reveal layer

Primary request:
A young male farmer’s tired face, approximately 20 years old, with dirt, minor scars and restrained fear.
The expression should be confused and betrayed rather than monstrous.

Composition/framing:
Front-facing or three-quarter head, isolated, symmetrical enough to overlay on the rat silhouette.

Style:
ink-wash portrait with paper texture, muted skin tones, no glamour.

Backdrop:
flat #00ff00 chroma-key background.

Constraints:
No text, no body, no halo, no heavy horror effects.
Keep the face recognizable at small size.
```

---

## 8. 夺愿神 Boss

### 8.1 三阶段角色设计

```text
Use case: stylized-concept
Asset type: three-phase boss character sheet for a 2D action game

Primary request:
The Duo Yuan Shen, a celestial official who controls incense and stolen resolve.

Phase 1:
composed robed official with a sealed divine crown, holding a ledger and incense staff.

Phase 2:
the ledger opens, chains and paper seals orbit the body, a translucent ink shield absorbs prayer slips.

Phase 3:
crown cracked, robe torn, incense fire spilling from the sleeves, chains dragging across the ground, controlled authority replaced by unstable hunger.

Composition/framing:
Three full-body side views facing left, same scale, same foot baseline.

Style:
heavy ink-wash robes, jointed paper-cut arms, old-gold armor details, vermilion ledgers, restrained jade.

Constraints:
No text, no background, no generic demon horns.
The three phases must share one unmistakable silhouette and costume identity.
```

### 8.2 Boss 分层提示词

```text
Use case: stylized-concept
Asset type: layered boss puppet construction sheet

Primary request:
Separate the approved [第一阶段/第二阶段/第三阶段] Duo Yuan Shen into production parts.

Parts:
head and crown, torso, upper arms, forearms, hands, robe front, robe back, robe tail,
ledger, incense staff, chain root, two chain segments, attached prayer slips.

Constraints:
No text, no overlapping pieces, no background.
Maintain one shared scale and pivot convention across all phases.
```

---

## 9. 无雨乡场景

### 9.1 战斗场景分层

```text
Use case: stylized-concept
Asset type: layered side-view battle environment

Primary request:
The Wuyu Village battle arena in a drought-stricken rural shrine.

Required layers:
1. far background: pale paper sky, black ink mountains, narrow rain clouds.
2. middle background: ruined village houses, dead trees, paper shrine, distant wells.
3. battle layer: one continuous playable ground plane about 200 pixels high, one one-way platform, cracked well, stone steps, shrine incense table.
4. foreground: dry grass, ash, torn prayer slips, broken wall fragments.

Composition/framing:
16:9 side-view game stage, no camera perspective distortion.
Keep the lower 18 percent of the image free of important detail so characters remain readable.
The central platform must be visually distinct from the ground.

Style:
ink-wash landscape, rough paper-cut structures, dry brush, restrained vermilion seals.

Constraints:
No characters, no UI, no text, no dramatic hero lighting.
Ground collision edges must be clean and unambiguous.
```

### 9.2 背景透明层

```text
Use case: stylized-concept
Asset type: transparent parallax environment layer

Primary request:
The [远景/中景/前景] layer of the Wuyu Village battle arena.

Backdrop:
flat #00ff00 chroma-key background.

Constraints:
Only the requested depth layer; no ground floor from other layers.
No characters, no text, no UI.
Edges must be suitable for parallax scrolling.
```

---

## 10. 场景道具

```text
Use case: stylized-concept
Asset type: transparent game prop set

Primary request:
A collection of isolated 2D paper-cut props for the Wuyu Village arena:
intact incense burner, broken incense burner, prayer slip bundle, wooden shrine offering table,
cracked ground burrow, stone platform edge, ash pile, torn sealing paper, hanging red ribbon.

Composition/framing:
Each prop isolated with wide spacing, same lighting and side-view angle.

Backdrop:
flat #00ff00 chroma-key background.

Constraints:
No text, no characters, no background scenery, no shadows.
Each asset must be readable as a separate PNG.
```

---

## 11. 战斗 HUD

### 11.1 HUD 风格板

```text
Use case: ui-mockup
Asset type: production UI style board for a 2D action game

Primary request:
A compact combat HUD inspired by paper ledgers, torn seals, ink brushes and stamped records.
Show placeholder areas for:
player health, posture, qi, shi, current weapon, three technique slots,
enemy health, posture, qi and shi.

Composition/framing:
16:9 game screen mockup.
Player information at upper left.
Enemy information at upper right.
No central obstruction.

Style:
paper panels, dry ink strokes, vermilion seals, jade highlights, old-gold restrained accents.

Constraints:
No paragraph text, no feature explanation, no logos.
All bars and icons must remain readable at 1280x720.
```

### 11.2 透明 UI 分件

```text
Use case: ui-mockup
Asset type: transparent UI component atlas

Primary request:
Separate 2D game HUD components:
health bar frame, posture bar frame, qi bar frame, shi bar frame,
paper button normal state, hover state, disabled state,
short-blade icon, spear icon, seal stamp, small incense currency icon.

Backdrop:
flat #00ff00 chroma-key background.

Constraints:
No text, no numbers, no background screen.
Each component must be isolated and usable as a Godot texture.
```

---

## 12. 战斗特效

```text
Use case: stylized-concept
Asset type: transparent combat VFX atlas

Primary request:
Ink-and-paper combat effects:
short-blade slash arc, long-spear thrust streak, light hit spark,
heavy impact burst, ordinary metallic block spark, vermilion parry seal ring,
dust from dodge, burrow ground crack, emergence dirt burst,
boss shield ripple, knockdown dust.

Composition/framing:
Each effect isolated in its own cell with generous spacing.
White and pale-gold effects on a chroma-key background for easy recoloring.

Constraints:
No characters, no text, no background scene, no soft shadow.
Effects must preserve a clear directional axis.
Avoid dense particle spam.
```

---

## 13. Demo 结束插画

```text
Use case: stylized-concept
Asset type: ending illustration for a game demo

Primary request:
The defeated Duo Yuan Shen dissolves into incense smoke while the rat fighter’s silhouette reveals the exhausted human face of Xu An.
An open reincarnation ledger lies on the ground, its pages turning without wind.

Composition/framing:
16:9 horizontal illustration.
Rat fighter and human face at center-left.
Fading boss and incense smoke at center-right.
Keep a dark, quiet area near the bottom for ending text.

Style:
ink-wash, layered paper cutouts, burnt paper edges, vermilion seals, restrained ember light.

Lighting/mood:
quiet, tragic, exhausted; not triumphant.

Constraints:
No text, no UI, no extra characters beyond the two identities.
Do not turn the face reveal into gore or body horror.
```

---

## 14. 生成与验收流程

1. 先生成 `首张风格确认图`。
2. 确认鼠光比例、香火视觉、敌人剪影和 HUD 方向。
3. 再生成鼠光、天兵、镇守、法吏和夺愿神的分层参考。
4. 透明素材统一使用绿幕背景并本地去底。
5. 最后生成场景层、UI 分件和特效。
6. 每次只修改一个问题，例如“缩短武器”或“增大盾牌剪影”，不要整张重写。

### 单张资产验收

- 轮廓在缩略图下仍可辨认。
- 没有额外肢体或错误武器。
- 正反面朝向一致。
- 没有文字、签名和水印。
- 透明素材四角完全透明。
- 角色比例、脚底基线和关节位置一致。
- 颜色不超出纸张、墨黑、朱红、青玉、旧金五组主色。

