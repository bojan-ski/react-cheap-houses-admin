const SelectedImageModal = ({ imageSrc }) => {
    return (
        <div className="modal fade" id="selectedImageModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="selectedImageModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body text-center">
                        <img src={imageSrc} alt="" className="img-fluid" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SelectedImageModal