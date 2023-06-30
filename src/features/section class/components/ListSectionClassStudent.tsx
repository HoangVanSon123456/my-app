import { IconButton, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { Edit2, MoreVertical, Trash } from "react-feather";
import { useNavigate } from "react-router-dom";
import StudyScore from "types/StudyScore";
import User from "types/User";
interface IProps {
  listStudyScore: User[];
  handleDelete: Function;
}

ListSectionClassStudent.defaultProps = {
  listStudyScore: [],
  handleDelete: null,
};
export default function ListSectionClassStudent({
  listStudyScore,
  handleDelete,
}: IProps) {
  const navigate = useNavigate();
  const handleEditItem = (id: number) => {
    navigate(`/lophocphan/updateStudent/${id}`);
  };
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
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
  return (
    <>
      <table className="datatables-basic table">
        <thead>
          <tr>
            <th className="text-center">STT</th>
            <th className="text-center">Mã Sinh Viên</th>
            <th className="text-center">Tên học sinh</th>
            <th className="text-center">Lần học</th>
            <th className="text-center">Đánh giá</th>
            <th className="text-center">Điểm quá trình</th>
            <th className="text-center">Điểm thi</th>
            <th className="text-center">Điểm Tổng kết</th>
            <th className="text-center">Điểm chữ</th>
            <th className="text-left">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {listStudyScore.map((item: StudyScore, index: number) => (
            <tr key={item.id}>
              <td className="text-center">{index + 1}</td>
              <td className="text-center">{item.userCode}</td>
              <td className="text-center">{item?.userName}</td>
              <td className="text-center">{item?.studyTimes}</td>
              <td className="text-center">{item?.evaluate}</td>
              <td className="text-center">{item?.processPoint}</td>
              <td className="text-center">{item?.testScore}</td>
              <td className="text-center">{item?.endPoint}</td>
              <td className="text-center">{item?.letterPoint}</td>
              <td className="text-left">
                <IconButton
                  className="btn btn-sm hide-arrow py-0"
                  aria-label="more"
                  id="long-button"
                  aria-controls={
                    openMenuContext ? `menu-${item.id}` : undefined
                  }
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
    </>
  );
}
