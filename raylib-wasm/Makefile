SHELL := /bin/bash

.PHONY: all
all: reload build

.PHONY: reload
reload:
	emcmake cmake -Bbuild -DPLATFORM=Web

.PHONY: build
build: reload
	cmake --build build -j 4

.PHONY: clean
clean:
	rm -rf build