import { ErrorOutlineOutlined } from "@mui/icons-material";
import { Card, Grid } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import DefaultDoughnutChart from "examples/Charts/DoughnutCharts/DefaultDoughnutChart";
import React from "react";

import arImg from "assets/img/ar.png";
import seImg from "assets/img/se.png";
import britainImg from "assets/img/icons8-great-britain-48.png";
import usImg from "assets/img/us.png";
import balanceDoughnutChart from "./balanceDoughnutChart";

export default function ByCountry() {
  return (
    <Card>
      <SoftBox display="flex" justifyContent="space-between" alignItems="center" pt={3} px={2}>
        <SoftTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          By Country
        </SoftTypography>
        <SoftBox display="flex" alignItems="flex-start">
          <ErrorOutlineOutlined />
        </SoftBox>
      </SoftBox>
      <Grid container>
        <Grid item xs={12} lg={5}>
          <DefaultDoughnutChart chart={balanceDoughnutChart} />
        </Grid>
        <Grid item xs={12} lg={7}>
          <table className="table align-items-center mb-0">
            <tbody>
              <tr>
                <td>
                  <div className="d-flex px-2 py-0">
                    <div>
                      <img src={usImg} className="avatar avatar-xs me-2" alt="logo_atlassian" />
                    </div>
                    <div className="d-flex flex-column justify-content-center">
                      <h6 className="mb-0 text-sm opacity-8">U.S Dollar</h6>
                    </div>
                  </div>
                </td>
                <td className="align-middle text-center text-sm">
                  <span className="text-xs font-weight-bold opacity-8"> 63% </span>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="d-flex px-2 py-0">
                    <div>
                      <img
                        src={britainImg}
                        className="avatar avatar-xs me-2"
                        alt="logo_atlassian"
                      />
                    </div>
                    <div className="d-flex flex-column justify-content-center">
                      <h6 className="mb-0 text-sm opacity-8">British Pound Sterling</h6>
                    </div>
                  </div>
                </td>
                <td className="align-middle text-center text-sm">
                  <span className="text-xs font-weight-bold opacity-8"> 15% </span>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="d-flex px-2 py-0">
                    <div>
                      <img src={seImg} className="avatar avatar-xs me-2" alt="logo_atlassian" />
                    </div>
                    <div className="d-flex flex-column justify-content-center">
                      <h6 className="mb-0 text-sm opacity-8">Swedish Krona</h6>
                    </div>
                  </div>
                </td>
                <td className="align-middle text-center text-sm">
                  <span className="text-xs font-weight-bold opacity-8"> 12% </span>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="d-flex px-2 py-0">
                    <div>
                      <img src={arImg} className="avatar avatar-xs me-2" alt="logo_atlassian" />
                    </div>
                    <div className="d-flex flex-column justify-content-center">
                      <h6 className="mb-0 text-sm opacity-8">Argentina Pesos</h6>
                    </div>
                  </div>
                </td>
                <td className="align-middle text-center text-sm">
                  <span className="text-xs font-weight-bold opacity-8"> 7% </span>
                </td>
              </tr>
            </tbody>
          </table>
        </Grid>
      </Grid>
    </Card>
  );
}