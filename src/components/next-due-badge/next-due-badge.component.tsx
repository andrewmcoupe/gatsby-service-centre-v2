import { HistoryItem } from '@http/fetch-customer'
import { Badge } from '@chakra-ui/react'
import { differenceInDays, formatDistanceToNow, isPast } from 'date-fns'
import React from 'react'

const NextDueBadge = ({ item }: { item: HistoryItem }) => {
  if (!item.nextDueDate) {
    return <Badge colorScheme="gray">N/A</Badge>
  }

  const daysUntilAction = differenceInDays(Date.now(), new Date(item.nextDueDate))
  const distanceToNow = formatDistanceToNow(new Date(item.nextDueDate))

  if (daysUntilAction < 30 && daysUntilAction > 0) {
    return <Badge colorScheme="orange">{daysUntilAction} days</Badge>
  }

  if (isPast(new Date(item.nextDueDate))) {
    return (
      <Badge colorScheme="red" data-testid={'overdue-badge'}>
        Overdue by
        <br /> {distanceToNow}
      </Badge>
    )
  }

  return <p>{distanceToNow}</p>
}

export default NextDueBadge
