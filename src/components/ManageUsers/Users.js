import { useEffect, useState } from "react";
import { fetchAllUser, deleteUser } from "../../services/userservice";
import ReactPaginate from 'react-paginate';
import { toast } from "react-toastify";
import ModalDelete from "./ModalDelete";
import ModalUser from "./ModalUser";
import './Users.scss'

const Users = (props) => {
    const [listUsers, setListUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimit, setCurrentLimit] = useState(3);
    const [totalPages, setTotalPages] = useState(0);

    const [isShowModalDelete, setIsShowModalDelete] = useState(false);
    const [dataModal, setDataModal] = useState({});

    const [isShowModalUser, setIsShowModalUser] = useState(false)
    useEffect(() => {
        fetchUsers();
    }, [currentPage]);

    const fetchUsers = async () => {
        let response = await fetchAllUser(currentPage, currentLimit);
        if (response && response.data && +response.data.EC === 0) {
            setTotalPages(response.data.DT.totalPages)
            setListUsers(response.data.DT.users)
        }
    }

    const handlePageClick = async (event) => {
        setCurrentPage(+event.selected + 1)
    }

    const handleDeleteUser = async (user) => {
        setDataModal(user)
        setIsShowModalDelete(true)

    }

    const handleClose = () => {
        setIsShowModalDelete(false)
        setDataModal({})
    }

    const handleConfirmDeleteUser = async () => {
        let response = await deleteUser(dataModal)
        console.log('check response: ', response);
        if (response && response.data.EC === 0) {
            toast.success(response.data.EM)
            await fetchUsers();
            setIsShowModalDelete(false)
        }
        else {
            toast.error(response.data.EM)
        }
    }

    const onHideModalUser = () => {
        setIsShowModalUser(false)
    }

    return (
        <>
            <div className="container">
                <div className="manage-users-container">
                    <div className="user-header">
                        <div className="title">
                            <h3>Table User</h3>
                        </div>
                        <div className="actions">
                            <button className="btn btn-success">Refresh</button>
                            <button className="btn btn-primary" onClick={() => setIsShowModalUser(true)}>Add new user</button>
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
                                                    <td>{index + 1}</td>
                                                    <td>{item.id}</td>
                                                    <td>{item.email}</td>
                                                    <td>{item.username}</td>
                                                    <td>{item.Group ? item.Group.name : ''}</td>
                                                    <td>
                                                        <button className="btn btn-info mx-3">
                                                            Edit
                                                        </button>
                                                        <button className="btn btn-danger"
                                                            onClick={() => handleDeleteUser(item)}
                                                        >
                                                            Delete
                                                        </button>
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
                title={'Create new user'}
                onHide={onHideModalUser}
                show={isShowModalUser}
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