import { TIME } from '../constants/time'

/**
 * Parse date string (DD/MM/YYYY) and time string (HH:MM) to Date object
 */
export const parseDateString = (dateStr: string, timeStr: string): Date => {
  const [day, month, year] = dateStr.split('/').map(Number)
  const [hours, minutes] = timeStr.split(':').map(Number)
  return new Date(year, month - 1, day, hours, minutes)
}

/**
 * Convert milliseconds to hours
 */
export const millisecondsToHours = (ms: number): number => {
  return ms / (TIME.MILLISECONDS_PER_SECOND * TIME.SECONDS_PER_MINUTE * TIME.MINUTES_PER_HOUR)
}

/**
 * Convert hours to days
 */
export const hoursToDays = (hours: number): number => {
  return hours / TIME.HOURS_PER_DAY
}

/**
 * Reset date to start of day (00:00:00.000)
 */
export const resetDateToStartOfDay = (date: Date): Date => {
  const newDate = new Date(date)
  newDate.setHours(
    TIME.DATE_RESET.HOUR,
    TIME.DATE_RESET.MINUTE,
    TIME.DATE_RESET.SECOND,
    TIME.DATE_RESET.MILLISECOND
  )
  return newDate
}

/**
 * Get date N days ago
 */
export const getDateDaysAgo = (date: Date, days: number): Date => {
  const newDate = new Date(date)
  newDate.setDate(newDate.getDate() - days)
  return newDate
}

