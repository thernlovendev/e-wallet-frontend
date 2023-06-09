import SoftBox from "components/SoftBox"
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";
import SoftModal from "components/SoftModal";
import SoftTypography from "components/SoftTypography";
import { useEffect, useState } from "react";


export default function EditPhone ({show, onSave, reSend}) {
    const [phone, setPhone] = useState(0);
    const [countryCode, setCountryCode] = useState(0);
    const [showCode, setShowCode] = useState(false);
    const [Show, setShow] = useState(show);



    const handleChange = (e) => {
        if(e.target.name === "phone"){
            setPhone(e.target.value)
        }
        if(e.target.name === "countryCode"){
            setCountryCode(e.target.value)
        }
    }

    const handleShow = () => {
        setShow(false)
    }

    const handleSave = () => {
        onSave()
    }


    return(
        <SoftModal
        header="Edit your CellPhone number"
        //toggle={toggleAddMoney}
        open={Show}
        body={
          <>
            <div class="row mt-2">
              <div class="form-group col-10">
                <input
                  type="number"
                  class="form-control"
                  name="phone"
                  placeholder="SMS code"
                  onChange={handleChange}
                />
              </div>
            </div>
            <SoftBox display="flex" gap="5px" >
                <SoftTypography variant="h6" fontWeight="medium">
                    Change your CellPhone
                </SoftTypography>
                <SoftInput
                    min="1"
                    type="number"
                    placeholder="country code"
                    name="countryCode"
                    onChange={handleChange}
                />
                <SoftInput
                    min="1"
                    type="number"
                    placeholder="cellphone number"
                    name="phone"
                    onChange={handleChange}
                />
            </SoftBox>
          </>
        }
        footer={
          <SoftBox display="flex" gap="5px">
            <SoftButton component="button" color={"secondary"} onClick={handleShow}>
              Cancel
            </SoftButton>
            <SoftButton component="button" color={"success"} onClick={handleSave} >
              Confirm Code
            </SoftButton>
            <SoftButton component="button" color={"success"} onClick={reSend} >
              Re-Send Code
            </SoftButton>
          </SoftBox>
        }
      />
    )
}