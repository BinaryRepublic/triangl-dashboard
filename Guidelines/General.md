# General Guideline

#### Rules

There are a set of rules to keep in mind:

- Perform work in a feature branch.

  *Why:*

  > Because this way all work is done in isolation on a dedicated branch rather than the main branch. It allows you to submit multiple pull requests without confusion. You can iterate without polluting the master branch with potentially unstable, unfinished code. [read more...](https://www.atlassian.com/git/tutorials/comparing-workflows#feature-branch-workflow)

- Branch out from `develop`

  *Why:*

  > This way, you can make sure that code in master will almost always build without problems, and can be mostly used directly for releases (this might be overkill for some projects).

- Never push into `develop` or `master` branch. Make a Pull Request.

  *Why:*

  > It notifies team members that they have completed a feature. It also enables easy peer-review of the code and dedicates forum for discussing the proposed feature.

- Update your local `develop` branch and do an interactive rebase before pushing your feature and making a Pull Request.

  *Why:*

  > Rebasing will merge in the requested branch (`master` or `develop`) and apply the commits that you have made locally to the top of the history without creating a merge commit (assuming there were no conflicts). Resulting in a nice and clean history. [read more ...](https://www.atlassian.com/git/tutorials/merging-vs-rebasing)

- Resolve potential conflicts while rebasing and before making a Pull Request.

- Delete local and remote feature branches after merging.

  *Why:*

  > It will clutter up your list of branches with dead branches. It ensures you only ever merge the branch back into (`master` or `develop`) once. Feature branches should only exist while the work is still in progress.

- Before making a Pull Request, make sure your feature branch builds successfully and passes all tests (including code style checks).

  *Why:*

  > You are about to add your code to a stable branch. If your feature-branch tests fail, there is a high chance that your destination branch build will fail too. Additionally, you need to apply code style check before making a Pull Request. It aids readability and reduces the chance of formatting fixes being mingled in with actual changes.

- Use a `.gitignore` file.

  *Why:*

  > It should include a list of system files that should not be sent with your code into a remote repository. In addition, it excludes setting folders and files for most used editors, as well as most common dependency folders.

- Branches `develop` and `master` are protected.

#### Workflow

We use [Feature-branch-workflow](https://www.atlassian.com/git/tutorials/comparing-workflows#feature-branch-workflow) with [Interactive Rebasing](https://www.atlassian.com/git/tutorials/merging-vs-rebasing#the-golden-rule-of-rebasing).

- For a new project, initialize a git repository in the project directory. **For subsequent features/changes this step should be ignored**.

  ```
  cd <project directory>
  git init
  ```

- Checkout a new feature/bug-fix branch.

  ```
  git checkout -b <branchname>
  ```

- Make Changes.

  ```
  git add <file1> <file2> ...
  git commit
  ```

  *Why:*

  > `git add <file1> <file2> ... `- you should add only files that make up a small and coherent change.

  > `git commit` will start an editor which lets you separate the subject from the body.

- Sync with remote to get changes you’ve missed.

  ```
  git checkout develop
  git pull
  ```

  *Why:*

  > This will give you a chance to deal with conflicts on your machine while rebasing (later) rather than creating a Pull Request that contains conflicts.

- Update your feature branch with latest changes from develop by interactive rebase.

  ```
  git checkout <branchname>
  git rebase -i --autosquash develop
  ```

  *Why:*

  > You can use --autosquash to squash all your commits to a single commit. Nobody wants many commits for a single feature in develop branch. [read more...](https://robots.thoughtbot.com/autosquashing-git-commits)

- If you don’t have conflicts, skip this step. If you have conflicts, [resolve them](https://help.github.com/articles/resolving-a-merge-conflict-using-the-command-line/) and continue rebase.

  ```
  git add <file1> <file2> ...
  git rebase --continue
  ```

- Push your branch. Rebase will change history, so you'll have to use `-f` to force changes into the remote branch.

  ```
  git push -f
  ```

  *Why:*

  > When you do a rebase, you are changing the history on your feature branch. As a result, Git will reject normal `git push`. Instead, you'll need to use the -f or --force flag. [read more...](https://developer.atlassian.com/blog/2015/04/force-with-lease/)

- Make a Pull Request.

- Pull request will be accepted by reviewer, merged and closed by you.

- Remove your local feature branch if you're done.

  ```
  git branch -d <branchname>
  ```

  to remove all branches which are no longer on remote

  ```
  git fetch -p && for branch in `git branch -vv --no-color | grep ': gone]' | awk '{print $1}'`; do git branch -D $branch; done
  ```



#### Code Style

- We use [ESLint](http://eslint.org/) to enforce code style.

  *Why:*

  > We simply prefer `eslint`, you don't have to. It has more rules supported, the ability to configure the rules, and ability to add custom rules.

- We use `.eslintignore` to exclude files or folders from code style checks.

  *Why:*

  > You don't have to pollute your code with `eslint-disable` comments whenever you need to exclude a couple of files from style checking.

- Remove any of your `eslint` disable comments before making a Pull Request.

  *Why:*

  > It's normal to disable style check while working on a code block to focus more on the logic. Just remember to remove those `eslint-disable` comments and follow the rules.

- Make your names search-able with meaningful distinctions avoid shortened names. For functions use long, descriptive names. A function name should be a verb or a verb phrase, and it needs to communicate its intention.

  *Why:*

  > It makes it more natural to read the source code.

- Organize your functions in a file according to the step-down rule. Higher level functions should be on top and lower levels below.

  *Why:*

  > It makes it more natural to read the source code.



### 