import builtins
import sys
from doctest import testfile
from glob import glob
from unittest import mock


def _setup():
    sys.modules["app.views"] = mock.Mock()
    builtins.path = mock.Mock()
    builtins.workflows = mock.Mock()


def _main():
    markdown_files = glob("**/*.md", recursive=True)
    exit_code = 0
    for markdown_file in markdown_files:
        failed, attempted = testfile(markdown_file, module_relative=False)
        exit_code += failed
    sys.exit(exit_code)


if __name__ == "__main__":
    _setup()
    _main()
