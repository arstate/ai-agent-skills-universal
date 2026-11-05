import { callPlugin } from "/mnt/HDD-2/BACKUP LINUX/FILE DATA/SOFTWARE LINUX/figma-bridge/server/src/relay-client";

/**
 * Design System Token Auditor CLI
 * Usage:
 *   bun scripts/design_system_auditor.ts
 */
async function main() {
  console.log("🔍 Menjalankan Audit Design System & Token di Figma Canvas...");

  const code = `
  (async () => {
    const selection = figma.currentPage.selection;
    const target = selection.length > 0 ? selection[0] : figma.currentPage;

    const SPACING_SCALE = [0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80];
    let auditedCount = 0;
    let outOfSpecSpacing = 0;
    let unboundFills = 0;
    const issues = [];

    function traverse(node) {
      auditedCount++;

      // Cek Spacing
      if ("layoutMode" in node && node.layoutMode !== "NONE") {
        if (!SPACING_SCALE.includes(node.itemSpacing)) {
          outOfSpecSpacing++;
          issues.push({ id: node.id, name: node.name, type: "OUT_OF_SPEC_GAP", value: node.itemSpacing });
        }
      }

      // Cek Fills
      if ("fills" in node && Array.isArray(node.fills)) {
        const hasBoundVar = node.boundVariables && node.boundVariables.fills;
        const hasStyle = "fillStyleId" in node && node.fillStyleId !== "";
        if (!hasBoundVar && !hasStyle && node.fills.length > 0 && node.fills[0].type === "SOLID") {
          unboundFills++;
        }
      }

      if ("children" in node) {
        for (const child of node.children) traverse(child);
      }
    }

    traverse(target);
    figma.notify(\`🔍 Audit: \${auditedCount} node dicek. \${outOfSpecSpacing} gap out-of-spec, \${unboundFills} unbound fills.\`);
    return { targetName: target.name, auditedCount, outOfSpecSpacing, unboundFills, sampleIssues: issues.slice(0, 5) };
  })()
  `;

  try {
    const res = await callPlugin("execute", { code });
    if (res?.error) {
      console.error("❌ Figma Error:", res.error);
      process.exit(1);
    }
    console.log("✅ Hasil Audit Token Figma:");
    console.log(JSON.stringify(res?.value ?? res, null, 2));
  } catch (err: any) {
    console.error("❌ Eksekusi audit gagal:", err.message);
    process.exit(1);
  }
}

main().catch(console.error);
