# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list


AIzaSyCdpkVg4cZmmIzFPVyyTO7TCPZrVybZjUo

ive provided you with three components im currently working on. Now access them and  show me how i can achieve the following functionality. 1. If the user has signed up but hasnt verified the otp then left the page and tries to login, it directs the user to otp page and still continue to display the timer conts when he left, if the timer has expired which the otp page will return the button for resendcode, when the button is clicked, it should resend the otp and restart the timer. Also remove the contact info that displays in the search url







  // useEffect(() => {
  //   const handleRedirect = async () => {
  //     try {
  //       if (location.pathname === "/otp" && customerContact) {
  //         setLoading(true);
  //         const response = await sendOtp({ contact: customerContact });

  //         if (response?.data?.status === "success") {
  //           const expiryTimeInSeconds = response?.data?.data;
  //           const minutes = Math.floor(expiryTimeInSeconds / 60);
  //           const seconds = expiryTimeInSeconds % 60;

  //           setTimer({ minutes, seconds });
  //           setShowResendButton(false);
  //           setShowTimer(true);
  //         }
  //       }
  //     } catch (error: any) {
  //       console.error("Error sending OTP on redirect:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   handleRedirect(); 

  //   return () => {
      
  //   };
  // }, [location.pathname, customerContact]); 

  // useEffect(() => {
  //   const handlePageReload = async () => {
  //     try {
  //       if (customerContact) {
  //         setLoading(true);
  //         const response = await sendOtp({ contact: customerContact });

  //         if (response?.data?.status === "success") {
  //           const expiryTimeInSeconds = response?.data?.data;
  //           const minutes = Math.floor(expiryTimeInSeconds / 60);
  //           const seconds = expiryTimeInSeconds % 60;

  //           setTimer({ minutes, seconds });
  //           setShowResendButton(false);
  //           setShowTimer(true);
  //         }
  //       }
  //     } catch (error: any) {
  //       console.error("Error sending OTP on page reload:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   handlePageReload(); 

  //   return () => {
      
  //   };
  // }, []); 






  +2348101200231









  
import WidgetCard from './Widget';
import { RoundedTopBarFill } from './rounded-topbar';
import { default as useMedia } from 'react-use/lib/useMedia';

import { CustomTooltip } from '@/components/charts/custom-tooltip';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
  } from 'recharts';



  const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
  
  export default function MixBarChart({ className }: { className?: string }) {
    const isMediumScreen = useMedia('(max-width: 1200px)', false);
    return (
      <WidgetCard title={'renderAsDot'} className={className}>
        <div className="mt-5 aspect-[1060/660] w-full lg:mt-7">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              barSize={isMediumScreen ? 18 : 24}
              margin={{
                left: -10,
              }}
              className="[&_.recharts-cartesian-grid-vertical]:opacity-0"
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis tickLine={false} dataKey="name" />
              <YAxis tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="pv" stackId="a" fill="#1B9C5C" />
              <Bar
                dataKey="amt"
                stackId="a"
                fill="#10b981"
                shape={<RoundedTopBarFill />}
              />
              <Bar dataKey="uv" fill="#eab308" shape={<RoundedTopBarFill />} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </WidgetCard>
    );
  }

  Thursday, 28 2023
05:31 AM
🌙 11.06°C
Wind

5.66 km/h

Humidity

8765%

Rain

0

Pressure

1016

197.210.76.12
 197.210.53.190
 197.210.53.66


197.210.53.66

  
  
  
  
  
  