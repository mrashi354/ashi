---
name: Imported pnpm workspace setup
description: Durable setup guidance for imported Replit pnpm workspaces.
---

Imported pnpm workspaces may arrive without an installed dependency tree even when the lockfile and artifact workflows are present. Restore packages from the committed lockfile before treating missing executables such as Vite or esbuild as application defects.

**Why:** Workflow startup failures initially looked like artifact failures, but the source code and lockfile were intact; the missing install was the root cause.

**How to apply:** Check for `node_modules` and run a frozen pnpm install before changing artifact code or workflow definitions.