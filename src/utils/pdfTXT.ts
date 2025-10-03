import fs from "fs";
import path from "path";

const txtDir = path.join(process.cwd(), "prompts");

export function getAllTxtContent(): string {
  let allText = "";
  const files = fs.readdirSync(txtDir);
  for (const file of files) {
    if (file.endsWith(".txt")) {
      const filePath = path.join(txtDir, file);
      const content = fs.readFileSync(filePath, "utf8");
      allText += `\n[${file}]\n${content}\n`;
    }
  }
  return allText;
}

