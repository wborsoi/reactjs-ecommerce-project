import { database } from '../firebase/config';
import * as firestore from 'firebase/firestore'

export async function signinUser(email, password, firstName, lastName) {
    const userData = {
        firstName: firstName ? firstName : null,
        lastName: lastName ? lastName : null,
        email: email,
        password: password
    }

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
                    localStorage.setItem("userSession", JSON.stringify(userData));

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

export function getUserSession() {
    const userSession = JSON.parse(localStorage.getItem("userSession"));
    loginUser(userSession?.email, userSession?.password);

    return userSession;
}

export function logout() {
    localStorage.removeItem("userSession");
}