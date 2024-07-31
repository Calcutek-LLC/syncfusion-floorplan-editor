import { Box, CircularProgress, Typography } from "@mui/material";

const sizes = {
  sm: "h-4 w-4",
  md: "h-8 w-8",
  lg: "h-16 w-16",
  xl: "h-24 w-24",
};

const variants = {
  light: "text-white",
  primary: "text-slate-600",
};

export type SpinnerProps = {
  size?: keyof typeof sizes;
  variant?: keyof typeof variants;
  className?: string;
};

export const Spinner = ({ size, variant, className }: SpinnerProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        verticalAlign: "middle",
        height: "100vh",
        width: "100vw",
      }}
    >
      <CircularProgress />
      <Typography
        sx={{
          ml: 2,
        }}
      >
        Loading . . .
      </Typography>
    </Box>
  );
};
