from os.path import exists, join
from subprocess import Popen

from lektor.pluginsystem import Plugin


class SlidesPlugin(Plugin):
    name = "slides"
    description = "Build Reveal.js slides."

    def on_server_spawn(self, **extra):
        self.install_node_dependencies()
        self.pug_process = self.run_pug(watch=True)
        self.webpack_process = self.run_webpack(watch=True)

    def on_server_stop(self, **extra):
        if self.pug_process is not None:
            self.pug_process.kill()
        if self.webpack_process is not None:
            self.webpack_process.kill()

    def on_before_build_all(self, builder, **extra):
        if self.pug_process is None:
            self.install_node_dependencies()
            self.run_pug().wait()
        if self.webpack_process is None:
            self.install_node_dependencies()
            self.run_webpack().wait()

    def run_pug(self, watch=False):
        args = ["--", "--watch"] if watch else []
        return Popen(["npm", "run", "pug", *args], cwd=self.slides_directory)

    def run_webpack(self, watch=False):
        args = ["--", "--watch"] if watch else []
        return Popen(["npm", "run", "webpack", *args], cwd=self.slides_directory)

    def install_node_dependencies(self):
        if not exists(self.node_modules):
            Popen(["npm", "install"], cwd=self.slides_directory).wait()

    @property
    def slides_directory(self):
        return join(self.env.root_path, "slides")

    @property
    def node_modules(self):
        return join(self.slides_directory, "node_modules")

    def __init__(self, *args, **kwargs):

        super().__init__(*args, **kwargs)
        self.pug_process = None
        self.webpack_process = None
