---
name: living-docs audit rule
description: User requires BOTH project.md and replit.md updated after every website change
---

# Living Docs Audit Rule

**Rule:** After every change to the BRDM School website (any file in `artifacts/brdm-school/`, `artifacts/api-server/`, or `lib/`), update BOTH files:

## project.md (PRIMARY changelog — user-facing, in Hindi+English)
1. **Poora Change Log** table — add a new row: `| DATE | Kya badla | Kaun si file |`
2. If a new file/folder added or removed — update the **Sabhi Files aur Folders** section
3. If a new env var or secret added — update the **Secrets aur Environment Variables** table
4. If a new page added — update the **Sabhi Pages** table
5. If a new API endpoint added — update the **API Endpoints** table
6. **Aage Kya Karna Hai** — update pending tasks if any are completed or added

## replit.md (SECONDARY — technical docs + folder audit)
1. **Recent Changes Log** table — same entry as project.md
2. If files/folders changed — update the **Complete Folder & File Audit** section
3. If env vars changed — update the **Environment Variables** table

**Why:** User explicitly requested both files stay in sync as living audit documents. User also wants new sessions/IDs to see the full history — project.md serves as the master log for this.

**How to apply:** Before finishing any task that modifies website files, update both project.md and replit.md. Always update project.md first (it is the primary document).
