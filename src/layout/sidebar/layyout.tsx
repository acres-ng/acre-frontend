//  import Header from './header';
import Header from '@/components/dashboard/Header';
import Sidebar from './Sidebar';

import React from 'react'

type Props = {
  children: React.ReactNode;
};

const layout = ({ children }: Props) => {
    return (
        <main className="flex  flex-grow">
          <Sidebar className="fixed hidden dark:bg-gray-50 xl:block" />
           <div className="flex w-full flex-col xl:ms-[230px] xl:w-[calc(100%-270px)] 2xl:ms-72 2xl:w-[calc(100%-288px)]">
            <Header/>
            <main className="flex flex-grow flex-col px-4 pb-6 pt-2 md:px-5 lg:px-6 lg:pb-8 3xl:px-8 3xl:pt-4 4xl:px-10 4xl:pb-9">
            {children}
          </main>
            {/* <div className="flex flex-grow flex-col px-4 pb-6 pt-2 md:px-5 lg:px-6 lg:pb-8 3xl:px-8 3xl:pt-4 4xl:px-10 4xl:pb-9">
              {children}
            </div>  */}
          </div> 
        </main>
      );
}

export default layout
