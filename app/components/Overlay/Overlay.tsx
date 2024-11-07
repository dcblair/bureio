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
      <DialogBackdrop className="fixed inset-0 -z-10 bg-slate-800/70" />
      <DialogPanel className="flex size-full flex-col items-center justify-center">
        {children}
      </DialogPanel>
    </Dialog>
  );
};

export const Overlay = React.memo(BaseOverlay);
