from setuptools import setup

setup(
    name="lektor-slides",
    version="0.1",
    author="Artem Malyshev",
    author_email="proofit404@gmail.com",
    license="MIT",
    py_modules=["lektor_slides"],
    entry_points={"lektor.plugins": ["slides = lektor_slides:SlidesPlugin"]},
)
