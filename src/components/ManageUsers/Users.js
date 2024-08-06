import React, { useEffect, useState } from "react";
import { fetchAllUser, deleteUser } from "../../services/userservice";
import ReactPaginate from 'react-paginate';
import { toast } from "react-toastify";
import ModalDelete from "./ModalDelete";
import ModalUser from "./ModalUser";
import './Users.scss';

const Users = (props) => {
    const [listUsers, setListUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimit, setCurrentLimit] = useState(3);
    const [totalPages, setTotalPages] = useState(0);
    // modal delete
    const [isShowModalDelete, setIsShowModalDelete] = useState(false);
    const [dataModal, setDataModal] = useState({});
    // modal update/create
    const [isShowModalUser, setIsShowModalUser] = useState(false)
    const [actionModalUser, setActionModalUser] = useState('CREATE')
    const [dataModalUser, setDataModalUser] = useState({})

    useEffect(() => {
        fetchUsers();
    }, [currentPage]);

    const fetchUsers = async () => {
        let response = await fetchAllUser(currentPage, currentLimit);
        if (response && +response.EC === 0) {
            setTotalPages(response.DT.totalPages)
            setListUsers(response.DT.users)
        }
    }

    const handlePageClick = async (event) => {
        setCurrentPage(+event.selected + 1)
    }

    const handleDeleteUser = async (user) => {
        setDataModal(user)
        setIsShowModalDelete(true)

    }

    const handleClose = async () => {
        setIsShowModalDelete(false)
        setDataModal({})
        await fetchUsers()
    }

    const handleConfirmDeleteUser = async () => {
        let response = await deleteUser(dataModal)
        console.log('check response: ', response);
        if (response && response.EC === 0) {
            toast.success(response.EM)
            await fetchUsers();
            setIsShowModalDelete(false)
        }
        else {
            toast.error(response.EM)
        }
    }

    const onHideModalUser = async () => {
        setIsShowModalUser(false)
        setDataModalUser({})
        await fetchUsers()
    }

    const handleEditUser = async (user) => {
        setActionModalUser('UPDATE')
        setDataModalUser(user)
        setIsShowModalUser(true)
    }

    const handleRefresh = async () => {
        await fetchUsers()
    }

    return (
        <>
            <div className="container">
                <div className="manage-users-container">
                    <div className="user-header">
                        <div className="title mt-3">
                            <h3>Manage User</h3>
                        </div>
                        <div className="actions my-3">
                            <button
                                className="btn btn-success refresh"
                                onClick={() => handleRefresh()}
                            ><i className="fa fa-refresh"></i>Refresh
                            </button>
                            <button className="btn btn-primary"
                                onClick={() => {
                                    setIsShowModalUser(true);
                                    setActionModalUser('CREATE')
                                }}><i className="fa fa-plus"></i>Add new user</button>
                        </div>
                    </div>
                    <div className="user-body">
                        <table className="table table-hover table-bordered">
                            <thead className="table-info">
                                <tr>
                                    <th scope="col">No</th>
                                    <th scope="col">ID</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Username</th>
                                    <th scope="col">Group</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listUsers && listUsers.length > 0 ?
                                    <>
                                        {listUsers.map((item, index) => {
                                            return (
                                                <tr key={`row-${index}`}>
                                                    <td>{(currentPage - 1) * currentLimit + index + 1}</td>
                                                    <td>{item.id}</td>
                                                    <td>{item.email}</td>
                                                    <td>{item.username}</td>
                                                    <td>{item.Group ? item.Group.name : ''}</td>
                                                    <td>
                                                        <span className="edit"
                                                            onClick={() => handleEditUser(item)}
                                                            title="Edit"
                                                        >
                                                            <i className="fa fa-pencil"></i>
                                                        </span>
                                                        <span className="delete"
                                                            onClick={() => handleDeleteUser(item)}
                                                            title="Delete"
                                                        >
                                                            <i className="fa fa-trash-o"></i>
                                                        </span>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </>
                                    :
                                    <><tr><td>Not found users</td></tr></>
                                }
                            </tbody>
                        </table>
                    </div>
                    {totalPages > 0 &&
                        <div className="user-footer">
                            <ReactPaginate
                                nextLabel="next >"
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={3}
                                marginPagesDisplayed={4}
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
                    }
                </div>
            </div>
            <ModalDelete
                show={isShowModalDelete}
                handleClose={handleClose}
                handleConfirmDeleteUser={handleConfirmDeleteUser}
                dataModal={dataModal}
            />
            <ModalUser
                onHide={onHideModalUser}
                show={isShowModalUser}
                action={actionModalUser}
                dataModalUser={dataModalUser}
            />
        </>
    )
}

/**
 * count => dem' tong so' ban?: sum user => sum page
 * total(size): so luong. lay ra (limit)
 * page? (offset)
 * 30 rows, 1 page <=> 5 rows => total 6 pages
 * 1 -> 1...5
 * 2 -> 6...10
 * 3 -> 11...15
 * 
 * 6 -> 26...30
 * => tinh' offset
 * select * from users litmit 5 offset 10
 */

export default Users;