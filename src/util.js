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

function formatDate(date) {
  const dateComponents = date.split(' ');
  const excludingTimestamp = dateComponents.filter((component) => !component.match(/[0-9]{2}:[0-9]{2}:[0-9]{2}/))
  return excludingTimestamp.join(' ');
}

function getEntitiesById(ids, allEntities) {
  return ids.map((id) => allEntities.find((entity) => entity.id === id));
}

/*
  When checked, add the checkbox value to causes in the state
  When unchecked, remove the checkbox value from causes in the state
*/
const setCheckboxValue = (fieldName, componentInstance) => (checkboxName) => {
  const origFieldValues = componentInstance.state[fieldName];
  const origCheckboxValue = origFieldValues[checkboxName];

  if (origCheckboxValue) {
    const newCheckboxValues = componentInstance.state[fieldName];
    delete newCheckboxValues[checkboxName];

    componentInstance.setState({
      [fieldName]: newCheckboxValues
    });
  } else {
    componentInstance.setState({
      [fieldName]: {
        ...origFieldValues,
        [checkboxName]: true
      }
    });
  }
}

export {
  updateField,
  todayDate,
  formatDate,
  getEntitiesById,
  setCheckboxValue
};