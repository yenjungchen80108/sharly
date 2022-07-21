import React, {Children, forwardRef} from 'react';
import PropTypes from 'prop-types';
import StyledLabel from './StyledLabel';
import { Spacer } from '../Layout';
import styles from './label.module.css';
import Wrapper from '../Layout/Wrapper';
import { Toggle } from './Toggle';

const Label = ((props) => {
    
    let elementToRender;
    const { type } = props;
    // console.log(props);
    switch (type) {
        case 'select':
        elementToRender = (<Toggle values={props.items}/>);   
        // return (<Toggle values={['en', 'de']} messages={messages} />);
        break;
        default:
        elementToRender = (
            <input
            id={props.name}
            name={props.name}
            value={props.value}
            type={props.type}
            onChange={props.onChange}
            className={styles.input}
            placeholder={props.name.toUpperCase()}/>
        )
        break;
        // return elementToRender;
    }

    return (
        <>
        <label className={styles.label}>{props.name}
        {elementToRender}
        </label>
        <Spacer size={0.5} axis="vertical" />
        </>
    )
});

// const Label = forwardRef(
//     function Label({
//         props
//     }, ref) {
//         let labelInner = 
//         (<StyledLabel>
//             <label>{props.id}
//                 <input
//                     ref={props.ref}
//                     name={props.name}
//                     value={props.value}
//                     onChange={props.onChange}
//                     className={props.className}
//                     placeholder={props.placeholder}/>
//             </label>
//         </StyledLabel>)

//         return (
//             <div>{labelInner}</div>
//         )
//     }
// )

Label.propTypes = {  
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    className: PropTypes.string,
    placeholder: PropTypes.string
}

export default Label;