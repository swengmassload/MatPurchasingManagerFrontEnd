import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { TextField, Button, Box, Typography } from '@mui/material'
import { PartsTableCreateRequestDTO } from '../../../Models/MatPurchasingModels/Dto'
import { useCreatePart } from '../../../Hooks/useCreatePart'

const AddPart: React.FC = () => {
  const { control, handleSubmit, reset } = useForm<PartsTableCreateRequestDTO>({
    defaultValues: {
      partCode: undefined,
      description: undefined,
      supplier: undefined,
      triggerQuantity: undefined,
      leadTimeInDays: undefined
    }
  })

  const createPart = useCreatePart()

  const onSubmit = async (data: PartsTableCreateRequestDTO) => {
    try {
      await createPart.mutateAsync(data)
      reset()
    } catch (e) {
      // errors will be handled by mutation meta toasts
      console.error(e)
    }
  }

  return (
    <Box
     sx={{ display: "flex",    flexDirection: "column", padding: "16px",justifyContent:"flex-start" ,alignItems:"flex-start"} }

    >
      <Typography variant="h6" gutterBottom>Add Part</Typography>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Box display="flex" flexDirection="column" gap={2}>
          <Box display="flex" gap={2} flexDirection={{ xs: 'column', md: 'row' }}>
            <Box flex={1}>
              <Controller
                name="partCode"
                control={control}
                rules={{ required: 'Part code is required' }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Part Code"
                    fullWidth
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </Box>
            <Box flex={1}>
              <Controller
                name="supplier"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Supplier"
                    fullWidth
                  />
                )}
              />
            </Box>
          </Box>

          <Box>
            <Controller
              name="description"
              control={control}
              rules={{ required: 'Description is required' }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Description"
                  fullWidth
                  multiline
                  minRows={2}
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Box>

          <Box display="flex" gap={2} flexDirection={{ xs: 'column', md: 'row' }}>
            <Box flex={1}>
              <Controller
                name="triggerQuantity"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="number"
                    label="Trigger Quantity"
                    fullWidth
                  />
                )}
              />
            </Box>
            <Box flex={1}>
              <Controller
                name="leadTimeInDays"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="number"
                    label="Lead Time (days)"
                    fullWidth
                  />
                )}
              />
            </Box>
          </Box>

          <Box display="flex" gap={2}>
            <Button type="submit" variant="contained" color="primary" disabled={(createPart as any).isLoading}>
              {(createPart as any).isLoading ? 'Saving...' : 'Save'}
            </Button>
            <Button type="button" variant="outlined" onClick={() => reset()}>
              Reset
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  )
}

export default AddPart