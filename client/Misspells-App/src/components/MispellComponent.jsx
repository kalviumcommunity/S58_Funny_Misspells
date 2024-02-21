export default function MispellComponent(props){

    let item=props.item;
    
    return (<>
            <div>No. {item.ID}</div>
            <img src={item.URL} alt={item.alt} />
            <div className="caption">{item.Caption}</div>
    </>)
}