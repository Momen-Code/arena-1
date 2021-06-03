//Style
import "./style.scss";

//Components
import { NavBar } from "../../../components";

//Assets
import { ReactComponent as DeleteIcon } from "../../../assets/img/delete-icon.svg";
import { ReactComponent as EditIcon } from "../../../assets/img/edit-icon.svg";

const Users = () => {
  return (
    <div className="users-container">
      <div className="navbar-container">
        <NavBar />
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => (
              <tr>
                <td>1</td>
                <td>mahmoud</td>
                <td>elashmawydev@gmail.com</td>
                <td className="action-btns">
                  <button className="icon-btn">
                    <DeleteIcon />
                  </button>
                  <button className="icon-btn">
                    <EditIcon />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
