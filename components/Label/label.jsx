import React, { Children, forwardRef } from "react";
import PropTypes from "prop-types";
import StyledLabel from "./StyledLabel";
import { Spacer } from "../Layout";
import styles from "./label.module.css";
import Wrapper from "../Layout/Wrapper";
import { Toggle } from "./Toggle";
import PlusIcon from "../../public/svg/plusIcon.svg";

const classes = {
  inlineTag:
    "inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2",
  searchBtn:
    "h-auto text-white absolute right-2.5 bottom-1.5 bg-gray-400 hover:bg-gray-500 focus:outline-none focus:ring-gray-300 font-small rounded-lg text-sm px-4 py-2",
};

const Label = (props) => {
  let elementToRender;
  const { type, handleAddTag, removeTag, tags } = props;
  switch (type) {
    case "tag":
      elementToRender = (
        <>
          <div className="relative">
            <input
              id={props.name}
              name={props.name}
              value={props.value}
              type={props.type}
              onChange={props.onChange}
              className={styles.input}
              placeholder={props.name.toUpperCase()}
            />
            <button
              type="submit"
              className={classes.searchBtn}
              onClick={handleAddTag}
            >
              <PlusIcon />
            </button>
          </div>
          <div className={styles.tags_input_container}>
            {tags.map((tag, index) => (
              <div className="tag-item" key={index}>
                <span className={classes.inlineTag}>{tag}</span>
                <span className={styles.close} onClick={() => removeTag(index)}>
                  &times;
                </span>
              </div>
            ))}
          </div>
        </>
      );
      break;
    case "select":
      elementToRender = (
        <Toggle
          values={props.items}
          name={props.name}
          onToggle={props.onChange}
        />
      );
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
          htmlFor={props.htmlFor}
          className={!props.className ? styles.input : props.className}
          placeholder={props.name.toUpperCase()}
        />
      );
      break;
    // return elementToRender;
  }

  return (
    <>
      <label className={styles.label}>
        {props.name}
        {elementToRender}
      </label>
      <Spacer size={0.5} axis="vertical" />
    </>
  );
};

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
  onChange: PropTypes.func,
  className: PropTypes.string,
  placeholder: PropTypes.string,
};

export default Label;
