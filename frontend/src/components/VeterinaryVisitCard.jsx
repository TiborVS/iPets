import { Link } from "react-router";

export default function VeterinaryVisitCard({ visit }) {
    return (
        <div className="visit">
            <p><strong>Datum:</strong> {visit.visitDate}</p>
            <p><strong>Čas:</strong> {visit.visitTime}</p>
            <p><strong>Lokacija:</strong> {visit.location}</p>
            <p><strong>Opis:</strong> {visit.notes}</p>
        </div>
    );
}