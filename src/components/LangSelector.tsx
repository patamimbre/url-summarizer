import { type Lang, langs } from "@/lib/lang";
import { langsMap } from "@/lib/lang";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

type LangSelectorProps = {
  lang: Lang;
  setLang: (lang: Lang) => void;
};

export function LangSelector({ lang, setLang }: LangSelectorProps) {
  return (
    <Select value={lang} onValueChange={setLang} defaultValue="en">
      <SelectTrigger>
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent>
        {langs.map((lang) => (
          <SelectItem key={lang} value={lang}>{langsMap[lang]}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}