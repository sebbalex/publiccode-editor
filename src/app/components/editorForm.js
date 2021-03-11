import React from "react";
import { reduxForm } from "redux-form";
import { DefaultTheme as Widgets } from "../form";
import { APP_FORM } from "../contents/constants";
import renderField from "../form/renderField";
import CountrySwitcher from "./countrySwitcher";
import Collapse, { Panel } from "rc-collapse";
import img_x from "../../asset/img/x.svg";
import img_accordion_open from "../../asset/img/accordion-open.svg";
import img_accordion_closed from "../../asset/img/accordion-closed.svg";
import { getFieldByTitle } from "../contents/data";

// eslint-disable-next-line no-unused-vars
const renderBlocksSimple = blocks => {
  return blocks.map((block, i) => (
    <div className="block__wrapper" key={`block_${i}`}>
      <div className="block_heading">
        <div className="block_heading_oval">{block.index}</div>
        <div className="block_heading_title">{block.title}</div>
      </div>
      <div className="block collapse">{renderBlockItems(block.items, i)}</div>
    </div>
  ));
};

const renderBlockItems = (items, id) => {
  return items.map((item, i) => {
    // getField(item);
    let cn = item.cn ? item.cn : "block__item";
    if (item.type === "object") cn = "block__object";
    return (
      <div className={cn} key={`block_${id}_item_${i}`}>
        {renderField(item, item.title, Widgets, "", {}, item.required === true)}
      </div>
    );
  });
};

const renderHeader = props => {
  let img_arrow = img_accordion_closed;
  if (props.activeSection == props.block.index - 1) {
    img_arrow = img_accordion_open;
  }
  return (
    <span className={`clearfix ${props.hasError ? "error" : ""}`}>
      <img src={img_arrow} /> {props.block.index}. {props.block.title}
      {props.hasError && (
        <span className="float-right error-info">
          <img src={img_x} />
        </span>
      )}
    </span>
  );
};

const renderBlocks = (
  blocks,
  activeSection,
  countryProps,
  sectionsWithErrors
) => {
  return blocks.map((block, i) => {
    let last = blocks.length === i + 1;
    //let cn = activeSection == i ? "block_heading--active" : '';
    let hasError = sectionsWithErrors.indexOf(i) >= 0;
    let c = {
      showArrow: false,
      forceRender: true
    };
    if (hasError) {
      c.headerClass = "rc-collapse-header-error";
    }
    return (
      <Panel
        className={`block__wrapper section_${i}`}
        id={`section_${i}`}
        key={i}
        {...c}
        header={renderHeader({ block, hasError, activeSection })}
      >
        {last && <CountrySwitcher {...countryProps} />}
        <div className="block">{renderBlockItems(block.items, i)}</div>
      </Panel>
    );
  });
};

const EditForm = props => {
  /* eslint-disable no-unused-vars */
  const {
    handleSubmit,
    pristine,
    reset,
    submitting,
    data,
    errors,
    activeSection,
    country,
    switchCountry,
    allFields,
    submitFailed
  } = props;
  /* eslint-enable no-unused-vars */

  let countryProps = { country, switchCountry };

  let params = {
    accordion: true,
    defaultActiveKey: "0"
  };

  if (activeSection) {
    params.activeKey = activeSection == -1 ? "0" : activeSection;
  } else {
    params.activeKey = activeSection == 0 ? "0" : "";
  }

  let sectionsWithErrors = [];
  
  if (submitFailed && errors) {
    sectionsWithErrors = Object.keys(errors).reduce((s, e) => {
      let field = getFieldByTitle(allFields, e);
      if (field && s.indexOf(field.section) < 0) {
        s.push(field.section);
      }
      return s;
    }, []);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Collapse onChange={props.onAccordion} {...params}>
          {renderBlocks(data, activeSection, countryProps, sectionsWithErrors)}
        </Collapse>
      </form>
    </div>
  );
};

export default reduxForm({
  form: APP_FORM
})(EditForm);
