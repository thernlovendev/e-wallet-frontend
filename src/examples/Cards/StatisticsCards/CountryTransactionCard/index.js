import { Grid, Icon } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import React from "react";
// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

function CountryTransactions({ bgColor, title, icon }) {
  return (
    <Grid container alignItems="center">
      <Grid item>
        <SoftBox
          variant="gradient"
          bgColor={bgColor === "white" ? icon.color : "white"}
          color={bgColor === "white" ? "white" : "dark"}
          width="3rem"
          height="3rem"
          borderRadius="md"
          display="flex"
          justifyContent="center"
          alignItems="center"
          shadow="md"
        >
          <Icon fontSize="small" color="inherit">
            {icon.component}
          </Icon>
        </SoftBox>
      </Grid>
      <Grid item xs={8}>
        <SoftBox ml={2} lineHeight={1}>
          <SoftTypography
            variant="button"
            color={bgColor === "white" ? "text" : "white"}
            opacity={bgColor === "white" ? 1 : 0.7}
            textTransform="capitalize"
            fontWeight={title.fontWeight}
          >
            {title.text}
          </SoftTypography>
        </SoftBox>
      </Grid>
    </Grid>
  );
}

// Setting default values for the props of CountryTransactions
CountryTransactions.defaultProps = {
  bgColor: "white",
  title: {
    fontWeight: "medium",
    text: "",
  },
  direction: "right",
};

// Typechecking props for the CountryTransactions
CountryTransactions.propTypes = {
  bgColor: PropTypes.oneOf([
    "white",
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
  ]),
  title: PropTypes.PropTypes.shape({
    fontWeight: PropTypes.oneOf(["light", "regular", "medium", "bold"]),
    text: PropTypes.string,
  }),
  icon: PropTypes.shape({
    color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
    component: PropTypes.node.isRequired,
  }).isRequired,
};

export default CountryTransactions;
