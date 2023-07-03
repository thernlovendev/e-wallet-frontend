/** 
  All of the routes for the Soft UI Dashboard React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Soft UI Dashboard React layouts
import MyTickets from "layouts/client/Help/MyTickets";
import OpenTickets from "layouts/client/Help/OpenTicket";
import FAQ from "layouts/client/Help/FAQ";


// Soft UI Dashboard React icons
import { Help, Home } from "@mui/icons-material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
//import TransactionDetails from "layouts/client/financials/components/Details";
import AdminDashboard from "layouts/admin/dashboard";
import AdminTransactions from "layouts/admin/Transactions";
import AdminReports from "layouts/admin/reports";
import NewUser from "layouts/admin/NewUser";
import AllTransactions from "layouts/admin/Transactions/AllTransactions";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "admin-dashboard",
    route: "/admin/dashboard",
    component: <AdminDashboard />,
    collapse: false,
  },
  {
    type: "collapse",
    name: "Transactions",
    key: "admin-transactions",
    route: "/admin/transactions",
    component: <AdminTransactions />,
    collapse: [
      {
        type: "collapse",
        name: "All Transactions",
        key: "all-transactions",
        route: "/financials/transactions/all-transactions",
        component: <AllTransactions />,
        collapse: false,
      }
    ],
  },
  {
    type: "collapse",
    name: "Reports",
    key: "admin-reports",
    route: "/admin/reports",
    component: <AdminReports />,
    collapse: false,
  },
  {
    type: "collapse",
    name: "New User",
    key: "admin-new-user",
    route: "/admin/new-user",
    component: <NewUser />,
    collapse: false,
  },
];

function DefaultComponent(props) {
  return <DashboardLayout>{props.children}</DashboardLayout>;
}

export default routes;