import React, { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { change } from "redux-form";
import DebounceField from 'redux-form-debounce-field';
import Info from "../../components/Info";
import { useDispatch } from 'react-redux';
import { APP_FORM } from "../../contents/constants";

const renderInput = field => {
  const className = classNames([
    "form-group",
    { "has-error": field.meta.touched && field.meta.error }
  ]);
  let [count, setCount] = useState(0);

  const dispatch = useDispatch()
  useDispatch(() => {
    if (field.schema.value)
      if (field.input)
        if (!field.input.value)
          dispatch(change(APP_FORM, field.input.name, field.schema.value));
    // field.input.onChange(field.schema.value);
  });
  // let type = field.type;
  // if (field.schema.widget) {
  //   console.log("WIDGET", field.schema.widget);
  // }
  return (
    <div className={className}>
      {field.showLabel && (
        <label className="control-label" htmlFor={field.id}>
          {field.label} {field.required ? "*" : ""}
        </label>
      )}

      <input
        {...field.input}
        type={field.type}
        required={field.required}
        className="form-control"
        placeholder={field.placeholder}
        maxLength={field.maxLength}
        minLength={field.minLength}
        disabled={field.schema.disabled}
        onKeyUp={(val) => { setCount(count = val.target.value.length) }}
      />
      {field.meta.touched &&
        field.meta.error && (
          <span className="help-block">{field.meta.error}</span>
        )}
      {field.maxLength && (
        <Info
          description={count + "/" + field.maxLength + " chars used"}
        />
      )}
      {field.description && (
        <Info
          title={field.label ? field.label : field.name}
          description={field.description}
        />
      )}
    </div>
  );
};

const BaseInputWidget = props => {
  return (
    <DebounceField
      component={renderInput}
      label={props.label}
      name={props.fieldName}
      required={props.required}
      id={"field-" + props.fieldName}
      placeholder={props.schema.default}
      description={props.schema.description}
      type={props.type}
      normalize={props.normalizer}
      {...props}
    />
  );
};

BaseInputWidget.propTypes = {
  schema: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  required: PropTypes.bool,
  fieldName: PropTypes.string,
  label: PropTypes.string,
  normalizer: PropTypes.func,
  description: PropTypes.string
};

export default BaseInputWidget;
