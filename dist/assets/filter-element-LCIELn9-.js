import{j as e,R as t,g as h,a as f,u as $,b as B,c as Z,V as y,d as Y,P as H,e as Q,t as G,r as E,z as n,S as c,f as W,E as U,C as X,h as J,n as C,i as S,_ as K,k as ee,l as se,m as P,o as A}from"./index-npdPrugQ.js";import{S as j}from"./select-kH2Ha47C.js";function z({placeholder:s="Select status",...l}){return e.jsx(j,{placeholder:s,selectClassName:"h-9 min-w-[150px]",dropdownClassName:"p-1.5",optionClassName:"h-9",...l})}const w=[{id:1,role:t.Administrator,avatar:`https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${h(f)}.webp`},{id:2,role:t.Administrator,avatar:`https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${h(f)}.webp`},{id:3,role:t.Administrator,avatar:`https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${h(f)}.webp`},{id:4,role:t.Administrator,avatar:`https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${h(f)}.webp`},{id:5,role:t.Administrator,avatar:`https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${h(f)}.webp`},{id:6,role:t.Administrator,avatar:`https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${h(f)}.webp`}],ae=[{name:t.Administrator,color:"#2465FF",users:w},{name:t.Manager,color:"#F5A623",users:w},{name:t.Sales,color:"#FF1A1A",users:w},{name:t.Support,color:"#8A63D2",users:w},{name:t.Developer,color:"#FF1A1A",users:w},{name:t.HRD,color:"#11A849",users:w},{name:t.RestrictedUser,color:"#4E36F5",users:w},{name:t.Customer,color:"#0070F3",users:w}],F=Z({isOpen:!1,view:null,customSize:"320px"});function _(){const s=$(F),l=B(F);return{...s,openModal:({view:m,customSize:q})=>{l({...s,isOpen:!0,view:m,customSize:q})},closeModal:()=>{l({...s,isOpen:!1})}}}function re({label:s="Add New",className:l,customSize:p="500px",view:u,icon:m=e.jsx(H,{className:"me-1.5 h-[17px] w-[17px]"}),...q}){const{openModal:a}=_();return e.jsxs(y,{className:Y("mt-5 w-full text-xs capitalize @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100 sm:text-sm lg:mt-0",l),onClick:()=>a({view:u,customSize:p}),...q,children:[m,s]})}const ie=({onSubmit:s,children:l,useFormProps:p,validationSchema:u,fieldErrors:m,formError:q,resetValues:a,className:o,...R})=>{const i=Q({...p,...u&&{resolver:G(u)}});return E.useEffect(()=>{a&&i.reset(a)},[a,i]),e.jsx("form",{noValidate:!0,onSubmit:i.handleSubmit(s),...R,className:o,children:l(i)})},r={passwordOneUppercase:"The Password must contain at least one uppercase character",passwordOneLowercase:"The Password must contain at least one lowercase character",passwordOneNumeric:"The password must contain at least one numerical character.",passwordRequired:"Password is required",passwordLengthMin:"Password must be at least 6 characters",passwordLengthMax:"Password can't be more than 32 characters",newPasswordRequired:"New Password is required",newPasswordLength:"New Password must be at least 6 characters",confirmPasswordRequired:"Confirm Password is required",passwordsDidNotMatch:"Passwords don't match",nameIsRequired:"Name is required",firstNameRequired:"First name is required",phoneNumberIsRequired:"Phone Number is required",customerNameIsRequired:"Customer name is required",lastNameRequired:"Last name is required",streetIsRequired:"Street Address is required",emailIsRequired:"Email address is required",invalidEmail:"Invalid email address",roleIsRequired:"Role is required",permissionIsRequired:"Permission is required",teamIsRequired:"New member must be assigned to a team",productNameIsRequired:"Product name is required",productTypeIsRequired:"Product type is required",priceIsRequired:"Product price is required",retailPriceIsRequired:"Retail price is required",salePriceIsRequired:"Sale price is required",shippingPriceIsRequired:"Shipping price is required",cityIsRequired:"City is required",stateIsRequired:"State is required",countryIsRequired:"Country is required",addressLineOneRequired:"Address line 1 is required",zipCodeRequired:"ZIP code is required",cardHolderNameIsRequired:"Card holder name is required",cardNumberIsRequired:"Card Number is required",cardExpireIsRequired:"Expire Date is required",cvcNumberIsRequired:"CVC Number is required",catNameIsRequired:"Category name is required",slugIsRequired:"Slug is required",addressIsRequired:"Address is required",createDateIsRequired:"Create Date is required",dueDateIsRequired:"Due Date is required",statusIsRequired:"Status is required",discountIsRequired:"Discount amount is required",taxIsRequired:"Tax amount is required",itemNameIsRequired:"Item Name is required",itemDescIsRequired:"Item Description is required",itemQtyIsRequired:"Item Quantity is required",itemPriceIsRequired:"Item Price is required",fullNameIsRequired:"Full name is required",propertyTypeIsRequired:"Property type is required",placeTypeIsRequired:"Place type is required",amenitiesAreRequired:"Amenities are required",thisFieldIsRequired:"This Field is required",propertyNameIsRequired:"Property name is required",snippetNameIsRequired:"Snippet name is required",snippetDirIsRequired:"You must have to select a snippet folder",templateNameIsRequired:"Template name is required",templateDirIsRequired:"You must have to select a template folder",folderNameIsRequired:"Folder name is required",folderNameLengthMin:"Folder name must be at least 3 letters",productColorRequired:"Product Color is Required",productSizeRequired:"Product Size is Required",descriptionIsRequired:"Description is Required",locationIsRequired:"Location is Required",startDateIsRequired:"Start Date is required",startTimeIsRequired:"Start Time is required",endDateIsRequired:"End Date is required",endTimeIsRequired:"End Time is required",roleNameIsRequired:"Role Name is Required",roleNameLengthMin:"Role name must be at least 3 letters",errorSendingEmail:"Error sending email",emailSentSuccessfully:"Your email has been sent successfully."};n.object({name:n.string(),url:n.string(),size:n.number()});const te=n.string().min(1,{message:r.emailIsRequired}).email({message:r.invalidEmail});n.string().min(1,{message:r.passwordRequired}).min(6,{message:r.passwordLengthMin}).regex(new RegExp(".*[A-Z].*"),{message:r.passwordOneUppercase}).regex(new RegExp(".*[a-z].*"),{message:r.passwordOneLowercase}).regex(new RegExp(".*\\d.*"),{message:r.passwordOneNumeric});n.string().min(1,{message:r.passwordRequired}).min(6,{message:r.passwordLengthMin}).regex(new RegExp(".*[A-Z].*"),{message:r.passwordOneUppercase}).regex(new RegExp(".*[a-z].*"),{message:r.passwordOneLowercase}).regex(new RegExp(".*\\d.*"),{message:r.passwordOneNumeric});n.string().min(1,{message:r.confirmPasswordRequired}).min(6,{message:r.passwordLengthMin}).regex(new RegExp(".*[A-Z].*"),{message:r.passwordOneUppercase}).regex(new RegExp(".*[a-z].*"),{message:r.passwordOneLowercase}).regex(new RegExp(".*\\d.*"),{message:r.passwordOneNumeric});const le=n.object({fullName:n.string().min(1,{message:r.fullNameIsRequired}),email:te,role:n.string().min(1,{message:r.roleIsRequired}),permissions:n.string().min(1,{message:r.permissionIsRequired}),status:n.string().min(1,{message:r.statusIsRequired})}),L=Object.values(c).map(s=>({name:s,value:s})),M=Object.values(W).map(s=>({name:s,value:s})),T=Object.entries(t).map(([s,l])=>({name:l,value:s}));function de(){const{closeModal:s}=_(),[l,p]=E.useState({}),[u,m]=E.useState(!1),q=a=>{const o={...a,createdAt:new Date};m(!0),setTimeout(()=>{console.log("formattedData",o),m(!1),p({fullName:"",email:"",role:"",permissions:"",status:""}),s()},600)};return e.jsx(ie,{resetValues:l,onSubmit:q,validationSchema:le,className:"grid grid-cols-1 gap-6 p-6 @container md:grid-cols-2 [&_.rizzui-input-label]:font-medium [&_.rizzui-input-label]:text-gray-900",children:({register:a,control:o,watch:R,formState:{errors:i}})=>{var D,O;return console.log("errors",i),e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"col-span-full flex items-center justify-between",children:[e.jsx(U,{as:"h4",className:"font-semibold",children:"Add a new User"}),e.jsx(X,{size:"sm",variant:"text",onClick:s,children:e.jsx(J,{className:"h-auto w-5"})})]}),e.jsx(C,{label:"Full Name",placeholder:"Enter user's full name",...a("fullName"),className:"col-span-full",error:(D=i.fullName)==null?void 0:D.message}),e.jsx(C,{label:"Email",placeholder:"Enter user's Email Address",className:"col-span-full",...a("email"),error:(O=i.email)==null?void 0:O.message}),e.jsx(S,{name:"role",control:o,render:({field:{name:N,onChange:b,value:v}})=>{var x;return e.jsx(j,{options:T,value:v,onChange:b,name:N,label:"Role",className:"col-span-full",error:(x=i==null?void 0:i.status)==null?void 0:x.message,getOptionValue:d=>d.value,displayValue:d=>{var g;return((g=T.find(I=>I.value===d))==null?void 0:g.name)??d}})}}),e.jsx(S,{name:"status",control:o,render:({field:{name:N,onChange:b,value:v}})=>{var x;return e.jsx(j,{options:L,value:v,onChange:b,name:N,label:"Status",error:(x=i==null?void 0:i.status)==null?void 0:x.message,getOptionValue:d=>d.value,displayValue:d=>{var g;return((g=L.find(I=>I.value===d))==null?void 0:g.name)??d}})}}),e.jsx(S,{name:"permissions",control:o,render:({field:{name:N,onChange:b,value:v}})=>{var x;return e.jsx(j,{options:M,value:v,onChange:b,name:N,label:"Permissions",error:(x=i==null?void 0:i.status)==null?void 0:x.message,getOptionValue:d=>d.value,displayValue:d=>{var g;return((g=M.find(I=>I.value===d))==null?void 0:g.name)??d}})}}),e.jsxs("div",{className:"col-span-full flex items-center justify-end gap-4",children:[e.jsx(y,{variant:"outline",onClick:s,className:"w-full @xl:w-auto",children:"Cancel"}),e.jsx(y,{type:"submit",isLoading:u,className:"w-full @xl:w-auto dark:bg-gray-200 dark:text-white dark:active:enabled:bg-gray-300",children:"Create User"})]})]})}})}const V=[{value:c.Active,name:c.Active,label:e.jsxs("div",{className:"flex items-center",children:[e.jsx(P,{color:"success",renderAsDot:!0}),e.jsx(A,{className:"ms-2 font-medium text-green-dark",children:c.Active})]})},{value:c.Deactivated,name:c.Deactivated,label:e.jsxs("div",{className:"flex items-center",children:[e.jsx(P,{color:"danger",renderAsDot:!0}),e.jsx(A,{className:"ms-2 font-medium text-red-dark",children:c.Deactivated})]})},{value:c.Pending,name:c.Pending,label:e.jsxs("div",{className:"flex items-center",children:[e.jsx(P,{className:"bg-gray-400",renderAsDot:!0}),e.jsx(A,{className:"ms-2 font-medium text-gray-600",children:c.Pending})]})}],k=ae.map(s=>({name:s.name,value:s.name}));function ue({isFiltered:s,handleReset:l,filters:p,updateFilter:u,onSearch:m,searchTerm:q}){return K("(max-width: 1860px)",!1),e.jsx(e.Fragment,{children:e.jsxs("div",{className:"relative z-50 mb-4 flex flex-wrap items-center justify-between gap-2.5 @container ",children:[e.jsx(U,{as:"h5",className:"-order-6 basis-2/5 @xl:basis-auto",children:"All Users"}),e.jsx(z,{className:" -order-3 w-full @[25rem]:w-[calc(calc(100%_-_10px)_/_2)] @4xl:-order-5 @4xl:w-auto",options:V,value:p.status,onChange:a=>{u("status",a)},placeholder:"Filter by Status",getOptionValue:a=>a.value,displayValue:a=>{var o;return((o=V.find(R=>R.value===a))==null?void 0:o.label)??a}}),e.jsx(z,{options:k,value:p.role,placeholder:"Filter by Role",className:" @4xl:-auto -order-2 w-full @[25rem]:w-[calc(calc(100%_-_10px)_/_2)] @4xl:-order-4 @4xl:w-auto",dropdownClassName:"w-48",useContainerWidth:!1,getOptionValue:a=>a.value,onChange:a=>{u("role",a)},displayValue:a=>{var o;return((o=k.find(R=>R.value===a))==null?void 0:o.name)??a}}),s&&e.jsxs(y,{size:"sm",onClick:l,className:"-order-1 h-8 w-full bg-gray-200/70 @4xl:-order-4 @4xl:w-auto",variant:"flat",children:[e.jsx(ee,{className:"me-1.5 h-[17px] w-[17px]"})," Clear"]}),e.jsx(C,{type:"search",placeholder:"Search for users...",value:q,onClear:()=>m(""),onChange:a=>m(a.target.value),prefix:e.jsx(se,{className:"h-4 w-4"}),rounded:"lg",clearable:!0,className:"-order-4 w-full @xl:-order-5 @xl:ms-auto @xl:w-auto @4xl:-order-2 @4xl:w-[230px] @5xl:w-auto"}),e.jsx("div",{className:"-order-5 flex basis-auto justify-end @xl:-order-4 @4xl:-order-1",children:e.jsx(re,{label:"Add New User",view:e.jsx(de,{}),customSize:"600px",className:"mt-0"})})]})})}export{ue as default};
