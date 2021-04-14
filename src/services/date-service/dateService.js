export default function formattedDateTime(date) {
  const dateOptions = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: '2-digit'
  }

  const formattedDate = new Date(date).toLocaleDateString('pl-PL', dateOptions)

  return `${formattedDate}`
}
