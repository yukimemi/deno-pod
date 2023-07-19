import { LuaFactory } from "npm:wasmoon@latest";

export async function getPod() {
  const code = (await (await fetch(
    "https://pod.deno.dev/podium.lua",
  )).text()).replace(
    "#!/usr/bin/env lua",
    "",
  );

  const luaFactory = new LuaFactory();
  const lua = await luaFactory.createEngine();
  const pod = await lua.doString(code);

  return pod;
}
