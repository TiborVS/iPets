import { Link } from "react-router";
import '../styles/Welcome.css';

export default function Welcome() {
    
    return (
        <div className="welcome">
            <h1>Dobrodošli v iPets</h1>
            <p>
                Aplikacija za vodenje evidence o domačih živalih, ki
                ob osnovnih podatkih omogoča vodenje dnevnika hranjenja z različnimi tipi hrane in prigrizkov,
                načrtovanje veterinarskih obiskov in pregled nad njihovimi rezultati ter vnos in pregled zdravljenj oz. zdravil za vaše živali!
                Predstavlja enotno mesto za vse podatke o živalih, tako da vam ni več treba imeti zapiske na različnih mestih, hraniti
                izvide veterinarjev, nastavljati opomnike ali alarme za tablete itd.
            </p>
            <p>Za uporabo se <Link to="/register" style={{textDecoration: "underline"}}>registrirajte</Link>, brezplačno je!</p>
        </div>
    )
}