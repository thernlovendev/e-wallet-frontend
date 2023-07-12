import { requestCreditCard } from "apis/request";
import { SweetAlert } from "apis/sweetAlert";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftTypography from "components/SoftTypography";
import { setUser } from "context";
import { useSoftUIController } from "context";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { Card } from "reactstrap";

function CardTermsandConditions () {
    const [controller, dispatch] = useSoftUIController();

    const handleClick = () => {
        if(controller.user.stripeCard.id != "in revision" && controller.user.stripeCard != "rejected"){
            requestCreditCard(controller.user.id).then(async (user) => {
                SweetAlert("success", "All good", "Card requested")
                await setUser(dispatch, user)
            }).catch(error => {
                if(error === 404){
                  SweetAlert("warning", "Ooops", "Something went wrong")
                }
            })
        }else{
            SweetAlert("warning", "Ooops", "You cant request the card")
        }
    }

    return(
        <DashboardLayout>
            <Card>
            <SoftBox display="flex" flexDirection="colum" justifyContent="space-between" alignItems="center" p={3}>
                <SoftTypography variant="h5">Card Terms and Conditions</SoftTypography>
            </SoftBox>
            <SoftBox ml={4} mb={3}>
                <SoftTypography variant="h6">Write the terms</SoftTypography>
            </SoftBox>
                {controller.user.stripeCard.id === "in revision"}
                <SoftButton variant="contained" color="primary" onClick={handleClick}>
                    Acept the terms and conditions and request the card
                </SoftButton>
            </Card>
        </DashboardLayout>
    )
}

export default CardTermsandConditions;