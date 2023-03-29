import { Box, Button, Typography } from "@mui/material"
import React from "react"
import theme from "../../styles/theme/Theme"
import useModifyTrip from "../../utility/hooks/modify/modifyTrip"
import { useTrip } from "../../utility/hooks/trip"
import { Duration } from "../../utility/types/trip"
import DateRange from "./DateRange"
import PlacesSearch from "./PlacesSearch"

export default function ModifyTrip({ closeModal }: { closeModal: () => void }) {
  const { trip } = useTrip()
  const { modifyTrip, updateDuration, updateDestination, modify } = useModifyTrip()

  return (
    <Box
      sx={{
        backgroundColor: "white",
        borderRadius: "10px",
        padding: "20px",
        display: "flex",
        maxWidth: "750px",
        overflowY: "auto",
        width: "80vw",
        height: "100%",
        alignContent: "center",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Box style={{ overflowY: "auto", maxHeight: "850px", width: "100%", gap: 2 }}>
        <Typography variant="h4" style={{ ...$headerStyle, textAlign: "center" }}>
          Modifying trip to {trip.destination}
        </Typography>
        <Typography variant="h6" style={{ ...$headerStyle, textAlign: "left" }}>
          destination
        </Typography>
        <PlacesSearch
          place={trip.destination}
          types={["(cities)"]}
          setPlace={(placeID, place) => updateDestination(placeID, place)}
        />
        <Typography variant="h6" style={{ ...$headerStyle, textAlign: "left" }}>
          duration
        </Typography>
        <DateRange
          startDate={trip.duration.start}
          endDate={trip.duration.end}
          updateDates={(startDate, endDate) => updateDuration(startDate, endDate)}
        />
        <Button
          sx={{ width: "100%", marginTop: "10px" }}
          color={"primary"}
          variant="contained"
          onClick={() =>
            modify(() => {
              closeModal()
            })
          }
        >
          Save Changes
        </Button>
      </Box>
    </Box>
  )
}

const $headerStyle: React.CSSProperties = {
  fontWeight: 500,
  color: theme.palette.secondary.main,
  padding: 5,
}

function changeDayWidgets(oldDuration: Duration, start: Date, end: Date) {
  if (oldDuration.start == start && oldDuration.end == end) {
    return
  }
}
