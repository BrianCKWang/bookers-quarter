export function httpToHttps(string) {
  return string && string.charAt(4).toLowerCase() !== 's' ? [...string.split('').slice(0, 4), 's', ...string.split('').slice(4)].join('') : string;
}