// emcc --bind raylib.cpp raylib/build/raylib/libraylib.a  -o raylib.js -I
// raylib/src --no-entry -DPLATFORM_WEB -Os -sEXPORT_KEEPALIVE=1
// -sALLOW_MEMORY_GROWTH=1 -sUSE_GLFW=3 -sENVIRONMENT=web
// -sEXPORTED_RUNTIME_METHODS=FS

#include <emscripten/bind.h>
#include <emscripten/emscripten.h>

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

void DrawText_(const std::string& text, Vector2 pos, int fontSize, Color color) {
  return DrawText(text.c_str(), pos.x, pos.y, fontSize, color);
}

std::unordered_map<std::string, Font> fonts;

void _LoadFont(const std::string& path) {
  fonts.emplace(path, LoadFont(path.c_str()));
}


void _DrawTextPro(const std::string& path, const std::string& text, Vector2 position, Vector2 origin, float rotation, float fontSize, float spacing, Color tint) {
  if (fonts.count(path) > 0) {
    DrawTextPro(fonts.at(path), text.c_str(), position, origin, rotation, fontSize, spacing, tint);
  } else {
    TraceLog(LOG_ERROR, "Font %s is not loaded", path.c_str());
  }
}

std::unordered_map<std::string, Sound> sounds;

void _LoadSound(const std::string& path) {
  sounds.emplace(path, LoadSound(path.c_str()));
}

void _PlaySound(const std::string& path) {
  if (sounds.count(path)) {
    PlaySound(sounds.at(path));
  } else {
    TraceLog(LOG_ERROR, "Sound %s is not loaded", path.c_str());
  }
}

EMSCRIPTEN_BINDINGS(raylib) {
  constant("LIGHTGRAY", LIGHTGRAY);
  constant("GRAY", GRAY);
  constant("DARKGRAY", DARKGRAY);
  constant("YELLOW", YELLOW);
  constant("GOLD", GOLD);
  constant("ORANGE", ORANGE);
  constant("PINK", PINK);
  constant("RED", RED);
  constant("MAROON", MAROON);
  constant("GREEN", GREEN);
  constant("LIME", LIME);
  constant("DARKGREEN", DARKGREEN);
  constant("SKYBLUE", SKYBLUE);
  constant("BLUE", BLUE);
  constant("DARKBLUE", DARKBLUE);
  constant("PURPLE", PURPLE);
  constant("VIOLET", VIOLET);
  constant("DARKPURPLE", DARKPURPLE);
  constant("BEIGE", BEIGE);
  constant("BROWN", BROWN);
  constant("DARKBROWN", DARKBROWN);

  constant("WHITE", WHITE);
  constant("BLACK", BLACK);
  constant("BLANK", BLANK);
  constant("MAGENTA", MAGENTA);
  constant("RAYWHITE", RAYWHITE);

  enum_<KeyboardKey>("Key")
      .value("APOSTROPHE", KEY_APOSTROPHE)
      .value("COMMA", KEY_COMMA)
      .value("MINUS", KEY_MINUS)
      .value("PERIOD", KEY_PERIOD)
      .value("SLASH", KEY_SLASH)
      .value("ZERO", KEY_ZERO)
      .value("ONE", KEY_ONE)
      .value("TWO", KEY_TWO)
      .value("THREE", KEY_THREE)
      .value("FOUR", KEY_FOUR)
      .value("FIVE", KEY_FIVE)
      .value("SIX", KEY_SIX)
      .value("SEVEN", KEY_SEVEN)
      .value("EIGHT", KEY_EIGHT)
      .value("NINE", KEY_NINE)
      .value("SEMICOLON", KEY_SEMICOLON)
      .value("EQUAL", KEY_EQUAL)
      .value("A", KEY_A)
      .value("B", KEY_B)
      .value("C", KEY_C)
      .value("D", KEY_D)
      .value("E", KEY_E)
      .value("F", KEY_F)
      .value("G", KEY_G)
      .value("H", KEY_H)
      .value("I", KEY_I)
      .value("J", KEY_J)
      .value("K", KEY_K)
      .value("L", KEY_L)
      .value("M", KEY_M)
      .value("N", KEY_N)
      .value("O", KEY_O)
      .value("P", KEY_P)
      .value("Q", KEY_Q)
      .value("R", KEY_R)
      .value("S", KEY_S)
      .value("T", KEY_T)
      .value("U", KEY_U)
      .value("V", KEY_V)
      .value("W", KEY_W)
      .value("X", KEY_X)
      .value("Y", KEY_Y)
      .value("Z", KEY_Z)
      .value("LEFT_BRACKET", KEY_LEFT_BRACKET)
      .value("BACKSLASH", KEY_BACKSLASH)
      .value("RIGHT_BRACKET", KEY_RIGHT_BRACKET)
      .value("GRAVE", KEY_GRAVE)
      .value("SPACE", KEY_SPACE)
      .value("ESCAPE", KEY_ESCAPE)
      .value("ENTER", KEY_ENTER)
      .value("TAB", KEY_TAB)
      .value("BACKSPACE", KEY_BACKSPACE)
      .value("INSERT", KEY_INSERT)
      .value("DELETE", KEY_DELETE)
      .value("RIGHT", KEY_RIGHT)
      .value("LEFT", KEY_LEFT)
      .value("DOWN", KEY_DOWN)
      .value("UP", KEY_UP)
      .value("PAGE_UP", KEY_PAGE_UP)
      .value("PAGE_DOWN", KEY_PAGE_DOWN)
      .value("HOME", KEY_HOME)
      .value("END", KEY_END)
      .value("CAPS_LOCK", KEY_CAPS_LOCK)
      .value("SCROLL_LOCK", KEY_SCROLL_LOCK)
      .value("NUM_LOCK", KEY_NUM_LOCK)
      .value("PRINT_SCREEN", KEY_PRINT_SCREEN)
      .value("PAUSE", KEY_PAUSE)
      .value("F1", KEY_F1)
      .value("F2", KEY_F2)
      .value("F3", KEY_F3)
      .value("F4", KEY_F4)
      .value("F5", KEY_F5)
      .value("F6", KEY_F6)
      .value("F7", KEY_F7)
      .value("F8", KEY_F8)
      .value("F9", KEY_F9)
      .value("F10", KEY_F10)
      .value("F11", KEY_F11)
      .value("F12", KEY_F12)
      .value("LEFT_SHIFT", KEY_LEFT_SHIFT)
      .value("LEFT_CONTROL", KEY_LEFT_CONTROL)
      .value("LEFT_ALT", KEY_LEFT_ALT)
      .value("LEFT_SUPER", KEY_LEFT_SUPER)
      .value("RIGHT_SHIFT", KEY_RIGHT_SHIFT)
      .value("RIGHT_CONTROL", KEY_RIGHT_CONTROL)
      .value("RIGHT_ALT", KEY_RIGHT_ALT)
      .value("RIGHT_SUPER", KEY_RIGHT_SUPER)
      .value("KB_MENU", KEY_KB_MENU)
      .value("KP_0", KEY_KP_0)
      .value("KP_1", KEY_KP_1)
      .value("KP_2", KEY_KP_2)
      .value("KP_3", KEY_KP_3)
      .value("KP_4", KEY_KP_4)
      .value("KP_5", KEY_KP_5)
      .value("KP_6", KEY_KP_6)
      .value("KP_7", KEY_KP_7)
      .value("KP_8", KEY_KP_8)
      .value("KP_9", KEY_KP_9)
      .value("KP_DECIMAL", KEY_KP_DECIMAL)
      .value("KP_DIVIDE", KEY_KP_DIVIDE)
      .value("KP_MULTIPLY", KEY_KP_MULTIPLY)
      .value("KP_SUBTRACT", KEY_KP_SUBTRACT)
      .value("KP_ADD", KEY_KP_ADD)
      .value("KP_ENTER", KEY_KP_ENTER)
      .value("KP_EQUAL", KEY_KP_EQUAL)
      .value("BACK", KEY_BACK)
      .value("MENU", KEY_MENU)
      .value("VOLUME_UP", KEY_VOLUME_UP)
      .value("VOLUME_DOWN", KEY_VOLUME_DOWN);

  enum_<MouseButton>("MouseButton")
      .value("LEFT", MOUSE_BUTTON_LEFT)
      .value("RIGHT", MOUSE_BUTTON_RIGHT)
      .value("MIDDLE", MOUSE_BUTTON_MIDDLE)
      .value("SIDE", MOUSE_BUTTON_SIDE)
      .value("EXTRA", MOUSE_BUTTON_EXTRA)
      .value("FORWARD", MOUSE_BUTTON_FORWARD)
      .value("BACK", MOUSE_BUTTON_BACK);

  enum_<MouseCursor>("MouseCursor")
      .value("DEFAULT", MOUSE_CURSOR_DEFAULT)
      .value("ARROW", MOUSE_CURSOR_ARROW)
      .value("IBEAM", MOUSE_CURSOR_IBEAM)
      .value("CROSSHAIR", MOUSE_CURSOR_CROSSHAIR)
      .value("POINTING_HAND", MOUSE_CURSOR_POINTING_HAND)
      .value("RESIZE_EW", MOUSE_CURSOR_RESIZE_EW)
      .value("RESIZE_NS", MOUSE_CURSOR_RESIZE_NS)
      .value("RESIZE_NWSE", MOUSE_CURSOR_RESIZE_NWSE)
      .value("RESIZE_NESW", MOUSE_CURSOR_RESIZE_NESW)
      .value("RESIZE_ALL", MOUSE_CURSOR_RESIZE_ALL)
      .value("NOT_ALLOWED", MOUSE_CURSOR_NOT_ALLOWED);

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

  value_object<Rectangle>("Rectangle")
      .field("x", &Rectangle::x)
      .field("y", &Rectangle::y)
      .field("width", &Rectangle::width)
      .field("height", &Rectangle::height);

  value_object<NPatchInfo>("NPatchInfo")
      .field("source", &NPatchInfo::source)
      .field("left", &NPatchInfo::left)
      .field("top", &NPatchInfo::top)
      .field("right", &NPatchInfo::right)
      .field("bottom", &NPatchInfo::bottom)
      .field("layout", &NPatchInfo::layout);

  value_object<Vector2>("Vector2")
      .field("x", &Vector2::x)
      .field("y", &Vector2::y);

  value_object<Vector3>("Vector3")
      .field("x", &Vector3::x)
      .field("y", &Vector3::y)
      .field("z", &Vector3::z);

  value_object<Vector4>("Vector4")
      .field("x", &Vector4::x)
      .field("y", &Vector4::y)
      .field("z", &Vector4::z)
      .field("z", &Vector4::w);

  value_object<Camera2D>("Camera2D")
      .field("offset", &Camera2D::offset)
      .field("target", &Camera2D::target)
      .field("rotation", &Camera2D::rotation)
      .field("zoom", &Camera2D::zoom);

  function("InitWindow", &_InitWindow);
  function("InitAudioDevice", &InitAudioDevice);
  function("ClearBackground", &ClearBackground);
  function("BeginDrawing", &BeginDrawing);
  function("EndDrawing", &EndDrawing);
  function("LoadTexture", &_LoadTexture);
  function("DrawTextureEx", &DrawTextureEx);
  function("DrawTexturePro", &DrawTexturePro);
  function("DrawTextureNPatch", &DrawTextureNPatch);
  function("LoadSound", &_LoadSound);
  function("PlaySound", &_PlaySound);
  function("DrawFPS", &DrawFPS);
  function("SetTargetFPS", &SetTargetFPS);

  function("IsKeyPressed", &IsKeyPressed);
  function("IsKeyDown", &IsKeyDown);
  function("IsKeyReleased", &IsKeyReleased);
  function("IsKeyUp", &IsKeyUp);

  function("GetFrameTime", &GetFrameTime);

  function("Fade", &Fade);
  function("ColorToInt", &ColorToInt);
  function("ColorNormalize", &ColorNormalize);
  function("ColorFromNormalized", &ColorFromNormalized);
  function("ColorToHSV", &ColorToHSV);
  function("ColorFromHSV", &ColorFromHSV);
  function("ColorTint", &ColorTint);
  function("ColorBrightness", &ColorBrightness);
  function("ColorContrast", &ColorContrast);
  function("ColorAlpha", &ColorAlpha);
  function("ColorAlphaBlend", &ColorAlphaBlend);
  function("GetColor", &GetColor);

  function("DrawText", &DrawText_);
  function("DrawTextPro", &_DrawTextPro);
}