import React, { useState } from "react";
import { Helmet } from "react-helmet";
import TransformImage from "../components/image";
import messages from "../utils/messages.json";

const App = () => {
  const [font, setFont] = useState("arial");
  const [textColor, setTextColor] = useState("000000");
  const [imageId, setImageId] = useState("");
  const [text, setText] = useState("Change Text");

  const openWidget = () => {
    // create the widget
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "olanetsoft",
        uploadPreset: "w42epls6"
      },
      (error, result) => {
        if (result.event === "success") {
          setImageId(result.info.public_id);
        }
      }
    );
    widget.open(); // open up the widget after creation
  };

  const handleSelect = (e) => {
    setText(e.target.value);
  };

  return (
    <div>
      <main className="App">
        <section className="left-side">
          <Helmet>
            <meta charSet="utf-8" />
            <script
              src="https://widget.Cloudinary.com/v2.0/global/all.js"
              type="text/javascript"
            ></script>
          </Helmet>
          <form>
            <h1>Custom Holiday Card in NextJs</h1>
            <button
              type="button"
              className="btn widget-btn"
              onClick={openWidget}
            >
              Upload Image
            </button>
            <h2>Customize Card</h2>
            <label className="label">Change Font</label>
            <input
              type="radio"
              value="Dancing Script"
              name="Font"
              onChange={(event) => setFont(event.target.value)}
            />
            <label>Dancing Script</label>
            <input
              type="radio"
              value="roboto"
              name="Font"
              onChange={(event) => setFont(event.target.value)}
            />
            <label>Roboto</label>
            <input
              type="radio"
              value="Sacramento"
              name="Font"
              onChange={(event) => setFont(event.target.value)}
            />
            <label>Sacramento</label>

            <h2>Custom Message</h2>

            <select onChange={handleSelect}>
              <option value="⬇️ Select a fruit ⬇️">
                {" "}
                --- Select an option ---{" "}
              </option>
              {messages.map((s) => (
                <option key={s.id} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>

            <h2>Custom Message Color</h2>
            <label className="label">Change Text Color</label>
            <input
              type="radio"
              value="ffffff"
              name="Color"
              onChange={(event) => setTextColor(event.target.value)}
            />
            <label>White</label>
            <input
              type="radio"
              value="0000FF"
              name="Color"
              onChange={(event) => setTextColor(event.target.value)}
            />
            <label>Blue</label>
            <input
              type="radio"
              value="FF0000"
              name="Color"
              onChange={(event) => setTextColor(event.target.value)}
            />
            <label>Red</label>
          </form>
        </section>
        <section className="right-side">
          {(imageId && (
            <TransformImage
              font={font}
              text={text}
              image={imageId}
              textColor={textColor}
            />
          )) || <h1>The result will be displayed here</h1>}
        </section>
      </main>
    </div>
  );
};
export default App;
