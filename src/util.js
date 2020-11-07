function updateField(fieldName, fieldValue, component) {
  component.setState({
    [fieldName]: fieldValue
  });
}

function todayDate() {
  const now = new Date();
  const todayString = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate().toString().padStart(2, '0')}T00:00:00`;
  return new Date(todayString);
}

export {
  updateField,
  todayDate
};