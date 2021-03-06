import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

export function TeamNameField({
  formData,
  handleChange,
  formErrors,
  helperText,
  data,
}) {
  return (
    <Grid item xs={12}>
      <TextField
        error={formErrors}
        variant="outlined"
        required
        fullWidth
        id="teamName"
        label="Team Name"
        name="teamName"
        defaultValue={data}
        onChange={handleChange}
        helperText={helperText}
        value={formData.email}
      />
    </Grid>
  );
}
