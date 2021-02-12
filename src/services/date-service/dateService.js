export default function formattedDateTime(date) {
  const dateOptions = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: '2-digit'
  }

  const timeOptions = {
    timeZone: 'Europe/Berlin',
    hour12: false,
    hour: '2-digit',
    minute: '2-digit'
  }

  const formattedDate = new Date(date).toLocaleDateString('pl-PL', dateOptions)
  const formattedTime = new Date(date).toLocaleTimeString('pl-PL', timeOptions)

  return `${formattedDate} ${formattedTime}`
}
