import dayjs from 'dayjs'
import React, { useMemo } from 'react'
import { Task } from '../../types/public-types'
import styles from './task-list-table.module.css'

const localeDateStringCache: Record<string, string> = {}
const toLocaleDateStringFactory = () => (date: Date) =>
{
  const key = date.toString()
  let lds = localeDateStringCache[key]
  if (!lds)
  {
    lds = dayjs(date).format('YY-MM-DD')
    localeDateStringCache[key] = lds
  }
  return lds
}

export const TaskListTableDefault: React.FC<{
  rowHeight: number
  fontFamily: string
  fontSize: string
  locale: string
  tasks: Task[]
  selectedTaskId: string
  setSelectedTask: (taskId: string) => void
  onExpanderClick: (task: Task) => void
}> = ({
  rowHeight,
  tasks,
  fontFamily,
  fontSize,
  onExpanderClick,
}) =>
{
  const toLocaleDateString = useMemo(
    () => toLocaleDateStringFactory(),
    [],
  )

  return (
    <div
      className={styles.taskListWrapper}
      style={{
        fontFamily: fontFamily,
        fontSize: fontSize,
      }}
    >
      {tasks.map(t =>
      {
        let expanderSymbol = ''
        if (t.hideChildren === false)
        {
          expanderSymbol = '▼'
        } else if (t.hideChildren === true)
        {
          expanderSymbol = '▶'
        }

        return (
          <div
            className={styles.taskListTableRow}
            style={{ height: rowHeight }}
            key={`${t.id}row`}
          >
            <div
              className={styles.taskListCell}
              style={{
                minWidth: 160,
                maxWidth: 160,
              }}
              title={t.name}
            >
              <div className={styles.taskListNameWrapper}>
                <div
                  className={expanderSymbol
                    ? styles.taskListExpander
                    : styles.taskListEmptyExpander}
                  onClick={() => onExpanderClick(t)}
                >
                  {expanderSymbol}
                </div>
                <div>{t.name}</div>
              </div>
            </div>
            <div
              className={styles.taskListCell}
              style={{
                minWidth: 90,
                maxWidth: 90,
              }}
            >
              &nbsp;{toLocaleDateString(t.start)}
            </div>
            <div
              className={styles.taskListCell}
              style={{
                minWidth: 90,
                maxWidth: 90,
              }}
            >
              &nbsp;{toLocaleDateString(t.end)}
            </div>
          </div>
        )
      })}
    </div>
  )
}
