import { useNavigate } from "react-router"
import callApi from "../utils/callApi";

export default function DeletePet({ pet }) {

    const navigate = useNavigate();

    async function deletePet() {
        const response = await callApi('DELETE', import.meta.env.VITE_API_URL, '/pets/' + pet.id, null, localStorage.getItem("accessToken"));
        if (response.error) {
            window.alert("Napaka pri odstranjevanju živali: " + response.error);
        }
        else {
            navigate('/pets');
        }
    }

    async function promptDeletePet() {
        if (window.confirm("Ste prepričani, da želite odstraniti " + pet.name + "? Tega ne bo mogoče razveljaviti.")) {
            deletePet();
        }
        else {
            navigate('/pets/' + pet.id);
        }
    }

    return (
        <button type="button" className="delete-pet" onClick={promptDeletePet}>Odstrani</button>
    )
}