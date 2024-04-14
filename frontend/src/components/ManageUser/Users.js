import React, { useContext, useEffect, useState } from "react";
import { deleteUser, fetchAllUser } from "../../services/userSevice";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import ModalDelete from "./ModalDelete";
import ModalUser from "./ModalUser";
import {
  faArrowsRotate,
  faCirclePlus,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UserContext } from "../../context/UserContext";

const Users = () => {
  const [listUsers, setListUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  // modal delete
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [dataModalDelete, setDataModalDelete] = useState({});
  const [isShowModalUser, setIsShowModalUser] = useState(false);

  // model update/create user
  const [dataModalUser, setDataModalUser] = useState({});
  const [actionModalUser, setActionModalUser] = useState("CREATE");

  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  async function fetchUsers() {
    try {
      let response = await fetchAllUser(currentPage, currentLimit);
      const data = await response.data;
      console.log("hello >>>>", data.DT);

      if (data && +data.EC === 0) {
        setTotalPages(data.DT.totalPages);
        setListUsers(data.DT.users);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handlePageClick = async (event) => {
    setCurrentPage(event.selected + 1);
  };

  function handleDeleteuser(id) {
    setIsShowModalDelete(true);
    setDataModalDelete(id);
  }

  const confirmDeleteUser = async () => {
    const response = await deleteUser(dataModalDelete.id);
    const data = response.data;
    if (data && +data.EC === 0) {
      setIsShowModalDelete(false);
      toast.success(data.EM);
      if (currentPage === totalPages && listUsers.length === 1) {
        setCurrentPage(totalPages - 1);
      }
      await fetchUsers();
    } else {
      toast.error(data.EM);
    }
  };

  const handleClose = (id) => {
    setIsShowModalDelete(false);
    setDataModalDelete({});
  };

  const handleAddNewUser = () => {
    setIsShowModalUser(true);
    setActionModalUser("CREATE");
  };

  const handleEditUser = (user) => {
    setActionModalUser("UPDATE");
    setIsShowModalUser(true);
    setDataModalUser(user);
  };

  const onHideModalUser = async () => {
    setIsShowModalUser(false);
    await fetchUsers();
  };

  const handleRefresh = async () => {
    await fetchUsers();
  };

  return (
    <>
      <div className="container ">
        <div>
          <div className="mt-3">
            <h3>Manage Users</h3>
          </div>
          <div>
            <button
              className="mr-4 btn btn-success"
              onClick={() => handleRefresh()}
            >
              <FontAwesomeIcon className="mr-[10px]" icon={faArrowsRotate} />
              Refresh
            </button>
            <button
              className="btn btn-primary"
              onClick={() => handleAddNewUser()}
            >
              <FontAwesomeIcon className="mr-[10px]" icon={faCirclePlus} />
              Add new User
            </button>
          </div>
        </div>
        <div className="mt-3 user-body">
          <h3>Table users</h3>
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Id</th>
                <th scope="col">Email</th>
                <th scope="col">Username</th>
                <th scope="col">Group</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {listUsers && listUsers.length > 0 ? (
                <>
                  {listUsers.map((item, index) => {
                    return (
                      <tr key={item.id}>
                        <td>{(currentPage - 1) * currentLimit + index + 1}</td>
                        <td>{item.id}</td>
                        <td>{item.email}</td>
                        <td>{item.username}</td>
                        <td>{item.Group ? item.Group.name : ""}</td>
                        <td>
                          <button
                            className="mr-5 btn btn-warning"
                            onClick={() => handleEditUser(item)}
                          >
                            <FontAwesomeIcon icon={faPenToSquare} />
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={() => handleDeleteuser(item)}
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
                  <td> Not Found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {totalPages > 0 && (
          <div className="user-footer">
            <ReactPaginate
              nextLabel="next >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              marginPagesDisplayed={2}
              pageCount={totalPages}
              previousLabel="< previous"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakLabel="..."
              breakClassName="page-item"
              breakLinkClassName="page-link"
              containerClassName="pagination"
              activeClassName="active"
              renderOnZeroPageCount={null}
            />
          </div>
        )}
      </div>
      <ModalDelete
        show={isShowModalDelete}
        handleClose={handleClose}
        confirmDeleteUser={confirmDeleteUser}
        dataModal={dataModalDelete}
      ></ModalDelete>
      <ModalUser
        onHideModalUser={onHideModalUser}
        show={isShowModalUser}
        action={actionModalUser}
        dataModalUser={dataModalUser}
      ></ModalUser>
    </>
  );
};

export default Users;
