// Soft UI Dashboard React examples
import SoftBox from "components/SoftBox";
import { Card, Grid } from "@mui/material";
import SoftTypography from "components/SoftTypography";
import Table from "examples/Tables/Table";
import { Delete, Person } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import SoftBadge from "components/SoftBadge";
import { Checkbox } from "@mui/material";
import { Button } from "reactstrap";
import { getDataUser } from "apis/request";
import { freezeUser } from "apis/request";

function AllUsers({users}) {
  //const { columns, rows } = usersTableData;
  const navegate = useNavigate();
  const [totalItems, setTotalItems] = useState(users.length);
  const [currentPage, setCurrentPage] = useState(1);
  const [columns, setColumns] = useState(
    [
      { name: "NAME", align: "left" },
      { name: "JOIN_DATE", align: "left" },
      //{ name: "LAST_PURCHASE_DATE", align: "left" },
      { name: "TRANSFERRED", align: "left" },
      { name: "TRANSACTIONS", align: "left" },
      { name: "STATUS", align: "left" },
      { name: "action", align: "center" },
    ]
  )
  const [rows, setRows] = useState([{
    NAME: <NameField name="" />,
    JOIN_DATE: (
      <SoftTypography variant="caption" color="secondary" fontWeight="medium">
       
      </SoftTypography>
    ),
    LAST_PURCHASE_DATE: (
      <SoftTypography variant="caption" color="secondary" fontWeight="medium">
        
      </SoftTypography>
    ),
    TRANSFERRED: (
      <SoftTypography variant="caption" color="secondary" fontWeight="medium">
        
      </SoftTypography>
    ),
    TRANSACTIONS: (
      <SoftTypography variant="caption" color="secondary" fontWeight="medium">
        
      </SoftTypography>
    ),
    STATUS: <SoftBadge {...{
      variant: "",
      badgeContent: "",
      color: "",
      size: "",
    }} container />
  }])
  const itemsPerPage = 10;

  useEffect(() => {
    setTotalItems(users.length)
    const paginatedUsers = paginate(currentPage);
    const rows2 = paginatedUsers.map((user) => {
      let LAST_PURCHASE_DATE = ""; let totalTransfered = 0;

      return({
        action: <Actions id={user.id} />,
        NAME: <NameField name={user.name + " " +user.lastName} />,
        JOIN_DATE: (
          <SoftTypography variant="caption" color="secondary" fontWeight="medium">
            {user.singUpDate ? user.singUpDate.day + "/" + user.singUpDate.month + "/" + user.singUpDate.year : ""}
          </SoftTypography>
        ),
        LAST_PURCHASE_DATE: (
          <SoftTypography variant="caption" color="secondary" fontWeight="medium">
            
          </SoftTypography>
        ),
        TRANSFERRED: (
          <SoftTypography variant="caption" color="secondary" fontWeight="medium">
            
          </SoftTypography>
        ),
        TRANSACTIONS: (
          <SoftTypography variant="caption" color="secondary" fontWeight="medium">
            {user.transactions ? user.transactions.length : ""}
          </SoftTypography>
        ),
        STATUS: <SoftBadge {...{
          variant: "contained",
          badgeContent: user.stripeAccount && user.identityVerified ? "Active" : !user.identityVerified ? "Not Verified" : "Not Active",
          color: user.stripeAccount && user.identityVerified ? "success" : !user.identityVerified ? "warning" : "error",
          size: "xs",
        }} container />
      })
    })
    setRows(rows2)
  }, [users, currentPage])

  function paginate(page) {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return users.slice(startIndex, endIndex);
  }

  function goToPreviousPage() {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  }

  function goToNextPage() {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  }

  function NameField({ name }) {
    return (
      <SoftBox px={1}>
        <Checkbox />
        <SoftTypography pl={1} variant="button" fontWeight="medium">
          {name}
        </SoftTypography>
      </SoftBox>
    );
  }

  function Actions({id}) {

    const seeUserDetails = () => {
      navegate(`/dataUser/${id}`)
    }

    return (
      <SoftBox display="flex" gap={2}>
        <SoftBox onClick={() => {seeUserDetails()}}>
          <Person />
        </SoftBox>
        <SoftBox onClick={() => {}}>
          <Delete />
        </SoftBox>
      </SoftBox>
    );
  }

  return (
    <SoftBox mb={3}>
      <Card>
        <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
          <SoftTypography variant="h6">All Users</SoftTypography>
        </SoftBox>
        <SoftBox
          sx={{
            "& .MuiTableRow-root:not(:last-child)": {
              "& td": {
                borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                  `${borderWidth[1]} solid ${borderColor}`,
              },
            },
          }}
        >
          <Table columns={columns} rows={rows.map((item) => ({ ...item }))} />
          <Grid container spacing={2} display="flex" justifyContent="space-around">
              <Grid item>
                <Button variant="contained" color="primary" onClick={goToPreviousPage}>
                  Previus Page
                </Button>
              </Grid>
              <Grid item>
                <SoftTypography variant="h6"> {currentPage} </SoftTypography>
              </Grid>
              <Grid item>
                <Button variant="contained" color="secondary" onClick={goToNextPage}>
                  Next Page
                </Button>
              </Grid>
          </Grid>
        </SoftBox>
      </Card>
    </SoftBox>
  );
}

export default AllUsers;