import { useState } from "react";
import {
  CustomiseObjectForm,
  type CustomiseObjectFormField,
} from "../../components/adjustments/customise-object-form";
import { downloadObject } from "../../components/download/download";

export function CupStabiliser() {
  const [isDownloading, setIsDownloading] = useState(false);
  const [dimensions, setDimensions] = useState({
    width: 10,
    height: 10,
    depth: 30,
  });

  const CustomiseObjectFormFields: CustomiseObjectFormField[] = [
    {
      label: "Width (mm)",
      inputId: "width",
      value: dimensions.width,
    },
    {
      label: "Height (mm)",
      inputId: "height",
      value: dimensions.height,
    },
    {
      label: "Depth (mm)",
      inputId: "depth",
      value: dimensions.depth,
    },
  ];

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      await downloadObject("cup-stabiliser", dimensions);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="m-8">
      <div className="mb-4">
        <h1 className="font-bold">Cup Stabiliser</h1>
        <p className="text-gray-300">
          This is the cup stabiliser product detail page.
        </p>
      </div>
      <CustomiseObjectForm
        fields={CustomiseObjectFormFields}
        onChange={(values) =>
          setDimensions({
            width: values.width,
            height: values.height,
            depth: values.depth,
          })
        }
      />
      <button
        onClick={handleDownload}
        disabled={isDownloading}
        className="mt-4 text-purple-300 underline cursor-pointer disabled:opacity-50"
      >
        {isDownloading ? "Downloading..." : "Download Cup Stabiliser"}
      </button>
    </div>
  );
}
