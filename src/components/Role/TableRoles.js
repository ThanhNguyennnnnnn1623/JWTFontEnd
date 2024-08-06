import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { fetchAllRole, deleteRole } from "../../services/roleService";
import { toast } from "react-toastify";


const TableRoles = forwardRef((props, ref) => {
    const [listRoles, setListRoles] = useState([]);

    useEffect(() => {
        getAllRoles();
    }, [])

    useImperativeHandle(ref, () => ({
        fetchListRoleAgain() {
            getAllRoles()
        }

    }));

    const getAllRoles = async () => {
        let data = await fetchAllRole();
        if (data && +data.EC === 0) {
            setListRoles(data.DT)
        }
    }

    const handleDeleteRole = async (role) => {
        let data = await deleteRole(role);
        if (data && data.EC === 0) {
            toast.success(data.EM);
            await getAllRoles();
        }
    }
    return (
        <>
            <div className="user-body">
                <table className="table table-hover table-bordered">
                    <thead className="table-info">
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">URL</th>
                            <th scope="col">Description</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listRoles && listRoles.length > 0 ?
                            <>
                                {listRoles.map((item, index) => {
                                    return (
                                        <tr key={`row-${index}`}>
                                            <td>{item.id}</td>
                                            <td>{item.url}</td>
                                            <td>{item.description}</td>
                                            <td>
                                                <span className="delete"
                                                    onClick={() => handleDeleteRole(item)}
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
                            <><tr><td colSpan={4}>Not found Role</td></tr></>
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
})

export default TableRoles;