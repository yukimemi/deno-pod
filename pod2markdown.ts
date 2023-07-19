import { getPod } from "./pod.ts";
import { languages } from "./languages.ts";

const backend = "markdown";

export async function pod2markdown(src: string, dst: string) {
  const pod = await getPod();
  const srcCode = await Deno.readTextFile(src);
  for (const lang of languages) {
    pod.PodiumBackend.registerSimpleDataParagraph(backend, lang, (arg: string) => {
      return "```" + lang + "\n" + arg + "```\n\n";
    });
  }
  await Deno.writeTextFile(dst, await pod.process(backend, srcCode));
}
