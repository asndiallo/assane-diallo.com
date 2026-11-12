import type { SatteriProcessorOptions } from "@astrojs/markdown-satteri";
import { defaultLocale, getDictionary, locales } from "../i18n/index.ts";

/** A hast plugin entry as Sätteri accepts it: its own types, so upgrades are checked against them. */
type HastPlugin = NonNullable<SatteriProcessorOptions["hastPlugins"]>[number];
type Node = {
  type: string;
  tagName?: string;
  children?: Node[];
  properties?: Record<string, unknown>;
};

/**
 * Guide markup (Sätteri hast plugin, see astro.config.ts), in the content's language:
 *
 * - A blockquote that opens with a bold label is a callout: `> **Do this**` becomes the action
 *   box, `> **What I saw**` the evidence box (labels from the dictionary, `guide.callouts`).
 * - GFM footnotes become the visible "Sources" list: a translated heading and back-link label.
 */
export const guideBlocksPlugin: HastPlugin = ({ fileURL }) => {
  const path = fileURL?.pathname ?? "";
  const locale = locales.find((l) => path.includes(`/${l}/`)) ?? defaultLocale;
  const { guide } = getDictionary(locale);
  const kinds = new Map([
    [guide.callouts.do, "callout-do"],
    [guide.callouts.saw, "callout-saw"],
  ]);
  const firstElement = (node: Node) => node.children?.find((c) => c.type === "element");

  return {
    name: "guide-blocks",
    element: {
      filter: ["blockquote", "h2", "a"],
      visit(node, ctx) {
        const el = node as unknown as Node;
        if (el.tagName === "blockquote") {
          const label = firstElement(el);
          const strong = label && firstElement(label);
          if (label?.tagName !== "p" || strong?.tagName !== "strong") return;
          const kind = kinds.get(ctx.textContent(label as never).trim());
          if (!kind) return;
          ctx.setProperty(node, "className", ["callout", kind]);
          ctx.setProperty(label as never, "className", ["callout-label"]);
        } else if (el.tagName === "h2" && el.properties?.id === "footnote-label") {
          ctx.setProperty(node, "className", []);
          ctx.setField(node, "children", [{ type: "text", value: guide.sources }] as never);
        } else if (el.tagName === "a" && el.properties?.dataFootnoteBackref !== undefined) {
          const n = String(el.properties?.href ?? "").replace(/^.*-(\d+)$/, "$1");
          ctx.setProperty(node, "ariaLabel", guide.backToText(n));
        }
      },
    },
  };
};
