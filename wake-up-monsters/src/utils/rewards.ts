export type RewardsState = {
  streakDays: number
  totalAlarms: number
  coins: number
  lastAlarmDate?: string
}

const KEY = 'wake_up_monsters_rewards_v1'

export function loadRewards(): RewardsState {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return { streakDays: 0, totalAlarms: 0, coins: 0 }
    return JSON.parse(raw)
  } catch {
    return { streakDays: 0, totalAlarms: 0, coins: 0 }
  }
}

export function saveRewards(state: RewardsState) {
  try { localStorage.setItem(KEY, JSON.stringify(state)) } catch {}
}

export function awardForDismiss(state: RewardsState, date: Date): RewardsState {
  const todayKey = date.toDateString()
  const last = state.lastAlarmDate
  let streak = state.streakDays
  if (!last) streak = 1
  else {
    const lastDate = new Date(last)
    const diff = Math.floor((date.getTime() - new Date(lastDate.toDateString()).getTime()) / (24*3600*1000))
    if (diff === 1) streak = Math.max(streak + 1, 1)
    else if (diff > 1) streak = 1
  }
  const coinsEarned = 5 + Math.min(streak, 10)
  return {
    streakDays: streak,
    totalAlarms: state.totalAlarms + 1,
    coins: state.coins + coinsEarned,
    lastAlarmDate: todayKey,
  }
}
