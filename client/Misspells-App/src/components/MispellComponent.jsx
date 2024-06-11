import React from 'react';

export default function MispellComponent(props) {
    let item = props.item;
    console.log("Item in MispellComponent:", item);

    return (
        <div className="mispell-component">
     
            <img src={item.URL} alt={item.AltID} />
            <div className="caption">{item.Caption}</div>
        </div>
    );
}
