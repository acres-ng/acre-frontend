// import Link from 'next/link';
import { RefObject, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { cn } from "@/helpers/utils";
import { Popover } from "rizzui";
import { Title, Text } from "rizzui";
import { Avatar } from "rizzui";
import { Badge } from "rizzui";
// import { routes } from '@/config/routes';
import { default as useMedia } from "react-use/lib/useMedia";
// import SimpleBar from 'rizzui';
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { PiCheck } from "react-icons/pi";

dayjs.extend(relativeTime);

const data = [
  {
    id: 1,
    message: `Yesterday. 09:32 AM`,
    avatar: [
      "https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-01.webp",
    ],
    name: "Poultry 1 feed is running out of stock and has 3  days left",
    unRead: true,
  },
  {
    id: 2,
    message: `Today. 09:32 AM`,
    avatar: [
      "https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-04.webp",
    ],
    name: "Poultry 1 feed is running out of stock and has 3  days left",
    unRead: true,
  },
  {
    id: 3,
    message: `You: I never received any phone calls about it. Omnis,
        quidem non. Sint inventore quasi temporibus architecto eaque,
        natus aspernatur minus?`,
    avatar: [
      "https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-12.webp",
    ],
    name: "Poultry 1 feed is running out of stock and has 3  days left",
    unRead: false,
  },
];

function MessagesList({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="w-[320px] text-left rtl:text-right sm:w-[360px] 2xl:w-[420px]">
            <Title as="h6" className="ml-2 font-bold text-xl p-3">
          Notifications
        </Title>
      <div className="mb-2 flex items-center justify-between ps-6">
    
        <div style={{ display: "flex" }}>
          <span>All (3)</span>
          <span style={{ marginLeft: "1em" }}>Unread (1)</span>
        </div>

        <a
          //   href={routes.support.inbox}
          onClick={() => setIsOpen(false)}
          className="hover:underline"
        >
          View all
        </a>
      </div>
      <SimpleBar className="max-h-[406px] ">
        <div className="grid grid-cols-1 ps-4">
          {data.map((item) => (
            <div
              key={item.name + item.id}
              className="group grid cursor-pointer grid-cols-[auto_minmax(0,1fr)] gap-2.5 rounded-md px-2 py-2.5 pe-3 transition-colors hover:bg-gray-100 dark:hover:bg-gray-50"
            >
              <div className={cn("relative", item.avatar.length > 1 && "me-1")}>
                <Avatar
                  src={item.avatar[0]}
                  name={item.name}
                  className={cn(
                    item.avatar.length > 1 &&
                      "relative -end-1 -top-0.5 !h-9 !w-9"
                  )}
                />
                {item.avatar.length > 1 && (
                  <Avatar
                    src={item.avatar[1]}
                    name={item.name}
                    className="absolute -bottom-1 end-1.5 !h-9 !w-9 border-2 border-gray-0 dark:border-gray-100"
                  />
                )}
              </div>
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center">
                <div className="w-full">
                  <Title as="h6" className="mb-0.5 text-sm font-semibold">
                    {item.name}
                  </Title>
                  <div className="flex">
                    <Text className="w-10/12 truncate pe-7 text-xs text-gray-500">
                      {item.message}
                    </Text>
                  </div>
                </div>
                <div className="ms-auto flex-shrink-0">
                  {item.unRead ? (
                    <Badge
                      renderAsDot
                      size="lg"
                      color="primary"
                      className="scale-90"
                    />
                  ) : (
                    <span className="inline-block rounded-full bg-gray-100 p-0.5 dark:bg-gray-50">
                      <PiCheck className="h-auto w-[9px]" />
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </SimpleBar>
    </div>
  );
}

export default function MessagesDropdown({
  children,
}: {
  children: JSX.Element & { ref?: RefObject<any> };
}) {
  const isMobile = useMedia("(max-width: 480px)", false);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Popover
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      content={() => <MessagesList setIsOpen={setIsOpen} />}
      shadow="sm"
      placement={isMobile ? "bottom" : "bottom-end"}
      className="z-50 pb-6 pe-6 ps-0 pt-5 bg-white dark:bg-gray-100 [&>svg]:hidden [&>svg]:dark:fill-gray-100 sm:[&>svg]:inline-flex"
    >
      {children}
    </Popover>
  );
}
