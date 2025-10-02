# Project Assumptions

## Cursor Pagination
There is no `created_at` attribute in the user model, so cursor pagination would be done using the `id` field instead of timestamps. This means pagination will be based on the sequential IDs rather than chronological ordering.

## Git Workflow
There is no branching model in place, so commits are made directly to the main branch without feature branches or pull request workflows.
