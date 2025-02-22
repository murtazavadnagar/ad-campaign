import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addCampaign } from "../redux/campaignSlice";
import moment from "moment/moment";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTheme } from "@mui/material/styles";
import { useForm, Controller } from "react-hook-form";
import Grid from "@mui/material/Grid2";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import Clear from "@mui/icons-material/Clear";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Campaign Name is required"),
  startDate: Yup.date()
    .nullable()
    .typeError("Invalid Date")
    .required("Start Date is required"),
  endDate: Yup.date()
    .nullable()
    .typeError("Invalid Date")
    .required("End Date is required"),
  Budget: Yup.string().required("Budget is required"),
  userId: Yup.string().required("User ID is required"),
});

const AddCampaignForm = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      startDate: "",
      endDate: "",
      Budget: "",
      userId: "",
    },
    resolver: yupResolver(validationSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    criteriaMode: "all",
    shouldFocusError: true,
    shouldUnregister: false,
    context: null,
    delayError: 1000,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    reset();
  };

  const onSubmit = (data) => {
    const startDate = moment(data.startDate).format("MM/DD/YYYY");
    const endDate = moment(data.endDate).format("MM/DD/YYYY");

    const payload = {
      name: data.name,
      Budget: Number(data.Budget),
      startDate,
      endDate,
      userId: Number(data.userId),
      id: Math.floor(Math.random() * (100 - 10 + 1)) + 10,
    };
    dispatch(addCampaign(payload));
    handleClose();
  };

  return (
    <>
      <Button variant="contained" size="small" onClick={handleClickOpen}>
        Add Campaign
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle
          id="responsive-dialog-title"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          Add New Campaign
          <IconButton onClick={handleClose}>
            <Clear />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12 }}>
                <Typography variant="body1">Campaign Name</Typography>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      size="small"
                      fullWidth
                      placeholder="Enter Campaign Name"
                      {...field}
                      error={!!errors.name}
                      helperText={errors.name?.message}
                    />
                  )}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="body1">Start Date</Typography>
                <Controller
                  name="startDate"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      size="small"
                      fullWidth
                      type="date"
                      placeholder="Enter Start Date"
                      {...field}
                      error={!!errors.startDate}
                      helperText={errors.startDate?.message}
                    />
                  )}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="body1">End Date</Typography>
                <Controller
                  name="endDate"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      size="small"
                      fullWidth
                      type="date"
                      placeholder="Enter End Date"
                      {...field}
                      error={!!errors.endDate}
                      helperText={errors.endDate?.message}
                    />
                  )}
                />
              </Grid>
              <Grid size={{ xs: 6 }}>
                <Typography variant="body1">Budget</Typography>
                <Controller
                  name="Budget"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      size="small"
                      fullWidth
                      placeholder="Enter Budget"
                      {...field}
                      onInput={(e) => {
                        e.target.value = e.target.value
                          .replace(/[^0-9]/g, "")
                          .replace(/(\..*)\./g, "$1");
                      }}
                      error={!!errors.Budget}
                      helperText={errors.Budget?.message}
                    />
                  )}
                />
              </Grid>
              <Grid size={{ xs: 6 }}>
                <Typography variant="body1">User ID</Typography>
                <Controller
                  name="userId"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      size="small"
                      fullWidth
                      placeholder="Enter User ID"
                      {...field}
                      onInput={(e) => {
                        e.target.value = e.target.value
                          .replace(/[^0-9]/g, "")
                          .replace(/(\..*)\./g, "$1");
                      }}
                      error={!!errors.userId}
                      helperText={errors.userId?.message}
                    />
                  )}
                />
              </Grid>
              <Grid size={{ xs: 12 }} sx={{ mt: 2 }}>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 6 }}>
                    <Button
                      size="small"
                      fullWidth
                      autoFocus
                      variant="outlined"
                      onClick={reset}
                    >
                      Reset
                    </Button>
                  </Grid>
                  <Grid size={{ xs: 6 }}>
                    <Button
                      size="small"
                      fullWidth
                      variant="contained"
                      type="submit"
                      autoFocus
                    >
                      Add
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddCampaignForm;
