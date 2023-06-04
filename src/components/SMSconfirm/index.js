import SoftBox from "components/SoftBox"
import SoftButton from "components/SoftButton"
import SoftModal from "components/SoftModal"
import { useState } from "react"


export default function SMSconfirm ({show, onSave, reSend}) {
    const [Show, setShow] = useState(show)
    const [code, setCode] = useState(0)

    const handleShow = () => {
        setShow(false)
    }

    const handleChange = (e) => {
        if(e.target.name === "code"){
            setCode(e.target.value)
        }
    }

    const handleSave = () => {
        onSave(code)
    }

    return(
        <SoftModal
        header="Confirm SMS Code"
        //toggle={toggleAddMoney}
        open={Show}
        body={
          <>
            <div class="row mt-2">
              <div class="form-group col-10">
                <input
                  type="number"
                  class="form-control"
                  name="code"
                  placeholder="SMS code"
                  onChange={handleChange}
                />
              </div>
            </div>
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