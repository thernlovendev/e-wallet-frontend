import React from "react";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import DefaultDoughnutChart from "examples/Charts/DoughnutCharts/DefaultDoughnutChart";
import balanceDoughnutChart from "layouts/client/dashboard/data/balanceDoughnutChart";

// Material component
import { Grid } from "@mui/material";

// Sample Images
import arImg from "assets/img/ar.png";
import seImg from "assets/img/se.png";
import usImg from "assets/img/us.png";
import britainImg from "assets/img/icons8-great-britain-48.png";

const testData = [
  { img: usImg, name: "U.S Dollar", value: "63%" },
  { img: britainImg, name: "British Pound Sterling", value: "15%" },
  { img: seImg, name: "Swedish Krona", value: "12%" },
  { img: arImg, name: "Argentina Pesos", value: "7%" },
];

export default function BalanceAvailable() {
  return (
    <SoftBox
      height="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgColor="primary"
      borderRadius="lg"
      variant="gradient"
      // flexDirection="row"
    >
      <Grid container>
        <Grid item xs={12} sm={12} lg={5}>
{    /*      <DefaultDoughnutChart
            title={
              <SoftTypography component="h6" fontWeight="bold" fontSize="1.5em" color="white">
                $4833.63
              </SoftTypography>
            }
            description={
              <SoftTypography component="small" fontWeight="light" fontSize=".87em" color="white">
                Available
              </SoftTypography>
            }
            chart={balanceDoughnutChart}
            height="12rem"
          />*/}
        </Grid>
        <Grid item xs={12} sm={12} lg={7}>
          {/* React table method will be used here */}
{          <table className="table align-items-center mb-0">
            <tbody>
              {testData.map(({ img, name, value }) => (
                <tr>
                  <td>
                    <div className="d-flex px-2 py-0">
                      <div>
                        <img src={img} className="avatar avatar-xs me-2" alt="logo_atlassian" />
                      </div>
                      <div className="d-flex flex-column justify-content-center">
                        <h6 className="mb-0 text-sm text-white opacity-8">{name}</h6>
                      </div>
                    </div>
                  </td>
                  <td className="align-middle text-center text-sm">
                    <span className="text-xs font-weight-bold text-white opacity-8">{value}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>}
        </Grid>
      </Grid>
    </SoftBox>
  );
}
