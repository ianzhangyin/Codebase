
# Project Development Rules

## Project
Electron + React + Node.js + TypeScript

## Architecture
- Electron Main handles desktop operations.
- Preload exposes restricted APIs.
- Renderer handles UI only.
- Business logic belongs in services.
- IPC communication must be type-safe.

## Development Workflow
1. Understand the existing code before editing.
2. Analyze requirements and propose a plan.
3. Identify affected modules.
4. Implement the requested feature.
5. Write and run tests.
6. Fix all discovered regressions.
7. Provide a summary and verification report.

## Security
- nodeIntegration must remain false.
- contextIsolation must remain true.
- Keep renderer sandbox enabled.
- Validate all IPC inputs.
- Never expose unrestricted Node.js APIs.

## Git
- Never overwrite unrelated user changes.
- Use feature branches for new features.
- Review git diff before committing.
- Never push or deploy without approval.

## Completion Criteria
A task is not complete until:
- Implementation is finished.
- Tests have been executed.
- Test results are reported.
- Known limitations are documented.
