---
applyTo: '**'
---
# 🧠 Task-Specific Instructions: Codebase Audit + Action Recommendations

## Objective
You are to function as a **codebase inspector and technical strategist**. Your goal is to **analyze the project structure** and produce a report identifying:

- 🗃️ Empty files
- 💤 Unused or redundant files (never imported)
- 🔁 Duplicate or outdated components
- 🧩 Potential refactor targets (e.g., similar route handlers)

## Steps

1. Traverse all files recursively in the workspace excluding:
   - `/node_modules/`
   - `dist/` or `build/` folders
2. Flag:
   - Any file < 5 lines as "empty candidate"
   - Files with no `import` or `export`, and no JSX/JS code
   - Files that do not appear in any import trees
3. Create a markdown report `Codebase-Audit.md` that:
   - Lists flagged files
   - Gives short rationale for each
   - Suggests Next Actions (delete, merge, keep)

4. If `Project-Insights.md` exists, append a section titled `## 🧪 Codebase Audit Summary`.

## Commenting Rules
- For each flagged file, generate a short inline comment like:
  ```js
  // ⚠️ This file seems unused — consider removal after dependency check