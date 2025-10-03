# Project Assumptions

## Cursor Pagination
There is no `created_at` attribute in the post model, so cursor pagination is done using the `id` field instead of timestamps. Since the `id` field is auto-incremental in most cases, this still maintains chronological order as newer posts will have higher IDs.

## Git Workflow
There is no branching model in place, so commits are made directly to the main branch without feature branches or pull request workflows.

## External Libraries
External libraries can be used for common functionality like error notifications, UI components, or other features that would otherwise require custom implementation, without abusing them.
