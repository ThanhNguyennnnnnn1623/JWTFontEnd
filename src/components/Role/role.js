import './role.scss';
import { useEffect, useRef, useState } from 'react';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import { createRoles } from '../../services/roleService';
import TableRoles from './TableRoles';

const Role = (props) => {

    const dataChildDefault = {
        url: '', description: '', isValidUrl: true
    }
    const [listChild, setListChild] = useState({
        child1: dataChildDefault,
    })

    const childRef = useRef();

    const handleOnchangeInput = (name, value, key) => {
        let _listChild = _.cloneDeep(listChild);
        _listChild[key][name] = value;
        if (value && name === 'url') {
            _listChild[key]['isValidUrl'] = true;
        }
        setListChild(_listChild);
    }

    const handleAddNewInput = () => {
        let _listChild = _.cloneDeep(listChild);
        _listChild[`child-${uuidv4()}`] = dataChildDefault;
        setListChild(_listChild);
    }

    const handleDeleteInput = (key) => {
        let _listChild = _.cloneDeep(listChild);
        delete _listChild[key]
        setListChild(_listChild);
    }

    const buildDataToPersist = () => {
        let _listChild = _.cloneDeep(listChild);
        let result = [];
        Object.entries(_listChild).map(([key, child], index) => {
            result.push({
                url: child.url,
                description: child.description
            })
        })
        return result;
    }
    const handleSave = async () => {
        let invalidObj = Object.entries(listChild).find(([key, child], index) => {
            return child && !child.url;
        })
        if (!invalidObj) {
            let data = buildDataToPersist();
            let res = await createRoles(data);
            if (res && res.EC === 0) {
                toast.success(res.EM);
                childRef.current.fetchListRoleAgain();
            }
        }
        else {
            toast.error('Input URL must not be empty')
            let _listChild = _.cloneDeep(listChild);
            const key = invalidObj[0];
            _listChild[key]['isValidUrl'] = false;
            setListChild(_listChild);
        }
    }

    return (
        <div className='role-container'>
            <div className='container'>
                <div className='adding-roles mt-3'>
                    <div className='title-role'>
                        <h4>
                            Add a new role...
                        </h4>
                    </div>
                    <div className='role-parent'>
                        {
                            Object.entries(listChild).map(([key, child], index) => {
                                return (
                                    <div className='row role-child' key={`child-${key}`}>
                                        <div className={`col-5 form-group ${key}`}>
                                            <label>URL:</label>
                                            <input type='text' className={child.isValidUrl ? 'form-control' : 'form-control is-invalid'} value={child.url}
                                                onChange={(event) => handleOnchangeInput('url', event.target.value, key)}
                                            />
                                        </div>
                                        <div className='col-5 form-group'>
                                            <label>Description:</label>
                                            <input type='text' className='form-control' value={child.description}
                                                onChange={(event) => handleOnchangeInput('description', event.target.value, key)}
                                            />
                                        </div>
                                        <div className='col-2 mt-4 actions'>
                                            <i className="fa fa-plus add"
                                                onClick={() => handleAddNewInput()}
                                            ></i>
                                            {index >= 1 && <i className="fa fa-trash-o delete"
                                                onClick={() => handleDeleteInput(key)}
                                            ></i>}
                                        </div>

                                    </div>
                                )
                            })
                        }
                        <div>
                            <button className='btn btn-primary mt-3'
                                onClick={() => handleSave()}
                            >Save</button>
                        </div>
                    </div>
                </div>
                <hr />
                <div className='mt-3 table-role'>
                    <h4>List Current Roles: </h4>
                    <TableRoles ref={childRef} />
                </div>
            </div>
        </div>
    )
}

export default Role