import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { memo, type ReactNode } from "react";
import { CloseIcon } from "../Icons";
import { Button } from "../Button/Button";

interface OverlayProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

const BaseOverlay = ({ children, isOpen, onClose, title }: OverlayProps) => {
  return (
    <Dialog
      as="div"
      className="fixed inset-0 z-50 overflow-y-auto"
      onClose={onClose}
      open={isOpen}
    >
      <DialogTitle className="sr-only">{title}</DialogTitle>
      <DialogBackdrop className="fixed inset-0 -z-10 bg-gradient-to-t from-slate-950/70 to-slate-600/70 backdrop-blur-lg" />
      <DialogPanel className="flex size-full flex-col items-center justify-center">
        <div className="relative flex flex-col items-center justify-center">
          {children}
          <Button
            className="absolute -right-20 top-0 hidden items-center justify-center md:-right-28 md:flex"
            iconOnly
            size="lg"
            variant="secondary"
            onClick={onClose}
          >
            <CloseIcon />
          </Button>
        </div>
      </DialogPanel>
    </Dialog>
  );
};

export const Overlay = memo(BaseOverlay);
