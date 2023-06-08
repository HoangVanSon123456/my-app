import { Button, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EducationProgramService from "services/EducationProgramService";
import EducationProgram from "types/EducationProgram";
import SearchEducationProgram from "../components/SearchEducationProgram";
import ListEducationProgram from "../components/ListEducationProgram";

export default function EducationProgramList() {
  const [listEducationProgram, setEducationProgramList] = useState<
    EducationProgram[]
  >([]);
  const navigate = useNavigate();

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    await EducationProgramService.getList()
      .then((res) => {
        setEducationProgramList(res);
      })
      .catch((err) => console.log(err));
  };

  const handleClickOpen = () => {
    navigate("/chuongtrinhdaotao/create");
  };

  const handleDelete = async (id: number) => {
    await EducationProgramService.deleteItem(id)
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
          <Typography variant="h4">Chương Trình Đào Tạo</Typography>
        </Stack>
        <Button
          variant="contained"
          onClick={handleClickOpen}
          sx={{ borderRadius: "10px", backgroundColor: "#4caf50" }}
        >
          Thêm Chương Trình Đào Tạo
        </Button>
      </Stack>
      <SearchEducationProgram />
      <ListEducationProgram
        listEducationProgram={listEducationProgram}
        handleDelete={handleDelete}
      />
    </>
  );
}
