import React, { useState, useRef,useEffect } from 'react';
import "./Collapsible.css"
function Collapsible(props) {
    const parentRef = useRef();
    const [isOpen, setIsOpen] = useState(true);
    useEffect(() => {
        parentRef.current.style = isOpen ? 
            `height: ${parentRef.current.scrollHeight}px` : "height: 0px"
        
    })
    return (
        <div className={props.className}>
            <div onClick={(e) => {
                setIsOpen(!isOpen)
            }}>
                {props.children[0]}     
            </div>
            <div ref={parentRef}
                className="collapsible-content-parent"
            >
                <div className="collapsible-content">
                    {props.children[1]}
                </div>
            </div>
        </div>
    );
}

export default Collapsible;