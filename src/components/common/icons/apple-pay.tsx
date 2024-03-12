import { cn } from "@/utils/utils";

export default function ApplePayIcon({
  className,
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      className={cn('dark:invert', className)}
      {...props}
    >
      <path d="M96.766 175.412c6.028-7.54 10.118-17.663 9.04-28.008-8.824.439-19.592 5.822-25.826 13.367-5.598 6.462-10.552 17.009-9.26 26.92 9.904.859 19.801-4.951 26.046-12.279m8.927 14.214c-14.385-.857-26.616 8.164-33.486 8.164-6.873 0-17.393-7.732-28.771-7.524-14.809.218-28.55 8.591-36.065 21.908-15.457 26.641-4.079 66.159 10.952 87.856 7.299 10.734 16.097 22.554 27.688 22.129 10.952-.43 15.245-7.092 28.557-7.092 13.303 0 17.17 7.092 28.763 6.877 12.023-.215 19.539-10.74 26.838-21.485 8.374-12.237 11.802-24.052 12.017-24.701-.216-.215-23.183-9.026-23.396-35.445-.217-22.121 18.032-32.644 18.891-33.296-10.304-15.24-26.406-16.959-31.988-17.391m125.255-29.938c31.266 0 53.037 21.552 53.037 52.93 0 31.49-22.22 53.154-53.821 53.154h-34.617v55.051h-25.011V159.688zm-35.402 85.09h28.698c21.776 0 34.169-11.724 34.169-32.048 0-20.322-12.393-31.936-34.057-31.936h-28.81zm94.974 42.658c0-20.548 15.745-33.166 43.664-34.729l32.158-1.898v-9.044c0-13.065-8.822-20.882-23.559-20.882-13.962 0-22.672 6.699-24.791 17.197h-22.78c1.34-21.218 19.428-36.851 48.463-36.851 28.474 0 46.675 15.075 46.675 38.636v80.958h-23.116v-19.318h-.556c-6.811 13.066-21.664 21.328-37.073 21.328-23.004 0-39.085-14.294-39.085-35.397zm75.821-10.608v-9.268l-28.922 1.786c-14.405 1.006-22.556 7.371-22.556 17.421 0 10.272 8.486 16.973 21.44 16.973 16.861-.002 30.038-11.615 30.038-26.912zm45.831 87.211v-19.542c1.784.446 5.803.446 7.814.446 11.166 0 17.197-4.689 20.88-16.749 0-.224 2.124-7.147 2.124-7.259L400.558 203.35h26.127l29.707 95.587h.444l29.707-95.587H512l-44 123.614c-10.046 28.477-21.66 37.633-46.003 37.633-2.011 0-8.042-.224-9.825-.558z" />
    </svg>
  );
}
