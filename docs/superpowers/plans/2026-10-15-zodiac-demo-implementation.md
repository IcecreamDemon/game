# 《十二神相录》Godot Demo 实施计划

**状态**：M0–M6 已完成；M7 进行中（主入口、HUD、节点选择、战斗反馈与 Windows 导出已完成）

**设计依据**：

- `E:\game plant\docs\superpowers\specs\2026-10-15-zodiac-demo-design.md`
- `E:\game plant\docs\game-design\twelve-zodiac-project-bible.md`

**正式工程**：`E:\twelfe`

## 执行约束

- 每个里程碑必须能独立运行和验证。
- 未通过当前里程碑验收，不进入下一里程碑。
- 所有战斗时序使用帧数，所有可调数值使用资源或配置对象。
- 不制作 Demo 范围之外的生肖、区域、完整物品池或最终主线。
- 提交计划批准后，先完成 M0 和 M1，再根据实测决定 M2 的具体帧数。
- 每个里程碑完成后更新设计文档的任务看板和验证证据。

---

## M0：工程基线

**目标**：让正式工程具备可复现的 2D 配置、输入映射、目录结构和版本控制。

### 任务

1. 在 `E:\twelfe` 初始化 Git 仓库并提交当前工程基线。
2. 创建设计文档中的目录结构。
3. 将项目窗口设置为 1920 × 1080，`canvas_items` 拉伸。
4. 配置所有 InputMap 动作：
   - `move_left`
   - `move_right`
   - `jump`
   - `light_attack`
   - `heavy_attack`
   - `dodge`
   - `guard`
   - `perfect_parry`
   - `switch_weapon`
   - `heavy_technique`
   - `burrow`
5. 创建 `GameEvents` 自动加载。
6. 创建 `DebugFlags` 自动加载，统一控制判定框、状态名和调试面板。
7. 创建无逻辑的 `main.tscn` 启动场景。
8. 编写 `tests/smoke_test.gd`，验证项目可加载、InputMap 完整、自动加载存在。

### 验收

```powershell
& "E:\SteamLibrary\steamapps\common\Godot Engine\godot.windows.opt.tools.64.exe" --headless --path "E:\twelfe" --quit
```

命令返回 0，且 smoke test 输出全部通过。

---

## M1：Combat Lab 基础

**目标**：一张灰盒竞技场中，玩家可以移动、跳跃、攻击木桩，并看到四资源变化。

### 场景

- `scenes/tests/combat_lab.tscn`
- `scenes/combat/arena.tscn`
- `scenes/actors/player/player.tscn`
- `scenes/actors/training_dummy.tscn`
- `scenes/ui/combat_hud.tscn`

### 脚本与组件

- `scripts/actors/player/player_controller.gd`
- `scripts/actors/actor_state_machine.gd`
- `scripts/components/health_component.gd`
- `scripts/components/posture_component.gd`
- `scripts/components/qi_component.gd`
- `scripts/components/shi_component.gd`
- `scripts/combat/hitbox_component.gd`
- `scripts/combat/hurtbox_component.gd`
- `scripts/combat/combat_resolver.gd`
- `scripts/data/attack_data.gd`
- `scripts/debug/combat_debug_overlay.gd`

### 功能

1. 玩家地面移动、跳跃和落地。
2. 生命、架势、气和势组件。
3. `AttackData` 资源驱动一段测试攻击。
4. 前摇、有效帧、恢复帧和单目标单次命中。
5. 木桩受到伤害和架势变化。
6. HUD 显示四个资源和当前状态。
7. 调试层显示状态名、当前攻击帧和有效判定框。

### 测试

- `tests/combat/attack_timing_test.gd`
- `tests/combat/hit_once_test.gd`
- 手工测试：连续命中木桩不会一次攻击扣多次生命。

### 验收

- 60 FPS。
- 攻击帧和状态切换可观察。
- 调试层能解释每次伤害来源。

---

## M2：连招、防御与受击

**目标**：完成两把武器的基础连招、精准格挡、格挡反击和三类受击状态。

### 武器资源

- `resources/weapons/short_blade.tres`
- `resources/weapons/spear.tres`
- `resources/attacks/short_blade/*.tres`
- `resources/attacks/spear/*.tres`

### 功能

1. 两段共用起手。
2. 第二段后支持：
   - 普通轻击终结。
   - 前方向轻击分支。
   - 上方向轻击分支。
   - 重击终结。
   - 换武追击。
3. 命中和挥空均可续段，命中后的输入缓冲更宽。
4. 按住防御和精准格挡。
5. 精准格挡恢复气与势。
6. 近距离自动发动短刃三段反击或长枪突刺反击。
7. 受击状态：僵直、击飞、倒地。
8. 空中轻击和空中重击砸地击。
9. 浮空预算 3/2/1。
10. 倒地后重击触发地面追击。
11. 绝境精准格挡：受击时手动触发，成功或失败清空气，倒地禁用。

### 测试

- `tests/combat/combo_branch_test.gd`
- `tests/combat/parry_test.gd`
- `tests/combat/hit_reaction_test.gd`
- `tests/combat/juggle_limit_test.gd`

### 验收

- 两把武器可用不同路线完成连招。
- 红色攻击穿过普通防御。
- 格挡反击只在近距离触发。
- 达到浮空上限后目标强制落地。

---

## M3：三种普通敌人

**目标**：实现天兵、镇守、法吏，使 Combat Lab 可以测试真实对抗。

### 场景与脚本

- `scenes/actors/enemies/tian_bing.tscn`
- `scenes/actors/enemies/guardian.tscn`
- `scenes/actors/enemies/cleric_officer.tscn`
- `scripts/ai/enemy_ai.gd`
- `scripts/ai/enemy_state.gd`
- `resources/enemies/*.tres`

### 行为

- 天兵：接近、普通攻击、后退和防御。
- 镇守：盾防、重击、破防恢复。
- 法吏：保持距离、投射物、区域控制和红色攻击。

### 敌人气

- 所有敌人拥有气。
- 格挡时消耗气。
- 气只随时间恢复。
- 气耗尽后不能继续格挡。

### 测试

- `tests/enemies/enemy_guard_qi_test.gd`
- `tests/enemies/enemy_unblockable_test.gd`
- 手工测试：三种敌人有不同交战距离。

### 验收

- 敌人不会连续无限防御。
- 三种敌人有可识别的强弱解法。

---

## M4：自由潜地

**目标**：完成鼠光特殊技能及敌人反制。

### 脚本

- `scripts/actors/player/burrow_state.gd`
- `scripts/combat/burrow_detector.gd`
- `scripts/combat/ground_crack_visual.gd`
- `scripts/combat/anti_burrow_area.gd`

### 功能

1. 主地面自由潜地。
2. 持续消耗气，气空强制钻出。
3. 独立碰撞层。
4. 地面裂纹延迟显示位置。
5. 普通攻击不能命中地下目标。
6. 反潜地攻击可以命中。
7. 钻出无硬直。
8. 按攻击衔接破土上挑。
9. 破土上挑消费势并允许继续接轻击。
10. 钻出后的再次潜地冷却。

### 测试

- `tests/combat/burrow_collision_test.gd`
- `tests/combat/emergence_combo_test.gd`
- `tests/combat/burrow_cost_test.gd`

### 验收

- 潜地期间普通攻击无效。
- 反潜地攻击可靠命中。
- 钻出后能直接衔接破土上挑。
- 不能无限潜地躲避。

---

## M5：旧我

**目标**：完成行为记录、复制 AI 和一场可识别的旧我战。

### 场景与脚本

- `scenes/actors/enemies/old_self.tscn`
- `scripts/combat/behavior_recorder.gd`
- `scripts/ai/old_self_ai.gd`
- `resources/old_self/old_self_profile.gd`

### 功能

1. 记录常用距离区间。
2. 记录最长连招片段。
3. 记录攻击后的闪避方向。
4. 只读取上一战数据。
5. 不显示复制标签。
6. 不读取当前按键。
7. 通过动作、武器轨迹和闪避暴露模仿痕迹。
8. 旧我使用鼠光剪影和许安特征。
9. 击败后短暂露出许安的脸。

### 测试

- `tests/old_self/recorder_test.gd`
- `tests/old_self/profile_isolation_test.gd`
- `tests/old_self/replay_weight_test.gd`

### 验收

- 改变上一战行为后，旧我行为随之变化。
- 旧我不会读取当前输入。
- 测试者能将旧我动作与上一战联系起来。

---

## M6：夺愿神与六节点流程

**目标**：完成完整 10–15 分钟纵向切片。

### Boss

- `scenes/actors/boss/duo_yuan_shen.tscn`
- `scripts/ai/duo_yuan_shen_ai.gd`
- `resources/bosses/duo_yuan_shen.tres`

三阶段：

1. 香火权杖近战。
2. 夺取势并形成护盾，香炉或愿牌可夺回资源。
3. 踏地、地刺和香灰反潜地。

### 流程

- `scenes/flow/demo_flow.tscn`
- `scripts/flow/demo_flow_controller.gd`
- `scripts/flow/dialogue_controller.gd`
- `resources/dialogue/demo_flow.tres`

六节点：

1. 序章契约。
2. 天兵教学。
3. 香火抉择。
4. 断雨校尉。
5. 旧我战。
6. 夺愿神。

### 测试

- `tests/flow/node_retry_test.gd`
- `tests/flow/save_in_run_state_test.gd`
- `tests/boss/duo_yuan_shen_phases_test.gd`

### 验收

- 完整流程可从头走到结尾。
- 死亡只重置当前节点。
- 香火选择影响至少一项后续内容。
- 目标时长 10–15 分钟。

---

## M7：视觉、音频与导出

**目标**：形成可展示构建。

### 任务

1. 用纸张、墨色和朱红剪影替换纯灰盒占位。
2. 添加受击、格挡、反击、冲击和 UI 音效。
3. 添加最低限度环境音乐。
4. 完成标题、HUD、对话和结束界面。
5. 配置 Windows 导出。
6. 录制 30–60 秒实机演示视频。
7. 更新作品集 PDF，加入实机截图和测试结果。

### 验收

- 可执行文件在目标 Windows 环境启动。
- 首次启动无需编辑器。
- 完整流程无明显阻塞错误。
- 作品集包含实机证据，而不只是概念图。

---

## 任务依赖

```text
M0 -> M1 -> M2 -> M3 -> M4 -> M5 -> M6 -> M7
              \-> M4 -> M5
```

实际执行时，M4 可以在 M2 后提前做可行性测试，但正式完成顺序不变。

## 风险与停止条件

- 若 M1 无法稳定完成攻击判定，停止扩展内容并先修复数据与状态机。
- 若 M2 的连招分支超过两把武器各三种，冻结新增分支，先测试现有分支使用率。
- 若 M4 的潜地导致普通攻击完全失效，先调整气消耗和敌人反制，不增加新敌人。
- 若 M5 的旧我表现无法被测试者识别，允许增加一次非 UI 的教学演出，但不增加“复制标签”。
- 若 M6 超过 20 分钟，优先删减普通战和对话，不删除旧我或香火选择。

## 首次执行方法

计划批准后从 M0、M1 开始：

1. 初始化 Git。
2. 创建目录和 InputMap。
3. 创建 Combat Lab 灰盒场景。
4. 实现玩家移动、木桩和一段攻击。
5. 运行 headless smoke test。
6. 启动 Godot 编辑器进行手工试玩并截图验证。
