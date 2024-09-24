cmake_minimum_required(VERSION 3.12)
project(raylibjs CXX)

set(CMAKE_C_STANDARD 99)
set(CMAKE_CXX_STANDARD 20)

file(GLOB_RECURSE SOURCES src/*.cpp)
file(GLOB_RECURSE HEADERS src/*.h)

set(THIRDPARTY_DIR ${CMAKE_SOURCE_DIR}/vendor)

add_executable(${PROJECT_NAME} ${SOURCES} ${HEADERS})

# warning level
target_compile_options(${PROJECT_NAME} PRIVATE
    -pedantic
    -pedantic-errors
    -Wall
    -Werror
    -Wextra
    -Wno-unused-parameter
    -Wno-unused-command-line-argument
)

set(PLATFORM Web)
set(CMAKE_FIND_ROOT_PATH_MODE_PROGRAM NEVER)
set(CMAKE_FIND_ROOT_PATH_MODE_LIBRARY ONLY)
set(CMAKE_FIND_ROOT_PATH_MODE_INCLUDE BOTH)
set(CMAKE_FIND_ROOT_PATH_MODE_PACKAGE ONLY)

add_definitions(-DPLATFORM_WEB)
add_definitions(-DUSE_WASM)

set_target_properties(${PROJECT_NAME} PROPERTIES LINK_FLAGS "--bind --no-entry -sEXPORT_KEEPALIVE=1 -sEXPORTED_RUNTIME_METHODS=FS -Os -s ASSERTIONS=1 -s ALLOW_MEMORY_GROWTH=1 --no-heap-copy -s GL_ENABLE_GET_PROC_ADDRESS -s USE_GLFW=3")

add_subdirectory(${THIRDPARTY_DIR}/raylib)
target_include_directories(${PROJECT_NAME} PRIVATE src)

target_include_directories(${PROJECT_NAME} PUBLIC SYSTEM vendor/raylib/src)
target_link_libraries(${PROJECT_NAME} raylib)
