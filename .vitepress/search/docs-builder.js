import { readdir, readFile } from "fs/promises";
let rootPath = "";

const replaceMdSyntax = (mdCode) =>
  mdCode
    .replace(/!\[(.*?)\]\(.*?\)(\{.*?\})?/g, `$1`) // images
    .replace(/\[(.*?)\]\(.*?\)/g, `$1`) // links
    .replace(/(\*+)(\s*)([^\*]*)(\s*)(\*+)/gm, `$3`) //bold
    .replace(/~~(.*?)~~/g, `$1`) // strikethrough
    // .replace(/^```[a-z0-9{}\-,]*/gm, "") // code blocks
    .replace(/^:::(?: (?:tip|warning|details|danger|info|tabs code))?/gm, "") // custom blocks
    .replace(/`([^`\n][^\n]*?[^`\n]?)`/gm, `$1`) // inline code
    // `.replace(/(\|\s*-+\s*)+\|/g, "") // table bar
    .replace(/^>/gm, "");

/**
 * Get a list of all md files in the docs folders..
 * @param dirName the full path name containing the md files
 * @returns a list of full path location of each md file
 */
const getFileList = async (dirName) => {
  let files = [];
  const items = await readdir(dirName, { withFileTypes: true });

  for (const item of items) {
    if (item.name.startsWith('.')) continue
    if (item.isDirectory()) {
      if (item.name === 'node_modules') continue
      files = [...files, ...(await getFileList(`${dirName}/${item.name}`))];
    } else {
      if (item.name.endsWith(".md")) files.push(`${dirName}/${item.name}`);
    }
  }

  return files;
};

/**
 * create index docs to be used later on lunr
 * @param dirName the full path name containing the md files
 * @returns a list cleaned md contents
 */
const processMdFiles = async (dirName) => {
  rootPath = dirName;
  let mdFilesList = await getFileList(dirName);
  let allData = [];

  for (const mdFile of mdFilesList) {
    let code = await readFile(mdFile, { encoding: "utf8" });
    let cleanCode = replaceMdSyntax(code)
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "")
      .replace(/(<!--.*?-->)|(<!--[\S\s]+?-->)|(<!--[\S\s]*?$)/gim, "")
      .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, "")
      .replace(/(<([^>]+)>)/gi, "")
      .trim();

    allData.push({ content: cleanCode, path: mdFile });
  }
  return allData;
};

/**
 * Split an md content by anchors in several index docs
 * @param mdCode an md content
 * @param path path of md file
 * @returns array of index docs
 */
function parseMdContent(mdCode, path) {
  let frontMatter, pageTitle;
  let lines = mdCode.split('\n');
  const hasFrontMatter = lines[0] === '---'
  if (hasFrontMatter) {
    const frontMatterEnds = lines.findIndex((n, i) => n === '---' && i > 0)
    frontMatter = lines.slice(1, frontMatterEnds).join('\n')
    lines = lines.slice(frontMatterEnds + 1);
  }
  lines = lines
    .join("\n")
    .split("\n\n")
    .map(n => n.trim())
    .filter((n) => !!n);

  let lvl1 = null, lvl2 = null, lvl3 = null, lvl4 = null, lvl5 = null, lvl6 = null, anchor = null
  const resultBlocks = []
  let codeBlockState = []
  for (let line of lines) {
    if (codeBlockState.length > 0 && line.endsWith('```')) {
      codeBlockState.push(...line.split('\n').slice(0, -1))
      for (const codeLine of codeBlockState) {
        resultBlocks.push({ anchor, lvl1, lvl2, lvl3, lvl4, lvl5, lvl6, content: codeLine.trim(), path, frontMatter, pageTitle })
      }
      codeBlockState = []
      continue
    } else if (codeBlockState.length > 0) {
      codeBlockState.push(...line.split('\n'))
      continue
    }

    if (line.startsWith('#')) {
      const lvl = line.match(/^#+/)[0].length
      const content = line.replace(/^#+/, '').trim()
      if (lvl === 1) {
        lvl1 = content
        lvl2 = null
        lvl3 = null
        lvl4 = null
        lvl5 = null
        lvl6 = null

        if (!pageTitle) pageTitle = content
      } else if (lvl === 2) {
        lvl2 = content
        lvl3 = null
        lvl4 = null
        lvl5 = null
        lvl6 = null
      } else if (lvl === 3) {
        lvl3 = content
        lvl4 = null
        lvl5 = null
        lvl6 = null
      } else if (lvl === 4) {
        lvl4 = content
        lvl5 = null
        lvl6 = null
      } else if (lvl === 5) {
        lvl5 = content
        lvl6 = null
      } else if (lvl === 6) {
        lvl6 = content
      }
      anchor = content;

      resultBlocks.push({
        anchor,
        content: content.trim(),
        path,
        pageTitle,
        lvl1,
        lvl2,
        lvl3,
        lvl4,
        lvl5,
        lvl6,
      });

      if (!line.includes('\n')) {
        continue
      } else {
        line = line.split('\n').slice(1).join('\n')
      }
    }

    if (line.startsWith("```")) {
      // code block
      const lines = line.split("\n").slice(1);
      codeBlockState = lines
      continue
    }

    const collapsed = line.replace(/\s{2,}/g, " ");
    if (collapsed.startsWith('|') && collapsed.endsWith('|')) {
      // table
      for (const row of collapsed.split('\n').slice(2)) {
        const cells = row.split('|').filter(n => !!n)
        for (const cell of cells) {
          resultBlocks.push({
            anchor,
            content: cell.trim(),
            path,
            pageTitle,
            lvl1,
            lvl2,
            lvl3,
            lvl4,
            lvl5,
            lvl6,
          });
        }
      }
      continue
    }

    if (collapsed.startsWith('-') || collapsed.startsWith('*') || collapsed.match(/^\d+\./) ||
      collapsed.includes('\n-') || collapsed.includes('\n*') || collapsed.match(/\n\d+\./)) {
      // list
      for (const item of collapsed.split('\n')) {
        resultBlocks.push({
          anchor,
          content: item.replace(/^(?:-|\*)/, '').trim(),
          path,
          pageTitle,
          lvl1,
          lvl2,
          lvl3,
          lvl4,
          lvl5,
          lvl6,
        });
      }
      continue
    }

    const sentences = collapsed.replaceAll('\n', '').split(/(?<=\.\s|;\s|\?\s|!\s|。|；|？|！)/).filter(n => !!n)
    for (const sentence of sentences) {
      resultBlocks.push({
        anchor,
        content: sentence.trim(),
        path,
        pageTitle,
        lvl1,
        lvl2,
        lvl3,
        lvl4,
        lvl5,
        lvl6,
      });
    }
  }
  return resultBlocks

  // const pageTitle = mdCode.match(/^# (.*)/m)?.[1]?.trim();
  // const result = mdCode.split(/(^|\s)#{2,6}\s/gi);
  // const cleaning = result.filter(
  //   (i) => i.trim() !== "" && !i.startsWith("---")
  // );
  // const mdData = cleaning.flatMap((i) => {
  //   const nlIndex = i.indexOf("\n");
  //   let content = i
  //     .split(/(?<=\.\s|:\s|;\s|\?\s|!\s|。|：|；|？|！)|\n/)
  //     .map((n) => n.trim())
  //     .filter((n) => n.length > 0);
  //   let anchor = i.slice(0, nlIndex > -1 ? nlIndex : i.length) || "";
  //   return content
  //     .map(
  //       (c) => c.replace(/\s{2,}/g, " ")
  //       // .replace(
  //       //     /^:::(?: (?:tip|warning|details|danger|info))?/gm,
  //       //     ''
  //       // )
  //       // .replace(/^```[a-z0-9{}\-,]*/gm, '')
  //       // .replace(/~~[^~]|^~~|~~$/gm, '')
  //       // .replace(/!\[.*?\]\(.*?\)(?:\{.+?\})?/gm, '')
  //     )
  //     .filter((c) => c.trim() !== "" && !i.match(/^\|\s*:?-+/m))
  //     .map((c) => ({ anchor, content: c.trim(), path, pageTitle }));
  // });
  // return mdData;
};

const buildDoc = (mdDoc, id) => {
  let anchor = mdDoc.anchor.replace("\r", "");
  if (anchor[0] === "#") anchor = anchor.replace("#", "");

  anchor = anchor.trim();

  let pageLink = mdDoc.path.replace(rootPath + "/", "").replace(".md", ".html");
  let anchorLink = null

  if (!id.endsWith("-0")) {
    const normalized = anchor
      .replace(/\(.*?\)/g, '')
      .replace(/[!@#$%^&*()=！@#￥%…&*（）+_：:;；'"“”‘’<>《》?.，/]/g, " ")
      .replace(/\s{2,}/g, " ")
      .trim()
      .replaceAll(" ", "-")
      .replaceAll("/", "-")
      .replace(/-$/, "")
      .toLowerCase();

    if (normalized.match(/^\d/)) {
      anchorLink = `_${normalized}`;
    } else {
      anchorLink = `${normalized}`;
    }
  }

  const alternate = mdDoc.content.split(/\.|->|\(|\)|,\s|-/)

  return {
    id,
    pageLink,
    anchorLink,
    link: pageLink + (anchorLink ? "#" + anchorLink : ""),
    sentence: mdDoc.content,
    anchor,
    pageTitle: mdDoc.pageTitle,
    lvl1: mdDoc.lvl1,
    lvl2: mdDoc.lvl2,
    lvl3: mdDoc.lvl3,
    lvl4: mdDoc.lvl4,
    lvl5: mdDoc.lvl5,
    lvl6: mdDoc.lvl6,
    alternate
  };
};

export async function buildDocs(HTML_FOLDER) {
  const files = await processMdFiles(HTML_FOLDER);

  const docs = [];
  if (files !== undefined) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      let mdDocs = parseMdContent(file.content, file.path);

      for (let index = 0; index < mdDocs.length; index++) {
        const mdDoc = mdDocs[index];
        docs.push(buildDoc(mdDoc, i.toString() + "-" + index.toString()));
      }
    }
  }
  return docs;
};

