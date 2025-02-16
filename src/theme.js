import { createTheme } from "@mui/material/styles";
import { red, green, blue, common, grey } from "@mui/material/colors";

const theme = createTheme({
  cssVariables: true,
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red[800],
    },
    success: {
      main: green[800],
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: grey[100],
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "8px",
          height: "40px",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: "monospace",
          "&.MuiTypography-body1": {
            color: grey[700],
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          "& label": {
            color: grey[100],
          },
          "& .MuiInputBase-root": {
            borderRadius: "8px",
            fontFamily: "monospace",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            border: "1px solid rgba(0, 0, 0, 0.23)",
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: grey[400],
            },
            "&:hover fieldset": {
              borderColor: grey[400],
            },
            "&.Mui-focused fieldset": {
              borderColor: blue[500],
            },
          },
        },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          border: "none",
          borderRadius: "8px",
          backgroundColor: common.white,
          "& .MuiDataGrid-columnHeader": {
            fontFamily: "monospace",
            backgroundColor: "#556cd6",
            color: common.white,
            "&:first-of-type": {
              borderTopLeftRadius: "8px",
            },
            "&:last-of-type": {
              borderTopRightRadius: "8px",
            },
          },
          "& .MuiDataGrid-columnHeader--first": {
            borderTopRightRadius: "8px",
          },
          "& .MuiDataGrid-columnHeader--last": {
            borderTopRightRadius: "8px",
          },
          "& .MuiDataGrid-menuIconButton": {
            color: red[600],
          },
          "& .MuiDataGrid-overlay": {
            backgroundColor: grey[50],
          },
          "& .MuiDataGrid-row": {
            "&:hover": {
              backgroundColor: grey[100],
            },
          },
          "& .MuiDataGrid-row.Mui-selected": {
            backgroundColor: blue[50],
            "&:hover": {
              backgroundColor: grey[100],
            },
          },
          "& .MuiDataGrid-cell": {
            fontFamily: "monospace",
            "&:focus": { outline: "none" },
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: "8px",
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
        },
      },
    },
  },
});

export default theme;
