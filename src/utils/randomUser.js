const COLORS = ['#f783ac', '#4dabf7', '#69db7c', '#ffa94d', '#9775fa', '#ff6b6b']
const NAMES = ['Sudesh', 'Guest-Falcon', 'Guest-Otter', 'Guest-Wolf', 'Guest-Hawk']

export function getRandomUser() {
  return {
    name: NAMES[Math.floor(Math.random() * NAMES.length)],
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
  }
}