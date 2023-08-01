import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { useEffect, useState } from "react";
import Table from "examples/Tables/Table";
import { Card } from "reactstrap";
import { Tooltip } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { Delete, Visibility } from "@mui/icons-material";
import { useSoftUIController } from "context";
import { getRecepiants } from "apis/request";
import SoftButton from "components/SoftButton";
import { deletRecepiant } from "apis/request";
import { setUser } from "context";
import { SweetAlert } from "apis/sweetAlert";


function Receptiants () {
    const [controller, dispatch] = useSoftUIController();
    const [columns2, setColumns2] = useState([
        {name: "NAME", align: "left"},
        {name: "EMAIL", align: "left"},
        { name: "STATE", align: "center" },
        { name: "action", align: "center" },
    ]);
    const [rows2, setRows2] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(controller.user.recepiants.length);
    const [recepiants, setRecepiants] = useState([]);
    const itemsPerPage = 10;

    useEffect(() => {
        getRecepiants(controller.user.id).then(async (recepiants) => {
            console.log(recepiants)
            await setRecepiants(recepiants)
            //await setTotalItems(recepiants.length)
        }).catch(error => {
            console.log(error)
        })
    },[controller.user])

    useEffect(() => {
        async function x () {
          const paginatedTransactions = paginate(currentPage);
          const rows = await paginatedTransactions.map((recepiant) => ({
            action: (
              <Actions email={recepiant.email} />
            ),
            NAME: (
              <SoftTypography variant="caption" color="secondary" fontWeight="medium">
                {recepiant.name.toUpperCase() + " " + recepiant.lastName.toUpperCase()}
              </SoftTypography>
            ),
            EMAIL: (
              <SoftTypography variant="caption" color="secondary" fontWeight="medium">
                {recepiant.email}
              </SoftTypography>
            ),
            STATE: (
              <SoftTypography variant="caption" color={recepiant.state === "Active" ? "success" : "error" } fontWeight="medium">
                {recepiant.state}
              </SoftTypography>
            ),
          }))
          await setRows2(rows);
        }
        x();
    }, [controller, currentPage, recepiants])

    function paginate(page) {
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return recepiants.slice(startIndex, endIndex);
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

    function Actions({email}) {
      
      const handleDelete = () => {
        deletRecepiant(controller.user.id, email).then(async (user) => {
          await setUser(dispatch, user)
          SweetAlert("success", "All good", "Recepiant Deleted")
        }).catch(error => {
          SweetAlert("warning", "Ooops", "Something went wrong")
        })
      }

      return (
          <SoftBox display="flex" gap={2}>
            <SoftBox onClick={handleDelete}>
              <Tooltip title="Delete recepiant" placement="top">
                <Delete />
              </Tooltip>
            </SoftBox>
          </SoftBox>
      );
    }

    return(
        <DashboardLayout>
            <Card>
                <SoftBox display="flex" flexDirection="colum" justifyContent="space-between" alignItems="center" p={3}>
                    <SoftTypography variant="h6">Recepiants</SoftTypography>
                    <SoftBox display="flex" >
                        <SoftButton variant="contained" color="primary" onClick={goToPreviousPage}>
                            Previus Page
                        </SoftButton>
                        <SoftTypography mr={2} ml={2} mt={1} variant="h6"> {currentPage} </SoftTypography>
                        <SoftButton variant="contained" color="secondary" onClick={goToNextPage}>
                            Next Page
                        </SoftButton>
                    </SoftBox>
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
                    <Table
                    columns={columns2}
                    rows={rows2.map((item) => ({ ...item }))}
                    />
                </SoftBox>
            </Card>
        </DashboardLayout>
    )
}

export default Receptiants;