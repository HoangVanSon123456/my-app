import { Button, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StudyScore from "types/StudyScore";
import ListStudyScore from "../components/ListStudyScore";
import SearchStudyScore from "../components/SearchStudyScore";
import StudyScoreService from "services/StudyScore";

export default function StudyScoreList() {
  const [listStudyScore, setStudyScoreList] = useState<StudyScore[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getList();
  }, []);

  const handleClickOpen = () => {
    navigate("/studyscore/create");
  };

  const getList = async () => {
    await StudyScoreService.getList()
      .then((res) => {
        setStudyScoreList(res);
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = async (id: number) => {
    await StudyScoreService.deleteItem(id)
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
          <Typography variant="h4">Điểm Học Phần</Typography>
        </Stack>
        <Button
          variant="contained"
          onClick={handleClickOpen}
          sx={{ borderRadius: "10px", backgroundColor: "#4caf50" }}
        >
          Thêm Điểm
        </Button>
      </Stack>
      <SearchStudyScore />
      <ListStudyScore
        listStudyScore={listStudyScore}
        handleDelete={handleDelete}
      />
    </>
  );
}
