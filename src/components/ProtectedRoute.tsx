import React from "react";

const ProtectedRoute = () => {
  return <div>ProtectedRoute</div>;
};

export default ProtectedRoute;

// import React, { FunctionComponent } from "react";
// // import { PrivateRouteProps } from "src/root/routing/interfaces/PrivateRouteProps";
// import jwt_decode from "jwt-decode";
// import { Navigate, Route, useNavigate, useLocation } from "react-router-dom";

// interface PrivateRouteProps {
//   component?: any;
//   rest?: any;
//   render : any
// }

// export const PrivateRoute: FunctionComponent<PrivateRouteProps> = ({
//   component: Component,
//   ...rest
// }) => {
//   const history = useNavigate();
//   // You can check special cases you need from the token. And then act correspondingly
//   // E.g. If user is admin and the "user" part of the app is prevented for admin.
//   // Here the data should be read from your token/cookies.
//   // Prior to this you should have code to check whether the token is valid or invalid.
//   const accessToken = localStorage.getItem("token");
//   const decodedToken = jwt_decode(accessToken);
//   console.log("-=-=-=-=-=-", decodedToken);

//   if (decodedToken.userData.isAdmin) {
//     history("/admin-panel");
//   }

//   return (
//     <Route
//       {...rest}
//       render={(props: any) => {
//         // logic for authenticated user to access /app part goes here.
//         // e.g. check if user is logged-in logic.
//         const isLoggedIn = true;

//         return isLoggedIn ? (
//           <Component {...props} />
//         ) : (
//           <Navigate to={"/login"} />
//         );
//       }}
//     />
//   );
// };
