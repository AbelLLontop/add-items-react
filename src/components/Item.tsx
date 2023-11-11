
const Item = ({text,handleClick}:{text:string,handleClick:()=>void}) => {
  return (
    <li >
    {text}
    <button onClick={handleClick}>
      Remove Item
    </button>
  </li>
  )
}
export default Item