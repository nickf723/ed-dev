# Studio Development Workflow

`main` is the production branch. `studio` is the long-lived working branch.

## Normal local session

1. Open the repository in GitHub Desktop.
2. Confirm **Current branch: studio**.
3. Click **Fetch origin**, then **Pull origin** if offered.
4. Open the repository in VS Code.
5. Start the site with `npm run dev` and leave the terminal running.
6. Edit and review locally at `http://localhost:3000`.
7. Commit coherent checkpoints to `studio` in GitHub Desktop.
8. Push `studio` for backup; pushes should not deploy automatically.

## Review checkpoint

Use one deliberate Preview deployment only when a batch is ready for browser/device review. Preview builds serve images unoptimized so they do not consume Vercel Image Optimization transformations.

## Production release

1. Confirm the local batch is coherent.
2. Run the available build/type checks.
3. Merge `studio` into `main` once.
4. Push `main` once.
5. Verify the single production deployment.
6. Bring `studio` back up to date with `main` before starting the next batch.

## Rules

- Do not develop directly on `main`.
- Do not create a branch for every page.
- Do not deploy after every visual adjustment.
- Batch related pages and shared-system changes.
- Treat Vercel as a checkpoint and production host, not the live editor.
