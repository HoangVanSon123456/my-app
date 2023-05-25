import { Button, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Tuition from "types/Tuition";
import ListTuition from "../components/ListTuition";
import TuitionService from "services/TuitionService";

export default function TuitionList() {
  const [listTuition, setTuitionList] = useState<Tuition[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getList();
  }, []);

  const handleClickOpen = () => {
    navigate("/hocphi/create");
  };

  const getList = async () => {
    await TuitionService.getList()
      .then((res) => {
        setTuitionList(res);
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = async (id: number) => {
    await TuitionService.deleteItem(id)
      .then(() => getList())
      .catch((err) => console.log(err));
  };
  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        spacing={4}
        sx={{ marginBottom: "15px" }}
      >
        <Stack>
          <Typography variant="h4">Học Phí</Typography>
        </Stack>
        <Button
          variant="contained"
          onClick={handleClickOpen}
          sx={{ borderRadius: "10px", backgroundColor: "#4caf50" }}
        >
          Thêm học phí
        </Button>
      </Stack>
      {/* <SearchNotification /> */}
      <ListTuition listTuition={listTuition} handleDelete={handleDelete} />
    </>
  );
}
