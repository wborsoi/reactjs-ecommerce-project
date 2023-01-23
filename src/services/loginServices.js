import { database } from '../firebase/config';
import * as firestore from 'firebase/firestore'

export async function signinUser(email, password, fistName, lastName) {
    const userData = {
        fistName: fistName ? fistName : null,
        lastName: lastName ? lastName : null,
        email: email,
        password: password
    }
    //let allUsersList = JSON.parse(localStorage.getItem("userDatabase"));

    /***************************************************** */
    const collection = firestore.collection(database, "/users");
    const query = firestore.query(collection, firestore.where("email", "==", String(email)));
    const userPromise = await firestore.getDocs(query);

    return new Promise((resolve) => {
        if (userPromise.size) {
            resolve({
                success: false,
                msg: "Ya existe una cuenta con el email indicado."
            });
        }
        else {
            firestore.addDoc(collection, userData);
            resolve({
                success: true,
                msg: "Usuario registrado exitosamente."
            });
        }
    })


    /***************************************************** */



    // if (!allUsersList || allUsersList.length <= 0) {
    //     localStorage.setItem("userDatabase", JSON.stringify([]));
    //     allUsersList = JSON.parse(localStorage.getItem("userDatabase"));
    // }

    // for (const user of allUsersList) {
    //     if (user && String(user?.email) === String(email)) {
    //         return {
    //             success: false,
    //             msg: "Ya existe una cuenta con el email indicado."
    //         }
    //     }
    // }

    // localStorage.setItem("userDatabase", JSON.stringify([...allUsersList, sesionObj]));
    // return {
    //     success: true,
    //     msg: "Usuario registrado exitosamente.",
    //     sesionObj
    // }
}

export async function loginUser(email, password) {
    const collection = firestore.collection(database, "/users");
    const query = firestore.query(collection, firestore.where("email", "==", String(email)), firestore.where("password", "==", String(password)));
    const userPromise = await firestore.getDocs(query);


    return new Promise((resolve) => {
        if (userPromise.size) {
            userPromise.forEach((userDB) => {
                const userData = {
                    id: userDB.id,
                    ...userDB.data()
                }

                if (String(userData?.email) === String(email) && String(userData?.password) === String(password)) {
                    localStorage.setItem("userSesion", JSON.stringify(userData));
                    console.log("User from database", userData);

                    resolve({
                        success: true,
                        msg: "Inicio de sesion exitoso",
                        user: userData
                    })
                }

            });
        }
        resolve({
            success: false,
            msg: "No se pudo inicial sesion. Por favor validar las credenciales ingresadas"
        });
    })
}

export function getUserSesion() {
    const userSesion = JSON.parse(localStorage.getItem("userSesion"));
    return userSesion;
}

export function logout() {
    localStorage.removeItem("userSesion");
}