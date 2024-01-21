import { Title } from 'rizzui';
import { cn } from "@/lib/utils";
import { ForwardedRef, forwardRef } from 'react';

const widgetCardClasses = {
  base: 'border-lg border-[#F5F8F4] bg-gray-0 p-5 bg-gray-50 lg:p-7',
  rounded: {
    sm: 'rounded-sm',
    DEFAULT: 'rounded-lg',
    lg: 'rounded-xl',
    xl: 'rounded-2xl',
  },
};

type WidgetCardTypes = {
  title: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  rounded?: keyof typeof widgetCardClasses.rounded;
  headerClassName?: string;
  titleClassName?: string;
  actionClassSName?: string;
  descriptionClassName?: string;
  className?: string;
};

function WidgetCard(
  {
    title,
    action,
    description,
    rounded = 'DEFAULT',
    className,
    headerClassName,
    actionClassSName,
    titleClassName,
    descriptionClassName,
    children,
  }: React.PropsWithChildren<WidgetCardTypes>,
  ref: ForwardedRef<HTMLDivElement>
) {
  return (
    <div
      className={cn(
        widgetCardClasses.base,
        widgetCardClasses.rounded[rounded],
        className
      )}
      ref={ref}
    >
      <div
        className={cn(
          action && 'flex items-start justify-between',
          headerClassName
        )}
      >
        <div>
          <Title
            as="h3"
            className={cn('text-base font-semibold sm:text-lg', titleClassName)}
          >
            {title}
          </Title>
          {description && (
            <div className={descriptionClassName}>{description}</div>
          )}
        </div>
        {action && <div className={cn('ps-2', actionClassSName)}>{action}</div>}
      </div>
      {children}
    </div>
  );
}

export default forwardRef(WidgetCard);
WidgetCard.displayName = 'WidgetCard';
