import { CloudinaryContext, Transformation, Image } from "cloudinary-react";
import { useEffect, useRef, useState } from "react";

const TransformImage = ({ font, text, image, textColor }) => {
  const ref = useRef(null);
  const [url, setURL] = useState("");
  const [copy, setCopy] = useState("Copy File");

  useEffect(() => {
    setURL(ref.current.element.current.src);
    return () => {};
  }, [font, text, image, textColor]);

  const handleCopyToClip = () => {
    navigator.clipboard
      .writeText(url)
      .then(() => setCopy("Copied!"))
      .catch((err) => console.log("error copying to clipboard", err));
  };

  return (
    <div>
      <CloudinaryContext cloudName="olanetsoft">
        <Image
          publicId={image}
          secure="true"
          ref={ref}
          height="400"
          width="450"
        >
          <Transformation
            overlay={`text:${font}_75_bold:${text},co_rgb:${textColor}`}
            gravity="north"
            y="300"
          />
        </Image>
      </CloudinaryContext>

      <button className="btn widget-btn" onClick={handleCopyToClip}>
        {copy}
      </button>
    </div>
  );
};

export default TransformImage;
