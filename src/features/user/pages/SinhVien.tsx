import { Button, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "services/UserService";
import User from "types/User";
import SearchGiaoVien from "../components/SearchUser";
import ModalConfirm from "components/layout/ModalConfirm";
import ListUserStudent from "../components/ListUserStudent";

export default function SinhVien() {
  const [listUsers, setListUsers] = useState<User[]>([]);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [itemId, setItemId] = useState(0);

  const handleClickOpen = () => {
    navigate("/user/create");
  };

  useEffect(() => {
    getListUsers();
  }, []);

  const getListUsers = async () => {
    await UserService.getListStrudent()
      .then((res) => {
        console.log(res);
        setListUsers(res);
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = async (id: number) => {
    if (id > 0) {
      setShow(true);
      setItemId(id);
    }
  };

  const deleteItem = async () => {
    if (itemId > 0) {
      await UserService.deleteItem(itemId)
        .then(() => getListUsers())
        .catch((err) => console.log(err));
      setShow(false);
      // setItemId(0);
    }
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
          <Typography variant="h4">Sinh Viên</Typography>
        </Stack>
        <Button
          variant="contained"
          onClick={handleClickOpen}
          sx={{ borderRadius: "10px", backgroundColor: "#4caf50" }}
        >
          Them Nguoi Dung
        </Button>
      </Stack>
      <SearchGiaoVien />
      <ListUserStudent listUsers={listUsers} handleDelete={handleDelete} />
      <ModalConfirm
        show={show}
        text="Bạn thực sự muốn xoá đối tượng này?"
        // btnDisabled={loadingDelete}
        changeShow={(s: boolean) => setShow(s)}
        submitAction={deleteItem}
      />
    </>
  );
}
