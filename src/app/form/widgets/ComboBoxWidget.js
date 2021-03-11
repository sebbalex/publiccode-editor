import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Field } from "redux-form";
import { Combobox } from "react-widgets";
import Info from "../../components/Info";

const renderInput = field => {
  const className = classNames([
    "form-group",
    { "has-error": field.meta.touched && field.meta.error }
  ]);

  return (
    <div className={className}>
      <label className="control-label" htmlFor={"field-" + field.name}>
        {field.label} {field.required ? "*" : ""}
      </label>

      <Combobox
        {...field.input}
        onBlur={() => field.input.onBlur()}
        value={field.input.value || []}
        data={field.schema.items.enum}
        onChange={(v)=> field.input.onChange(v.value)}
        valueField='value'
        textField='text'
        filter='contains'
      />

      {field.meta.touched &&
      field.meta.error && (
        <span className="help-block">{field.meta.error}</span>
      )}
      {field.description && <Info title={field.label?field.label:field.name} description={field.description} />}
    </div>
  );
};

const editorWidget = props => {
  return (
    <Field
      component={renderInput}
      label={props.label}
      name={props.fieldName}
      required={props.required}
      id={"field-" + props.fieldName}
      placeholder={props.schema.default}
      description={props.schema.description}
      {...props}
    />
  );
};

editorWidget.propTypes = {
  schema: PropTypes.object.isRequired,
  fieldName: PropTypes.string,
  label: PropTypes.string,
  theme: PropTypes.object,
  multiple: PropTypes.bool,
  required: PropTypes.bool
};

export default editorWidget;
