import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import React from 'react';

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
      <DialogBackdrop className="fixed inset-0 bg-black bg-opacity-50" />
      <DialogPanel className="flex min-h-screen items-center justify-center">
        <div className="h-full w-full bg-white">{children}</div>
      </DialogPanel>
    </Dialog>
  );
};

export const Overlay = React.memo(BaseOverlay);
