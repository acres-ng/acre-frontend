// 'use client';

// import { useEffect } from 'react';
// import { usePathname } from 'next/navigation';
// import { Modal } from 'rizzui';
// import { useModal } from './use-modal';

// export default function GlobalModal() {
//   const { isOpen, view, closeModal, customSize } = useModal();
//   const pathname = usePathname();
//   useEffect(() => {
//     closeModal();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [pathname]);

//   return (
//     <Modal
//       isOpen={isOpen}
//       onClose={closeModal}
//       customSize={customSize}
//       overlayClassName="dark:bg-opacity-40 dark:backdrop-blur-lg"
//       containerClassName="dark:bg-gray-100"
//     >
//       {view}
//     </Modal>
//   );
// }


import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom'; 
import { Modal } from 'rizzui';
import { useModal } from './use-modal';

const GlobalModal: React.FC = () => {
  const { isOpen, view, closeModal, customSize } = useModal();
  const location = useLocation(); 

  useEffect(() => {
    closeModal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]); 

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      customSize={customSize}
      overlayClassName="dark:bg-opacity-40 dark:backdrop-blur-lg"
      containerClassName="bg-white"
    >
      {view}
    </Modal>
  );
}

export default GlobalModal;

