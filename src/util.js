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

/*
  When checked, add the checkbox value to causes in the state
  When unchecked, remove the checkbox value from causes in the state
*/
const checkCause = (componentInstance) => (checkboxName) => {
  let checkedCauses = componentInstance.state.checkedCauses;
  const isChecked = checkedCauses[checkboxName];

  if (isChecked) {
    delete checkedCauses[checkboxName];
  } else {
    checkedCauses = {
      ...checkedCauses,
      [checkboxName]: true
    };
  }

  componentInstance.setState({
    checkedCauses
  });
}

const fetchJson = (url, options={}) => {
  return fetch(url, options)
  .then((response) => response.json());
}

export {
  updateField,
  todayDate,
  formatDate,
  checkCause,
  fetchJson
};