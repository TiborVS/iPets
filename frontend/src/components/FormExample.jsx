import Form from "./Form";

export default function FormExample() {

    return(
        <>
            <h1>FormExample</h1>
            <Form title="My form" fields={[
                {
                    name: "username",
                    type: "text",
                    displayName: "Uporabniško ime",
                    placeholder: "Vnesi uporabniško ime",
                    default: ""
                },
                {
                    name: "password",
                    type: "password",
                    displayName: "Geslo",
                    placeholder: "Vnesi geslo",
                    default: ""
                }
            ]}
            submitText={"Prijava"} submitCallback={(values) => console.log(values)}></Form> 
        </>
    )
}