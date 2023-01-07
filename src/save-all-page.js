export default function SaveAllPage({saveHandler = f => f}) {
    return(
        <button className="toolbar-item spaced"
                onClick={saveHandler}
            >
                <i className={`format save`}></i>
        </button>
    )
}