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