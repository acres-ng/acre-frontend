import { Link } from "react-router-dom";
import { Fragment } from "react";
import { useLocation } from "react-router-dom";
import { Title } from "rizzui";
import { Collapse } from "rizzui";
import { cn } from "@/helpers/utils";
import { PiCaretDownBold } from "react-icons/pi";
import SimpleBar from "simplebar-react";
import { menuItems } from "./MenuItems";
import logo from "@/assets/images/logo.png";
import authService, { getCurrentUser } from "@/services/authService";
import { Button } from "@/components/common/ui/button";
import HamburgerButton from "./HamburgerButton";

export default function Sidebar({ className }: { className?: string }) {
  const location = useLocation();
  const pathname = location.pathname;

  const user = getCurrentUser();
  const handleLogout = () => {
    authService.logout();
    window.location.replace("/login");
  };
  return (
    <aside
      className={cn(
        "bottom-0 start-0 z-50 h-full w-[215px] border-e-2 border-gray-100 bg-white dark:bg-gray-100/50 2xl:w-[14rem]",
        className
      )}
    >
      <div className="sticky top-0 z-40 bg-gray-0/10 px-6 pb-5 pt-5 dark:bg-gray-100/5 2xl:px-8 2xl:pt-6">
        <Link to={"/"} aria-label="Site Logo">
          <img src={logo} alt="acre logo" className="h-10 w-auto" />
        </Link>
      </div>

      <SimpleBar className="h-[calc(100%-80px)]">
        <div className="mt-4 xl:mt-8 pb-16 3xl:mt-8">
          {menuItems.map((item, index) => {
            const isActive = pathname === (item?.href as string);
            const pathnameExistInDropdowns: any = item?.dropdownItems?.filter(
              (dropdownItem) => dropdownItem.href === pathname
            );
            const isDropdownOpen = Boolean(pathnameExistInDropdowns?.length);

            return (
              <Fragment key={item.name + "-" + index}>
                {item?.href ? (
                  <>
                    {item?.dropdownItems ? (
                      <Collapse
                        defaultOpen={isDropdownOpen}
                        header={({ open, toggle }) => (
                          <div
                            onClick={toggle}
                            className={cn(
                              "group relative mx-3 flex cursor-pointer items-center justify-between rounded-md px-3 py-2 font-medium lg:my-1 2xl:mx-5 2xl:my-2",
                              isDropdownOpen
                                ? "before:top-2/5 text-primary before:absolute before:-start-3 before:block before:h-4/5 before:w-1 before:rounded-ee-md before:rounded-se-md before:bg-primary 2xl:before:-start-5"
                                : "text-gray-700 transition-colors duration-200 hover:bg-gray-100 dark:text-gray-700/90 dark:hover:text-gray-700"
                            )}
                          >
                            <span className="flex items-center">
                              {item?.icon && (
                                <span
                                  className={cn(
                                    "me-2 inline-flex h-5 w-5 items-center justify-center rounded-md [&>svg]:h-[19px] [&>svg]:w-[19px]",
                                    isDropdownOpen
                                      ? "text-primary"
                                      : "text-gray-800 dark:text-gray-500 dark:group-hover:text-gray-700"
                                  )}
                                >
                                  {item?.icon}
                                </span>
                              )}
                              {item.name}
                            </span>

                            <PiCaretDownBold
                              strokeWidth={3}
                              className={cn(
                                "h-3.5 w-3.5 -rotate-90 text-gray-500 transition-transform duration-200 rtl:rotate-90",
                                open && "rotate-0 rtl:rotate-0"
                              )}
                            />
                          </div>
                        )}
                      >
                        {item?.dropdownItems?.map((dropdownItem, index) => {
                          const isChildActive =
                            pathname === (dropdownItem?.href as string);

                          return (
                            <Link
                              to={dropdownItem?.href}
                              key={dropdownItem?.name + index}
                              className={cn(
                                "mx-3.5 mb-0.5 flex items-center rounded-md px-3.5 py-2 font-medium capitalize last-of-type:mb-1 lg:last-of-type:mb-2 2xl:mx-5",
                                isChildActive
                                  ? "text-gray-900"
                                  : "text-gray-500 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900"
                              )}
                            >
                              <span
                                className={cn(
                                  "me-[18px] ms-1 inline-flex h-1 w-1 rounded-full bg-current transition-all duration-200",
                                  isChildActive
                                    ? "bg-primary ring-[1px] ring-primary"
                                    : "opacity-40"
                                )}
                              />{" "}
                              {dropdownItem?.name}
                            </Link>
                          );
                        })}
                      </Collapse>
                    ) : (
                      <Link
                        to={item?.href}
                        className={cn(
                          "group relative mx-3 my-0.5 flex items-center rounded-md px-3 py-2 font-medium capitalize lg:my-1 2xl:mx-5 2xl:my-2",
                          isActive
                            ? "before:top-2/5 text-primary before:absolute before:-start-3 before:block before:h-4/5 before:w-1 before:rounded-ee-md before:rounded-se-md before:bg-primary 2xl:before:-start-5"
                            : "text-gray-700 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-700/90"
                        )}
                      >
                        {item?.icon && (
                          <span
                            className={cn(
                              "me-2 inline-flex h-5 w-5 items-center justify-center rounded-md [&>svg]:h-[19px] [&>svg]:w-[19px]",
                              isActive
                                ? "text-primary"
                                : "text-gray-800 dark:text-gray-500 dark:group-hover:text-gray-700"
                            )}
                          >
                            {item?.icon}
                          </span>
                        )}
                        {item.name}
                      </Link>
                    )}
                  </>
                ) : (
                  <Title
                    as="h6"
                    className={cn(
                      "mb-2 truncate px-6 text-[11px] font-medium uppercase tracking-widest text-gray-500 dark:text-gray-500 2xl:px-8",
                      index !== 0 && "mt-6 3xl:mt-7"
                    )}
                  >
                    {item.name}
                  </Title>
                )}
              </Fragment>
            );
          })}
        </div>
        <div className="px-3 py-2">
          <div className="space-y-1 w-full">
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => handleLogout()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="mr-2 h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                />
              </svg>
              Logout
            </Button>
          </div>
        </div>
      </SimpleBar>
    </aside>
  );
}
