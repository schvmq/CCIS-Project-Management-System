# Development Workflow

## Branch
main = stable
feature/* = development

## Before starting
git checkout main
git pull origin main
git checkout -b feature/name

## Commit
feat: (New feature/functionality)
fix: (Bug fix)
refactor: (Code refactor)
test: (Test cases)
docs: (Documentation)
chore: (Configuration/maintenance/Other changes)

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

## Daily Routine

Start
    git checkout main
    git pull origin main
    git checkout -b feature/name

Work
    git status
    git add .
    git commit -m "feat: description"
    git push

Finish Feature
    Push → Pull Request → Partner Review → Merge → Delete Branch


## Important !!!

1. main = stable version.
2. Never directly develop on main.
3. One feature/fix = one branch.
4. Pull the latest main before starting a new feature.
5. Commit small, logical changes.
6. Push your branch regularly.
7. Review each other's Pull Requests.
8. Communicate before changing shared files or database structure.
9. Never commit .env or other secrets.
10. Do not merge broken or unfinished features into main.