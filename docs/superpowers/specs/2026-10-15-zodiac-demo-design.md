# 《十二神相录》Godot Demo 技术设计与交接

## 0. 立即接手 / Cold Start

**最后验证时间**：2026-10-20

**正式 Godot 工程**

- 路径：`E:\twelfe`
- 引擎：Godot `4.7.2.stable.steam.ed1daf0bf`
- 编辑器可执行文件：
  `E:\SteamLibrary\steamapps\common\Godot Engine\godot.windows.opt.tools.64.exe`
- 项目当前状态：M0–M6 已完成；M7 的主入口、节点选择、完整战斗 HUD、命中反馈、Windows 导出和导出启动验证已完成。
- 已有 InputMap、自动加载、2D 主场景、玩家、木桩、四资源组件、双武器资源、连招分支、防御与精准格挡、空中攻击、受击状态、HUD、调试层和自动测试。
- 当前移动基线：移动速度 `380`、跳跃初速度 `900`、重力 `2200`、闪避速度 `640`；玩家与敌人之间不使用 `CharacterBody2D` 物理碰撞解算，而是通过 `actor_contact_distance = 88` 的手动水平阻挡和分离处理，避免卡住、垂直下陷或宽模型视觉重叠。
- DemoFlow 战斗结束后播放胜利提示，再进入独立节点选择场景 `node_map.tscn`；选择完成前不生成下一场敌人。
- `flow_hud.tscn` 常驻显示玩家和当前敌人的生命、架势、气、势及状态名。
- 攻击命中通过 `HitboxComponent` 触发 `AttackData.hitstop_frames` 命中停顿和 `screen_shake_strength` 镜头震动；格挡反馈较弱，精准格挡使用独立事件。
- 地面攻击在有效帧结束后可以取消为闪避；敌人前摇通过剪影颜色区分普通、不可格挡和反潜地攻击。
- 玩家普通攻击和武技均只消耗势，不再消耗气；气只用于防御、闪避和潜地。
- 势除攻击命中获取外，默认以每秒 `2` 点缓慢自然恢复；进入攻击状态后停止自然回复，直到整套连招结束或攻击被打断。普通轻击消耗 `8`、终结技 `12–15`、重击/砸地/地面追击 `20`、破土攻击 `15`。
- 敌人普通受击会根据 `AttackData.knockback` 产生水平击退，并根据 `hitstun_frames` 进入僵直。
- Git：可从 `E:\twelfe` 直接运行 Git 命令；元数据位于
  `E:\game plant\.git-twelfe-state\.git`。
- Windows 构建：`E:\twelfe\build\windows\TwelveZodiacDemo.exe`，2026-10-20 已通过 headless 启动验证。
- 自动测试：`E:\twelfe\tests` 下共 35 个 GDScript 测试脚本，覆盖战斗、取消窗口、出招预警、潜地、敌人、旧我、Boss、流程与 UI 数据。

**启动编辑器**

```powershell
& "E:\SteamLibrary\steamapps\common\Godot Engine\godot.windows.opt.tools.64.exe" --editor --path "E:\twelfe"
```

**验证项目**

```powershell
& "E:\SteamLibrary\steamapps\common\Godot Engine\godot.windows.opt.tools.64.exe" --headless --path "E:\twelfe" --quit
```

**Godot MCP**

- 插件：`Godot MCP Native 1.0.8`
- 插件目录：`E:\twelfe\addons\godot_mcp`
- MCP 地址：`http://localhost:19081/mcp`
- Codex 配置项：`godot-mcp`
- 状态：插件和 Codex 配置已迁移到空闲端口 `19081`；HTTP MCP 初始化请求验证成功，服务返回 `godot-native-mcp 2.0.0`。当前正在运行一个隐藏的 headless Godot MCP 服务，新开 Codex 对话后加载工具。

**当前唯一下一步**

继续 M7：细化风格化占位美术、加入基础音效、录制 30–60 秒演示视频并同步作品集。不要扩展十二生肖或四大区域。

**已验证命令**

```powershell
& "E:\SteamLibrary\steamapps\common\Godot Engine\godot.windows.opt.tools.64.exe" --headless --path "E:\twelfe" --script res://tests/smoke_test.gd
& "E:\SteamLibrary\steamapps\common\Godot Engine\godot.windows.opt.tools.64.exe" --headless --path "E:\twelfe" --script res://tests/combat/attack_timing_test.gd
& "E:\SteamLibrary\steamapps\common\Godot Engine\godot.windows.opt.tools.64.exe" --headless --path "E:\twelfe" --script res://tests/combat/combo_branch_test.gd
& "E:\SteamLibrary\steamapps\common\Godot Engine\godot.windows.opt.tools.64.exe" --headless --path "E:\twelfe" --script res://tests/combat/parry_and_guard_test.gd
& "E:\SteamLibrary\steamapps\common\Godot Engine\godot.windows.opt.tools.64.exe" --headless --path "E:\twelfe" --script res://tests/combat/hit_reaction_test.gd
& "E:\SteamLibrary\steamapps\common\Godot Engine\godot.windows.opt.tools.64.exe" --headless --path "E:\twelfe" --script res://tests/combat/air_attack_test.gd
& "E:\SteamLibrary\steamapps\common\Godot Engine\godot.windows.opt.tools.64.exe" --headless --path "E:\twelfe" --script res://tests/enemies/enemy_archetype_test.gd
& "E:\SteamLibrary\steamapps\common\Godot Engine\godot.windows.opt.tools.64.exe" --headless --path "E:\twelfe" --script res://tests/enemies/enemy_guard_qi_test.gd
& "E:\SteamLibrary\steamapps\common\Godot Engine\godot.windows.opt.tools.64.exe" --headless --path "E:\twelfe" --script res://tests/enemies/enemy_unblockable_test.gd
& "E:\SteamLibrary\steamapps\common\Godot Engine\godot.windows.opt.tools.64.exe" --headless --path "E:\twelfe" --script res://tests/enemies/enemy_projectile_test.gd
& "E:\SteamLibrary\steamapps\common\Godot Engine\godot.windows.opt.tools.64.exe" --headless --path "E:\twelfe" --script res://tests/enemies/enemy_ai_smoke_test.gd
& "E:\SteamLibrary\steamapps\common\Godot Engine\godot.windows.opt.tools.64.exe" --headless --path "E:\twelfe" --script res://tests/combat/burrow_state_test.gd
& "E:\SteamLibrary\steamapps\common\Godot Engine\godot.windows.opt.tools.64.exe" --headless --path "E:\twelfe" --script res://tests/combat/burrow_cost_test.gd
& "E:\SteamLibrary\steamapps\common\Godot Engine\godot.windows.opt.tools.64.exe" --headless --path "E:\twelfe" --script res://tests/combat/emergence_combo_test.gd
& "E:\SteamLibrary\steamapps\common\Godot Engine\godot.windows.opt.tools.64.exe" --headless --path "E:\twelfe" --script res://tests/combat/dodge_test.gd
& "E:\SteamLibrary\steamapps\common\Godot Engine\godot.windows.opt.tools.64.exe" --headless --path "E:\twelfe" --script res://tests/old_self/behavior_recorder_test.gd
& "E:\SteamLibrary\steamapps\common\Godot Engine\godot.windows.opt.tools.64.exe" --headless --path "E:\twelfe" --script res://tests/old_self/old_self_profile_test.gd
& "E:\SteamLibrary\steamapps\common\Godot Engine\godot.windows.opt.tools.64.exe" --headless --path "E:\twelfe" --script res://tests/boss/boss_phase_test.gd
& "E:\SteamLibrary\steamapps\common\Godot Engine\godot.windows.opt.tools.64.exe" --headless --path "E:\twelfe" --script res://tests/boss/incense_burner_test.gd
& "E:\SteamLibrary\steamapps\common\Godot Engine\godot.windows.opt.tools.64.exe" --headless --path "E:\twelfe" --script res://tests/flow/demo_flow_test.gd
& "E:\SteamLibrary\steamapps\common\Godot Engine\godot.windows.opt.tools.64.exe" --headless --path "E:\twelfe" --script res://tests/combat/hit_feedback_test.gd
& "E:\SteamLibrary\steamapps\common\Godot Engine\godot.windows.opt.tools.64.exe" --headless --path "E:\twelfe" --script res://tests/combat/attack_cost_test.gd
& "E:\SteamLibrary\steamapps\common\Godot Engine\godot.windows.opt.tools.64.exe" --headless --path "E:\twelfe" --script res://tests/enemies/enemy_hitstun_knockback_test.gd
& "E:\SteamLibrary\steamapps\common\Godot Engine\godot.windows.opt.tools.64.exe" --headless --path "E:\twelfe" --script res://tests/combat/attack_dodge_cancel_test.gd
& "E:\SteamLibrary\steamapps\common\Godot Engine\godot.windows.opt.tools.64.exe" --headless --path "E:\twelfe" --script res://tests/combat/attack_weight_test.gd
& "E:\SteamLibrary\steamapps\common\Godot Engine\godot.windows.opt.tools.64.exe" --headless --path "E:\twelfe" --script res://tests/enemies/enemy_telegraph_test.gd
& "E:\SteamLibrary\steamapps\common\Godot Engine\godot.windows.opt.tools.64.exe" --headless --path "E:\twelfe" --quit-after 120
```

**本文件是第一事实源**

- 设计或实现发生变化时，先更新本文件。
- 每完成一个里程碑，更新第 14 节任务看板和第 15 节决策记录。
- 若实现与本文冲突，以最终用户决策为准，并记录变更原因。

---

## 1. 目标

制作一个可在 10–15 分钟内完整展示的 Godot 2D 纵向切片，用于验证：

1. 一屏横版 1v1 战斗是否成立。
2. 生命、架势、气、势是否形成清晰循环。
3. 短刃与长枪是否提供明显不同的战斗距离。
4. 自由潜地与破土上挑是否具有角色辨识度。
5. 旧我复制玩家习惯的机制是否可读、公平且值得扩展。
6. 香火选择是否能形成叙事与战斗之间的取舍。

最终版本使用鼠光、许安、无雨乡、两把武器、三个人形普通敌人、一名 Boss 和一次旧我战。

## 2. 明确不做

- 不制作十二生肖全角色可玩内容。
- 不制作罡风隘、天河录库和玉京天阙。
- 不制作完整 20 节点和 3–5 轮主线。
- 不制作机关类敌人。
- 不制作完整物品池、稀有度、等级或永久数值成长。
- 不制作判词 Boss 和最终阎王战。
- 不制作完整存档系统。
- 不制作全程语音或全动画过场。
- 不提前优化手柄，但保留统一 InputMap。

## 3. 固定 Demo 流程

| 顺序 | 节点 | 目的 | 退出条件 |
| --- | --- | --- | --- |
| 1 | 序章契约 | 交代战死、黄泉与还魂契约 | 对话结束，进入 Combat Lab 场景 |
| 2 | 天兵教学 | 移动、跳跃、轻重击、闪避、防御、精准格挡 | 天兵死亡 |
| 3 | 香火抉择 | 归还百姓换线索，或投入祝安商店 | 玩家完成选择 |
| 4 | 断雨校尉精英 | 换武、架势破防、场地干旱 | 精英死亡或主动放弃 |
| 5 | 旧我战 | 复现上一战的攻击距离、连招和闪避方向 | 旧我死亡 |
| 6 | 夺愿神 Boss | 夺势护盾、香炉资源、反潜地阶段 | Boss 死亡，露出许安的脸，Demo 结束 |

失败时立即重试当前节点。生命和构筑跨节点继承，气在战斗结束后恢复，势清零。

## 4. 输入

首版验收设备为键盘，所有动作必须使用 Godot `InputMap` 动作名。

| 动作 | 键位 |
| --- | --- |
| 左右移动 | `A` / `D` |
| 跳跃 | `Space` |
| 轻击 | `J` |
| 重击 | `K` |
| 闪避 | `L` |
| 按住防御 | `U` |
| 精准格挡 | `I` |
| 切换武器 | `Q` |
| 破势斩 | `E` |
| 潜地 | `F` |

禁用在 `_input()` 中直接判断物理按键。所有按键读取统一走 `Input.is_action_*`。

## 5. 工程结构

```text
E:\twelfe\
  AGENTS.md
  project.godot
  addons/
    godot_mcp/
  scenes/
    boot/
    flow/
    combat/
    actors/player/
    actors/enemies/
    actors/boss/
    ui/
    tests/
  scripts/
    actors/
    ai/
    combat/
    components/
    data/
    flow/
    debug/
    ui/
  resources/
    attacks/
    weapons/
    enemies/
    dialogue/
  assets/
    placeholders/
    art/
    audio/
  tests/
```

### 5.1 核心模块

| 模块 | 职责 | 禁止事项 |
| --- | --- | --- |
| `PlayerController` | 输入、移动、跳跃、朝向、动作意图 | 不直接处理伤害结算 |
| `ActorStateMachine` | 管理角色状态与切换条件 | 不保存 UI 状态 |
| `HealthComponent` | 生命值、死亡事件 | 不负责击退和动画 |
| `PostureComponent` | 架势、恢复、破防 | 不直接扣除生命 |
| `QiComponent` | 气的消耗、恢复、阈值 | 不处理潜地位移 |
| `ShiComponent` | 势的获取、消费和上限 | 不决定招式伤害 |
| `HitboxComponent` | 攻击有效帧与命中目标集合 | 不修改场景树 |
| `HurtboxComponent` | 接收攻击并返回防御结果 | 不自行播放 UI |
| `CombatResolver` | 统一计算伤害、架势、格挡和受击类型 | 不读取物理按键 |
| `BehaviorRecorder` | 记录旧我所需的三类行为 | 不保存完整输入序列 |
| `OldSelfAI` | 读取上一战记录并生成行为权重 | 不读取当前输入 |
| `DemoFlowController` | 六节点顺序、对话、选择、失败重试 | 不实现战斗规则 |
| `GameEvents` | 广播跨场景事件 | 不存储全部游戏状态 |

## 6. 战斗状态机

玩家和敌人共享状态名，但各自只启用需要的状态。

```text
Idle
  -> Move | Jump | Fall | Guard | Dodge | Burrow
  -> LightAttack | HeavyAttack | HeavyTechnique | PerfectParry
  -> Hitstun | Launched | Knockdown | GuardBreak | Dead
```

主要状态规则：

- `LightAttack` 支持两段共用起手，并在第二段后进入分支表。
- `HeavyAttack` 是不可接回轻击的终结动作。
- `HeavyTechnique` 包含破势斩和破土上挑。
- `PerfectParry` 成功后可进入自动格挡反击。
- `Burrow` 使用独立碰撞层和资源消耗，不等同于闪避。
- `Hitstun`、`Launched`、`Knockdown` 是三个独立受击状态。

## 7. 攻击数据

每个攻击使用 `AttackData` 资源：

```text
attack_id
animation_name
attack_type: normal | unblockable | anti_burrow
startup_frames
active_frames
recovery_frames
damage
posture_damage
guard_qi_damage
hitbox_offset
hitbox_size
knockback
hitstun_frames
reaction_type: stun | launch | knockdown
shi_gain_on_hit
shi_cost
qi_cost
buffer_start_frame
buffer_end_frame
hitstop_frames
screen_shake_strength
```

规则：

- 攻击按前摇、有效帧、恢复帧执行。
- 有效帧内同一目标只结算一次。
- 红色攻击 `unblockable` 不能被普通防御或精准格挡挡住。
- 反潜地攻击可以命中 `Burrow` 状态。
- 所有时序使用帧数，不能依赖单次 `delta` 判断攻击阶段。

## 8. 资源与防御

| 资源 | 主要来源 | 主要消耗 |
| --- | --- | --- |
| 生命 | 节点继承、香火恢复 | 受击 |
| 架势 | 暂停受击后恢复 | 防御普通攻击 |
| 气 | 精准格挡返还、节点结束恢复 | 防御、闪避、潜地 |
| 势 | 普攻命中、格挡反击命中 | 破势斩、破土上挑 |

原型基线：

- 轻击命中：势 `+10`
- 重击命中：势 `+18`
- 精准格挡：势 `+20`，气 `+15`
- 破势斩：势 `-35`
- 破土上挑：势 `-15`
- 普通防御：气 `-6/秒`
- 闪避：气 `-20`
- 潜地：进入时气 `-10`，地下每秒 `-15`

以上数值只用于第一轮测试，必须放入资源或配置对象。

### 8.1 普通防御

- 按住生效。
- 可以防住普通攻击。
- 不能防住红色不可格挡攻击。
- 格挡普通攻击时降低架势。
- 架势归零进入 `GuardBreak`。

### 8.2 精准格挡

- 按键触发，原型窗口以 8 帧为初始测试值。
- 成功恢复气和势，并使敌人短硬直。
- 距离小于 110 像素时自动发动武器专属反击。
- 距离过远时不自动追击。
- 失败退化为普通防御，不额外清空资源。

### 8.3 受击中的绝境精准格挡

- 气达到预设阈值后手动触发。
- 成功或失败都消耗全部气。
- 成功时回复少量气和一定势，并打断敌方当前连段。
- 每套敌方连招最多触发一次。
- 倒地状态不能使用。

## 9. 连招

不能使用单一固定三连。所有武器采用“两段共用起手，第二段后分支”。

### 9.1 短刃

- `轻1 → 轻2 → 轻击`：快速三连。
- `轻1 → 轻2 → 前+轻击`：突进斩。
- `轻1 → 轻2 → 上+轻击`：上挑，进入击飞。
- `轻1 → 轻2 → 重击`：高伤害终结。
- `轻1 → 轻2 → 换武`：换武追击，每套最多一次。

### 9.2 长枪

- `轻1 → 轻2 → 轻击`：连续突刺。
- `轻1 → 轻2 → 前+轻击`：平推突刺。
- `轻1 → 轻2 → 上+轻击`：挑枪击飞。
- `轻1 → 轻2 → 重击`：贯穿或横扫终结。
- `轻1 → 轻2 → 换武`：换武后撤或追击。

### 9.3 连招容错

- 命中和挥空都能继续固定连段。
- 命中后的输入缓冲窗口更宽。
- 挥空后的输入缓冲窗口更窄。
- 重击不能接回轻击。
- 玩家不能无限取消。

## 10. 空中攻击与受击反应

### 10.1 空中轻击

沿用地面轻击的招式逻辑、状态和连段语言，同时受到重力、空中位移和落地规则影响。

### 10.2 空中重击：砸地击

- 前摇和后摇明显，伤害高于普通轻重击。
- 命中后目标进入倒地态。
- 倒地结束后直接起身，不保持连续受击。
- 被格挡时消耗大量格挡气。

### 10.3 受击状态

| 状态 | 触发 | 结束 |
| --- | --- | --- |
| 僵直 | 平推或普通攻击 | 硬直结束后恢复 |
| 击飞 | 上挑或击飞招式 | 落地后进入倒地 |
| 倒地 | 砸地击或击飞落地 | 起身结束后恢复 |
| 破防 | 架势或格挡气耗尽 | 破防硬直结束后恢复 |

### 10.4 浮空预算

- 普通敌人最多追加 3 次浮空追击。
- 精英最多追加 2 次。
- Boss 最多追加 1 次。
- 重型敌人可以不可击飞。
- 初始击飞不占次数。
- 达到上限后增加重力并强制落地。
- 每轮追加的伤害逐级下降。

倒地时玩家按重击可触发地面追击，单独计算伤害，不占浮空预算。

## 11. 自由潜地与破土上挑

- 只有站在主地面时能潜地，浮空平台和空中不可使用。
- 潜地期间可以自由左右移动，使用独立碰撞层。
- 进入时消耗气，地下持续消耗气，气空强制钻出。
- 地下速度约为主地面速度的 `1.1` 倍。
- 地面显示延迟约 `0.15` 秒的墨色裂纹，暴露近似位置。
- 普通攻击和投射物不能命中地下目标。
- 踏地、地刺和香灰区域可以命中地下目标。
- 钻出后按攻击键触发破土上挑，不按攻击键立即恢复移动。
- 钻出没有惩罚性硬直，但破土上挑消费势。
- 钻出后约 `0.4` 秒不能再次潜地。

## 12. 敌人、旧我与 Boss

### 12.1 普通敌人

- 天兵：均衡近战，教学距离与格挡。
- 镇守：持盾防守，气耗尽后破防。
- 法吏：远程、区域控制和红色不可格挡攻击。

所有敌人都有气，但气只随时间恢复。成功格挡不返还气。敌人可以在低气时继续移动和攻击，但不能继续维持防御。

### 12.2 旧我

`BehaviorRecorder` 只记录：

1. 玩家攻击时与敌人的距离区间。
2. 玩家最长的连续招式片段。
3. 玩家攻击后 `0.4` 秒内最常选择的闪避方向。

`OldSelfAI`：

- 只读取上一战数据。
- 优先进入玩家常用距离。
- 按权重复现一段连招。
- 在自身攻击后按记录方向闪避。
- 不读取当前按键。
- 战斗内不显示复制标签。
- 战斗后不做系统复盘。
- 通过动作、武器轨迹和闪避暴露模仿痕迹。

### 12.3 夺愿神

第一阶段：

- 香火权杖近战。
- 测试距离、防御、精准格挡和架势。

第二阶段：

- 吸收玩家的势形成护盾。
- 玩家击破香炉或愿牌夺回资源。

第三阶段：

- 使用踏地、地刺和香灰封锁地面裂纹。
- 反潜地强度逐步提高。
- 玩家需要判断潜地、破土上挑和普通走位的时机。

## 13. 测试与验收

### 13.1 Combat Lab 最低验收

1. 普通攻击可被普通防御和精准格挡处理。
2. 红色攻击会穿透普通防御。
3. 精准格挡成功恢复气和势。
4. 近距离格挡自动反击，远距离不追击。
5. 轻击、重击、上挑和换武分支均可完成。
6. 普通敌人、精英和 Boss 的浮空预算按 3/2/1 生效。
7. 空中重击造成倒地，倒地后可接地面追击。
8. 潜地期间普通攻击无效，反潜地攻击有效。
9. 破土上挑可衔接轻击，不能无限连续潜地。
10. 旧我只读取上一战行为。
11. 同一攻击的有效帧不会重复结算。
12. 稳定 60 FPS，没有明显卡手或不可读动作。

### 13.2 玩家理解测试

- 至少 70% 测试者能独立完成一次精准格挡反击。
- 至少 70% 测试者能完成一次上挑、空中追击和倒地重击。
- 测试者能说明短刃与长枪的主要距离差异。
- 测试者能将旧我的行为与上一战联系，而不是认为它是随机 AI。
- 测试者能理解香火选择对构筑或线索的影响。

## 14. 任务看板

| 任务 | 状态 | 验收证据 |
| --- | --- | --- |
| 正式工程确认 | 已完成 | `E:\twelfe\project.godot` |
| Godot 4.7.2 确认 | 已完成 | CLI 输出版本 |
| Godot MCP 安装 | 已完成 | 插件与 Codex 配置已迁移到 `19081`，MCP initialize 验证通过 |
| 技术设计与 Cold Start | 已完成 | 本文件 |
| 设定总览与演示材料同步 | 已完成 | Markdown、HTML、PDF |
| 规格审阅 | 已完成 | 用户于 2026-10-15 批准 |
| 实施计划 | 已完成 | `docs/superpowers/plans/2026-10-15-zodiac-demo-implementation.md` |
| Git 初始化 | 已完成 | 外部 Git 元数据与 M0 提交 `2a6f0c6` |
| 2D 项目设置 | 已完成 | 1920x1080、InputMap、主场景 |
| Combat Lab 灰盒场地 | 已完成 | `combat_lab.tscn` headless 运行无错误 |
| 玩家移动与跳跃 | 已完成 | 灰盒场景可运行 |
| 四资源组件 | 已完成 | 组件脚本与 HUD 已接入 |
| 攻击数据与判定 | 已完成 | `attack_timing_test.gd` 通过 |
| 精准格挡与反击 | 已完成 | `parry_and_guard_test.gd` 通过 |
| 双武器与连招分支 | 已完成 | `combo_branch_test.gd` 通过 |
| 空中攻击 | 已完成 | `air_attack_test.gd` 通过 |
| 受击、击飞与浮空上限 | 已完成 | `hit_reaction_test.gd` 通过 |
| 自由潜地 | 已完成 | `burrow_state_test.gd`、`burrow_cost_test.gd`、`emergence_combo_test.gd` 通过 |
| 天兵、镇守、法吏 | 已完成 | 敌人档案、格挡、红色攻击、投射物和 AI 测试通过 |
| 旧我记录与复制 | 已完成 | `behavior_recorder_test.gd`、`old_self_profile_test.gd` 通过 |
| 夺愿神 Boss | 已完成 | `boss_phase_test.gd`、`incense_burner_test.gd` 通过 |
| 六节点流程 | 已完成 | `demo_flow_test.gd` 通过 |
| 节点选择与胜利动画 | 已完成 | `node_map.tscn` 与 `demo_flow_test.gd` |
| 完整战斗 HUD | 已完成 | `flow_hud.tscn` 显示双方四资源与状态 |
| 命中停顿与镜头震动 | 已完成 | `hit_feedback_test.gd` 通过 |
| 风格化占位美术 | 部分完成 | 已有纸张底色、墨色剪影与朱红/旧金状态色，待进一步细化 |
| Windows 导出 | 已完成 | `build/windows/TwelveZodiacDemo.exe` 可启动 |
| 音效与演示视频 | 未开始 | 音效、实机录制与作品集更新 |

## 15. 待实测决策

| 编号 | 问题 | 当前假设 | 验证方式 |
| --- | --- | --- | --- |
| D-001 | 精准格挡窗口 | 8 帧 | Combat Lab 测试 6/8/12 帧 |
| D-002 | 格挡反击能否取消 | 允许在指定段后取消 | 测试取消自由度 |
| D-003 | 闪避无敌帧 | 待定 | 记录被击中率与容错 |
| D-004 | 气恢复速度 | 待定 | 测试防御与潜地使用频率 |
| D-005 | 势收益速度 | 待定 | 测试破势斩使用频率 |
| D-006 | 击飞伤害衰减 | 100/85/70/55% | 测试连段长度与收益 |
| D-007 | 旧我复制权重 | 三类行为等权 | 测试识别率 |
| D-008 | Boss 夺势护盾强度 | 待定 | 测试阶段时长 |
| D-009 | 敌人搜索潜地强度 | 分区阶段提升 | 测试潜地逃课率 |
| D-010 | 香火双选奖励平衡 | 战斗收益对线索收益 | 玩家测试 |

## 16. 决策记录

| 编号 | 决策 | 原因 |
| --- | --- | --- |
| ADR-001 | 使用 Godot 4.7.2 和 GDScript | 工程已存在，迭代速度快 |
| ADR-002 | 使用数据驱动组件架构 | 便于复用武器、敌人和旧我 |
| ADR-003 | 首版键盘优先 | 降低输入适配成本 |
| ADR-004 | 1920x1080、`canvas_items` | 保留纸张纹理和 UI 细节 |
| ADR-005 | 横版平台竞技场 | 兼顾 1v1 与生肖移动能力 |
| ADR-006 | 生命加架势，不加入判词 | 控制首版复杂度 |
| ADR-007 | 气负责防御，势负责攻击 | 形成清晰资源循环 |
| ADR-008 | 自由潜地，不设置预设洞口 | 保持鼠类能力幻想 |
| ADR-009 | 破土上挑无惩罚性硬直 | 允许钻出后直接连击 |
| ADR-010 | 敌人气只随时间恢复 | 避免无限防守和格挡返还循环 |
| ADR-011 | 两段共用起手后分支 | 避免固定三连过于机械 |
| ADR-012 | 旧我完全无 UI 提示 | 保留神秘感，以动作铺垫 |
| ADR-013 | MCP 使用 Godot MCP Native | 原生 Godot，无需 Node.js |
| ADR-014 | 节点选择使用独立 `node_map.tscn` | 战斗结束与下一战之间保留明确停顿和玩家选择 |
| ADR-015 | 攻击只消耗势 | 气专职防御、闪避和潜地，资源职责更清楚 |
| ADR-016 | 角色间使用手动水平阻挡 | 避免 `CharacterBody2D` 双方碰撞挤压造成卡住和垂直下陷 |
| ADR-017 | 命中反馈由数据驱动 | 用 `hitstop_frames` 与 `screen_shake_strength` 统一轻击、重击、Boss 表现 |
