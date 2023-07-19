import { getPod } from "./pod.ts";
import { languages } from "./languages.ts";

const backend = "vimdoc";

export async function pod2vimdoc(src: string, dst: string) {
  const pod = await getPod();
  const srcCode = await Deno.readTextFile(src);
  for (const lang of languages) {
    pod.PodiumBackend.registerSimpleDataParagraph(backend, lang, (arg: string) => {
      return ">\n" + arg + "<\n\n";
    });
  }
  await Deno.writeTextFile(dst, await pod.process(backend, srcCode));
}
