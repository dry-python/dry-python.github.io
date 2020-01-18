from invoke import task


@task
def lint(c):
    c.run('poetry run pre-commit run -a')
    c.run('poetry run yamllint --strict .')
    c.run('npm run lint:css')
    c.run('npm run lint:js')
    c.run('npm run lint:md')
    c.run('npm run lint:pug')
    c.run("vale '--glob=*.md' docs")
