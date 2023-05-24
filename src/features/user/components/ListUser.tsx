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

interface IProps {
  listUsers: User[];
  handleDelete: Function;
}

ListGiaoVien.defaultProps = {
  listUsers: [],
  handleDelete: null,
};

export default function ListGiaoVien({ listUsers, handleDelete }: IProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const handleEditItem = (id: number) => {
    setAnchorEl(null);
    navigate(`/GiaoVien/update/${id}`);
    console.log(id);
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Ma</TableCell>
            <TableCell align="center">Ten</TableCell>
            <TableCell align="center">Ho va Ten</TableCell>
            <TableCell align="center">Dia chi</TableCell>
            <TableCell align="center">Mat Khau</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Tuoi</TableCell>
            <TableCell align="center">So Dien Thoai</TableCell>
            <TableCell align="center">Gioi Tinh</TableCell>
            <TableCell align="center">Vai trò</TableCell>
            <TableCell align="center">Ảnh</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listUsers.map((item: User, index: number) => (
            <TableRow key={item?.id}>
              <TableCell align="center">{item?.id}</TableCell>
              <TableCell align="center">{item?.name}</TableCell>
              <TableCell align="center">{item?.useName}</TableCell>
              <TableCell align="center">{item?.address}</TableCell>
              <TableCell align="center">{item?.password}</TableCell>
              <TableCell align="center">{item?.email}</TableCell>
              <TableCell align="center">{item?.age}</TableCell>
              <TableCell align="center">{item?.phone}</TableCell>
              <TableCell align="center">{item?.gender}</TableCell>
              <TableCell align="center">{item?.role}</TableCell>
              <TableCell align="center">{item?.email}</TableCell>
              <TableCell align="center">
                <Button
                  onClick={() => handleDelete(item.id!)}
                  variant="outlined"
                >
                  <DeleteIcon sx={{ color: "red", paddingRight: "auto" }} />
                </Button>
                <Button
                  onClick={() => handleEditItem(item.id!)}
                  variant="outlined"
                >
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
