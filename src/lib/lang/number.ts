export function randomNumber(min: number, max: number) {
  return Math.floor((Math.random() * (max - min + 1)) + min)
}


export function range(start: number, end: number) {
  const list = []
  while (start <= end) {
    list.push(start)
    start += 1
  }
  return list
}
