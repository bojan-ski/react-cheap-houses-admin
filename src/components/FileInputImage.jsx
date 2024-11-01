// icon
import { RiDeleteBin2Fill, RiImageAddFill } from "react-icons/ri";


const FileInputImage = ({ image, onMutate, inputId, handleRemoveImage }) => (
    <>
        <input
            className="d-none"
            type="file"
            name={inputId}
            id={inputId}
            accept=".jpg,.png,.jpeg"
            onChange={onMutate}
        />
        <div>
            <button
                type="button"
                className="btn bg-orange-hover text-white"
                onClick={() => document.getElementById(inputId).click()}
            >
                <RiImageAddFill size={25} />
            </button>

            {image && (
                <button
                    type="button"
                    className="btn ms-3 btn-danger text-white"
                    onClick={() => handleRemoveImage(inputId)}
                >
                    <RiDeleteBin2Fill size={25} />
                </button>
            )}
        </div>
        {image && (
            <div className="my-3">
                <img
                    src={URL.createObjectURL(image)}
                    alt={inputId}
                    className="img-fluid"
                    style={{ objectFit: 'cover', height: '580px' }}
                />
            </div>
        )}
    </>
);

export default FileInputImage