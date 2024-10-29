// icon
import { RiImageAddFill } from "react-icons/ri";

const FileInputImage = ({ image, onMutate, inputId }) => (
    <>
        <input
            className="hidden"
            type="file"
            name={inputId}
            id={inputId}
            accept=".jpg,.png,.jpeg"
            onChange={onMutate}
        />
        <button
            type="button"
            className="btn bg-orange-400 text-white"
            onClick={() => document.getElementById(inputId).click()}
        >
            <RiImageAddFill size={25} />
        </button>
        {image && (
            <div className="mt-3">
                <img
                    src={URL.createObjectURL(image)}
                    alt={inputId}
                    className="img-thumbnail mx-auto"
                    style={{ objectFit: 'cover' }}
                />
            </div>
        )}
    </>
);

export default FileInputImage