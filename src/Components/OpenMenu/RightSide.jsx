import './RightSide.css'

export const RightSide = ({onMenu, setOnMenu}) => {
    if (!onMenu) return null

    return (
        <div onClick={() => setOnMenu(!onMenu)} className={`right-side-menu ${onMenu ? 'active' : ''}`}></div>
    )
}
