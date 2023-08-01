import { Card, Grid } from "@mui/material";
import { requestCreditCard } from "apis/request";
import { SweetAlert } from "apis/sweetAlert";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftTypography from "components/SoftTypography";
import { setUser } from "context";
import { useSoftUIController } from "context";
import MasterCard from "examples/Cards/MasterCard";
import RequestPyzen from "examples/Cards/RequestPyzen";


function PyzenCard () {
    const [controller, dispatch] = useSoftUIController();

    return(
        <div style={{height:"100%", weight:"100%"}} >
        <Card>
        <Grid container>
            { Object.keys(controller.user.stripeCard[0].id).length > 1 ? (
            controller.user.stripeCard.map((card) => {
                return card.id === "in revision" ? (
                <Grid item xs={12} sm={12} xl={12} key={card.id}>
                    <MasterCard
                    id={card.id}
                    number={"**In Revision **"}
                    holder={controller.user.name + " " + controller.user.lastName}
                    expires={"xx" + "/" + "xx"}
                    />
                </Grid>
                ) : card.id === "rejected" ? (<Grid item xs={12} sm={12} xl={12}>
                    <RequestPyzen
                    id={"rejected"}
                    number={"Request rejected"}
                    holder={controller.user.name + " " + controller.user.lastName}
                    expires={"xx" + "/" + "xx"}
                    />
                </Grid>): (
                <Grid item xs={12} sm={12} xl={12} key={card.id}>
                    <MasterCard
                    id={card.id}
                    number={"************" + card.last4}
                    holder={controller.user.name + " " + controller.user.lastName}
                    expires={card.exp_month.toString() + "/" + card.exp_year.toString()}
                    />
                </Grid>
                );
            })
            ) :  (
            <Grid item xs={12} sm={12} xl={12}>
                    <RequestPyzen
                    id={"Request"}
                    number={"Request the card"}
                    holder={controller.user.name + " " + controller.user.lastName}
                    expires={"xx" + "/" + "xx"}
                    />
            </Grid>
            )}
        </Grid>
        </Card>
        </div>
    )
}

export default PyzenCard;