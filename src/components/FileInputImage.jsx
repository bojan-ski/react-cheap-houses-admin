// icon
import { RiImageAddFill } from "react-icons/ri";

const FileInputImage = ({ image, onMutate, inputId }) => (
    <>
        <input
            className="d-none"
            type="file"
            name={inputId}
            id={inputId}
            accept=".jpg,.png,.jpeg"
            onChange={onMutate}
        />
        <button
            type="button"
            className="btn bg-orange-hover text-white"
            onClick={() => document.getElementById(inputId).click()}
        >
            <RiImageAddFill size={25} />
        </button>
        {image && (
            <div className="mt-3">
                <img
                    src={URL.createObjectURL(image)}
                    alt={inputId}
                    className="img-fluid"
                    style={{ objectFit: 'cover', height: '600px' }}
                />
            </div>
        )}
    </>
);

export default FileInputImage