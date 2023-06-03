import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import StudyScore from "types/StudyScore";
interface IProps {
  listStudyScore: StudyScore[];
  handleDelete: Function;
}

ListStudyScore.defaultProps = {
  listStudyScore: [],
  handleDelete: null,
};

export default function ListStudyScore({
  listStudyScore,
  handleDelete,
}: IProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const handleEditItem = (id: number) => {
    setAnchorEl(null);
    navigate(`/studyscore/update/${id}`);
  };
  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Mã Điểm</TableCell>
              <TableCell align="center">Mã Học Phần</TableCell>
              <TableCell align="center">Tên Học Phần</TableCell>
              <TableCell align="center">Số tín chỉ</TableCell>
              <TableCell align="center">Số lần học</TableCell>
              <TableCell align="center">Đánh giá</TableCell>
              <TableCell align="center">Điểm quá trình</TableCell>
              <TableCell align="center">Điểm thi</TableCell>
              <TableCell align="center">Tổng kết học phần</TableCell>
              <TableCell align="center">Điểm chữ</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listStudyScore.map((item: StudyScore, index: number) => (
              <TableRow key={item?.id}>
                <TableCell align="center">{item?.id}</TableCell>
                <TableCell align="center">{item?.courseId}</TableCell>
                <TableCell align="center">{item?.courseName}</TableCell>
                <TableCell align="center">{item?.courseCreditName}</TableCell>
                <TableCell align="center">{item?.studyTimes}</TableCell>
                <TableCell align="center">{item?.evaluate}</TableCell>
                <TableCell align="center">{item?.processPoint}</TableCell>
                <TableCell align="center">{item?.testScore}</TableCell>
                <TableCell align="center">{item?.endPoint}</TableCell>
                <TableCell align="center">{item?.letterPoint}</TableCell>
                <TableCell align="center">
                  <Button onClick={() => handleDelete(item.id!)}>
                    <DeleteIcon sx={{ color: "red" }} />
                  </Button>
                  <Button onClick={() => handleEditItem(item.id!)}>
                    <EditIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
