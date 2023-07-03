import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { Card } from "reactstrap";
import { useSoftUIController } from "context";
import SoftAlert from "components/SoftAlert";
import { useEffect } from "react";
import { Grid } from "@mui/material";

export default function StepsToActivate () {
    const [controller, dispatch] = useSoftUIController();

    useEffect(() => {
        //console.log(controller.user)
    }, [controller])


    return(
        <Card
            mb={2}
            sx={{
                // backdropFilter: `saturate(200%) blur(30px)`,
                boxShadow: ({ boxShadows: { navbarBoxShadow } }) => navbarBoxShadow,
                p: 2,
                mt: 3,
                mb: 3
            }}
        >
            <SoftBox mb={1} ml={2} mt={0} display="flex" justifyContent="space-between">
                <SoftBox my={2}>
                    <SoftTypography variant="h5" fontWeight="bolder" color="text">
                        Steps letf to activate the Wallet
                    </SoftTypography>
                </SoftBox>
            </SoftBox>
            <Grid container ml={2} spacing={0} display="flex" flexDirection="column" >
                {controller.user.identityVerified ?
                <></> :
                <SoftBox my={0} mr={4} >
                    <SoftAlert>
                        You need to verify your identity.
                    </SoftAlert>
                </SoftBox>}
                {/*controller.user.phoneVerified ? 
                <></> : 
                <SoftBox my={0}  mr={4}>
                    <SoftAlert>
                        You need to confirm your cellphone.
                    </SoftAlert>
                </SoftBox>*/}
                {controller.user.addressVerified ?
                <></> :
                <SoftBox my={0} mr={4}>
                    <SoftAlert>
                        You need to edit your profile info, and confirm your address.
                    </SoftAlert>
                </SoftBox>
                }
                {controller.user.identityVerified && controller.user.phoneVerified && controller.user.addressVerified && controller.user.stripe.accountID.length < 1 ? 
                <SoftBox my={0} mr={2}>
                    <SoftAlert>
                        You need to log out and log in to activate your Wallet.
                    </SoftAlert>
                </SoftBox> :
                <></>
                }
                {}
            </Grid>
        </Card>
    )

}