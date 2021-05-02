export function httpToHttps(string) {
  return string?string.charAt(4).toLowerCase() !== 's'? string.split('').splice(4,0,'s').join(''): string:'';
}