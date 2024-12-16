import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import React from "react";

interface OverlayProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const BaseOverlay = ({ children, isOpen, onClose }: OverlayProps) => {
  return (
    <Dialog
      as="div"
      className="fixed inset-0 z-50 overflow-y-auto"
      onClose={onClose}
      open={isOpen}
    >
      <DialogTitle className="sr-only">
        dream sequence ii album artwork overlay
      </DialogTitle>
      <DialogBackdrop className="fixed inset-0 -z-10 bg-gradient-to-t from-slate-950/70 to-slate-600/70 backdrop-blur-lg" />
      <DialogPanel className="flex size-full flex-col items-center justify-center">
        {children}
      </DialogPanel>
    </Dialog>
  );
};

export const Overlay = React.memo(BaseOverlay);
