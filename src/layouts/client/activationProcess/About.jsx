import React, { useState } from 'react'
import SoftBox from 'components/SoftBox'
import SoftTypography from 'components/SoftTypography'
import { Grid } from '@mui/material'
import { useSoftUIController } from 'context';
import { SweetAlert } from 'apis/sweetAlert';
import { completeGmailUser } from 'apis/request';
import { setUser } from 'context';
import SoftButton from 'components/SoftButton';
import SoftInput from 'components/SoftInput';

export default function About({onSave}) {

    const [controller, dispatch] = useSoftUIController();
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState(controller.user.email);
    const [CEmail, setCEmail] = useState(controller.user.email);
    const [pass, setPass] = useState("");
    const [cPass, setCPass] = useState("");
    const [phone, setPhone] = useState("");
    const [day, setDay] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const [country, setCountry] = useState("GB");

    const handleFormChange = (e) => {
        if (e.target.name === "name") {
          setName(e.target.value);
        }
        if (e.target.name === "lastName") {
          setLastName(e.target.value);
        }
        if (e.target.name === "email") {
          setEmail(e.target.value);
        }
        if (e.target.name === "CEmail") {
          setCEmail(e.target.value);
        }
        if (e.target.name === "pass") {
          setPass(e.target.value);
        }
        if (e.target.name === "cPass") {
          setCPass(e.target.value);
        }
        if(e.target.name === "phone"){
            setPhone(e.target.value)
        }
        if (e.target.name === "day") {
            setDay(e.target.value);
        }
        if (e.target.name === "month") {
            setMonth(e.target.value);
        }
        if (e.target.name === "year") {
          setYear(e.target.value);
        }
        if (e.target.name === "country") {
            setCountry(e.target.value);
        }
      };


    const handleSubmit = (e) => {
        e.preventDefault();
      
        // Verificar campos obligatorios
        if (
            name.trim() === "" ||
            lastName.trim() === "" ||
            email.trim() === "" ||
            CEmail.trim() === "" ||
            //pass.trim() === "" ||
            //cPass.trim() === "" ||
            day.trim() === "" ||
            month.trim() === "" ||
            year.trim() === "" ||
            country.trim() === ""
        ) {
          // Al menos un campo está vacío
            SweetAlert("warning", "Ooops", "Complete all the fields")
            return;
        }
      
        // Verificar coincidencia de correos electrónicos
        if (email !== CEmail) {
            //SweetAlert("warning", "Ooops", "User blocked")
            console.log("Los correos electrónicos no coinciden");
            return;
        }
      
        // Verificar coincidencia de contraseñas
        /*if (pass !== cPass) {
            console.log("Las contraseñas no coinciden");
            return;
        }*/

        // Calcular fecha de nacimiento
        const birthDate = new Date(`${year}-${month}-${day}`);

        // Verificar que el usuario tenga más de 18 años
        const currentDate = new Date();
        const ageDifference = currentDate - birthDate;
        const eighteenYearsInMilliseconds = 18 * 365.25 * 24 * 60 * 60 * 1000; // Aproximadamente 18 años en milisegundos

        if (ageDifference < eighteenYearsInMilliseconds) {
            SweetAlert("warning", "Ooops", "You must have 18 years old or more")
            //console.log("Debes ser mayor de 18 años para registrarte");
            return;
        }
      
        // Todos los campos están completos y las coincidencias son correctas
        const data = {
            name: name,
            lastName: lastName,
            email: email, 
            password: pass,
            day: day,
            month: month,
            year: year,
            country: country,
            phone: phone
        }
        completeGmailUser(controller.user.id, data).then(async (user) => {
            await setUser(dispatch, user)
            SweetAlert("success", "All good", "Info seted");
            onSave();
        }).catch(error => {
            console.log(error);
            SweetAlert("warning", "Ooops", "Sometingh go wrong")
        })
    };

    return (<>
        <SoftBox
            pt={2}
            mb={3}
            px={2}
        >
            <SoftBox display="flex" flexDirection="column" justifyContent="start">
                <SoftTypography variant="h5" fontWeight="medium" textAlign="left">
                    New User
                </SoftTypography>
                <SoftBox mb={1} lineHeight={0} textAlign="left">
                    <SoftTypography
                        variant="h6"
                        fontWeight="light"
                        color="text"
                        textAlign="left"
                    >
                        Mandatory information
                    </SoftTypography>
                </SoftBox>
            </SoftBox>
            <SoftBox textAlign="left">
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} xl={4}>
                        <label>First Name</label>
                        <input
                            class="multisteps-form__input form-control"
                            type="text"
                            placeholder="eg. Michael"
                            name="name"
                            onChange={handleFormChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} xl={4}>
                        <label>Last Name</label>
                        <input
                            class="multisteps-form__input form-control"
                            type="text"
                            placeholder="eg. Prior"
                            name="lastName"
                            onChange={handleFormChange}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} xl={6}>
                        <label>Email Address</label>
                        <input
                            class="multisteps-form__input form-control"
                            type="email"
                            placeholder={controller.user.email}
                            name="email"
                            value={controller.user.email}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} xl={6}>
                        <label>Repeat Email Address</label>
                        <input
                            class="multisteps-form__input form-control"
                            type="email"
                            placeholder={controller.user.email}
                            name="CEmail"
                            value={controller.user.email}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                {/*    <Grid item xs={12} sm={6} xl={6}>
                        <label>Password</label>
                        <input
                            class="multisteps-form__input form-control"
                            type="password"
                            placeholder="******"
                            name="pass"
                            onChange={handleFormChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} xl={6}>
                        <label>Repeat Password</label>
                        <input
                            class="multisteps-form__input form-control"
                            type="password"
                            placeholder="******"
                            name="cPass"
                            onChange={handleFormChange}
                        />
                    </Grid>*/}
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} xl={6}>
                        <label>Phone</label>
                        <input
                            class="multisteps-form__input form-control"
                            type="phone"
                            placeholder="4455667788"
                            name="phone"
                            onChange={handleFormChange}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} xl={6}>
                        <label>Day BirthDay</label>
                        <SoftInput
                            min="1"
                            type="number"
                            placeholder="Day"
                            name="day"
                            onChange={handleFormChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} xl={6}>
                        <label>Month BirthDay</label>
                        <SoftInput
                        min="1"
                        type="number"
                        placeholder="Month"
                        name="month"
                        onChange={handleFormChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} xl={6}>
                        <label>Year BirthDay</label>
                        <SoftInput
                        min="1"
                        type="number"
                        placeholder="Year"
                        name="year"
                        onChange={handleFormChange}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} xl={6}>
                        <label>Country</label>
                            <select name="country" class="form-select" id="country-select" onChange={handleFormChange}>
                                <option value="GB">United Kingdom</option>
                                <option value="US">The United States</option>
                            </select>
                    </Grid>
                </Grid>
            </SoftBox>
            <SoftBox mb={1} mt={2} px={2} display="flex" justifyContent="flex-end">
                <SoftButton
                        variant="gradient"
                        color="dark"
                        onClick={handleSubmit}
                    >
                        Create User
                </SoftButton>
            </SoftBox> 
        </SoftBox>
    </>)
}