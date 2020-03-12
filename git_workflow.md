# GIT Workflow

## GIT Setup

- One member will setup the repo and add contributors
- In the project folder
  - `npm init`
  - `git remote add origin https://github.com/repo/repo_name`

## Workflow

1. On master, pull from origin master
2. Create a feature branch (feature/feature_name)
3. Update your branch with the latest changes from master

- `git checkout master`
- `git pull origin master`
- `git checkout feature/feature_name` (use git branch as needed)
- `git merge master` (merge master into the feature branch)
- resolve conflicts and commit changes

4.  Push the feature branch to github

- `git push -u origin feature/feature_name`
  (-u adds an upstream branch so the next time you can type only git push from that branch)

5. Create a pull request on GitHub

- you should not merge your own pull request

6. checkout to master and pull again from origin master
