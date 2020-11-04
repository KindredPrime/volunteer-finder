function updateField(fieldName, fieldValue, component) {
  component.setState({
    [fieldName]: fieldValue
  });
}

export {
  updateField
};