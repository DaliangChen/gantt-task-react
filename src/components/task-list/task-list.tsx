import React, { useEffect, useRef } from 'react'
import { BarTask } from '../../types/bar-task'
import { Task } from '../../types/public-types'

export type TaskListProps = {
  headerHeight: number
  fontFamily: string
  fontSize: string
  rowHeight: number
  ganttHeight: number
  scrollY: number
  tasks: Task[]
  taskListRef: React.RefObject<HTMLDivElement>
  horizontalContainerClass?: string
  selectedTask: BarTask | undefined
  setSelectedTask: (task: string) => void
  onExpanderClick: (task: Task) => void
  TaskListHeader: React.FC<{
    headerHeight: number
    fontFamily: string
    fontSize: string
  }>
  TaskListTable: React.FC<{
    rowHeight: number
    fontFamily: string
    fontSize: string
    tasks: Task[]
    selectedTaskId: string
    setSelectedTask: (taskId: string) => void
    onExpanderClick: (task: Task) => void
  }>
}

export const TaskList: React.FC<TaskListProps> = ({
  headerHeight,
  fontFamily,
  fontSize,
  rowHeight,
  scrollY,
  tasks,
  selectedTask,
  setSelectedTask,
  onExpanderClick,
  ganttHeight,
  taskListRef,
  horizontalContainerClass,
  TaskListHeader,
  TaskListTable,
}) =>
{
  const horizontalContainerRef = useRef<HTMLDivElement>(null)
  useEffect(() =>
  {
    if (horizontalContainerRef.current)
    {
      horizontalContainerRef.current.scrollTop = scrollY
    }
  }, [scrollY])

  const headerProps = {
    headerHeight,
    fontFamily,
    fontSize,
  }
  const selectedTaskId = selectedTask ? selectedTask.id : ''
  const tableProps = {
    rowHeight,
    fontFamily,
    fontSize,
    tasks,
    selectedTaskId: selectedTaskId,
    setSelectedTask,
    onExpanderClick,
  }

  return (
    <div ref={taskListRef}>
      <TaskListHeader {...headerProps} />
      <div
        ref={horizontalContainerRef}
        className={horizontalContainerClass}
        style={ganttHeight ? { height: ganttHeight } : {}}
      >
        <TaskListTable {...tableProps} />
      </div>
    </div>
  )
}
