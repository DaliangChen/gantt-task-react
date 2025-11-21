import React from 'react'
import styles from './task-list-header.module.css'

export const TaskListHeaderDefault: React.FC<{
  headerHeight: number
  fontSize: string
}> = ({ headerHeight, fontSize }) =>
{
  return (
    <div
      className={styles.ganttTable}
      style={{
        fontSize: fontSize,
      }}
    >
      <div
        className={styles.ganttTable_Header}
        style={{
          height: headerHeight - 2,
        }}
      >
        <div
          className={styles.ganttTable_HeaderItem}
          style={{
            minWidth: 160,
          }}
        >
          &nbsp;Name
        </div>
        <div
          className={styles.ganttTable_HeaderSeparator}
          style={{
            height: headerHeight * 0.5,
            marginTop: headerHeight * 0.2,
          }}
        />
        <div
          className={styles.ganttTable_HeaderItem}
          style={{
            minWidth: 90,
          }}
        >
          &nbsp;From
        </div>
        <div
          className={styles.ganttTable_HeaderSeparator}
          style={{
            height: headerHeight * 0.5,
            marginTop: headerHeight * 0.25,
          }}
        />
        <div
          className={styles.ganttTable_HeaderItem}
          style={{
            minWidth: 90,
          }}
        >
          &nbsp;To
        </div>
      </div>
    </div>
  )
}
