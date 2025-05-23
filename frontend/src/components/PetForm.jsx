import { useParams, useNavigate } from 'react-router';
import Form from './Form';
import callApi from '../utils/callApi';

export default function PetForm({isEditing}) {

    const params = useParams();
    const navigate = useNavigate();
    const [pet, setPet] = useState({});

    useEffect(async () => {
        if (isEditing) {
            const petId = params.id;
            try {
                const pet = await callApi('GET', API_URL, '/pets/' + petId, null, localStorage.getItem("accessToken"));
                setPet(pet);                
            }
            catch (err) {
                console.error(err);
                navigate('/pets');
            }
        }
    }, [])

    return(
        <Form title={isEditing ? "Uredi žival" : "Dodaj žival"}></Form>
    )
}