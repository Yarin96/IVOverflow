import ReactDOM from "react-dom";
import Backdrop from "../Backdrop/Backdrop";
import { CSSTransition } from "react-transition-group";
import "./Modal.css";

interface ModalOverlayProps {
  className?: string;
  style?: React.CSSProperties;
  headerClass?: string;
  header?: string;
  onSubmit?: (event: React.FormEvent) => void;
  contentClass?: string;
  children?: React.ReactNode;
  footerClass?: string;
  footer?: React.ReactNode;
}

interface ModalProps {
  onCancel: () => void;
  header: string;
  show: boolean;
  footer: React.ReactNode;
  children?: React.ReactNode;
}

const ModalOverlay: React.FC<ModalOverlayProps> = (props) => {
  const content = (
    <div className={`modal ${props.className}`} style={props.style}>
      <header className={`modal__header ${props.headerClass}`}>
        <h2>{props.header}</h2>
      </header>
      <form
        onSubmit={
          props.onSubmit ? props.onSubmit : (event) => event.preventDefault()
        }
      >
        <div className={`modal__content ${props.contentClass}`}>
          {props.children}
        </div>
        <footer className={`modal__footer ${props.footerClass}`}>
          {props.footer}
        </footer>
      </form>
    </div>
  );

  return ReactDOM.createPortal(content, document.getElementById("modal-hook")!);
};

const Modal: React.FC<ModalProps> = ({ show, onCancel, ...modalProps }) => {
  return (
    <>
      {show && <Backdrop onClick={onCancel} />}
      <CSSTransition
        in={show}
        timeout={200}
        classNames="modal"
        mountOnEnter
        unmountOnExit
      >
        <ModalOverlay {...modalProps} />
      </CSSTransition>
    </>
  );
};

export default Modal;
