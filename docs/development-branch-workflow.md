# Development Branch Workflow

`studio` is the active development branch for Education Station 64. `main` is the production promotion branch.

This separation is a cost-control boundary: `vercel.json` disables automatic Vercel deployments for `studio`, so normal page and shared-system work can be committed, pushed, reviewed, and tested without creating a production deployment for every development pass.

## Normal development pass

1. Fetch `origin/studio` and `origin/main` before starting when network access is available.
2. Inspect the worktree and preserve unrelated user changes.
3. Work on `studio`; if `studio` is strictly behind `main`, fast-forward it before new work. Never erase `studio`-only commits to make it match `main`.
4. Batch one coherent page, branch, or shared-system pass rather than creating a commit for every micro-adjustment.
5. Run checks appropriate to the change: tests, lint, TypeScript, architecture/readability audits, and production build.
6. Visually verify changed routes and states with a trusted local browser when available; otherwise update the visual-verification queue.
7. Review the exact diff and stage only confirmed files.
8. Commit the coherent batch to `studio`.
9. Reconcile with the latest `origin/studio` without discarding either side.
10. Push `studio`, verify the remote commit SHA, and inspect CI status when accessible.
11. Confirm the branch remains excluded from automatic Vercel deployment. Do not describe a `studio` push as live or deployed.

## Production promotion

Promotion to `main` is deliberate, not part of a normal development pass.

- Promote only when the user explicitly requests a release or a separately agreed release batch is ready.
- Re-run the release checks against the exact candidate commit.
- Reconcile with the latest `main` without destructive reset.
- Push `main`, verify the remote SHA, and inspect the production deployment.
- Report clearly which commit was promoted and whether Vercel succeeded.

## Rules

- Finished work must not remain only in the local workspace or in an unpushed commit.
- Do not push ordinary development commits to `main` while the `studio` workflow is active.
- Do not modify the `studio: false` deployment exclusion without an explicit user request.
- GitHub Actions may validate `studio`; that is distinct from a Vercel deployment.
- Do not create a branch for every page.
- Do not use destructive reset or checkout commands to resolve divergence.
- Do not push a broken build merely to obtain a preview.
- A visual change may be pushed with verification queued when the browser environment is unavailable, but that limitation must be recorded and reported honestly.
- A later explicit user instruction may replace this workflow; update this document in the same pass so the repository remains the source of truth.
