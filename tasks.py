from os import environ
from os import getcwd
from os.path import join

from invoke import task


@task
def lint(c):
    c.run("poetry run pre-commit run -a")
    c.run("poetry run python -m mddoctest")
    c.run("poetry run flake8 .")
    c.run("poetry run yamllint --strict .")
    c.run("npx stylelint --ignore-path .gitignore '**/*.css'")
    c.run("npx eslint --ext .js --ignore-path .gitignore .")
    c.run("npx remark --frail .")
    c.run("npx pug-lint **/*.pug")
    c.run("vale '--glob=*.md' docs")


@task
def build(c):
    c.run("poetry run mkdocs build")
    c.run("npx webpack")


@task
def deploy(c):
    config_path = join(getcwd(), ".git", "config")
    cred_path = join(getcwd(), ".git", "credentials")
    with open(config_path, "a") as f:
        f.write("[credential]\n")
        f.write(f"helper = store --file {cred_path}\n")
    with open(cred_path, "w") as f:
        f.write("https://")
        f.write(environ["GIT_COMMITTER_NAME"])
        f.write(":")
        f.write(environ["GIT_COMMITTER_PASSWORD"])
        f.write("@github.com\n")
    c.run(f"cat {config_path}")
    c.run(f"cat {cred_path}")
    c.run("poetry run ghp-import --cname dry-python.org --branch master --push site")
