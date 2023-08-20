import {connect} from "react-redux";
import React from "react";
import {Link} from 'react-router-dom';
import './AddedPages.css'

const AddedPages = (props) => {
    return props.pages?.length ? (
        <table className={'w-100'}>
            <thead>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Slug</th>
                    <th>Edit</th>
            </thead>
            <tbody>
                    {props.pages && props.pages?.map((page)=>
                                        <tr>

                            <td className={'text-align'}>{page.id}</td>
                            <td className={'text-align'}>{page.name}</td>
                            <td className={'text-align'}>{page.slug}</td>
                            <td className={'text-align'}><Link to={`/editor/${page.slug}/`}>Edit</Link></td>
                                                            </tr>

                    )}
            </tbody>
        </table>
    ):<div className={'d-flex-center'} style={{marginTop: '40px', fontWeight:'bold', fontSize:'20px'}}>No Pages Found. Add Pages</div>
}

const mapStateToProps = (state) => {
  return {
      pages: state.pages,
  };
};
export default connect(mapStateToProps)(AddedPages);