import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField } from '@mui/material';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = Yup.object().shape({
    year: Yup.number().nullable(true),
    month: Yup.number().nullable(true),
    weeks: Yup.number().nullable(true),
    days: Yup.number().nullable(true)
  }).test(
    'test-name',
    'You must provide either year and month, year and weeks, or weeks and days',
    (obj) => {
      const { year, month, weeks, days } = obj;
      const validYearMonth = year != null && month != null && weeks == null && days == null;
      const validYearWeeks = year != null && weeks != null && month == null && days == null;
      const validWeeksDays = weeks != null && days != null && year == null && month == null;
  
      return validYearMonth || validYearWeeks || validWeeksDays;
    }
  );

  function MyForm() {
    const { control, handleSubmit, watch, formState: { errors } } = useForm({
      resolver: yupResolver(schema)
    });
  
    const watchFields = watch(['year', 'month', 'weeks', 'days']);
  
    const onSubmit = data => {
      console.log(data);
    };
  
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="year"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Year"
              type="number"
              error={!!errors.year}
              helperText={errors.year?.message}
              disabled={watchFields.month && watchFields.weeks && watchFields.days}
            />
          )}
        />
        <Controller
          name="month"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Month"
              type="number"
              error={!!errors.month}
              helperText={errors.month?.message}
              disabled={watchFields.year && watchFields.weeks && watchFields.days}
            />
          )}
        />
        <Controller
          name="weeks"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Weeks"
              type="number"
              error={!!errors.weeks}
              helperText={errors.weeks?.message}
              disabled={watchFields.year && watchFields.month && watchFields.days}
            />
          )}
        />
        <Controller
          name="days"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Days"
              type="number"
              error={!!errors.days}
              helperText={errors.days?.message}
              disabled={watchFields.year && watchFields.month && watchFields.weeks}
            />
          )}
        />
        <button type="submit">Submit</button>
      </form>
    );
  }