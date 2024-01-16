import { Title, Text } from "rizzui";

import WidgetCard from "../components/charts/Widget";
import { FaTrophy } from "react-icons/fa6";
import { cn } from "@/lib/utils";
import SimpleBar from "@/components/ui/simplebar";
import { members } from "./data";

export default function Members({ className }: { className?: string }) {
  return (
    <div className="">
      
      <WidgetCard title="" headerClassName="hidden" className="p-0 lg:p-0 ">
      <Title
        as="h3"
        className="my-3 pt-3 ml-4 text-lg lg:text-lg font-semibold text-gray-900 xl:text-xl 2xl:mb-5"
      >
         Tasks
      </Title>
        <SimpleBar style={{ maxHeight: 450 }}>


<div className="flex items-center justify-center mb-4">
<div className="relative inline-flex mr-4">
  <svg className="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 412 232"><path d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.762-9.763 25.592 0 35.355l181 181c9.763 9.763 25.592 9.763 35.355 0l181-181c9.762-9.763 9.762-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z" fill="#648299" fill-rule="nonzero"/></svg>
  <select className="border border-gray-300 rounded-lg text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none">
    <option>Status</option>
    <option>Option 1</option>
    <option>Option 2</option>
  </select>
</div>

<div className="relative inline-flex">
  <svg className="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 412 232"><path d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.762-9.763 25.592 0 35.355l181 181c9.763 9.763 25.592 9.763 35.355 0l181-181c9.762-9.763 9.762-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z" fill="#648299" fill-rule="nonzero"/></svg>
  <select className="border border-gray-300 rounded-lg text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none">
    <option>Assignee</option>
    <option>Option 1</option>
    <option>Option 2</option>
  </select>
</div>
</div>


          <div className="px-4">
            <div className="bg-white border rounded-xl shadow-md p-4 mb-4">
              <div className="flex items-center mb-2">
                <h2 className="font-bold text-lg mb-2">
                  Preparation of new feed using revised recipe
                </h2>
                <span className="rounded-full bg-[#EFEFFD] text-gray-600 py-1 px-2 mr-2">
                  Due
                </span>
              </div>
              <span className="text-gray-500">Due 24 Oct 23</span>

              <div className="flex items-center">
                <span>Assignee to</span>
                {/* Placeholder for an avatar */}
                <img
                  className="w-8 h-8 rounded-full border-2 border-white ml-2"
                  src="https://via.placeholder.com/150"
                  alt="Avatar"
                />
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 mb-4">
              <div className="flex items-center mb-2">
                <h2 className="font-bold text-lg mb-2">
                  Preparation of new feed using revised recipe
                </h2>
                <span className="rounded-full bg-[#EA8735] text-white py-1 px-2 mr-2">
                  Due
                </span>
              </div>
              <span className="text-grey-500">Due 24 Oct 23</span>

              <div className="flex items-center">
                <span>Assignee to</span>
                {/* Placeholder for an avatar */}
                <img
                  className="w-8 h-8 rounded-full border-2 border-white ml-2"
                  src="https://via.placeholder.com/150"
                  alt="Avatar"
                />
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 mb-4">
              <div className="flex items-center mb-2">
                <h2 className="font-bold text-lg mb-2">
                  Preparation of new feed using revised recipe
                </h2>
                <span className="rounded-full bg-red-500 text-white py-1 px-2 mr-2">
                  Due
                </span>
              </div>
              <span className="text-grey-500">Due 24 Oct 23</span>

              <div className="flex items-center">
                <span>Assignee to</span>
                {/* Placeholder for an avatar */}
                <img
                  className="w-8 h-8 rounded-full border-2 border-white ml-2"
                  src="https://via.placeholder.com/150"
                  alt="Avatar"
                />
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 mb-4">
              <div className="flex items-center mb-2">
                <h2 className="font-bold text-lg mb-2">
                  Preparation of new feed using revised recipe
                </h2>
                <span className="rounded-full bg-[#1B9C5C] text-white py-1 px-2 mr-2">
                  Due
                </span>
              </div>
              <span className="text-grey-500">Due 24 Oct 23</span>

              <div className="flex items-center">
                <span>Assignee to</span>
                {/* Placeholder for an avatar */}
                <img
                  className="w-8 h-8 rounded-full border-2 border-white ml-2"
                  src="https://via.placeholder.com/150"
                  alt="Avatar"
                />
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 mb-4">
              <div className="flex items-center mb-2">
                <h2 className="font-bold text-lg mb-2">
                  Preparation of new feed using revised recipe
                </h2>
                <span className="rounded-full bg-[#58eead] text-white py-1 px-2 mr-2">
                  Due
                </span>
              </div>
              <span className="text-grey-500">Due 24 Oct 23</span>

              <div className="flex items-center">
                <span>Assignee to</span>
                {/* Placeholder for an avatar */}
                <img
                  className="w-8 h-8 rounded-full border-2 border-white ml-2"
                  src="https://via.placeholder.com/150"
                  alt="Avatar"
                />
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 mb-4">
              <div className="flex items-center mb-2">
                <h2 className="font-bold text-lg mb-2">
                  Preparation of new feed using revised recipe
                </h2>
                <span className="rounded-full bg-red-500 text-white py-1 px-2 mr-2">
                  Due
                </span>
              </div>
              <span className="text-grey-500">Due 24 Oct 23</span>

              <div className="flex items-center">
                <span>Assignee to</span>
                {/* Placeholder for an avatar */}
                <img
                  className="w-8 h-8 rounded-full border-2 border-white ml-2"
                  src="https://via.placeholder.com/150"
                  alt="Avatar"
                />
              </div>
            </div>
          </div>
        </SimpleBar>
      </WidgetCard>
    </div>
  );
}
