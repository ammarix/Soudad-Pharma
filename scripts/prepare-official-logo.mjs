/**
 * تحويل خلفية الشعار الأبيض المرفق إلى شفافية وقص الهوامش
 * حتى ينسجم الشعار مع الرأس الداكن والفوتر دون بطاقة مستقلة.
 */
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { access } from "node:fs/promises";

const exec = promisify(execFile);
const input = "/home/ubuntu/webdev-static-assets/soudad-official-logo.png";
const output = "/home/ubuntu/webdev-static-assets/soudad-official-logo-transparent.png";

await access(input);
await exec("convert", [
  input,
  "-alpha", "on",
  "-fuzz", "7%",
  "-transparent", "white",
  "-trim",
  "+repage",
  output,
]);
console.log(output);
