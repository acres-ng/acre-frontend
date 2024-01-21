//  import Header from './header';
import Header from '@/components/dashboard/Header';
import Sidebar from './Sidebar';

import React from 'react'
import RightBar from '../RighBar';

type Props = {
  children: React.ReactNode;
};

const layout = ({ children }: Props) => {
    return (
      <main className="flex flex-grow">
      <Sidebar className="fixed hidden dark:bg-gray-50 xl:block 2xl:w-[25rem]" />
      <div className="flex w-full flex-col flex-grow xl:ms-[230px]  2xl:ms-[480px]">
        <Header />
        <main className="flex flex-grow flex-col max-w-screen-2xl  xl:w-full px-4 pb-6 pt-2 md:px-5  lg:pb-8 3xl:px-8 3xl:pt-4 4xl:px-10 4xl:pb-9">
          {children}
        </main>
        {/* <div className="lg:col-span-3 w-[50%]">
          <RightBar />
        </div> */}
      </div>
    </main>
    
      );
}

export default layout
