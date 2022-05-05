import React, { useState, useEffect } from 'react';
import styles from './CreateAccount.module.scss'
import Account from '../services/account'

const Createaccount = () => {

    const [form, setForm] = useState({
        userName: '',
        rut: '',
        password: '',
        confirmPassword: '',
        email: ''
    });

    const {userName, rut, password, confirmPassword, email} = form

    const handleForm = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        // console.log(form)
        validar();
    }, [form]);

    const [error, setError] = useState({
        userName: '',
        rut: '',
        password: '',
        confirmPassword: '',
        email: ''
    });

    const [validated, setValidated] = useState({
        userName: false,
        rut: false,
        password: false,
        confirmPassword: false,
        email: false
    });

    const validar = () => {

        const error = {
            userName: '',
            rut: '',
            password: '',
            confirmPassword: '',
            email: ''
        }

        if(userName.length > 0 && userName.length < 5) {
            error.userName = 'El nombre debe contener 5 o más caracteres.'
            validated.userName = false
        } else if (userName !== '') {
            validated.userName = true
        }

        if(rut.length > 0 && !validarRut(rut)) {
            error.rut = 'El RUT debe ser válido. Ejemplo: 16235058-7'
            validated.rut = false
        } else if (rut !== '') {
            validated.rut = true
        }

        if(password.length > 0 && password.length < 4) {
            error.password = 'La contraseña debe contener 4 o más caracteres.'
            validated.password = false
        } else if (password !== ''){
            validated.password = true
        }

        if(confirmPassword !== password && confirmPassword > 0) {
            error.confirmPassword = 'Las contraseñas no coinciden.'
            validated.confirmPassword = false
        } else if (confirmPassword !== '') {
            validated.confirmPassword = true
        }

        if(email.length > 0 && !validarEmail(email)) {
            error.email = 'El correo electrónico debe ser válido.'
            validated.email = false
        } else if (email !== '') {
            error.email = ''
            validated.email = true
        }

        setError(error)

    }

    const validarRut = (rut) => {
        if (rut.toString().trim() !== '' && rut.toString().indexOf('-') > 0) {
            let caracteres = [];
            let serie = [2, 3, 4, 5, 6, 7];
            let dig = rut.toString().substr(rut.toString().length - 1, 1);
            rut = rut.toString().substr(0, rut.toString().length - 2);
    
            for (let i = 0; i < rut.length; i++) {
                caracteres[i] = parseInt(rut.charAt((rut.length - (i + 1))));
            }
    
            let sumatoria = 0;
            let k = 0;
            let resto = 0;
    
            for (let j = 0; j < caracteres.length; j++) {
                if (k === 6) {
                    k = 0;
                }
                sumatoria += parseInt(caracteres[j]) * parseInt(serie[k]);
                k++;
            }
    
            resto = sumatoria % 11;
            let dv = 11 - resto;
    
            if (dv === 10) {
                dv = "K";
            }
            else if (dv === 11) {
                dv = 0;
            }
    
            if (dv.toString().trim().toUpperCase() === dig.toString().trim().toUpperCase())
                return true;
            else
                return false;
        }
        else {
            return false;
        }
    }

    const validarEmail = (email) => {
        let RegExPattern = /(^[0-9a-zA-Z]+[-._+&])*[0-9a-zA-Z]+@([-0-9a-zA-Z]+[.])+[a-zA-Z]{2,6}$/;
        return RegExPattern.test(email);
    }

    const validarCuenta = () => {
        if (validated.userName === true && validated.rut === true && validated.email === true && validated.password === true && validated.confirmPassword === true) {
            return 1
        } else {
            return 0
        }
    }

    const crearCuenta = (e) => {
        e.preventDefault()
        if (validarCuenta()) {

            const cleanForm = {
                userName: '',
                rut: '',
                password: '',
                confirmPassword: '',
                email: '',
                submitted: false
            }
    
            const cleanValidated = {
                userName: false,
                rut: false,
                password: false,
                confirmPassword: false,
                email: false
            }

            // const newUser = {userName, rut, password, email}
            // let nuevaCuenta = new Account
            // nuevaCuenta(userName, rut, 101000)

            const newUser = new Account(userName, rut, 101000)
            console.log(newUser)
            console.log('Cuenta creada!', newUser)
            setForm(cleanForm)
            setValidated(cleanValidated)

        }
        
    }

    return (
        <div>
            <form onSubmit={crearCuenta}>
                <div>
                    <label htmlFor="userName">Nombre</label>
                    <input type="text" name="userName" required value={userName} onChange={handleForm}/>
                    {error.userName.length > 0 && <div><div className={styles.triangle}></div><div className={styles.error}>{error.userName}</div></div>}
                </div>
                <div>
                    <label htmlFor="rut">RUT</label>
                    <input type="text" name="rut" required value={rut} onChange={handleForm}/>
                    {error.rut.length > 0 && <div><div className={styles.triangle}></div><div className={styles.error}>{error.rut}</div></div>}
                </div>
                <div>
                    <label htmlFor="email">Correo electrónico</label>
                    <input type="text" name="email" required value={email} onChange={handleForm}/>
                    {error.email.length > 0 && <div><div className={styles.triangle}></div><div className={styles.error}>{error.email}</div></div>}
                </div>
                <div>
                    <label htmlFor="password">Contraseña</label>
                    <input type="password" name="password" required value={password} onChange={handleForm}/>
                    {error.password.length > 0 && <div><div className={styles.triangle}></div><div className={styles.error}>{error.password}</div></div>}
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirmar contraseña</label>
                    <input type="password" name="confirmPassword" required value={confirmPassword} onChange={handleForm}/>
                    {error.confirmPassword.length > 0 && <div><div className={styles.triangle}></div><div className={styles.error}>{error.confirmPassword}</div></div>}
                </div>
                <button id="btnCrearCuenta" type="submit" disabled={!validarCuenta()}><i className="fas fa-check-circle"></i> Crear cuenta</button>
            </form>
        </div>
    );
}

export default Createaccount;
