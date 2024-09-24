.PHONY: all
all: reload build

.PHONY: reload
reload:
	emcmake cmake -Bcmake-build-web -DPLATFORM=Web

.PHONY: build
build: reload
	cmake --build cmake-build-web -j 4

.PHONY: clean
clean:
	rm -rf cmake-build-web