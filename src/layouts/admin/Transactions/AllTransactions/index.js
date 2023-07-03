// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import SoftBox from "components/SoftBox";
import { Button, Card, Checkbox, Grid } from "@mui/material";
import SoftTypography from "components/SoftTypography";
import Table from "examples/Tables/Table";
import { Visibility } from "@mui/icons-material";
import { useSoftUIController } from "context";
import { useEffect, useState } from "react";
import { getTransactions } from "apis/request";
//import { setTransactions } from "context";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import { useNavigate } from "react-router-dom";

function AllTransactions() {

  const navegate = useNavigate();
  const [columns2, setColumns2] = useState([
    {name: "AMOUNT", align: "left"},
    {name: "DESCRIPTION", align: "left"},
    { name: "RECEPTIANT", align: "left" },
    { name: "ID", align: "left" },
    { name: "DATE", align: "left" },
    { name: "STATE", align: "center" },
    { name: "action", align: "center" },
  ]);
  const [rows2, setRows2] = useState([])
  const [index, setIndex] = useState(0)
  const [withdraws, setWithdraws] = useState(0);
  const [topUps, setTopUps] = useState(0);
  const [transfers, setTransfers] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [transactions, setTransactions] = useState([])
  const itemsPerPage = 10;

  function AmountField({ amount }) {
    return (
      <SoftBox px={1}>
        <Checkbox />
        <SoftTypography pl={1} variant="button" fontWeight="medium">
          {amount}
        </SoftTypography>
      </SoftBox>
    );
  }

  useEffect(() => {
    async function getData () {
      getTransactions().then(async (data) => {
        console.log(data);
        await setWithdraws(data.withdraws);
        await setTopUps(data.topUps);
        await setTransfers(data.transfers);
        await setTotalItems(data.transactions.length)
        await setTransactions(data.transactions)
      }).catch(error => {
        console.log(error)
      })
    }
    getData();
  }, [])

  /*useEffect(() => {
    async function x () {
      const rows = await transactions.map((transaction) => ({
        AMOUNT: <AmountField amount={transaction.currency + " " + transaction.amount} />,
        DESCRIPTION: (
          <SoftTypography variant="caption" color="secondary" fontWeight="medium">
            {transaction.action}
          </SoftTypography>
        ),
        RECEPTIANT: (
          <SoftTypography variant="caption" color="secondary" fontWeight="medium">
            {transaction.userInteraction}
          </SoftTypography>
        ),
        ID: (
          <SoftTypography variant="caption" color="secondary" fontWeight="medium">
            {transaction.id}
          </SoftTypography>
        ),
        DATE: (
          <SoftTypography variant="caption" color="secondary" fontWeight="medium">
            {transaction.date}
          </SoftTypography>
        ),
        STATE: (
          <SoftTypography variant="caption" color={transaction.status === "success" || transaction.status === "succeeded" ? "success" : "error" } fontWeight="medium">
            {transaction.status}
          </SoftTypography>
        ),
      }))
      await setRows2(rows);
    }
    x();
  }, [controller]);*/

  useEffect(() => {
    const paginatedTransactions = paginate(currentPage);
    const rows = paginatedTransactions.map((transaction) => ({
      action: <Actions id={transaction.id} />,
      AMOUNT: <AmountField amount={transaction.currency + " " + transaction.amount} />,
      DESCRIPTION: (
          <SoftTypography variant="caption" color="secondary" fontWeight="medium">
            {transaction.action}
          </SoftTypography>
      ),
      RECEPTIANT: (
          <SoftTypography variant="caption" color="secondary" fontWeight="medium">
            {transaction.userInteraction}
          </SoftTypography>
      ),
      ID: (
          <SoftTypography variant="caption" color="secondary" fontWeight="medium">
            {transaction.id}
          </SoftTypography>
      ),
      DATE: (
          <SoftTypography variant="caption" color="secondary" fontWeight="medium">
            {transaction.date}
          </SoftTypography>
      ),
      STATE: (
          <SoftTypography variant="caption" color={transaction.status === "success" || transaction.status === "succeeded" ? "success" : "error" } fontWeight="medium">
            {transaction.status}
          </SoftTypography>
      ),
    }));
    setRows2(rows);
  }, [currentPage, transactions])

  function paginate(page) {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return transactions.slice(startIndex, endIndex);
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

  function Actions({id}) {

    const seeTransactionDetails = () => {
      navegate(`/transactionDetails/${id}`)
    }

    return (
      <SoftBox display="flex" gap={2}>
        <SoftBox onClick={() => {seeTransactionDetails()}}>
          <Visibility />
        </SoftBox>
      </SoftBox>
    );
  }

  return (
    <DashboardLayout>
      <SoftBox mb={3}>
        <Grid container spacing={3} mb={3} mt={2}>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Total Transactions" }}
                count={transactions.length}
                percentage={{ color: "success", text: "" }}
                icon={{ color: "dark", component: "image" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Withdraws" }}
                count={withdraws}
                percentage={{ color: "success", text: "" }}
                icon={{ color: "dark", component: "person" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Top-Ups" }}
                count= {topUps}
                percentage={{ color: "success", text: "" }}
                icon={{ color: "dark", component: "public" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Transfers" }}
                count= {transfers}
                percentage={{ color: "error", text: "" }}
                icon={{ color: "dark", component: "emoji_events" }}
              />
            </Grid>
          </Grid>
        <Card>
          <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
            <SoftTypography variant="h6">All Transactions</SoftTypography>
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
    </DashboardLayout>
  );
}

export default AllTransactions;
