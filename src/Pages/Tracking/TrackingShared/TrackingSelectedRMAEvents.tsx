import { ListItem, List, ListItemText, IconButton, Collapse, Card, CardContent, Box, Typography } from "@mui/material";
import { useState } from "react";
import styled from "styled-components";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { sideBarColor } from "../../../Constants/ComponentStyles";

import { StyledPaper, Title } from "./TrackStyles/TrackingStyles";
import { BaseEventResponseDTO } from "../../../Models/RMAManagerModels/Dto";
import RenderJsonContentAsTable from "./RenderJsonContentAsTable";

interface TrackingSelectedProductEventsProps {
  filterEvents: BaseEventResponseDTO[];
}
// const failureIndicators: FailureIdicators[] = [
//   { key: "InspectionResult", value: false },

// ];
const StyledListItem = styled(ListItem)(({}) => ({
  flexDirection: "column",
  alignItems: "flex-start",
}));

const HeaderContainer = styled("div")({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const TrackingSelectedRMAEvents: React.FC<TrackingSelectedProductEventsProps> = ({ filterEvents }) => {
  const [expandedItems, setExpandedItems] = useState<{ [key: number]: boolean }>({});

  const toggleExpand = (index: number) => {
    setExpandedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <StyledPaper elevation={2} sx={{ overflow: "auto", background: sideBarColor, width: "100%", padding: 2 }}>
      <Title variant="h6" align="center">
        Product Events History 
      </Title>
      <List>
        {filterEvents.map((event, index) => (
          <Card
            key={index}
            sx={{
              mb: 2,
              borderRadius: 2,
              boxShadow: 2,
              backgroundColor: "white",
            }}
          >
            <CardContent>
              <StyledListItem>
                <HeaderContainer>
                  <ListItemText
                    primary={
                      <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                        <Typography
                          sx={{
                            fontWeight: "bold",
                          }}
                          component="span"
                        >
                          {event.EventName}
                        </Typography>
                        <Typography component="span" color="text.secondary" sx={{ fontSize: "0.875rem" }}>
                          {new Intl.DateTimeFormat("en-US", {
                            weekday: "short", // Add weekday
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                            hour12: true,
                          }).format(new Date(event.timeStamp))}
                        </Typography>
                      </Box>
                    }
                  />
                  {event.AllPropertiesAsJson && event.AllPropertiesAsJson !== "" && (
                    <IconButton onClick={() => toggleExpand(index)}>
                      {expandedItems[index] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </IconButton>
                  )}
                </HeaderContainer>
                {event.AllPropertiesAsJson && event.AllPropertiesAsJson !== "" && (
                  <Collapse in={expandedItems[index]} timeout="auto" unmountOnExit style={{ width: "100%" }}>
                    {RenderJsonContentAsTable(event.AllPropertiesAsJson)}
                  </Collapse>
                )}
              </StyledListItem>
            </CardContent>
          </Card>
        ))}
      </List>
    </StyledPaper>
  );
};
export default TrackingSelectedRMAEvents;
