import { HistoryItem } from '@http/fetch-customer'
import { differenceInDays } from 'date-fns'

export const getNextDueItem = (historyItems: HistoryItem[] | null) => {
  if (!historyItems || !historyItems.length) return null

  return historyItems.reduce((prev, currentItem) => {
    if (!prev.nextDueDate && currentItem.nextDueDate) return currentItem

    if (prev.nextDueDate && currentItem.nextDueDate) {
      return differenceInDays(new Date(currentItem.nextDueDate), Date.now()) <
        differenceInDays(new Date(prev.nextDueDate), Date.now())
        ? currentItem
        : prev
    }

    return prev
  })
}
