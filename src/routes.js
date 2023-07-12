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
import Dashboard from "layouts/client/dashboard";
import MyCard from "layouts/client/financials/components/MyCard";
import Accounts from "layouts/client/financials";
import PersonalInfo from "layouts/client/account/components/PersonalInfo";
import MyTickets from "layouts/client/Help/MyTickets";
import OpenTickets from "layouts/client/Help/OpenTicket";
import FAQ from "layouts/client/Help/FAQ";
import AllTransactions from "layouts/client/financials/components/AllTransactions";
import Withdrawals from "layouts/client/financials/components/Withdrawals";
import Received from "layouts/client/financials/components/Received";
import Sent from "layouts/client/financials/components/Sent";
import TopUps from "layouts/client/financials/components/TopUps";

// Soft UI Dashboard React icons
import { CreditCard, Help, Home, Person } from "@mui/icons-material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Dashboard2 from "layouts/client/dashboard/Dashboard2";
import SoftButton from "components/SoftButton";
import { useSoftUIController } from "context";
import { aceptCard } from "apis/request";
import { SweetAlert } from "apis/sweetAlert";
import NewUser from "layouts/client/activationProcess";
import CardTermsandConditions from "layouts/client/cardTermsandConditions/cardTermsandConditions";
import Receptiants from "layouts/client/receptiants/Receptiants";

export default function createRoutes (user) {
  //const [controller, dispatch] = useSoftUIController();
  if(!user.stripeAccount){
    return[/*
      {
        type:"collapse",
        name: "Activation Process",
        key: "activationa-process",
        route: "/activation-process",
        icon: null,
        component: <NewUser />,
        collapse: false,
      },*/
    ];
  }else{
    return[
      {
        type: "collapse",
        name: "Dashboard",
        key: "dashboard",
        route: "/dashboard",
        icon: <Home />,
        component: <Dashboard2/>,
        collapse: false,
      },
      {
        type: "collapse",
        name: "Financials",
        key: "financials",
        icon: <CreditCard />,
        route: "/financials",
        collapse: [
          {
            type: "collapse",
            name: "Account",
            key: "account",
            route: "/financials/account",
            component: <Accounts />,
            collapse: false,
          },
          {
            type: "collapse",
            name: "My Card",
            key: "mycard",
            route: "/financials/mycard",
            component: <MyCard />,
            collapse: false,
          },
          {
            type: "collapse",
            name: "Transactions",
            key: "transactions",
            route: "/transactions",
            collapse: [
              {
                type: "collapse",
                name: "All Transactions",
                key: "all-transactions",
                route: "/financials/transactions/all-transactions",
                component: <AllTransactions />,
                collapse: false,
              },
              {
                type: "collapse",
                name: "Withdrwals",
                key: "withdrwals",
                route: "/financials/transactions/withdrwals",
                component: <Withdrawals />,
                collapse: false,
              },
              {
                type: "collapse",
                name: "Received",
                key: "received",
                route: "/financials/transactions/received",
                component: <Received />,
                collapse: false,
              },
              {
                type: "collapse",
                name: "Sent",
                key: "sent",
                route: "/financials/transactions/sent",
                component: <Sent />,
                collapse: false,
              },
              {
                type: "collapse",
                name: "Top Up's",
                key: "topups",
                route: "/financials/transactions/topups",
                component: <TopUps />,
                collapse: false,
              },
            ],
          },
        ],
      },
      {
        type: "collapse",
        name: "Account",
        key: "account",
        route: "/account",
        icon: <Person />,
        collapse: [
          {
            type: "collapse",
            name: "Personal Information",
            key: "personal-information",
            route: "/account/personal-information",
            component: <PersonalInfo />,
            collapse: false,
          },
          {
            type: "collapse",
            name: "Receptiants",
            key: "receptiants",
            route: "/account/receptiants",
            component: <Receptiants/>,
            collapse: false,
          },
          {
            type: "collapse",
            name: "Refferals",
            key: "refferals",
            route: "/account/refferals",
            component: <DefaultComponent>My Refferals</DefaultComponent>,
            collapse: false,
          },
          {
            type: "collapse",
            name: "Legal",
            key: "legal",
            route: "/account/legal",
            collapse: [
              {
                type: "collapse",
                name: "Privacy Policy",
                key: "Privacy-Policy",
                route: "/account/Privacy-Policy",
                component: <DefaultComponent>My Privacy-Policy</DefaultComponent>,
                collapse: false,
              },
              {
                type: "collapse",
                name: "Terms & Conditions",
                key: "Terms&Conditions",
                route: "/account/AppTerms&Conditions",
                component: <DefaultComponent>My Terms&Conditions</DefaultComponent>,
                collapse: false,
              },
              {
                type: "collapse",
                name: "Card Terms & Conditions",
                key: "CardTerms&Conditions",
                route: "/account/CardTerms&Conditions",
                component: <CardTermsandConditions/>,
                collapse: false,
              },
            ],
          },
        ],
      },
      {
        type: "collapse",
        name: "Help",
        key: "help",
        route: "/help",
        icon: <Help />,
        collapse: [
          {
            type: "collapse",
            name: "Tickets",
            key: "tickets",
            route: "/help/tickets",
            collapse: [
              {
                type: "collapse",
                name: "My Tickets",
                key: "my-tickets",
                route: "/help/my-tickets",
                component: <MyTickets />,
                collapse: false,
              },
              {
                type: "collapse",
                name: "Open Tickets",
                key: "open-tickets",
                route: "/help/open-tickets",
                component: <OpenTickets />,
                collapse: false,
              },
            ],
          },
          {
            type: "collapse",
            name: "FAQ's",
            key: "faqs",
            route: "/help/faqs",
            component: <FAQ />,
            collapse: false,
          },
        ],
      },
    ]
  }
}

//const routes = CreateRoutes()
 /*[
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard",
    icon: <Home />,
    component: <Dashboard2/>,
    collapse: false,
  },
  {
    type: "collapse",
    name: "Financials",
    key: "financials",
    icon: <CreditCard />,
    route: "/financials",
    collapse: [
      {
        type: "collapse",
        name: "Account",
        key: "account",
        route: "/financials/account",
        component: <Accounts />,
        collapse: false,
      },
      {
        type: "collapse",
        name: "My Card",
        key: "mycard",
        route: "/financials/mycard",
        component: <MyCard />,
        collapse: false,
      },
      {
        type: "collapse",
        name: "Transactions",
        key: "transactions",
        route: "/transactions",
        collapse: [
          {
            type: "collapse",
            name: "All Transactions",
            key: "all-transactions",
            route: "/financials/transactions/all-transactions",
            component: <AllTransactions />,
            collapse: false,
          },
          {
            type: "collapse",
            name: "Withdrwals",
            key: "withdrwals",
            route: "/financials/transactions/withdrwals",
            component: <Withdrawals />,
            collapse: false,
          },
          {
            type: "collapse",
            name: "Received",
            key: "received",
            route: "/financials/transactions/received",
            component: <Received />,
            collapse: false,
          },
          {
            type: "collapse",
            name: "Sent",
            key: "sent",
            route: "/financials/transactions/sent",
            component: <Sent />,
            collapse: false,
          },
          {
            type: "collapse",
            name: "Top Up's",
            key: "topups",
            route: "/financials/transactions/topups",
            component: <TopUps />,
            collapse: false,
          },
        ],
      },
    ],
  },
  {
    type:"collapse",
    name: "Activation Process",
    key: "activationa-process",
    route: "/activation-process",
    icon: null,
    component: <NewUser />,
    collapse: false,
  },
  {
    type: "collapse",
    name: "Account",
    key: "account",
    route: "/account",
    icon: <Person />,
    collapse: [
      {
        type: "collapse",
        name: "Personal Information",
        key: "personal-information",
        route: "/account/personal-information",
        component: <PersonalInfo />,
        collapse: false,
      },
      {
        type: "collapse",
        name: "Receptiants",
        key: "receptiants",
        route: "/account/receptiants",
        component: <DefaultComponent>My Receptiants</DefaultComponent>,
        collapse: false,
      },
      {
        type: "collapse",
        name: "Refferals",
        key: "refferals",
        route: "/account/refferals",
        component: <DefaultComponent>My Refferals</DefaultComponent>,
        collapse: false,
      },
      {
        type: "collapse",
        name: "Legal",
        key: "legal",
        route: "/account/legal",
        collapse: [
          {
            type: "collapse",
            name: "Privacy Policy",
            key: "Privacy-Policy",
            route: "/account/Privacy-Policy",
            component: <DefaultComponent>My Privacy-Policy</DefaultComponent>,
            collapse: false,
          },
          {
            type: "collapse",
            name: "Terms & Conditions",
            key: "Terms&Conditions",
            route: "/account/Terms&Conditions",
            component: <DefaultComponent>My Terms&Conditions</DefaultComponent>,
            collapse: false,
          },
        ],
      },
    ],
  },
  {
    type: "collapse",
    name: "Help",
    key: "help",
    route: "/help",
    icon: <Help />,
    collapse: [
      {
        type: "collapse",
        name: "Tickets",
        key: "tickets",
        route: "/help/tickets",
        collapse: [
          {
            type: "collapse",
            name: "My Tickets",
            key: "my-tickets",
            route: "/help/my-tickets",
            component: <MyTickets />,
            collapse: false,
          },
          {
            type: "collapse",
            name: "Open Tickets",
            key: "open-tickets",
            route: "/help/open-tickets",
            component: <OpenTickets />,
            collapse: false,
          },
        ],
      },
      {
        type: "collapse",
        name: "FAQ's",
        key: "faqs",
        route: "/help/faqs",
        component: <FAQ />,
        collapse: false,
      },
    ],
  },
  {
    type: "collapse",
    name: "Admin",
    key: "admin",
    route: "/admin/dashboard",
    icon: <Home />,
    collapse: [
      {
        type: "collapse",
        name: "Dashboard",
        key: "admin-dashboard",
        route: "/admin/dashboard",
        component: <DefaultComponent>Admin Dashboard</DefaultComponent>,
        collapse: false,
      },
      {
        type: "collapse",
        name: "Transactions",
        key: "admin-transactions",
        route: "/admin/transactions",
        component: <DefaultComponent>Admin Transactions</DefaultComponent>,
        collapse: false,
      },
      {
        type: "collapse",
        name: "Reports",
        key: "admin-reports",
        route: "/admin/resports",
        component: <DefaultComponent>Admin Reports</DefaultComponent>,
        collapse: false,
      },
      {
        type: "collapse",
        name: "New User",
        key: "admin-new-user",
        route: "/admin/new-user",
        component: <DefaultComponent>Admin New User</DefaultComponent>,
        collapse: false,
      },
    ],
  },
];*/

function DefaultComponent(props) {

  return (
    <>
      <DashboardLayout>{props.children}
      </DashboardLayout>
    </>
    
  );
}

