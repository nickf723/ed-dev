# Main Development Workflow

`main` is the production and normal active-development branch for Education Station 64.

## Normal development pass

1. Fetch `origin/main` before starting when network access is available.
2. Inspect the worktree and preserve unrelated user changes.
3. Work directly on `main` unless the user explicitly requests another branch or a temporary branch is required for safe reconciliation.
4. Batch one coherent page, branch, or shared-system pass rather than creating a deployment for every micro-adjustment.
5. Run the checks appropriate to the change: lint, TypeScript, architecture/readability audits, tests, and production build.
6. Visually verify changed routes and states when a trusted browser is available; otherwise update the visual-verification queue.
7. Review the exact diff and stage only the confirmed files.
8. Commit the coherent batch to `main`.
9. Reconcile with the latest `origin/main` without discarding either side.
10. Push `main`, verify the remote commit SHA, and inspect the triggered deployment or CI state when accessible.

## Rules

- Finished work must not remain only in the local workspace or in an unpushed commit.
- Do not use a long-lived `studio` branch as the default workflow.
- Do not create a branch for every page.
- Do not use destructive reset or checkout commands to resolve divergence.
- Do not push a broken build merely to obtain a preview.
- A visual change may be pushed with verification queued when the browser environment is unavailable, but that limitation must be recorded and reported honestly.
- Treat Vercel as the production host and a verification surface, not the live editor.
