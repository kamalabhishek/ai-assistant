import React from 'react'

export default function IntialPage(props:any) {

    const initialAction = () => {
        props.actions.domainAction();
    }
    const mergeAction = () =>{
        props.actions.mergePrAction()
    }
    const raisePrAction = () =>{
        props.actions.raisePrAction()
    }
    const triggerAnAction = () =>{
        props.actions.triggerAnAction()
    }

    return (
        <div>
            <button className='start-btn' onClick={() =>{initialAction()}}>Create a repo</button>
            <button className='start-btn' onClick={() => {mergeAction()}}>Merge a PR</button>
            <button className='start-btn' onClick={() => {raisePrAction()}}>Raise a PR</button>
            <button className='start-btn risk-btn' onClick={() => {triggerAnAction()}}>Trigger an action</button>
        </div >
    )
}
