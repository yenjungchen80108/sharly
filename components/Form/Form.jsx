const Form = (props) => {
    return <form className="shadow-md rounded px-8 pt-6 pb-8 w-full"
    >{props.children}</form>;
};

export default Form;