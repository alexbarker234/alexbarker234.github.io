export function lerp (start: number, end: number, amt: number) {
    return (1-amt)*start+amt*end
}
export function randBetween(min: number, max: number) {
    return Math.random() * (max - min) + min;
}
  