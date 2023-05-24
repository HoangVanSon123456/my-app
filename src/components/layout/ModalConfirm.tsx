import classNames from "classnames";
import { useLayoutEffect } from "react";

interface IProps {
  show: boolean;
  text: string;
  btnDisabled?: boolean;
  changeShow: Function;
  submitAction: Function;
}

ModalConfirm.defaultProps = {
  show: false,
  text: "",
  btnDisabled: false,
  changeShow: null,
  submitAction: null,
};

export default function ModalConfirm({
  show,
  text,
  btnDisabled,
  changeShow,
  submitAction,
}: IProps) {
  useLayoutEffect(() => toggleModalOpen(show), [show]);

  const submit = () => {
    if (submitAction) {
      submitAction();
    }
  };

  const toggleModalOpen = (show: boolean) => {
    if (show) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  };

  const closeModal = (changeShow: Function) => {
    if (changeShow) {
      changeShow(false);
    }
  };
  return (
    <>
      <div
        className={classNames("modal fade modal-danger text-start", { show })}
        style={{ display: show ? "block" : "none" }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Xác nhận</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => closeModal(changeShow)}
              />
            </div>
            <div className="modal-body">{text}</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                disabled={btnDisabled}
                onClick={submit}
              >
                Đồng ý
              </button>
            </div>
          </div>
        </div>
      </div>
      {show && <div className="modal-backdrop fade show" />}
    </>
  );
}
