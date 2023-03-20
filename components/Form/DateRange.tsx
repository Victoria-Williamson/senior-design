import { Paper } from "@mui/material"
import { DatePicker } from "antd"
import dayjs from "dayjs"

export default function DateRange({
  startDate,
  endDate,
  updateDates,
  showTime,
  disabledDate,
}: {
  startDate: Date
  endDate: Date
  updateDates(startDate: Date, endDate: Date): void
  showTime?: boolean
  disabledDate?: (date: dayjs.Dayjs) => boolean
}) {
  return (
    <DatePicker.RangePicker
      getPopupContainer={(triggerNode) => {
        return triggerNode.parentNode as any
      }}
      format={"MMMM DD, hh:mm a"}
      style={{ width: "100%", padding: "15px" }}
      showTime={
        showTime
          ? {
              use12Hours: true,
              format: "HH:mm a",
            }
          : undefined
      }
      disabledDate={(date) => {
        if (disabledDate === undefined) {
          return false
        }
        return disabledDate(date)
      }}
      onChange={(e) => {
        if (e !== null) console.log(e[0]?.toDate())
        if (e !== null) updateDates(e[0]?.toDate() ?? new Date(), e[1]?.toDate() ?? new Date())
      }}
    />
  )
}
