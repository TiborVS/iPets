import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export default function ShortcutHandler() {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) return;

        const keyboardShortcut = (e) => {
            const isInputFocused =
                document.activeElement.tagName === "INPUT" ||
                document.activeElement.tagName === "TEXTAREA";
            if (isInputFocused) return;

            if (e.shiftKey && e.key === "N") {
                navigate("/pets/new");
            }

            if (e.shiftKey && e.key === "M") {
                navigate("/medications/add");
            }
            if (e.shiftKey && e.key === "F") {
                navigate("/food/add");
            }
        };

        document.addEventListener("keydown", keyboardShortcut);
        return () => {
            document.removeEventListener("keydown", keyboardShortcut);
        };
    }, [user, navigate]);

    return null;
}
