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
import User from "types/User";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Tuition from "types/Tuition";

interface IProps {
  listTuition: Tuition[];
  handleDelete: Function;
}

ListTuition.defaultProps = {
  listTuition: [],
  handleDelete: null,
};

export default function ListTuition({ listTuition, handleDelete }: IProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const handleEditItem = (id: number) => {
    setAnchorEl(null);
    navigate(`/hocphi/update/${id}`);
    console.log(id);
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Mã học phí</TableCell>
            <TableCell align="center">Loại học phí</TableCell>
            <TableCell align="center">Học kỳ</TableCell>
            <TableCell align="center">Số tín chỉ</TableCell>
            <TableCell align="center">Số tiền</TableCell>
            <TableCell align="center">Miễn giảm</TableCell>
            <TableCell align="center">Học lại</TableCell>
            <TableCell align="center">Thành tiền</TableCell>
            <TableCell align="center">Thao Tác</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listTuition.map((item: Tuition, index: number) => (
            <TableRow key={item?.id}>
              <TableCell align="center">{item?.id}</TableCell>
              <TableCell align="center">{item?.tuitionType}</TableCell>
              <TableCell align="center">{item?.semester}</TableCell>
              <TableCell align="center">{item?.creditName}</TableCell>
              <TableCell align="center">{item?.price}</TableCell>
              <TableCell align="center">{item?.discount}</TableCell>
              <TableCell align="center">{item?.reLearn}</TableCell>
              <TableCell align="center">{item?.intoMoney}</TableCell>

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
  );
}
