# Current Options

## themePack

| themePack |  |  |  |
|---|---|---|---|
| `theme01` |  | 、、、 | 、、、 |
| `theme02` |  | 、AI//、、 | 、、、 |
| `theme03` |  | 、、、AI  | 、、、 |
| `theme04` |  | 、、、 | 、、、 |
| `theme05` |  | 、、KPI 、 | 、、、 |
| `theme06` |  | 、、// | 、、、 |
| `theme07` |  | 、、、/ | 、、//、B2B  |
| `theme08` |  | 、、、 | 、、、 |
| `theme09` |  | 、、、 | 、、、 |
| `theme10` |  | 、、、 | 、、、 |
| `theme11` |  | 、、、 | 、、、VC/PE  |
| `theme12` |  | 、、、 | 、、、 |

,。

:

- `theme01` :   / ;   / 
- `theme02` :   / AI//;   / 
- `theme03` :   / ;   / 
- `theme04` :   / ;   / 
- `theme05` :   / ;   / 
- `theme06` :   / ;   / 
- `theme07` :   / ;   / 
- `theme08` :   / ;   / 
- `theme09` :   / ;   / 
- `theme10` :   / ;   / 
- `theme11` :   / ;   / 
- `theme12` :   / ;   / 

## slide

 deck  `schemaVersion: 2`; `content`, 3  template variants  1  layout  bespoke variant。 deck  layout  3 :

- `layout`:  key, `theme01_page001`  `theme12_page001`。
- template: `{id, kind:"template", layout, props, contentMap}`。
- bespoke: `{id:"v4", kind:"bespoke", adjustable:false, composition, contentMap}`, `layout`、`props`  `controls`。
- `contentMap`: `{: content}`, `content.`。
- `role`: , `layout`。

 5 。 deck  1 , 3  5 ; 6 。3N  layout 。

 `npm --prefix <skill-root>/project run layout:query -- --theme <themePack> --role <role> --limit 8 --seed <randomSeed>:slide-<n>`, 3  template layout; seed ,。v4 、、、, `composition` ;、 HTML/JSX、, bespoke 。 `--role ambient`。 `--needs-media`、`--planned-images <n>`、`--provided-images <n>`  `--image-gen`。

 deck  brief  2  2  role, `npm --prefix <skill-root>/project run goal:scaffold -- --title <title> --goal <goal> --theme <themePack> --pages <n> --roles <page2-role,...,pageN-1-role> --layout-variants 3 --seed <randomSeed> --chunk-size 5 --out output/<deck-name>/goal.json`  schema v2  `goal.fill-plan.json`; 3 ,scaffold  v4。, `<skill-root>/project/output`。

 `npm --prefix <skill-root>/project run inspect:layout -- --compact <layout...>`, layout  `--layout`。`fillPlan` /、、;`propShapes`  `copy`、 key。 `copy`、`cells`、`items`、`rows`  `fillPlan` / `propShapes`  key,。、 `npm --prefix <skill-root>/project run props:safe -- <layout> '<props-json>' [--images <path...>]`; `goal.json`  `npm --prefix <skill-root>/project run props:safe -- --goal <goal-json> --write`  props 。

/ `mediaSlots[].canPresetMedia: true` , `presetProp` / `fieldPath`  deck 。 `slides[].media`  preset ; `npm --prefix <skill-root>/project run media:stage -- <deck-output-dir-or-ppt-dir> <media-file...>`, `relative`  media slot。 4 ,。/ image-gen;。 image-gen  2 , subagent ,;,/。subagent 。 media slot 。

`variantOutputMode:"comparison"`  4N ;`"selected-only"` , N 。v4 ,、。

/, `cardCount`、`itemCount`、`stepCount`  count 。; N 。 count/“”。

 `theme`、`fontSet`、`fontWeight`、`typeScale`、`styleVariant`、token 。
