import React from "react";
import PropTypes from "prop-types";
import renderField from "../renderField";
import { FieldArray, Field } from "redux-form";
import { times as _times } from "lodash";
import ChoiceWidget from "./ChoiceWidget";
import classNames from "classnames";
import Info from "../../components/Info";
import CloseButton from "../../components/CloseButton";

const renderArrayFields = (
  count,
  schema,
  theme,
  fieldName,
  remove,
  context,
  swap
) => {
  const prefix = fieldName + ".";

  if (count) {
    return _times(count, idx => {
      let isSummary = false;
      if (idx != count - 1) {
        isSummary = true;
      }
      schema.isSummary = isSummary;
      return (
        <div key={idx}>
          <div className="float-right">
            <CloseButton
              onClick={e => {
                e.preventDefault();
                remove(idx);
              }}
            />
          </div>
          {renderField(
            { ...schema, showLabel: false },
            idx.toString(),
            theme,
            prefix,
            context
          )}
        </div>
      );
    });
  } else {
    return null;
  }
};

const renderInput = field => {
  const className = classNames([
    "block__array",
    { "has-error": field.meta.submitFailed && field.meta.error }
  ]);

  return (
    <div className={className}>
      {field.showLabel && (
        <label className="control-label">
          {field.label} {field.schema.required ? "*" : ""}
        </label>
      )}
      {field.meta.error && <div className="help-block">{field.meta.error}</div>}
      {renderArrayFields(
        field.fields.length,
        field.schema.items,
        field.theme,
        field.fieldName,
        idx => field.fields.remove(idx),
        field.context,
        (a, b) => {
          field.fields.swap(a, b);
        }
      )}
      <div>
        <a href="#" className="link" onClick={() => field.fields.push()}>
          Add new
        </a>
      </div>
      {field.schema.description && (
        <Info
          title={field.label ? field.label : field.name}
          description={field.schema.description}
        />
      )}
    </div>
  );
};

const CollectionWidget = props => {
  return (
    <FieldArray
      component={renderInput}
      label={props.label}
      name={props.fieldName}
      fieldName={props.fieldName}
      schema={props.schema}
      values={props.values}
      theme={props.theme}
      context={props.context}
      {...props}
    />
  );
};

const ArrayWidget = props => {
  // Arrays are tricky because they can be multiselects or collections
  if (
    props.schema.items.hasOwnProperty("enum") &&
    props.schema.hasOwnProperty("uniqueItems") &&
    props.schema.uniqueItems
  ) {
    return ChoiceWidget({
      ...props,
      schema: props.schema.items,
      multiple: true
    });
  } else {
    return CollectionWidget(props);
  }
};

ArrayWidget.propTypes = {
  schema: PropTypes.object.isRequired,
  fieldName: PropTypes.string,
  label: PropTypes.string,
  theme: PropTypes.object,
  context: PropTypes.object
};

export default ArrayWidget;
