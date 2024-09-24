// emcc --bind raylib.cpp raylib/build/raylib/libraylib.a  -o raylib.js -I raylib/src --no-entry -DPLATFORM_WEB -Os -sEXPORT_KEEPALIVE=1 -sALLOW_MEMORY_GROWTH=1 -sUSE_GLFW=3 -sENVIRONMENT=web  -sEXPORTED_RUNTIME_METHODS=FS

#include <emscripten/emscripten.h>
#include <emscripten/bind.h>
#include <string>
#include <unordered_map>

#define RLAPI EMSCRIPTEN_KEEPALIVE
#define RAYGUIAPI EMSCRIPTEN_KEEPALIVE
#define RAYGUI_IMPLEMENTATION
#define EASEDEF EMSCRIPTEN_KEEPALIVE

#include "raylib.h"
// #include "raymath.h"
// #include "rcamera.h"
// #include "rlgl.h"

using namespace emscripten;

void _InitWindow(int width, int height, const std::string& title) {
  InitWindow(width, height, title.c_str());
}

Texture2D _LoadTexture(const std::string& path) {
  return LoadTexture(path.c_str());
}

std::unordered_map<std::string, Sound> sounds;

void _LoadSound(const std::string& path) {
  sounds.emplace(path, LoadSound(path.c_str()));
}

void _PlaySound(const std::string& path) {
  if (sounds.count(path)) {
    PlaySound(sounds.at(path));
  }
}

EMSCRIPTEN_BINDINGS(raylib) {
  value_object<Texture>("Texture2D")
    .field("id", &Texture::id)
    .field("width", &Texture::width)
    .field("height", &Texture::height)
    .field("mipmaps", &Texture::mipmaps)
    .field("format", &Texture::format);

  value_object<Color>("Color")
    .field("r", &Color::r)
    .field("g", &Color::g)
    .field("b", &Color::b)
    .field("a", &Color::a);

  value_object<Vector2>("Vector2")
    .field("x", &Vector2::x)
    .field("y", &Vector2::y);

  function("InitWindow", &_InitWindow);
  function("InitAudioDevice", &InitAudioDevice);
  function("ClearBackground", &ClearBackground);
  function("BeginDrawing", &BeginDrawing);
  function("EndDrawing", &EndDrawing);
  function("LoadTexture", &_LoadTexture);
  function("DrawTexture", &DrawTextureV);
  function("LoadSound", &_LoadSound);
  function("PlaySound", &_PlaySound);
  function("DrawFPS", &DrawFPS);
  function("SetTargetFPS", &SetTargetFPS);
  
  function("IsKeyPressed", &IsKeyPressed);
  function("IsKeyDown", &IsKeyDown);
  function("IsKeyReleased", &IsKeyReleased);
  function("IsKeyUp", &IsKeyUp);
}