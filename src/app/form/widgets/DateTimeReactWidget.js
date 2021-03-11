import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Field } from "redux-form";
import { DateTimePicker } from "react-widgets";
import Globalize from 'globalize';
import globalizeLocalizer from 'react-widgets-globalize';

import Info from "../../components/Info";

Globalize.load(
  require( "cldr-data/main/en/numbers" ),
  require( "cldr-data/main/en/ca-gregorian" ),
  require( "cldr-data/supplemental/likelySubtags" ),
  require( "cldr-data/supplemental/timeData" ),
  require( "cldr-data/supplemental/weekData" ),
  require( "cldr-data/supplemental/calendarData" )
);

Globalize.locale('en');

globalizeLocalizer();

const format = "yyyy-MM-dd";


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

      <DateTimePicker
        {...field.input}
        className="border-0"
        time={false}
        format={{ raw: format }}
        required={field.required}
        placeholder={field.placeholder}
        disabled={field.schema.disabled}
        value={(field.input.value) ? new Date(field.input.value): undefined}
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
