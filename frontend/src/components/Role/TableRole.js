import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { deleteRole, fetchAllRole } from "../../services/roleService";
import { toast } from "react-toastify";

const TableRole = forwardRef((props, ref) => {
  const [listRoles, setListRoles] = useState([]);
  useEffect(() => {
    getAllRoles();
  }, []);

  // nhung ham dinh nghia trong hook se dc thang cha goi den
  useImperativeHandle(ref, () => ({
    fetListRoleAgain: () => {
      getAllRoles();
    },
  }));

  const getAllRoles = async () => {
    let res = await fetchAllRole();
    let data = res.data;
    if (data && +data.EC === 0) {
      setListRoles(data.DT);
    }
  };
  const handleDeleteRole = async (item) => {
    let res = await deleteRole(item.id);
    let data = res.data;
    if (data && +data.EC === 0) {
      toast.success(data.EM);
      await getAllRoles();
    }
  };
  return (
    <div>
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">URL</th>
            <th scope="col">Decription</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {listRoles && listRoles.length > 0 ? (
            <>
              {listRoles.map((item, index) => {
                return (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.url}</td>
                    <td>{item.decription}</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteRole(item)}
                      >
                        <FontAwesomeIcon
                          className="text-black"
                          icon={faTrash}
                        />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </>
          ) : (
            <tr>
              <td colSpan={4}> Not Found Roles</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
});

export default TableRole;
