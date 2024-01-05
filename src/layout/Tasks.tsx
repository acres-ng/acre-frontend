import { Title, Text } from "rizzui";

import WidgetCard from "../components/charts/Widget";
import { FaTrophy } from "react-icons/fa6";
import { cn } from "@/lib/utils";
import SimpleBar from "@/components/ui/simplebar";
import { members } from "./data";

export default function Members({ className }: { className?: string }) {
  return (
    <div className="">
      
      <WidgetCard title="" headerClassName="hidden" className="p-0 lg:p-0">
      <Title
        as="h3"
        className="mb-3 text-lg lg:text-lg font-semibold text-gray-900 xl:text-xl 2xl:mb-5"
      >
        Tasks
      </Title>
        <SimpleBar style={{ maxHeight: 450 }}>
          {/* <div className="p-5 lg:p-7">
            <div className="-me-2 grid gap-4 @sm:gap-5">
              {members.map((member) => (
                <div
                  key={member.name + member.id}
                  className="flex items-start pe-2"
                >
                  <div className="relative me-3 h-12 w-12 shrink-0 overflow-hidden rounded-full bg-gray-100 @sm:h-12 @sm:w-12">
                    <img
                      src={member.thumbnail}
                      alt={member.name}
                     
                      sizes="(max-width: 768px) 100vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex w-full items-center justify-between gap-2">
                    <div>
                      <Text className="text-sm font-semibold text-gray-900 dark:text-gray-700 2xl:text-base">
                        {member.name}
                      </Text>
                      <Text className="text-gray-500">{member.email}</Text>
                    </div>
                    <div
                      className={cn(
                        'flex h-10 w-10 items-center justify-center rounded-full',
                        member.fill
                      )}
                    >
                      <FaTrophy className={cn('h-6 w-6', member.color)} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div> */}

<div className="flex items-center justify-center mb-4">
  <button className="bg-gray-200 hover:bg-gray-100 text-[#7C7D7D] font-bold py-2 px-4 rounded-lg mr-28 shadow-lg">
    Status
  </button>
  <button className="bg-gray-200 hover:bg-gray-100 text-[#7C7D7D] font-bold py-2 px-4 rounded-lg shadow-lg">
    Assignee
  </button>
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
