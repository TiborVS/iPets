import { jwtDecode } from "jwt-decode"
import LogoutButton from "./LogoutButton"

export default function LoginTest() {
    return (
        <>
            <h1>LoginTest</h1>
            {localStorage.getItem("accessToken") &&
                <>
                    <p>You are logged in as {jwtDecode(localStorage.getItem("accessToken")).email}</p>
                    <LogoutButton></LogoutButton>
                </>
            }
            {!localStorage.getItem("accessToken") &&
                <p>You are not logged in.</p>
            }
        </>
    )
}
