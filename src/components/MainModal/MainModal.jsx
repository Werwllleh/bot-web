import React, {useCallback, useEffect, useRef, useState} from 'react';
import Portal from "./Portal";
import {CloseOutlined} from "@ant-design/icons";
import {getScrollbarWidth, offsetContent} from "../../utils/utils";

const MODAL_CONTAINER_ID = "modal-container-id";

const MainModal = ({isOpen, onClose, title, children, className}) => {

  const rootRef = useRef(null);

  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsActive(isOpen)
  }, [isOpen]);

  useEffect(() => {
    offsetContent(isActive)
  }, [isActive])

  useEffect(() => {
    const handleWrapperClick = (event) => {
      const { target } = event;

      if (target && rootRef.current === target) {
        onClose?.();
      }
    };
    const handleEscapePress = (event) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };

    window.addEventListener("click", handleWrapperClick);
    window.addEventListener("keydown", handleEscapePress);

    return () => {
      window.removeEventListener("click", handleWrapperClick);
      window.removeEventListener("keydown", handleEscapePress);
    };
  }, [onClose]);

  const handleClose = useCallback(() => {
    onClose?.();
  }, [onClose]);

  return (
    <Portal id={MODAL_CONTAINER_ID}>
      <div className={`bg-wrap ${isActive ? 'active' : ''}`} ref={rootRef}></div>
      <div className={`modal ${className ? className : '' } ${isActive ? 'show' : ''}`}>
        <button type="button" className="modal__close" onClick={handleClose}>
          <CloseOutlined />
        </button>
        <div className="modal__header">
          {title && <h5 className="modal__title">{title}</h5>}
        </div>
        <div className="modal__content">
          {children}
        </div>
      </div>
    </Portal>
  );
};

export default MainModal;
