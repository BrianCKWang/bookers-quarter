export function httpToHttps(string) {
  return string.charAt(4).toLowerCase() !== 's'? string.split('').splice(4,0,'s').join(''): string;
}