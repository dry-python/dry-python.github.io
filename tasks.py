from os import environ

from invoke import Responder
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
    command = "poetry run ghp-import --cname dry-python.org --branch master --push site"
    enter_username = Responder(r"Username for .*:", environ["GIT_COMMITTER_NAME"])
    enter_password = Responder(r"Password for .*:", environ["GIT_COMMITTER_PASSWORD"])
    c.run(command, pty=True, watchers=[enter_username, enter_password])
