import React from 'react'
import 'gantt-task-react/dist/index.css'
import { ViewMode } from 'gantt-task-react'
type ViewSwitcherProps = {
  onViewModeChange: (viewMode: ViewMode) => void
}
export const ViewSwitcher: React.FC<ViewSwitcherProps> = ({
  onViewModeChange,
}) =>
{
  return (
    <div className='ViewContainer'>
      <button
        className='Button'
        onClick={() => onViewModeChange(ViewMode.Hour)}
      >
        Hour
      </button>
      <button className='Button' onClick={() => onViewModeChange(ViewMode.Day)}>
        Day
      </button>
      <button
        className='Button'
        onClick={() => onViewModeChange(ViewMode.Month)}
      >
        Month
      </button>
    </div>
  )
}
