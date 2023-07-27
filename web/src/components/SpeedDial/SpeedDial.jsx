import React from "react";
import { Box, SpeedDial, SpeedDialIcon, SpeedDialAction } from "@mui/material";

class SpeedDialComponent extends React.Component {
  render() {
    const { actions, position } = this.props;
    const speedDialPosition =
      position === "left"
        ? { marginRight: "435px", marginTop: "-190px" }
        : { marginLeft: "435px", marginTop: "-190px" };

    return (
      <Box>
        <SpeedDial
          ariaLabel="SpeedDial basic example"
          sx={speedDialPosition}
          icon={<SpeedDialIcon />}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
            />
          ))}
        </SpeedDial>
      </Box>
    );
  }
}

export default SpeedDialComponent;
