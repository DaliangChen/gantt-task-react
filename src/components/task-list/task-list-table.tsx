import dayjs from 'dayjs'
import React from 'react'
import { Task } from '../../types/public-types'
import styles from './task-list-table.module.css'

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
              &nbsp;{dayjs(t.start).format('YY-MM-DD')}
            </div>
            <div
              className={styles.taskListCell}
              style={{
                minWidth: 90,
                maxWidth: 90,
              }}
            >
              &nbsp;{dayjs(t.end).format('YY-MM-DD')}
            </div>
          </div>
        )
      })}
    </div>
  )
}
