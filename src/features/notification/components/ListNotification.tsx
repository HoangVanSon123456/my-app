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
import Notification from "types/Notification";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
interface IProps {
  listNotification: Notification[];
  handleDelete: Function;
}

ListNotification.defaultProps = {
  listNotification: [],
  handleDelete: null,
};

export default function ListNotification({
  listNotification,
  handleDelete,
}: IProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const handleEditItem = (id: number) => {
    setAnchorEl(null);
    navigate(`/notification/update/${id}`);
    console.log(id);
  };
  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Mã Thông Báo</TableCell>
              <TableCell align="center">Tiêu đề</TableCell>
              <TableCell align="center">Người dùng</TableCell>
              <TableCell align="center">Nội dung</TableCell>
              <TableCell align="center">Tệp</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listNotification.map((item: Notification, index: number) => (
              <TableRow key={item?.id}>
                <TableCell align="center">{item?.id}</TableCell>
                <TableCell align="center">{item?.title}</TableCell>
                <TableCell align="center">
                  {item?.userNotificationName}
                </TableCell>
                <TableCell align="center">{item?.content}</TableCell>
                <TableCell align="center">{item?.files}</TableCell>
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
