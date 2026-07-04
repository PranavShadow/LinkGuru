import { classifyUrl } from "../lib/classify";

console.log(classifyUrl("https://www.youtube.com/watch?v=abc"))  // → "youtube"
console.log(classifyUrl("https://github.com/PranavShadow"))      // → "github"
console.log(classifyUrl("https://www.randomsite.com"))           // → "other"