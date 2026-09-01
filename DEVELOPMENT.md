# Development Workflow

## Branch
main = stable
feature/* = development

## Before starting
git checkout main
git pull origin main
git checkout -b feature/name

## Commit
feat:
fix:
refactor:
test:
docs:
chore:

## Before PR
Run application
Test feature
Check .env
Check database changes
Notify partner of shared-file changes

## Merge
Partner reviews PR
Fix issues
Merge into main
Delete feature branch