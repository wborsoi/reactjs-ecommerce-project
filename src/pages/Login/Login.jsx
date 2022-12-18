export default function Login(props) {
    return (
        <div>
            <form>
                <fieldset>
                    <label>Email:</label>
                    <input type={"email"} name='email' />
                    <label>Contraseña:</label>
                    <input type={"password"} name='password' />
                </fieldset>
                <button>Iniciar Sesion</button>
                <button>Ingresar como usuario anonimo</button>
                <p>¿Queres entrar como administrador y ver todas las funcionalidades que tenemos para tu negocio?</p>
            </form>
        </div>
    );
}