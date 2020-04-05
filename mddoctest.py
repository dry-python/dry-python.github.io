from doctest import testfile
from glob import glob
from sys import exit
from sys import modules
from unittest.mock import Mock


def _setup():
    modules["project.db.models"] = Mock()
    modules["project.web.forms"] = Mock()


def _main():
    markdown_files = glob("**/*.md", recursive=True)
    exit_code = 0
    for markdown_file in markdown_files:
        failed, attempted = testfile(markdown_file, module_relative=False)
        exit_code += failed
    exit(exit_code)


if __name__ == "__main__":
    _setup()
    _main()
