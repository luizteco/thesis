import {
  CustomiseObjectForm,
  type CustomiseObjectFormField,
} from "@components/customise/customise-object-form";
import { downloadObject, getDownloadDiagnostics } from "@components/download/download";
import { getDownloadUrls } from "@components/download/download";
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
  // download configuration (optional)
  productType?: "cutlery" | "cup" | "button" | "bidet" | string;
  staticFiles?: string[];
  variablePattern?: string;
  variableParts?: string[];
  prefixUrl?: string;
  sizeTable?: Array<any>;
  handleYesParts?: string[];
  handleNoParts?: string[];
  includeInstructions?: boolean;
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
    thickness: 2,
  });
  const [includeHandle, setIncludeHandle] = useState(true);
  const [diagnostics, setDiagnostics] = useState<Array<{ url: string; status: string; statusCode?: number; message?: string }>>([]);
  const [isChecking, setIsChecking] = useState(false);

  const handleDimensionsChange = useCallback(
    (values: Record<string, number>) => {
      setDimensions({
        width: values.width,
        height: values.height,
        depth: values.depth,
        thickness: values.thickness ?? dimensions.thickness,
      });
    },
    [dimensions.thickness]
  );

  const CustomiseObjectFormFields: CustomiseObjectFormField[] = (() => {
    if (!device) return [];
    // No customization required for bidet
    if (device.productType === "bidet") return [];

    // Button: width + height only
    if (device.productType === "button") {
      return [
        { label: t("device.width"), inputId: "width", value: dimensions.width },
        { label: t("device.height"), inputId: "height", value: dimensions.height },
      ];
    }

    // Cup: height + thickness only
    if (device.productType === "cup") {
      return [
        { label: t("device.height"), inputId: "height", value: dimensions.height },
        { label: t("device.thickness"), inputId: "thickness", value: (dimensions as any).thickness },
      ];
    }

    // Cutlery: height + thickness only (width not required)
    if (device.productType === "cutlery") {
      return [
        { label: t("device.height"), inputId: "height", value: dimensions.height },
        { label: t("device.thickness"), inputId: "thickness", value: (dimensions as any).thickness },
      ];
    }

    // Fallback: width, height, depth
    return [
      { label: t("device.width"), inputId: "width", value: dimensions.width },
      { label: t("device.height"), inputId: "height", value: dimensions.height },
      { label: t("device.depth"), inputId: "depth", value: dimensions.depth },
    ];
  })();

  const handleDownload = async () => {
    if (!device) return;
    setIsDownloading(true);
    try {
      // eslint-disable-next-line no-console
      console.log("Device.download clicked", { id: device.id, dimensions, includeHandle });

      await downloadObject(
        device.id,
        dimensions,
        {
          productType: device.productType,
          staticFiles: device.staticFiles,
          variablePattern: device.variablePattern,
          variableParts: device.variableParts,
          prefixUrl: device.prefixUrl,
          sizeTable: (device as any).sizeTable,
          handleYesParts: device.handleYesParts,
          handleNoParts: device.handleNoParts,
          includeInstructions: device.includeInstructions,
          handlePattern: (device as any).handlePattern,
        },
        { includeHandle }
      );
    } catch (err: any) {
      // Show a friendly error to the user and log details to console
      // eslint-disable-next-line no-console
      console.error("Download failed:", err);
      alert(`Download failed: ${err?.message ?? String(err)}`);
    } finally {
      setIsDownloading(false);
    }
  };

  const handlePreviewUrls = async () => {
    if (!device) return;
    try {
      const urls = await getDownloadUrls(device.id, dimensions, {
        productType: device.productType,
        staticFiles: device.staticFiles,
        variablePattern: device.variablePattern,
        variableParts: device.variableParts,
        prefixUrl: device.prefixUrl,
        sizeTable: (device as any).sizeTable,
        handleYesParts: device.handleYesParts,
        handleNoParts: device.handleNoParts,
        includeInstructions: device.includeInstructions,
        handlePattern: (device as any).handlePattern,
      }, { includeHandle });
      alert(urls.join("\n"));
    } catch (err: any) {
      // eslint-disable-next-line no-console
      console.error("Preview failed:", err);
      alert(`Preview failed: ${err?.message ?? String(err)}`);
    }
  };

  const handleCheckFiles = async () => {
    if (!device) return;
    setIsChecking(true);
    setDiagnostics([]);
    try {
      const res = await getDownloadDiagnostics(device.id, dimensions, {
        productType: device.productType,
        staticFiles: device.staticFiles,
        variablePattern: device.variablePattern,
        variableParts: device.variableParts,
        prefixUrl: device.prefixUrl,
        sizeTable: (device as any).sizeTable,
        handleYesParts: device.handleYesParts,
        handleNoParts: device.handleNoParts,
        includeInstructions: device.includeInstructions,
        handlePattern: (device as any).handlePattern,
      }, { includeHandle });
      setDiagnostics(res.map((r) => ({ url: r.url, status: r.status, statusCode: r.statusCode, message: r.message })));
    } catch (err: any) {
      // eslint-disable-next-line no-console
      console.error("Check failed:", err);
      alert(`Check failed: ${err?.message ?? String(err)}`);
    } finally {
      setIsChecking(false);
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

              {CustomiseObjectFormFields.length > 0 ? (
                <>
                  <h2 className="text-xl font-bold text-black mb-6">{t("device.customizeDimensions")}</h2>
                  <CustomiseObjectForm fields={CustomiseObjectFormFields} onChange={handleDimensionsChange} />
                </>
              ) : (
                <div className="mt-4 text-gray-700">{t("device.noCustomization")}</div>
              )}
              {device.productType === "cutlery" && (
                <div className="mt-4 flex items-center gap-3">
                  <input
                    id="include-handle"
                    type="checkbox"
                    checked={includeHandle}
                    onChange={(e) => setIncludeHandle(e.target.checked)}
                    className="h-4 w-4"
                  />
                  <label htmlFor="include-handle" className="text-gray-700">
                    {t("device.includeHandle")}
                  </label>
                </div>
              )}
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
              <button
                onClick={handlePreviewUrls}
                className="mt-2 w-full px-6 py-3 bg-gray-200 text-gray-800 font-medium rounded-xl hover:bg-gray-300 shadow-sm transition-all"
              >
                {t("device.preview")}
              </button>
              <button
                onClick={handleCheckFiles}
                disabled={isChecking}
                className="mt-2 w-full px-6 py-3 bg-gray-100 text-gray-800 font-medium rounded-xl hover:bg-gray-200 shadow-sm transition-all"
              >
                {isChecking ? t("device.checking") : t("device.checkFiles")}
              </button>

              {diagnostics.length > 0 && (
                <div className="mt-4 bg-white p-4 rounded-lg border border-gray-200">
                  <h3 className="font-semibold mb-2">{t("device.diagnostics")}</h3>
                  <ul className="space-y-2">
                    {diagnostics.map((d) => (
                      <li key={d.url} className="flex items-start gap-3">
                        <span
                          className={`inline-block w-3 h-3 rounded-full ${d.status === "ok" ? "bg-green-500" : d.status === "not-found" ? "bg-red-500" : "bg-orange-400"}`}
                        />
                        <div>
                          <div className="text-sm font-medium">{d.url}</div>
                          <div className="text-xs text-gray-600">
                            {d.status === "ok" && t("device.status.ok")}
                            {d.status === "not-found" && `${t("device.status.notFound")} (${d.statusCode ?? ""})`}
                            {d.status === "error" && `${t("device.status.error")} (${d.statusCode ?? ""})`}
                            {d.status === "network" && `${t("device.status.network")} — ${d.message ?? ""}`}
                          </div>
                          {d.message && d.status !== "network" && (
                            <div className="text-xs text-gray-500 mt-1">🔧 {d.message}</div>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>

                  {diagnostics.some((d) => d.status === "network") && (
                    <div className="mt-3 text-sm text-orange-700">{t("device.corsHelpShort")}</div>
                  )}
                </div>
              )}
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
