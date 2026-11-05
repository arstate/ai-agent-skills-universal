import { callPlugin } from "/mnt/HDD-2/BACKUP LINUX/FILE DATA/SOFTWARE LINUX/figma-bridge/server/src/relay-client";

/**
 * Structural Code Handoff CLI
 * Ekstraksi AST frame terpilih di Figma langsung menjadi JSX Tailwind CSS
 * Usage:
 *   bun scripts/figma_handoff.ts
 */
function figmaNodeToTailwind(node: any, indent = 0): string {
  const pad = "  ".repeat(indent);
  if (node.type === "TEXT") {
    const isMono = node.fontName?.family?.toLowerCase().includes("mono");
    const fontClass = isMono ? "font-mono font-bold text-xs uppercase" : "font-sans font-extrabold text-sm tracking-tight";
    return `${pad}<span className="${fontClass}">${node.characters.replace(/\n/g, "<br />")}</span>`;
  }

  if (node.type === "FRAME" || node.type === "INSTANCE" || node.type === "COMPONENT") {
    const classes: string[] = [];

    // Flex layout
    if (node.layoutMode === "HORIZONTAL") classes.push("flex flex-row");
    else if (node.layoutMode === "VERTICAL") classes.push("flex flex-col");
    else classes.push("relative");

    // Alignments
    if (node.primaryAxisAlignItems === "CENTER") classes.push("justify-center");
    else if (node.primaryAxisAlignItems === "SPACE_BETWEEN") classes.push("justify-between");
    else if (node.primaryAxisAlignItems === "MAX") classes.push("justify-end");

    if (node.counterAxisAlignItems === "CENTER") classes.push("items-center");
    else if (node.counterAxisAlignItems === "MAX") classes.push("items-end");

    // Gap & Paddings
    if (node.itemSpacing) classes.push(`gap-[${node.itemSpacing}px]`);
    if (node.paddingTop) classes.push(`pt-[${node.paddingTop}px] pb-[${node.paddingBottom}px] px-[${node.paddingLeft}px]`);

    // Sizing
    if (node.layoutGrow === 1) classes.push("flex-1");
    if (node.layoutAlign === "STRETCH") classes.push("self-stretch");

    // Radius & Solid Hard Shadow
    if (node.cornerRadius) classes.push(`rounded-[${node.cornerRadius}px]`);
    classes.push("border border-[#012969] shadow-[6px_6px_0px_#012969]");

    const childrenJsx = (node.children || [])
      .map((c: any) => figmaNodeToTailwind(c, indent + 1))
      .filter(Boolean)
      .join("\n");

    return `${pad}<div className="${classes.join(" ")}">\n${childrenJsx}\n${pad}</div>`;
  }

  return "";
}

async function main() {
  console.log("📦 Mengambil AST Frame Seleksi dari Figma...");

  const code = `
  (async () => {
    const selection = figma.currentPage.selection;
    if (!selection.length) return { error: "Pilih minimal 1 frame di Figma untuk diekspor ke kode!" };
    const root = selection[0];

    function serialize(node) {
      const data = {
        id: node.id,
        name: node.name,
        type: node.type,
      };
      if (node.type === "TEXT") {
        data.characters = node.characters;
        data.fontSize = node.fontSize;
        data.fontName = node.fontName;
      }
      if ("layoutMode" in node) {
        data.layoutMode = node.layoutMode;
        data.primaryAxisAlignItems = node.primaryAxisAlignItems;
        data.counterAxisAlignItems = node.counterAxisAlignItems;
        data.itemSpacing = node.itemSpacing;
        data.paddingTop = node.paddingTop;
        data.paddingBottom = node.paddingBottom;
        data.paddingLeft = node.paddingLeft;
        data.paddingRight = node.paddingRight;
        data.layoutGrow = node.layoutGrow;
        data.layoutAlign = node.layoutAlign;
        data.cornerRadius = node.cornerRadius;
      }
      if ("children" in node) {
        data.children = node.children.map(serialize);
      }
      return data;
    }

    return serialize(root);
  })()
  `;

  try {
    const res = await callPlugin("execute", { code });
    if (res?.error) {
      console.error("❌ Figma Error:", res.error);
      process.exit(1);
    }
    const nodeTree = res?.value ?? res;
    console.log(`\n🎉 Berhasil mengekstrak frame: "${nodeTree.name}" (${nodeTree.type})`);
    console.log("--------------------------------------------------");
    console.log("// Production-Ready Next.js 15 Tailwind Component:\n");
    const jsx = figmaNodeToTailwind(nodeTree);
    console.log(jsx);
    console.log("\n--------------------------------------------------");
  } catch (err: any) {
    console.error("❌ Handoff gagal:", err.message);
    process.exit(1);
  }
}

main().catch(console.error);
