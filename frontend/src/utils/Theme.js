export const primaryColor = '#2c3e50';
export const offWhite = '#ecf0f1';
export const lightBackground = '#f5f5f5';

export const buttonStyles = {
    addButton: {
        backgroundColor: '#4CAF50',
        color: 'white',
        padding: '8px 14px',
        border: 'none',
        borderRadius: '6px',
        fontSize: '14px',
        cursor: 'pointer',
        display: 'block',
        transition: 'background-color 0.3s ease',
    },
    deleteButton: {
        backgroundColor: '#e74c3c',
        color: 'white',
        padding: '8px 14px',
        border: 'none',
        borderRadius: '6px',
        fontSize: '14px',
        cursor: 'pointer',
        display: 'block',
    },
    actionButtons: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginTop: '10px',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px',
    },
    disabledButton: {
        backgroundColor: '#7f8c8d',
        cursor: 'not-allowed',
    },
};

export const formStyles = {
    form: {
        maxWidth: '500px',
        margin: '40px auto',
        padding: '24px',
        borderRadius: '12px',
        backgroundColor: offWhite,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'sans-serif',
    },
    title: {
        textAlign: 'center',
        color: primaryColor,
        marginBottom: '24px',
    },
    label: {
        marginTop: '12px',
        marginBottom: '6px',
        fontWeight: 'bold',
        color: primaryColor,
    },
    input: {
        padding: '10px',
        borderRadius: '6px',
        border: `1px solid ${primaryColor}`,
        fontSize: '14px',
        backgroundColor: '#fff',
    },
    loadingText: {
        textAlign: 'center',
        fontSize: '16px',
        color: primaryColor,
        marginTop: '40px',
    },
};

export const voiceControlStyles = {
    container: {
        maxWidth: '500px',
        margin: '10px auto',
        padding: '12px',
        borderRadius: '12px',
        fontFamily: 'sans-serif',
        textAlign: 'center',
    },
    title: {
        fontWeight: 'bold',
        fontSize: '16px',
        marginBottom: '12px',
        color: primaryColor,
    },
    button: {
        backgroundColor: '#505050',
        color: 'white',
        padding: '8px 14px',
        border: 'none',
        borderRadius: '6px',
        fontSize: '14px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        marginBottom: '22px',
        align: 'center',
        display: 'inline-block',
    },
    details: {
        textAlign: 'center',
        marginTop: '16px',
        fontFamily: 'sans-serif',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        borderRadius: '12px',
    },
    summary: {
        cursor: 'pointer',
        fontWeight: 'bold',
        marginBottom: '12px',
        marginTop: '12px',
        display: 'inline-block',
    }
};

export const medicationStyles = {
    container: {
        maxWidth: '600px',
        margin: '40px auto',
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '12px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        fontFamily: 'sans-serif',
    },
    header: {
        textAlign: 'center',
        marginBottom: '20px',
        color: '#333',
    },
    backLink: {
        display: 'inline-block',
        marginBottom: '24px',
        color: primaryColor,
        textDecoration: 'none',
        fontWeight: 'bold',
    },
    addButton: {
        ...buttonStyles.addButton,
        marginBottom: '24px',
    },
    medicationItem: {
        backgroundColor: '#fff',
        padding: '14px',
        borderRadius: '8px',
        marginBottom: '16px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    },
    medName: {
        fontWeight: 'bold',
        color: '#222',
    },
    medDescription: {
        fontSize: '14px',
        color: '#555',
        marginBottom: '10px',
    },
    buttonGroup: {
        display: 'flex',
        justifyContent: 'left',
        gap: '12px',
        marginTop: '8px',
    },
    button: {
        ...buttonStyles.addButton,
        marginBottom: "24px",
    },
    list: {
        listStyle: "none",
        padding: 0,
    },
    item: {
        backgroundColor: "#fff",
        borderRadius: "10px",
        padding: "20px",
        marginBottom: "16px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
        textAlign: "left",
    },
    label: {
        fontWeight: "bold",
        marginRight: "6px",
    },
    actionButtons: {
        display: "flex",
        gap: "10px",
        marginTop: "10px",
    },
};

