import {
  CustomiseObjectForm,
  type CustomiseObjectFormField,
} from "@components/customise/customise-object-form";
import { downloadObject } from "@components/download/download";
import { Preview } from "@components/object/preview";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useGetDeviceById } from "./use-get-device";

export type DeviceConfig = {
  name: string;
  id: string;
  previewStlPath: string;
  previewImagePath: string;
  description: string;
};

export function Device() {
  const { id } = useParams<{ id: string }>();
  const device = useGetDeviceById(id!);
  const { t } = useTranslation();

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
      label: t("device.width"),
      inputId: "width",
      value: dimensions.width,
    },
    {
      label: t("device.height"),
      inputId: "height",
      value: dimensions.height,
    },
    {
      label: t("device.depth"),
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
      <div className="min-h-[calc(100vh-64px)] bg-linear-to-br from-gray-50 to-purple-50 flex justify-center items-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
          <p className="mt-4 text-gray-700">{t("device.loading")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-linear-to-br from-gray-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <h1 className="text-4xl font-bold text-black mb-3">
                {device.name}
              </h1>
              <p className="text-lg text-gray-700">{device.description}</p>

              <h2 className="text-xl font-bold text-black mb-6">
                {t("device.customizeDimensions")}
              </h2>
              <CustomiseObjectForm
                fields={CustomiseObjectFormFields}
                onChange={handleDimensionsChange}
              />
              <button
                onClick={handleDownload}
                disabled={isDownloading}
                className="mt-8 w-full px-6 py-4 bg-purple-500 text-white font-semibold rounded-xl hover:bg-purple-700 shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDownloading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    {t("device.downloading")}
                  </span>
                ) : (
                  t("device.download", { name: device.name })
                )}
              </button>
            </div>
          </div>
          <div className="h-full">
            <Preview stlPath={device.previewStlPath} />
          </div>
        </div>
      </div>
    </div>
  );
}
