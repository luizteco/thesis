import { useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import {
  CustomiseObjectForm,
  type CustomiseObjectFormField,
} from "../../../components/customise/customise-object-form";
import { downloadObject } from "../../../components/download/download";
import { Preview } from "../../../components/object/preview";
import { useGetDeviceById } from "./use-get-device";

export type DeviceConfig = {
  name: string;
  id: string;
  previewStlPath: string;
  description: string;
};

export function Device() {
  const { id } = useParams<{ id: string }>();
  const device = useGetDeviceById(id!);

  const [isDownloading, setIsDownloading] = useState(false);
  const [dimensions, setDimensions] = useState({
    width: 10,
    height: 10,
    depth: 30,
  });

  const handleDimensionsChange = useCallback(
    (values: Record<string, number>) => {
      setDimensions({
        width: values.width,
        height: values.height,
        depth: values.depth,
      });
    },
    []
  );

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
    if (!device) return;
    setIsDownloading(true);
    try {
      await downloadObject(device.id, dimensions);
    } finally {
      setIsDownloading(false);
    }
  };

  if (!device) {
    return (
      <div className="m-8">Loading device, or it could not be found...</div>
    );
  }

  return (
    <div className="m-8 flex items-start">
      <div>
        <div className="mb-4">
          <h1 className="font-bold">{device.name}</h1>
          <p className="text-gray-300">{device.description}</p>
        </div>
        <CustomiseObjectForm
          fields={CustomiseObjectFormFields}
          onChange={handleDimensionsChange}
        />
        <button
          onClick={handleDownload}
          disabled={isDownloading}
          className="mt-4 text-purple-300 underline cursor-pointer disabled:opacity-50"
        >
          {isDownloading ? "Downloading..." : `Download ${device.name}`}
        </button>
      </div>
      <div>
        <Preview stlPath={device.previewStlPath} />
      </div>
    </div>
  );
}
