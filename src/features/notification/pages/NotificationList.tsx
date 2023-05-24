import { Button, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NotificationService from "services/NotificationService";
import Notification from "types/Notification";
import ListNotification from "../components/ListNotification";
import SearchNotification from "../components/SearchNotification";

export default function NotificationList() {
  const [listNotification, setNotificationList] = useState<Notification[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getList();
  }, []);

  const handleClickOpen = () => {
    navigate("/notification/create");
  };

  const getList = async () => {
    await NotificationService.getList()
      .then((res) => {
        setNotificationList(res);
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = async (id: number) => {
    await NotificationService.deleteItem(id)
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
          <Typography variant="h4">Thông báo</Typography>
        </Stack>
        <Button
          variant="contained"
          onClick={handleClickOpen}
          sx={{ borderRadius: "10px", backgroundColor: "#4caf50" }}
        >
          Thêm Thông Báo
        </Button>
      </Stack>
      <SearchNotification />
      <ListNotification
        listNotification={listNotification}
        handleDelete={handleDelete}
      />
    </>
  );
}
