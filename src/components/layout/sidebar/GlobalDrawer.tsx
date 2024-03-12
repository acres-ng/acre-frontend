import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Drawer } from 'rizzui';
import { useDrawer } from './use-drawer';

const GlobalDrawer: React.FC = () => {
  const { isOpen, view, placement, customSize, closeDrawer } = useDrawer();
  const { pathname } = useLocation();

  useEffect(() => {
    closeDrawer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <Drawer
      isOpen={isOpen}
      onClose={closeDrawer}
      placement={placement}
      customSize={customSize}
      overlayClassName="dark:bg-opacity-40 dark:backdrop-blur-md"
      containerClassName="dark:bg-gray-100"
    >
      {view}
    </Drawer>
  );
}

export default GlobalDrawer;