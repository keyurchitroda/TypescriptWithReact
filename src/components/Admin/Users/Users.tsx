import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ShowAllUser } from "../../../redux/action/auth";
import { Dispatch } from "redux";

const Users = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const users: any = useSelector((state: any) => state.auth.users.rows);
  console.log("users", users);
  useEffect(() => {
    dispatch(ShowAllUser());
  }, []);

  return (
    <div className="conatainer">
      <h2>Product</h2>

      <table>
        <tr>
          <th>First name</th>
          <th>Last name</th>
          <th>Email</th>
          <th>Role</th>
        </tr>
        {users &&
          users.map((user: any) => {
            return (
              <>
                <tr>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                </tr>
              </>
            );
          })}
        ;
      </table>
    </div>
  );
};

export default Users;
