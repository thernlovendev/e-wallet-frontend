import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import TimelineItem from "examples/Timeline/TimelineItem";

function TimelineDetails() {
    return (<>
        <SoftBox pt={3} px={3}>
            <SoftTypography variant="h6" fontWeight="medium" textAlign="left">
                Track order
            </SoftTypography>
        </SoftBox>
        <SoftBox p={2} textAlign="left">
            <TimelineItem
                color="dark"
                icon="notifications"
                title="Transaction Started"
                dateTime="22 DEC 7:20 PM"
            />
            <TimelineItem
                color="error"
                icon="inventory_2"
                title="Generate transaction id #243598234"
                dateTime="22 DEC 7:21 AM"
            />
            <TimelineItem
                color="info"
                icon="shopping_cart"
                title="Payment Sent"
                dateTime="22 DEC 8:10 AM"
            />
            <TimelineItem
                color="success"
                icon="payment"
                title="Transaction Completed"
                dateTime="22 DEC 4:54 PM"
            />
            <SoftButton variant="gradient" color="error">
                HELP
            </SoftButton>
        </SoftBox>
    </>
    );
}

export default TimelineDetails;