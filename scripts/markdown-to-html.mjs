import fs from "node:fs/promises";
import path from "node:path";

const [, , inputArg, outputArg, titleArg] = process.argv;

if (!inputArg || !outputArg) {
  console.error("Usage: node markdown-to-html.mjs <input.md> <output.html> [title]");
  process.exit(1);
}

const inputPath = path.resolve(inputArg);
const outputPath = path.resolve(outputArg);
const title = titleArg || path.basename(inputPath, path.extname(inputPath));
const markdown = await fs.readFile(inputPath, "utf8");
const lines = markdown.replace(/\r\n?/g, "\n").split("\n");

const escapeHtml = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const inline = (value) => {
  let result = escapeHtml(value);
  result = result.replace(/`([^`]+)`/g, "<code>$1</code>");
  result = result.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  result = result.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  result = result.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener">$1</a>',
  );
  return result;
};

const isTableSeparator = (line) =>
  /^\s*\|?[\s:|-]+\|[\s:|-]*\|?\s*$/.test(line) && line.includes("|");

const splitTableRow = (line) =>
  line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());

const output = [];
let listType = null;

const closeList = () => {
  if (listType) {
    output.push(`</${listType}>`);
    listType = null;
  }
};

for (let index = 0; index < lines.length; index += 1) {
  const line = lines[index];

  if (!line.trim()) {
    closeList();
    continue;
  }

  if (/^\s*---+\s*$/.test(line)) {
    closeList();
    output.push("<hr>");
    continue;
  }

  const heading = line.match(/^(#{1,6})\s+(.+)$/);
  if (heading) {
    closeList();
    const level = heading[1].length;
    output.push(`<h${level}>${inline(heading[2])}</h${level}>`);
    continue;
  }

  if (
    line.includes("|") &&
    index + 1 < lines.length &&
    isTableSeparator(lines[index + 1])
  ) {
    closeList();
    const headers = splitTableRow(line);
    const rows = [];
    index += 2;

    while (index < lines.length && lines[index].includes("|") && lines[index].trim()) {
      rows.push(splitTableRow(lines[index]));
      index += 1;
    }
    index -= 1;

    output.push("<div class=\"table-wrap\"><table>");
    output.push("<thead><tr>");
    output.push(headers.map((cell) => `<th>${inline(cell)}</th>`).join(""));
    output.push("</tr></thead><tbody>");
    for (const row of rows) {
      output.push("<tr>");
      output.push(row.map((cell) => `<td>${inline(cell)}</td>`).join(""));
      output.push("</tr>");
    }
    output.push("</tbody></table></div>");
    continue;
  }

  const unordered = line.match(/^\s*-\s+(.+)$/);
  if (unordered) {
    if (listType !== "ul") {
      closeList();
      listType = "ul";
      output.push("<ul>");
    }
    output.push(`<li>${inline(unordered[1])}</li>`);
    continue;
  }

  const ordered = line.match(/^\s*\d+\.\s+(.+)$/);
  if (ordered) {
    if (listType !== "ol") {
      closeList();
      listType = "ol";
      output.push("<ol>");
    }
    output.push(`<li>${inline(ordered[1])}</li>`);
    continue;
  }

  closeList();
  output.push(`<p>${inline(line)}</p>`);
}

closeList();

const html = `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)}</title>
  <style>
    :root {
      --ink: #17212b;
      --muted: #65717b;
      --paper: #fbfaf7;
      --line: #ccd4d8;
      --red: #c44935;
      --teal: #24717a;
      --gold: #bd8b2f;
      --panel: #ffffff;
    }

    * {
      box-sizing: border-box;
    }

    html {
      background: #d9dddf;
    }

    body {
      max-width: 1040px;
      margin: 0 auto;
      padding: 42px 56px 72px;
      color: var(--ink);
      background: var(--paper);
      font-family: "Microsoft YaHei", "Noto Sans CJK SC", "PingFang SC", sans-serif;
      font-size: 15px;
      line-height: 1.75;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      margin: 1.6em 0 0.6em;
      color: var(--ink);
      letter-spacing: 0;
      line-height: 1.3;
      break-after: avoid;
      page-break-after: avoid;
    }

    h1 {
      margin-top: 0;
      padding-bottom: 12px;
      border-bottom: 4px solid var(--red);
      font-size: 30px;
    }

    h2 {
      margin-top: 1.9em;
      padding: 10px 0 8px;
      border-bottom: 1px solid var(--line);
      color: var(--teal);
      font-size: 24px;
    }

    h3 {
      font-size: 18px;
    }

    p {
      margin: 0.7em 0;
    }

    ul,
    ol {
      margin: 0.7em 0;
      padding-left: 1.6em;
    }

    li {
      margin: 0.25em 0;
    }

    strong {
      color: #0f171e;
    }

    code {
      padding: 2px 5px;
      border-radius: 4px;
      color: #8f3024;
      background: #f2ebe8;
      font-family: Consolas, "Microsoft YaHei", monospace;
      font-size: 0.92em;
    }

    hr {
      height: 1px;
      margin: 2.2em 0;
      border: 0;
      background: var(--line);
    }

    .table-wrap {
      margin: 1em 0 1.4em;
      overflow-x: auto;
      break-inside: avoid;
      page-break-inside: avoid;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      background: var(--panel);
      font-size: 13px;
    }

    th {
      padding: 9px 10px;
      border: 1px solid #a8b5bb;
      color: #ffffff;
      background: var(--teal);
      text-align: left;
    }

    td {
      padding: 8px 10px;
      border: 1px solid var(--line);
      vertical-align: top;
    }

    tr:nth-child(even) td {
      background: #f2f4f3;
    }

    a {
      color: #176f78;
    }

    @page {
      size: A4;
      margin: 17mm 16mm 18mm;
    }

    @media print {
      html,
      body {
        background: #ffffff;
      }

      body {
        max-width: none;
        padding: 0;
      }

      h2 {
        break-before: auto;
      }
    }
  </style>
</head>
<body>
${output.join("\n")}
</body>
</html>
`;

await fs.mkdir(path.dirname(outputPath), { recursive: true });
await fs.writeFile(outputPath, html, "utf8");
console.log(outputPath);
