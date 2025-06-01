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
