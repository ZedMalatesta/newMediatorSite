#!/usr/bin/env bash
#
# Installs Matt Pocock's agent skills (https://github.com/mattpocock/skills)
# into .claude/skills/ as editable project skills, at a pinned commit.
#
#   scripts/install-pocock-skills.sh            reinstall the pinned commit
#   scripts/install-pocock-skills.sh <commit>   move to another commit (then commit the result)
#
# It installs exactly the set upstream ships in its Claude Code plugin (the
# "promoted" engineering and productivity skills), so the beta and frozen
# buckets never arrive by accident. Re-running replaces those folders with the
# upstream copy - local edits to them are overwritten, so make lasting changes
# in CLAUDE.md or docs/agents/ instead. Skills upstream has dropped since the
# last install are removed.
#
# One rename is applied: upstream's `code-review` becomes `pocock-code-review`,
# so it does not shadow Claude Code's built-in /code-review. Upstream's own
# guidance for editable installs is to rename on collision.

set -euo pipefail

PINNED=49dd158d1076134a641b33efb035946536778336
REF="${1:-$PINNED}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DEST="$ROOT/.claude/skills"
MANIFEST="$DEST/pocock-skills.json"

# upstream name -> name installed here
rename() {
  case "$1" in
    code-review) echo pocock-code-review ;;
    *) echo "$1" ;;
  esac
}

tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT

git clone --quiet https://github.com/mattpocock/skills.git "$tmp/repo"
git -C "$tmp/repo" checkout --quiet "$REF"
commit="$(git -C "$tmp/repo" rev-parse HEAD)"

# The plugin manifest is upstream's own list of what it ships.
shipped="$(node -e 'for (const s of require(process.argv[1]).skills) console.log(s.replace(/^\.\//, ""))' \
  "$tmp/repo/.claude-plugin/plugin.json")"

mkdir -p "$DEST"

# Remove what the previous install put here and upstream no longer ships.
if [[ -f "$MANIFEST" ]]; then
  for old in $(node -e 'for (const s of require(process.argv[1]).skills) console.log(s)' "$MANIFEST"); do
    rm -rf "${DEST:?}/$old"
  done
fi

installed=()
for path in $shipped; do
  name="$(rename "$(basename "$path")")"
  rm -rf "${DEST:?}/$name"
  cp -R "$tmp/repo/$path" "$DEST/$name"
  # agents/openai.yaml is Codex picker metadata; Claude Code reads SKILL.md only.
  rm -rf "$DEST/$name/agents"
  installed+=("$name")
done

# Apply the renames to each skill's own name and to the skills that call it.
for name in "${installed[@]}"; do
  for file in $(find "$DEST/$name" -type f -name '*.md'); do
    sed -i.bak \
      -e 's/^name: code-review$/name: pocock-code-review/' \
      -e 's/"code-review"/"pocock-code-review"/g' \
      -e 's/`code-review`/`pocock-code-review`/g' \
      -e 's#`/code-review`#`/pocock-code-review`#g' \
      -e 's#\*\*`/code-review`\*\*#**`/pocock-code-review`**#g' \
      "$file"
    rm -f "$file.bak"
  done
done

cp "$tmp/repo/LICENSE" "$DEST/pocock-skills.LICENSE"

node -e '
  const [manifest, commit, ...skills] = process.argv.slice(1);
  const out = {
    source: "https://github.com/mattpocock/skills",
    commit,
    license: "MIT, see pocock-skills.LICENSE",
    renamed: { "code-review": "pocock-code-review" },
    skills: skills.sort(),
  };
  require("fs").writeFileSync(manifest, JSON.stringify(out, null, 2) + "\n");
' "$MANIFEST" "$commit" "${installed[@]}"

echo "Installed ${#installed[@]} skills from mattpocock/skills@${commit:0:7} into .claude/skills/"
