import User from "types/User";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Edit, Edit2, Eye, MoreVertical, Trash } from "react-feather";
import { IconButton, Menu, MenuItem } from "@mui/material";

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
  const openMenuContext = Boolean(anchorEl);
  const [currentId, setCurrentId] = useState(0);
  const handleMenuClick =
    (id: number) => (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
      setCurrentId(id);
    };

  const handleMenuClose = (_event: {}) => {
    setAnchorEl(null);
  };
  const handleEditItem = (id: number) => {
    setAnchorEl(null);
    navigate(`/user/update/${id}`);
  };

  const handleDetailStudent = (id: number) => {
    navigate(`/user/detailStudent/${id}`);
    console.log(id);
  };
  return (
    <table className="table">
      <thead>
        <tr>
          <th className="text-center">STT</th>
          <th className="text-center">Mã Sinh Viên</th>
          <th className="text-center">Tên</th>
          <th className="text-center">Họ và tên</th>
          <th className="text-center">Địa chỉ</th>
          <th className="text-center">Email</th>
          <th className="text-center">Số điện thoại</th>
          <th className="text-left">Thao tác</th>
        </tr>
      </thead>
      <tbody>
        {listUsers.map((item: User, index: number) => (
          <tr key={item.id}>
            <th className="text-center">{index + 1}</th>
            <td className="text-center">{item?.code}</td>
            <td className="text-center">{item?.name}</td>
            <td className="text-center">{item?.useName}</td>
            <td className="text-center">{item?.address}</td>
            <td className="text-center">{item?.email}</td>
            <td className="text-center">{item?.phone}</td>
            <td className="text-center">
              <IconButton
                className="btn btn-sm hide-arrow py-0"
                aria-label="more"
                id="long-button"
                aria-controls={openMenuContext ? `menu-${item.id}` : undefined}
                aria-expanded={openMenuContext ? "true" : undefined}
                aria-haspopup="true"
                onClick={handleMenuClick(item.id!)}
              >
                <MoreVertical size={24} />
              </IconButton>
              <Menu
                id={`menu-${item.id}`}
                MenuListProps={{
                  "aria-labelledby": "long-button",
                }}
                anchorEl={anchorEl}
                open={openMenuContext && currentId === item.id}
                onClose={handleMenuClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem
                  onClick={() => handleDetailStudent(item.id!)}
                  className="text-warning"
                >
                  <Eye size={14} className="me-50" />
                  <span>Chi Tiết</span>
                </MenuItem>
                <MenuItem
                  onClick={() => handleEditItem(item.id!)}
                  className="text-info"
                >
                  <Edit2 size={14} className="me-50" />
                  <span>Sửa</span>
                </MenuItem>
                <MenuItem
                  onClick={() => handleDelete(item.id!)}
                  className="text-danger"
                >
                  <Trash size={14} className="me-50" />
                  <span>Xoá</span>
                </MenuItem>
              </Menu>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
