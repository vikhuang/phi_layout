export default function SaveContent(props) {

    const {stateRef} = props;
    return(
        <div className='toolbar'>
            <button className="toolbar-item spaced"
                    onClick={stateRef}
                >
                    <i className={`format save`}></i>
            </button>
        </div>
    )
}