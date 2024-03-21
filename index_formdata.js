import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';

function TimeForm() {
  const [formData, setFormData] = useState({
    years_in: '',
    months_in: '',
    weeks_in: '',
    days_in: ''
  });

  useEffect(() => {
    const filledFields = Object.keys(formData).filter(key => formData[key] !== '');
    if (filledFields.length === 2) {
      setFormData(currentData => {
        const newData = { ...currentData };
        Object.keys(newData).forEach(key => {
          if (!filledFields.includes(key)) {
            newData[key] = '';
          }
        });
        return newData;
      });
    }
  }, [formData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (!isNaN(value)) {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const isDisabled = (fieldName) => {
    const filledFields = Object.keys(formData).filter(key => formData[key] !== '');
    return filledFields.length === 2 && !filledFields.includes(fieldName);
  };

  function buildString(Y, M, W, D) {
    let result = '';

    if (Y !== "") {
        result += `${Y}Y`;
    }
    if (M !== "") {
        result += `${M}M`;
    }
    if (W !== "") {
        result += `${W}W`;
    }
    if (D !== "") {
        result += `${D}D`;
    }

    return result;
}

  return (
    <form>
      <TextField
        label="Years"
        variant="outlined"
        name="years_in"
        value={formData.years_in}
        onChange={handleChange}
        disabled={isDisabled('years_in')}
        type="number"
      />
      <TextField
        label="Months"
        variant="outlined"
        name="months_in"
        value={formData.months_in}
        onChange={handleChange}
        disabled={isDisabled('months_in')}
        type="number"
      />
      <TextField
        label="Weeks"
        variant="outlined"
        name="weeks_in"
        value={formData.weeks_in}
        onChange={handleChange}
        disabled={isDisabled('weeks_in')}
        type="number"
      />
      <TextField
        label="Days"
        variant="outlined"
        name="days_in"
        value={formData.days_in}
        onChange={handleChange}
        disabled={isDisabled('days_in')}
        type="number"
      />
    </form>
  );
}

export default TimeForm;