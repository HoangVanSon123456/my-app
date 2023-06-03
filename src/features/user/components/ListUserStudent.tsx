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
import { Edit, Eye, Trash } from "react-feather";

interface IProps {
  listUsers: User[];
  handleDelete: Function;
}

ListUserStudent.defaultProps = {
  listUsers: [],
  handleDelete: null,
};

export default function ListUserStudent({ listUsers, handleDelete }: IProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const handleEditItem = (id: number) => {
    setAnchorEl(null);
    navigate(`/user/update/${id}`);
    console.log(id);
  };

  return (
    <table className="datatables-basic table">
      <thead>
        <tr>
          {/* <th className="text-center">id</th> */}
          <th className="text-center">Tên</th>
          <th className="text-center">Họ và tên</th>
          <th className="text-center">Địa chỉ</th>
          <th className="text-center">Email</th>
          <th className="text-center">Tuổi</th>
          <th className="text-center">Số điện thoại</th>
          <th className="text-center">Giới tính</th>
          <th className="text-left">Thao tác</th>
        </tr>
      </thead>
      <tbody>
        {listUsers.map((item: User, index: number) => (
          <tr key={item.id}>
            {/* <th className="text-center">{item?.id}</th> */}
            <td className="text-center">{item?.name}</td>
            <td className="text-center">{item?.useName}</td>
            <td className="text-center">{item?.address}</td>
            <td className="text-center">{item?.email}</td>
            <td className="text-center">{item?.age}</td>
            <td className="text-center">{item?.phone}</td>
            <td className="text-center">{item?.gender}</td>
            <td>
              <div>
                <button
                  type="button"
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => handleDelete(item.id!)}
                >
                  <Trash size={16} />
                </button>
                <button
                  type="button"
                  className="btn btn-outline-info btn-sm mx-1"
                  onClick={() => handleEditItem(item.id!)}
                >
                  <Edit size={16} />
                </button>
                <button
                  type="button"
                  className="btn btn-outline-warning btn-sm"
                  // onClick={() => handleEditItem(item.id!)}
                >
                  <Eye size={16} />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
