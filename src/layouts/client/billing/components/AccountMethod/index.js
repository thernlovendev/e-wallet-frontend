import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";

// Soft UI Dashboard React base styles
import borders from "assets/theme/base/borders";

// Images
import masterCardLogo from "assets/images/logos/mastercard.png";
import visaLogo from "assets/images/logos/visa.png";
import { useEffect, useState } from "react";
import SoftModal from "components/SoftModal";
import { Link } from "react-router-dom";
import SoftInput from "components/SoftInput";
import { addCard } from "apis/request";
import { useSoftUIController } from "context";
import { SweetAlert } from "apis/sweetAlert";
import { setUser } from "context";
import { addBanckAccount } from "apis/request";
import { addMoney2 } from "apis/request";
import { confirmCodeCharge } from "apis/request";
import { userTransfer2 } from "apis/request";
import { confirmCodeTransfer } from "apis/request";
import { withdraw2 } from "apis/request";
import { confirmCodeWithdraw } from "apis/request";

function AccountMethod() {
  const [controller, dispatch] = useSoftUIController();
  const [changeCurrencys, setChangeCurrencys] = useState(controller.currencys)
  const { borderWidth, borderColor } = borders;
  const [modal, setModal] = useState({
    addMoney: false,
    sendMoney: false,
    addCard: false,
    banckAccount : false,
    confirmCode : false,
    withdraw : false
  });
  const [localAmount, setLocalAmount] = useState(0);
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState(controller.user.currency);
  const [cardNumber, setCardNumber] = useState(0);
  const [CVC, setCVC] = useState(0);
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(0);
  const [accountNumber, setAccountNumber] = useState(0);
  const [selectedCard, setSelectedCard] = useState("");
  const [action, setAction] = useState("");
  const [confirmCode, setConfirmCode] = useState(0);
  const [destination, setDestination] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const toSearch = currency + controller.user.currency;
    const index = controller.currencys.changes.findIndex(element => element.currencys === toSearch);
    const index2 = controller.user.amount.findIndex(element => element.currency === currency)
    setIndex(index2);
    if (index !== -1) {
      const localAmount2 = amount * controller.currencys.changes[index].rate;
      setLocalAmount(localAmount2.toFixed(2));
    } else {
      setLocalAmount(amount);
    }
  }, [amount, currency, controller.currencys.changes, controller.user.currency]);

  const handleChange = async (e) => {
    if(e.target.name === "destination"){
      setDestination(e.target.value)
    }
    if(e.target.name === "confirmCode"){
      setConfirmCode(e.target.value)
    }
    if(e.target.name === "selectedCard"){
      setSelectedCard(e.target.value)
    }
    if(e.target.name === "cardNumber"){
      setCardNumber(e.target.value)
    }
    if(e.target.name === "CVC"){
      setCVC(e.target.value)
    }
    if(e.target.name === "month"){
      setMonth(e.target.value)
    }
    if(e.target.name === "year"){
      setYear(e.target.value)
    }
    if(e.target.name === "accountNumber"){
      setAccountNumber(e.target.value)
    }
    if(e.target.name === "currency"){
      await setCurrency(e.target.value)
{/*      const toSearch = await currency + controller.user.currency
      const index = await controller.currencys.changes.findIndex(element => element.currencys === toSearch);
      if(index != -1){
        const localAmount2 = await amount * controller.currencys.changes[index].rate
        await setLocalAmount(localAmount2.toFixed(2))
      }else{
        await setLocalAmount(amount)
      }*/}
    }
    if(e.target.name === "amount"){
      await setAmount(e.target.value)
{/*      const toSearch = await currency + controller.user.currency
      const index = await controller.currencys.changes.findIndex(element => element.currencys === toSearch);
      if(index != -1){
        const localAmount2 = await amount * controller.currencys.changes[index].rate
        await setLocalAmount(localAmount2.toFixed(2))
      }else{
        await setLocalAmount(amount)
      }*/}
    }
  }

  const handleAddMoney = async () => {
    if(controller.user.stripe.customerID.length < 1){
      SweetAlert("warning", "Ooops", "You must finish the activation proccess, go to account and then to personal information for more info")
    }else{
        await addMoney2(controller.user.id, amount, selectedCard, currency, localAmount).then(async (user) => {
          await setAction("charge")
          console.log(action)
          toggleAddMoney();
          toggleConfirmCode();
        }).catch(error => {
          if(error === 400){
            SweetAlert("warning", "Ooops", "Sometingh go wrong with the payment")
          }
          if(error === 404){
            SweetAlert("warning", "Ooops", "Something went wrong")
          }
        })
    }
  }

  const handleSendMoney = () => {
    if(controller.user.stripe.customerID.length < 1){
      SweetAlert("warning", "Ooops", "You must finish the activation proccess, go to account and then to personal information for more info")
    }else{
      userTransfer2(controller.user.id, amount, destination, currency).then(async (user) => {
        await setAction("transfer")
        toggleSendMoney();
        toggleConfirmCode();
      }).catch(error => {
        if(error === 400){
          SweetAlert("warning", "Ooops", "Not enough founds")
        }
        if(error === 401){
          SweetAlert("warning", "Ooops", "No user with that email")
        }
        if(error === 402){
          SweetAlert("warning", "Ooops", "The destination do not activated their account")
        }
      })
    }
  }

  const handleAddBanckAccount = () => {
    if(controller.user.stripe.accountID.length < 1){
      SweetAlert("warning", "Ooops", "You must go to account and then to personal information and complete your activation proccess")
    }else if(!controller.user.identityVerified && !controller.user.phoneVerified && !controller.user.addressVerified){
      SweetAlert("warning", "Ooops", "You must go to account and then to personal information and complete your activation proccess")
    }else{
      addBanckAccount(controller.user.id, accountNumber).then(async (user) => {
        await setUser(dispatch, user)
        toggleAddBanckAccount();
        SweetAlert("success", "All good", "Bank Account added")
      }).catch(error => {
        if (error === 400){
          SweetAlert("warning", "Ooops", "Wrong account data")
        }
        if(error === 404){
          SweetAlert("warning", "Ooops", "Something went wrong")
        }
      })
    }
  }

  const handleWithdraw = async () => {
    if(controller.user.stripe.customerID.length < 1){
      SweetAlert("warning", "Ooops", "You must finish the activation proccess, go to account and then to personal information for more info")
    }else{
      await withdraw2(controller.user.id, amount, currency, localAmount).then(async (user) => {
        await setAction("withdraw")
        toggleWithdraw();
        toggleConfirmCode();
      }).catch(error => {
        if(error === 400){
          SweetAlert("warning", "Ooops", "Not enough founds")
        }
        if(error === 401){
          SweetAlert("warning", "Ooops", "No user with that email")
        }
        if(error === 402){
          SweetAlert("warning", "Ooops", "The destination do not activated their account")
        }
      })
    }
  }

  const handleConfirmCode = async () => {
    if(action == "charge"){
      await confirmCodeCharge(controller.user.id, confirmCode).then(user => {
        setUser(dispatch, user)
        toggleConfirmCode();
        SweetAlert("success", "All good", "Money added to your Wallet")
      }).catch(error => {
        if(error === 400){
          SweetAlert("warning", "Ooops", "Wrong confirmation code")
        }
        if(error === 404){

        }
      })
    }else if(action === "transfer"){
      confirmCodeTransfer(controller.user.id, confirmCode).then(user => {
        toggleConfirmCode();
        setUser(dispatch, user)
        SweetAlert("success", "All good", "Founds transfered")
      }).catch(error => {
        if(error === 400){
          SweetAlert("warning", "Ooops", "Wrong confirmation code")
        }
        if(error === 404){
          
        }
      })
    }else if(action === "withdraw" ){
      confirmCodeWithdraw(controller.user.id, confirmCode).then(user => {
        setUser(dispatch, user)
        toggleConfirmCode();
        SweetAlert("success", "All good", "Money sent to your bank account")
      }).catch(error => {
        if(error === 400){
          SweetAlert("warning", "Ooops", "Wrong confirmation code")
        }
        if(error === 404){

        }
      })
    }
  }

  const toggleAddMoney = () =>  {
    setCurrency(controller.user.currency)
    const index2 = controller.user.amount.findIndex(element => element.currency === currency)
    setIndex(index2);
    setModal((prev) => ({ ...prev, addMoney: !prev.addMoney }))
  };
  const toggleSendMoney = () => {{
    setCurrency(controller.user.currency)
    const index2 = controller.user.amount.findIndex(element => element.currency === currency)
    setIndex(index2);
    setModal((prev) => ({...prev, sendMoney: !prev.sendMoney }))}
  };
  const toggleAddBanckAccount = () => setModal((prev) => ({ ...prev, banckAccount: !prev.banckAccount }))
  const toggleConfirmCode = () => setModal((prev) => ({ ...prev, confirmCode: !prev.confirmCode }))
  const toggleWithdraw = () =>  {
    setCurrency(controller.user.currency)
    const index2 = controller.user.amount.findIndex(element => element.currency === currency)
    setIndex(index2);
    setModal((prev) => ({ ...prev, withdraw: !prev.withdraw }))
  }

  return (
    <Card id="delete-account">
      <SoftBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
        <SoftTypography variant="h6" fontWeight="medium">
          Back Account Method
        </SoftTypography>
        <SoftBox display="flex" gap={1} alignItems="center">
          <SoftButton variant="gradient" color="dark" onClick={toggleAddMoney}>
            <Icon sx={{ fontWeight: "bold" }}>money</Icon>
            &nbsp;Add Money
          </SoftButton>
          <SoftButton variant="gradient" color="primary" onClick={toggleSendMoney}>
            <Icon sx={{ fontWeight: "bold" }}>send</Icon>
            &nbsp;Send Money
          </SoftButton>
          <SoftButton variant="gradient" color="dark" onClick={toggleWithdraw}>
            <Icon sx={{ fontWeight: "bold" }}>shopping_cart</Icon>
            &nbsp;Withdraw
          </SoftButton>
        </SoftBox>
      </SoftBox>
      <SoftBox p={2}>
        <Grid container spacing={3}>
          {controller.user.banckAccount.map(card => {
            return(
            <Grid item xs={12} md={6}>
              <SoftBox
                border={`${borderWidth[1]} solid ${borderColor}`}
                borderRadius="lg"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                p={3}
              >
                {/*<SoftBox component="img" src={card.brand === "Visa" ? visaLogo : masterCardLogo} alt={card.brand === "Visa" ? "visa card" : "master card"} width="10%" mr={2} />*/}
                <SoftTypography variant="h6" fontWeight="medium">
                  ****&nbsp;&nbsp;****&nbsp;&nbsp;****&nbsp;&nbsp;{card.last4}
                </SoftTypography>
                <SoftBox ml="auto" lineHeight={0}>
                  <Tooltip title="Delete Card" placement="top">
                    <Icon sx={{ cursor: "pointer" }} fontSize="small">
                      delete
                    </Icon>
                  </Tooltip>
                </SoftBox>
              </SoftBox>
            </Grid>
          )})}
        </Grid>
      </SoftBox>
      <SoftBox ml={2} >
        <Link onClick={toggleAddBanckAccount} className="text-sm">Add a Banck Account</Link>
      </SoftBox>
      <SoftModal
        header="Add Money"
        toggle={toggleAddMoney}
        open={modal.addMoney}
        body={
          <>
            <div class="row">
              <div class="form-group col-12">
                <label for="">Select Card</label>
                <select class="form-control" name="selectedCard" onClick={handleChange} onChange={handleChange} >
                  {controller.user.banckAccount.map(card => {
                    return(
                      <option value={card.id}>****** {card.last4}</option>
                    )
                  })}
                </select>
              </div>
            </div>
            <div class="row mt-2">
              <div class="form-group col-2">
                <select name="currency" class="form-control" onChange={handleChange}>
                  <option value="USD" >USD</option>
                  <option value="EUR" >EUR</option>
                  <option value="GBP" >GBP</option>
{/*                  <option>SEK</option>
                  <option>SGD</option>*/}
                </select>
                <label>{controller.user.amount[index].amount.toFixed(2)}  </label>
              </div>
              <div class="form-group col-10">
                <input
                  type="number"
                  class="form-control"
                  name="amount"
                  placeholder="00.00"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div class="row mt-2">
            <label for="">Fee we charge you: 4.4%</label>
{/*              <div class="form-group col-2">
                <label for="">{controller.user.currency}</label>
              </div>
              <div class="form-group col-10">
                <label class="form-control" for="">{localAmount}</label>
              </div>*/}
            </div>
          </>
        }
        footer={
          <SoftBox display="flex" gap="5px">
            <SoftButton component="button" color={"secondary"} onClick={toggleAddMoney}>
              Cancel
            </SoftButton>
            <SoftButton component="button" color={"success"} onClick={handleAddMoney} >
              Add
            </SoftButton>
          </SoftBox>
        }
      />
      <SoftModal
        header="Withdraw"
        toggle={toggleWithdraw}
        open={modal.withdraw}
        body={
          <>
            <div class="row mt-2">
            <label for="">Choose your withdraw</label>
              <div class="form-group col-2">
                <select name="currency" class="form-control" onChange={handleChange}>
                  <option value="GBP" >GBP</option>
                  <option value="USD" >USD</option>
                  <option value="EUR" >EUR</option>
{/*                  <option>SEK</option>
                  <option>SGD</option>*/}
                </select>
                <label>{controller.user.amount[index].amount.toFixed(2)}  </label>
              </div>
              <div class="form-group col-10">
                <input
                  type="number"
                  class="form-control"
                  name="amount"
                  placeholder="00.00"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div class="row mt-2">
            <label for="">Amount to charge in your local Currency</label>
              <div class="form-group col-2">
                <label for="">{controller.user.currency}</label>
              </div>
              <div class="form-group col-10">
                <label class="form-control" for="">{localAmount}</label>
              </div>
            </div>
          </>
        }
        footer={
          <SoftBox display="flex" gap="5px">
            <SoftButton component="button" color={"secondary"} onClick={toggleWithdraw}>
              Cancel
            </SoftButton>
            <SoftButton component="button" color={"success"} onClick={handleWithdraw} >
              Withdraw
            </SoftButton>
          </SoftBox>
        }
      />
      <SoftModal
        header="Send Money"
        toggle={toggleSendMoney}
        open={modal.sendMoney}
        body={
          <>
            <div class="row mt-4">
            <label for="exampleFormControlSelect1">Amount and currency to transfer</label>
              <div class="form-group col-2">
                <select class="form-control" name="currency" onChange={handleChange} >
                  <option value="USD" >USD</option>
                  <option value="EUR" >EUR</option>
                  <option value="GBP" >GBP</option>
{ /*                 <option>SEK</option>
                  <option>SGD</option>*/}
                </select>
                <label>{controller.user.amount[index].amount.toFixed(2)}  </label>
              </div>
              <div class="form-group col-10">
                <input
                  type="number"
                  class="form-control"
                  name="amount"
                  placeholder="00.00"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div class="form-group">
              <label for="exampleFormControlSelect1">Choose a Previus recepiant (with the email)</label>
{              <select onChange={handleChange} name="destination" class="form-control" id="exampleFormControlSelect1">
                <option selected>Used Recepiants</option>
                {controller.user.recepiants.map(recepiant => {
                  return(
                    <option value={recepiant.email}>{recepiant.email}</option>
                  )
                })}
              </select>}
              <label for="exampleFormControlSelect1">Or type a new one</label>
              <div class="form-group col-10">
                <input
                  type="text"
                  class="form-control"
                  name="destination"
                  placeholder="example@gmail.com"
                  onChange={handleChange}
                />
              </div>
            </div>
            <Link to="" className="text-sm">
              Add new receptiant
            </Link>
          </>
        }
        footer={
          <SoftBox display="flex" gap="5px">
            <SoftButton component="button" color={"secondary"} onClick={toggleSendMoney}>
              Cancel
            </SoftButton>
            <SoftButton component="button" color={"success"} onClick={handleSendMoney} >
              Send
            </SoftButton>
          </SoftBox>
        }
      />
      <SoftModal
        header="Confirmation code"
        toggle={toggleConfirmCode}
        open={modal.confirmCode}
        body={
          <>
            <div class="form-group">
              <SoftTypography variant="h6" fontWeight="medium">
                Put your confirmation code (123456)
              </SoftTypography>
              <SoftInput
                  type="number"
                  placeholder="123456"
                  name="confirmCode"
                  onChange={handleChange}
                />
            </div>
          </>
        }
        footer={
          <SoftBox display="flex" gap="5px">
            <SoftButton component="button" color={"secondary"} onClick={toggleConfirmCode}>
              Cancel
            </SoftButton>
            <SoftButton component="button" color={"success"} onClick={handleConfirmCode} >
              Add Account
            </SoftButton>
          </SoftBox>
        }
      />
      <SoftModal
        header="Add a back Account (It's must be an Account from the country you select when you Sing-Up)"
        toggle={toggleAddBanckAccount}
        open={modal.banckAccount}
        body={
          <>
            <div class="form-group">
              <SoftTypography variant="h6" fontWeight="medium">
                Account number
              </SoftTypography>
              <SoftInput
                    min="1"
                    type="number"
                    placeholder="444444444444"
                    name="accountNumber"
                    onChange={handleChange}
                />
            </div>
            <div class="form-group">
              <SoftTypography variant="h6" fontWeight="medium">
                Routing number
              </SoftTypography>
                <div class="form-group col-2">
                <SoftInput
                    min="1"
                    type="number"
                    placeholder="444444444"
                    name="routing"
                    onChange={handleChange}
                />
                </div>
            </div>
          </>
        }
        footer={
          <SoftBox display="flex" gap="5px">
            <SoftButton component="button" color={"secondary"} onClick={toggleAddBanckAccount}>
              Cancel
            </SoftButton>
            <SoftButton component="button" color={"success"} onClick={handleAddBanckAccount} >
              Add Account
            </SoftButton>
          </SoftBox>
        }
      />
    </Card>
  );
}

export default AccountMethod;