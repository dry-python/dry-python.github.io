from os.path import exists, join
from subprocess import Popen

from lektor.pluginsystem import Plugin


class SlidesPlugin(Plugin):
    name = "slides"
    description = "Build Reveal.js slides."

    def on_before_build_all(self, builder, **extra):
        root = join(self.env.root_path, "slides")
        if not exists(join(root, "node_modules")):
            Popen(["npm", "install"], cwd=root).wait()
        Popen(["npm", "run", "pug"], cwd=root).wait()
        Popen(["npm", "run", "webpack"], cwd=root).wait()
