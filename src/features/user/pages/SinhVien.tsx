import { Button, Stack, Typography } from "@mui/material";

export default function SinhVien() {
  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        spacing={4}
        sx={{ marginBottom: "15px" }}
      >
        <Stack>
          <Typography variant="h4">Sinh Viên</Typography>
        </Stack>
        <Button
          variant="contained"
          // onClick={handleClickOpen}
          sx={{ borderRadius: "10px", backgroundColor: "#4caf50" }}
        >
          Them Nguoi Dung
        </Button>
      </Stack>
      {/* <SearchGiaoVien /> */}
    </>
  );
}
