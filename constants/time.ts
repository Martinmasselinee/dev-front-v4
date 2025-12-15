export const TIME = {
  INTERVAL: {
    ROTATING_TEXT: 1500, // milliseconds
    SUCCESS_MESSAGE: 1000, // milliseconds
    BUTTON_LOADING: 5000, // milliseconds (5 seconds)
  },
  DELAY: {
    SHORT: 100, // milliseconds
    MEDIUM: 500, // milliseconds
    LONG: 1000, // milliseconds
    LOADING_REDIRECT: 1000, // milliseconds (1 second)
  },
  SPLASH_SCREEN: 2000, // milliseconds (2 seconds)
  ANIMATION_DURATION: 1000, // milliseconds
  MILLISECONDS_PER_SECOND: 1000,
  SECONDS_PER_MINUTE: 60,
  MINUTES_PER_HOUR: 60,
  HOURS_PER_DAY: 24,
  DAYS_PER_WEEK: 7,
  DAYS_PER_MONTH: 30,
  DATE_RESET: {
    HOUR: 0,
    MINUTE: 0,
    SECOND: 0,
    MILLISECOND: 0,
  },
} as const

