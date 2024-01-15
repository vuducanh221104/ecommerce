function MessageFormikError({ formikErrorValue }) {
    return formikErrorValue && <p className={'error-message'}>{formikErrorValue}</p>;
}

export default MessageFormikError;
