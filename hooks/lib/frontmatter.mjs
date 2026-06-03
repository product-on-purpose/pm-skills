// hooks/lib/frontmatter.mjs - dependency-free reader for a handful of flat keys.
// NOT a YAML parser: an installed plugin's hooks have no node_modules, so they
// cannot import js-yaml. Handles scalar, quoted scalar, and inline-array values.

/** Return the text between the leading `---` fences, or '' if none. */
export function splitFrontmatter(fileText) {
  const m = /^---\r?\n([\s\S]*?)\r?\n---/.exec(fileText);
  return m ? m[1].trim() : '';
}

/** Read a scalar field; strip matching surrounding quotes. null if absent. */
export function getField(frontmatter, key) {
  const re = new RegExp('^\\s*' + key + ':\\s*(.+?)\\s*$', 'm');
  const m = re.exec(frontmatter);
  if (!m) return null;
  let v = m[1].trim();
  if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
    v = v.slice(1, -1);
  }
  return v;
}

/** Read an inline array field `key: [a, b]`. [] if absent or not an array.
 *  Strips matching quotes on each item, so `["em-dash"]` yields `em-dash`. */
export function getList(frontmatter, key) {
  const raw = getField(frontmatter, key);
  if (!raw || !raw.startsWith('[') || !raw.endsWith(']')) return [];
  return raw
    .slice(1, -1)
    .split(',')
    .map((s) => s.trim().replace(/^["']|["']$/g, '').trim())
    .filter(Boolean);
}
