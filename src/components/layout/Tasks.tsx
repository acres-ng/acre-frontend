import { Title, Text } from "rizzui";

import WidgetCard from "../common/charts/Widget";
import { FaTrophy } from "react-icons/fa6";
import { cn } from "@/utils/utils";
import SimpleBar from "@/components/common/ui/simplebar";

import { getActiveFarm } from "@/services/farmService";
import { useEffect, useState } from "react";
import { getJwt } from "@/services/userService";
import http from "@/services/HttpService";
import { API_URL } from "@/config";

interface Task {
  title: string;
  description: string;
  assigner: number;
  assignee: number | null;
  due_date: string | null;
  status: string;
}

export default function Members({ className }: { className?: string }) {
  const [taskData, setTaskData] = useState<Task[]>([]);

  useEffect(() => {
    const userActiveFarmId = getActiveFarm().id;
    http
      .get(
        `${API_URL}farms/${userActiveFarmId}/dashboard/tasks`,
        http.getDefaultOptions()
      )
      .then((response) => {
        const { data } = response.data;
        setTaskData(data.tasks || []);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const getStatusColor = (status: string): string => {
    switch (status) {
      case "open":
        return "bg-[#EFEFFD] text-gray-600";
      case "completed":
        return "bg-[#EA8735] text-white";
      case "in-progress":
        return "bg-red-500 text-white";
      default:
        return "bg-white text-gray-600"; // Default color
    }
  };

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
            <div className="relative inline-flex mr-auto left-4">
              {" "}
              <svg
                className="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 412 232"
              >
                <path
                  d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.762-9.763 25.592 0 35.355l181 181c9.763 9.763 25.592 9.763 35.355 0l181-181c9.762-9.763 9.762-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
                  fill="#648299"
                  fill-rule="nonzero"
                />
              </svg>
              <select className="text-sm border border-gray-300 rounded-lg text-gray-600 h-10 pl-3 pr-6 bg-white hover:border-gray-400 focus:outline-none appearance-none">
                <option>Status</option>
                <option>Option 1</option>
                <option>Option 2</option>
              </select>
            </div>

            <div className="relative inline-flex ml-auto right-4">
              {" "}
              <svg
                className="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 412 232"
              >
                <path
                  d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.762-9.763 25.592 0 35.355l181 181c9.763 9.763 25.592 9.763 35.355 0l181-181c9.762-9.763 9.762-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
                  fill="#648299"
                  fill-rule="nonzero"
                />
              </svg>
              <select className="text-sm border border-gray-300 rounded-lg text-gray-600 h-10 pl-3 pr-6 bg-white hover:border-gray-400 focus:outline-none appearance-none">
                <option>Assignee</option>
                <option>Option 1</option>
                <option>Option 2</option>
              </select>
            </div>
          </div>

          <div className="px-4">
            {taskData.map((task, index) => (
              <div
                key={index}
                className="bg-white border rounded-xl shadow-md p-4 mb-4"
              >
                <div className="flex flex-col mb-2">
                  <div className="mb-2">
                    <span className="font-bold text-base">{task.title}</span>
                    <span
                      className={`rounded-full ${getStatusColor(
                        task.status
                      )} py-0.5 px-2 ml-4 text-xs`}
                    >
                      {task.status}
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm">{task.description}</p>
                </div>
                <span className="text-gray-500 text-sm">
                  Due {task.due_date || "N/A"}
                </span>
                <div className="flex items-center">
                  <span className="text-xs">Assignee to</span>
                  {/* Placeholder for an avatar */}
                  <img
                    className="w-6 h-6 rounded-full border-2 border-white ml-2"
                    src={
                      task.assignee
                        ? `url/to/assignee/avatar/${task.assignee}`
                        : "https://via.placeholder.com/150"
                    }
                    alt="Avatar"
                  />
                </div>
              </div>
            ))}
          </div>
        </SimpleBar>
      </WidgetCard>
    </div>
  );
}
