import React, {useState, useMemo} from 'react';
import {connect} from "react-redux";
import {ADD_PAGE} from "../Store/action";
import Button from "../CommonComponents/Button";
import './PageHandler.css';
import store from '../../index';
import Popup from "../Popups/Popup";
import AddedPages from "../CommonComponents/AddedPages";
import Select from 'react-select';
const PageHandler = (props) => {
    const [state, setState] = useState({
        page: {},
        popUpMsg: {msg: '', type: ''},
    })
    const cancelPageName = () =>{
        setState({...state, page: {}})
    }
    const PageOptions = useMemo(()=>
        [{label: 'Home', value: {name: 'Home', slug: 'Home', id: 1}},
            {label: 'About', value: {name: 'About', slug: 'About', id: 2}},
     {label: 'Contact', value:{name: 'Contact', slug: 'Contact', id: 3}}], [])
    // const PageOptionsMemo = useMemo(()=>PageOptions.map((option)=><option name={'page'} value={option.value} selected={state.page?.label === option.name}>{option.name}</option>),[]);

    const changeState = (val) => {
        setState({...state, page: val})
    }
    const savePageName = () => {
        console.log('state.page', state.page)
        if (!state.page?.value?.id){
            setState({...state, popUpMsg: {msg: 'Please select any one page', type: 'error'}})
            return;
        }
        if(props.pages?.some(page => page?.name === state.page?.name)) {
            setState({...state, popUpMsg: {msg: 'Similar page exists', type: 'error'}})
            return;
        }

        store.dispatch({
            type: ADD_PAGE,
            payload: {
                page: state.page?.value,
            },
        });
        setState({...state, popUpMsg: {msg: 'Page name saved!', type: 'success'}, page: {}})
    }
    const closePopup = ()=>{
        setState({...state, popUpMsg: {msg: '', type: ''}})
    }
    return (
        <div>
            <Popup msg={state.popUpMsg.msg} type={state.popUpMsg.type} close={closePopup}/>
            <h1 style={{textAlign: 'center'}}>Create Pages</h1>
            <div className={'d-flex-center'}>
                <div style={{width: '20vw'}}>
                    <Select placeholder={'Select Page'} options={PageOptions} value={state.page} onChange={changeState}/>
                </div>
            </div>
            <div className={'d-flex-se'}>
                <Button className={'btn bg-red'} buttonName={'Cancel'} onClickFunction={cancelPageName}/>
                <Button className={'btn bg-green'} buttonName={'Save'} onClickFunction={savePageName}/>
            </div>
            <AddedPages/>
        </div>
    )
}

const mapStateToProps = (state) => {
    console.log('state check', state);
  return {
      pages: state.pages,
  };
};
export default connect(mapStateToProps)(PageHandler);