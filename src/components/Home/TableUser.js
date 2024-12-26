import { useEffect, useState } from "react";

const TableUser = (props) => {

    const { listUsers } = props;


    return (
        <>
            <table className="table table-hover table-bordered table-striped">
                <thead>
                    <tr>
                        <th scope="col">Question</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listUsers && listUsers.length > 0
                            ?
                            listUsers.map((item, index) => {
                                return (
                                    <tr key={`table-users-${index}`}>
                                        <td style={{ fontSize: 20 }}>Câu hỏi: {index + 1}</td>
                                        <td>
                                            <button className="btn btn-success mx-3 view"
                                                onClick={() => props.handleClickBtnUpdate(item)}
                                            >View</button>
                                            <button className="btn btn-info answer"
                                                onClick={() => props.handleClickBtnDelete(item)}
                                            >Answer</button>
                                        </td>
                                    </tr>
                                )
                            })
                            :
                            <tr>
                                <td colSpan="2">Not found data</td>
                            </tr>
                    }
                </tbody>
            </table>
        </>
    )
}

export default TableUser;